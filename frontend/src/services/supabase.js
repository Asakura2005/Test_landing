import { createClient } from '@supabase/supabase-js'
import { checkSubmissionRateLimit, recordSubmission, validateVietnamesePhone, sanitizeInput } from '../utils/security.js'
import { 
  encryptData, 
  decryptData, 
  encryptObject, 
  decryptObject 
} from './security.js'
import { sendLeadEmailNotification } from './email.js'

// Sensitive customer PII fields requiring AES-256-GCM encryption
export const LEAD_SENSITIVE_FIELDS = ['full_name', 'name', 'company', 'phone', 'email', 'note', 'notes', 'lost_note', 'customer_name', 'customer_phone', 'company_name']

const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_PUBLIC_SUPABASE_URL)) || 'https://yknnmkocgqbfkmonbvbn.supabase.co'
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY)) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrbm5ta29jZ3FiZmttb25idmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NDA1NzMsImV4cCI6MjEwMzExNjU3M30.sdPOiUez26Gp-NU-EXf_4f3qDNA816LTdrWbMeF-V4I'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Empty defaults for pure real-data operation
export const DEMO_SALES_REPS = []

/**
 * =========================================================================
 * 🔐 SUPABASE AUTHENTICATION HELPERS (Admin Portal)
 * =========================================================================
 */

/**
 * Đăng nhập Admin bằng Email & Mật khẩu qua Supabase Auth
 */
export async function adminSignIn(email, password) {
  try {
    const cleanEmail = (email || '').trim().toLowerCase()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    })
    if (error) throw error
    return { success: true, user: data.user, session: data.session }
  } catch (err) {
    return { success: false, error: err.message || 'Đăng nhập không thành công.' }
  }
}

/**
 * Đăng xuất Admin an toàn
 */
export async function adminSignOut() {
  try {
    await supabase.auth.signOut()
    localStorage.removeItem('haq_admin_auth')
    sessionStorage.removeItem('haq_admin_session')
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

/**
 * Lấy phiên đăng nhập Admin hiện tại
 */
export async function getAdminSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) return null
    return session
  } catch (e) {
    return null
  }
}

/**
 * Lắng nghe thay đổi trạng thái đăng nhập
 */
export function onAdminAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (typeof callback === 'function') {
      callback(event, session)
    }
  })
}

/**
 * =========================================================================
 * 📋 LEADS & FORM SUBMISSION (With Rate Limit & Honeypot Protection)
 * =========================================================================
 */

/**
 * Trợ giúp phân tích và trích xuất Email từ note nếu lead cũ bị lưu gộp
 */
function extractEmailFromNote(note) {
  if (!note || typeof note !== 'string') return ''
  const match = note.match(/Email:\s*([^\s|]+@[^\s|]+)/i)
  return match ? match[1].trim() : ''
}

/**
 * Gửi lead (yêu cầu báo giá) vào bảng "leads" với mã hoá AES-256-GCM + Anti-Spam
 */
export async function submitLead(leadData) {
  // 1. Kiểm tra Honeypot (Nếu bot điền trường bẫy ẩn -> Silent Drop)
  if (leadData.hp_fax_code || leadData.website_url_trap) {
    console.warn('Bot submission blocked via Honeypot trap.')
    return [{ id: 'fake_bot_id', full_name: leadData.full_name, status: 'BLOCKED' }]
  }

  // 2. Kiểm tra Rate Limit (Tối đa 3 lần / 2 phút)
  const rateLimit = checkSubmissionRateLimit()
  if (!rateLimit.allowed) {
    throw new Error(`Bạn đã gửi yêu cầu nhiều lần. Vui lòng thử lại sau ${rateLimit.remainingSeconds} giây hoặc gọi trực tiếp Hotline.`)
  }

  // 3. Kiểm tra tính hợp lệ của Số điện thoại
  const phoneValidation = validateVietnamesePhone(leadData.phone)
  if (!phoneValidation.isValid) {
    throw new Error(phoneValidation.message)
  }

  // 4. Sanitize và chuẩn hóa dữ liệu
  const cleanFullName = sanitizeInput(leadData.full_name || leadData.name)
  if (!cleanFullName || cleanFullName.length < 2) {
    throw new Error('Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).')
  }

  // 5. Chuẩn bị payload plaintext (dùng cho email notification)
  const plainPayload = {
    full_name: cleanFullName,
    company: sanitizeInput(leadData.company || ''),
    phone: phoneValidation.cleanPhone,
    email: sanitizeInput(leadData.email || ''),
    region: sanitizeInput(leadData.region || ''),
    need: sanitizeInput(leadData.need || 'Báo giá sỉ'),
    note: sanitizeInput(leadData.note || leadData.notes || ''),
    utm_source: leadData.utm_source || 'direct',
    utm_medium: leadData.utm_medium || '',
    utm_campaign: leadData.utm_campaign || '',
    utm_content: leadData.utm_content || '',
    session_id: leadData.session_id || '',
    last_product_id: leadData.last_product_id || null,
    last_product_name: leadData.last_product_name || '',
    status: 'NEW',
    created_at: new Date().toISOString(),
  }

  // 6. 🔐 Mã hoá AES-256-GCM các trường PII trước khi lưu lên Supabase
  const encryptedPayload = await encryptObject(plainPayload, LEAD_SENSITIVE_FIELDS)

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([encryptedPayload])
      .select()
    
    if (error) {
      console.error("Supabase insert lead error:", error)
      throw error
    }
    
    // Ghi nhận lượt gửi thành công vào bộ đếm Rate Limit
    recordSubmission()

    // Kích hoạt gửi email thông báo tự động (dùng plaintext, không dùng bản mã)
    sendLeadEmailNotification(plainPayload).catch((err) => {
      console.warn('Non-blocking lead email dispatch error:', err)
    })

    return data || [plainPayload]
  } catch (err) {
    console.error("Supabase insert lead failed:", err)
    throw err
  }
}

export async function getLeads() {
  try {
    let rawLeads = []
    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        sales_rep:sales_reps(id, full_name, phone, role)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.warn("Supabase getLeads query error (trying direct query):", error)
      // Thử query trực tiếp bảng leads
      const { data: simpleData, error: simpleError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (simpleError) throw simpleError
      rawLeads = simpleData || []
    } else {
      rawLeads = data || []
    }
    
    // 🔓 Giải mã AES-256-GCM tất cả trường PII và chuẩn hoá email
    const decryptedLeads = await Promise.all(
      rawLeads.map(async (lead) => {
        const decrypted = await decryptObject(lead, LEAD_SENSITIVE_FIELDS)
        const parsedEmail = decrypted.email || extractEmailFromNote(decrypted.note) || ''
        return { ...decrypted, email: parsedEmail }
      })
    )

    return decryptedLeads
  } catch (err) {
    console.warn("Supabase getLeads error:", err.message)
    return []
  }
}

/**
 * Cập nhật chi tiết Lead — mã hoá các trường PII trước khi ghi lên DB
 */
export async function updateLeadDetails(id, updates, historyNote = '') {
  try {
    // 🔐 Mã hoá AES-256-GCM những trường PII cần cập nhật
    const encryptedUpdates = await encryptObject(updates, LEAD_SENSITIVE_FIELDS)

    const { data, error } = await supabase
      .from('leads')
      .update({
        ...encryptedUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Ghi log vào lead_status_history
    if (historyNote || updates.status) {
      try {
        await supabase.from('lead_status_history').insert([{
          lead_id: id,
          to_status: updates.status || 'UPDATED',
          note: historyNote || updates.lost_note || 'Cập nhật trạng thái lead',
          created_at: new Date().toISOString(),
        }])
      } catch (histErr) {
        console.warn("Could not write status history:", histErr.message)
      }
    }

    // 🔓 Trả về bản giải mã để hiển thị trên UI
    return await decryptObject(data, LEAD_SENSITIVE_FIELDS)
  } catch (err) {
    console.error("Supabase updateLeadDetails error:", err.message)
    throw err
  }
}

/**
 * Cập nhật nhanh trạng thái Lead
 */
export async function updateLeadStatus(id, status, extraFields = {}) {
  return updateLeadDetails(id, { status, ...extraFields }, `Chuyển trạng thái sang ${status}`)
}

/**
 * Xóa một Lead
 */
export async function deleteLead(id) {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (err) {
    console.error("Supabase deleteLead error:", err.message)
    throw err
  }
}

/**
 * Lấy danh sách Nhân viên Sales
 */
export async function getSalesReps() {
  try {
    const { data, error } = await supabase
      .from('sales_reps')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  } catch (err) {
    console.warn("Supabase getSalesReps error:", err.message)
    return []
  }
}

/**
 * Tạo Đơn hàng B2B khi chốt đơn từ Lead
 */
export async function createOrder(orderData, items = []) {
  const orderCode = 'HAQ-' + Date.now().toString().slice(-6)

  // Các trường PII trong bảng orders cần mã hoá
  const ORDER_PII_FIELDS = ['customer_name', 'customer_phone', 'company_name']

  const orderRaw = {
    order_code: orderCode,
    lead_id: orderData.lead_id || null,
    customer_name: orderData.customer_name,
    customer_phone: orderData.customer_phone,
    company_name: orderData.company_name || '',
    assigned_sales_id: orderData.assigned_sales_id || null,
    sales_name: orderData.sales_name || 'Admin',
    total_amount: orderData.total_amount || 0,
    status: 'COMPLETED',
    utm_source: orderData.utm_source || 'direct',
    utm_campaign: orderData.utm_campaign || '',
    created_at: new Date().toISOString(),
  }

  // 🔐 Mã hoá các trường PII của đơn hàng
  const orderPayload = await encryptObject(orderRaw, ORDER_PII_FIELDS)

  try {
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert([orderPayload])
      .select()
      .single()

    if (orderErr) throw orderErr

    if (items.length > 0 && order) {
      const itemsPayload = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id || null,
        product_name: item.product_name,
        variant_name: item.variant_name || '',
        quantity: item.quantity || 1,
        unit_price: item.unit_price || 0,
        total_price: (item.quantity || 1) * (item.unit_price || 0),
      }))
      await supabase.from('order_items').insert(itemsPayload)
    }

    // Cập nhật trạng thái lead sang ORDERED / CONVERTED
    if (orderData.lead_id) {
      await updateLeadDetails(orderData.lead_id, {
        status: 'CONVERTED',
        estimated_value: orderData.total_amount,
      }, `Chốt đơn hàng ${orderCode} thành công. Tổng giá trị: ${orderData.total_amount.toLocaleString('vi-VN')} đ`)
    }

    return order
  } catch (err) {
    console.error("Supabase createOrder failed:", err.message)
    throw err
  }
}

/**
 * Lấy danh sách đơn hàng
 */
export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // 🔓 Giải mã các trường PII của đơn hàng
    const ORDER_PII_FIELDS = ['customer_name', 'customer_phone', 'company_name']
    const decryptedOrders = await Promise.all(
      (data || []).map(order => decryptObject(order, ORDER_PII_FIELDS))
    )
    return decryptedOrders
  } catch (err) {
    console.warn("Supabase getOrders error:", err.message)
    return []
  }
}

/**
 * Cập nhật đơn hàng B2B đã chốt (Sửa thông tin, sửa danh mục sản phẩm, số lượng, đơn giá)
 */
export async function updateOrder(orderId, orderData, items = []) {
  const ORDER_PII_FIELDS = ['customer_name', 'customer_phone', 'company_name']

  const orderRaw = {
    customer_name: orderData.customer_name,
    customer_phone: orderData.customer_phone,
    company_name: orderData.company_name || '',
    sales_name: orderData.sales_name || 'Admin',
    total_amount: Number(orderData.total_amount) || 0,
    status: orderData.status || 'COMPLETED',
  }

  const orderPayload = await encryptObject(orderRaw, ORDER_PII_FIELDS)

  try {
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .update(orderPayload)
      .eq('id', orderId)
      .select()
      .single()

    if (orderErr) throw orderErr

    // Xóa items cũ và thêm items mới
    if (items && items.length > 0) {
      const { error: delErr } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', orderId)

      if (delErr) console.warn("Delete old order items warning:", delErr.message)

      const itemsPayload = items.map(item => ({
        order_id: orderId,
        product_id: item.product_id || null,
        product_name: item.product_name,
        variant_name: item.variant_name || '',
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.unit_price) || 0,
        total_price: (Number(item.quantity) || 1) * (Number(item.unit_price) || 0),
      }))
      const { error: insErr } = await supabase.from('order_items').insert(itemsPayload)
      if (insErr) throw insErr
    }

    // Cập nhật giá trị ước tính cho Lead nếu có liên kết
    if (orderData.lead_id) {
      await updateLeadDetails(orderData.lead_id, {
        estimated_value: orderData.total_amount,
      }, `Cập nhật lại đơn hàng: ${Number(orderData.total_amount).toLocaleString('vi-VN')} đ`)
    }

    return order
  } catch (err) {
    console.error("Supabase updateOrder failed:", err.message)
    throw err
  }
}

/**
 * Xóa đơn hàng B2B
 */
export async function deleteOrder(orderId) {
  try {
    await supabase.from('order_items').delete().eq('order_id', orderId)
    const { error } = await supabase.from('orders').delete().eq('id', orderId)
    if (error) throw error
    return true
  } catch (err) {
    console.error("Supabase deleteOrder failed:", err.message)
    throw err
  }
}

/**
 * Đăng ký lắng nghe realtime khi có Lead mới phát sinh từ Landing Page
 */
export function subscribeToLeads(onNewLead) {
  try {
    const channel = supabase
      .channel('leads-realtime-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, async (payload) => {
        if (onNewLead && payload.new) {
          const decrypted = await decryptObject(payload.new, LEAD_SENSITIVE_FIELDS)
          onNewLead(decrypted)
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  } catch (err) {
    console.warn("Realtime subscription not available in this environment:", err.message)
    return () => {}
  }
}

/**
 * Lấy danh sách sản phẩm (kèm variants, categories và provinces)
 */
export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(*),
        provinces(*),
        variants:product_variants(*)
      `)
      .order('is_pinned', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (!error && data) return data
  } catch (e) {
    // graceful fallback
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(*),
      variants:product_variants(*)
    `)
    .order('is_pinned', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Lấy chi tiết 1 sản phẩm theo slug hoặc id (fallback)
 */
export async function getProductBySlug(slug) {
  // Kiểm tra xem slug có phải là UUID không (dùng cho các sản phẩm cũ chưa có slug)
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(*),
        provinces(*),
        variants:product_variants(*)
      `)

    if (isUUID) {
      query = query.eq('id', slug)
    } else {
      query = query.eq('slug', slug)
    }

    const { data, error } = await query.single()
    if (!error && data) return data
  } catch (e) {
    // graceful fallback
  }

  let fallbackQuery = supabase
    .from('products')
    .select(`
      *,
      categories(*),
      variants:product_variants(*)
    `)

  if (isUUID) {
    fallbackQuery = fallbackQuery.eq('id', slug)
  } else {
    fallbackQuery = fallbackQuery.eq('slug', slug)
  }

  const { data, error } = await fallbackQuery.single()

  if (error) throw error
  return data
}

/**
 * Xóa một sản phẩm
 */
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

/**
 * Tạo sản phẩm mới kèm variants
 */
export async function createProduct(productData, variantsData) {
  // 1. Tạo Product
  const { data: newProduct, error: pError } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single()

  if (pError) throw pError

  // 2. Tạo Variants nếu có
  if (variantsData && variantsData.length > 0) {
    const vData = variantsData.map(v => ({ ...v, product_id: newProduct.id }))
    const { error: vError } = await supabase
      .from('product_variants')
      .insert(vData)

    if (vError) throw vError
  }

  return newProduct
}

/**
 * Cập nhật sản phẩm & variants
 */
export async function updateProduct(id, productData, variantsData) {
  // 1. Cập nhật Product
  const { error: pError } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)

  if (pError) throw pError

  // 2. Cập nhật Variants (Xóa cũ, thêm mới cho đơn giản)
  const { error: delError } = await supabase
    .from('product_variants')
    .delete()
    .eq('product_id', id)
    
  if (delError) throw delError

  if (variantsData && variantsData.length > 0) {
    const vData = variantsData.map(v => ({ ...v, product_id: id }))
    const { error: vError } = await supabase
      .from('product_variants')
      .insert(vData)

    if (vError) throw vError
  }

  return true
}

/**
 * Tải ảnh lên Supabase Storage bucket 'assets'
 */
export async function uploadProductImage(file, productSlug) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${productSlug}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { error } = await supabase.storage
    .from('assets')
    .upload(fileName, file)
    
  if (error) throw error
  
  const { data: publicUrlData } = supabase.storage
    .from('assets')
    .getPublicUrl(fileName)
    
  return publicUrlData.publicUrl
}

/**
 * Xóa ảnh từ bucket 'assets'
 */
export async function deleteProductImage(imageUrl) {
  if (!imageUrl) return
  const match = imageUrl.match(/\/storage\/v1\/object\/public\/assets\/(.+)$/)
  if (match && match[1]) {
    const path = match[1]
    const { error } = await supabase.storage
      .from('assets')
      .remove([path])
      
    if (error) console.error("Error deleting old image:", error)
  }
}

/**
 * ==================================================
 * CATEGORY APIS
 * ==================================================
 */

/**
 * Lấy danh sách danh mục
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Tạo danh mục mới
 */
export async function createCategory(categoryData) {
  const { data, error } = await supabase
    .from('categories')
    .insert([categoryData])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Cập nhật danh mục
 */
export async function updateCategory(id, categoryData) {
  const { data, error } = await supabase
    .from('categories')
    .update(categoryData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Xóa danh mục
 */
export async function deleteCategory(id) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

/**
 * ==================================================
 * NEWS APIS (CMS)
 * ==================================================
 */

/**
 * Lấy danh sách tin tức
 */
export async function getNews() {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })

    if (error) {
      // Fallback nếu chưa có cột is_pinned
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
      
      if (fallbackError) throw fallbackError
      return fallbackData || []
    }
    return data || []
  } catch (err) {
    console.warn("getNews warning:", err.message)
    throw err
  }
}

/**
 * Lấy chi tiết tin tức theo slug
 */
export async function getNewsBySlug(slug) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data
}

/**
 * Tạo tin tức mới
 */
export async function createNews(newsData) {
  const { id: _id, ...cleanPayload } = newsData
  try {
    const { data, error } = await supabase
      .from('news')
      .insert([cleanPayload])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (err) {
    console.warn("Supabase createNews full payload error, falling back to base columns:", err.message)
    // Fallback: Thử với các cột cơ bản đảm bảo tương thích 100% với schema hiện tại
    const basePayload = {
      title: newsData.title,
      slug: newsData.slug,
      category: newsData.category || 'Tin tức',
      summary: newsData.summary || '',
      content: newsData.content || '',
      image_url: newsData.image_url || '',
      author: newsData.author || (newsData.source_name ? `Theo ${newsData.source_name}` : 'HAQ FOOD'),
      source_name: newsData.source_name || null,
      source_url: newsData.source_url || null,
      published_at: newsData.published_at || new Date().toISOString()
    }
    const { data, error } = await supabase
      .from('news')
      .insert([basePayload])
      .select()
      .single()

    if (error) {
      console.error("Supabase createNews basePayload error:", error)
      throw error
    }
    return data
  }
}

/**
 * Cập nhật tin tức
 */
export async function updateNews(id, newsData) {
  const { id: _id, ...cleanPayload } = newsData
  try {
    const { data, error } = await supabase
      .from('news')
      .update(cleanPayload)
      .eq('id', id)
      .select()

    if (error) throw error
    if (!data || data.length === 0) {
      // Nếu bài viết cũ chưa có trong DB (bài mẫu), tiến hành tạo mới
      return await createNews({ ...cleanPayload, id })
    }
    return data[0]
  } catch (err) {
    console.warn("Supabase updateNews full payload error, falling back to base columns:", err.message)
    // Fallback: Thử cập nhật với các cột cơ bản
    const basePayload = {
      title: newsData.title,
      slug: newsData.slug,
      category: newsData.category || 'Tin tức',
      summary: newsData.summary || '',
      content: newsData.content || '',
      image_url: newsData.image_url || '',
      author: newsData.author || (newsData.source_name ? `Theo ${newsData.source_name}` : 'HAQ FOOD'),
      source_name: newsData.source_name || null,
      source_url: newsData.source_url || null,
      published_at: newsData.published_at || new Date().toISOString()
    }
    const { data, error } = await supabase
      .from('news')
      .update(basePayload)
      .eq('id', id)
      .select()

    if (error) {
      console.error("Supabase updateNews basePayload error:", error)
      throw error
    }
    if (!data || data.length === 0) {
      return await createNews(basePayload)
    }
    return data[0]
  }
}

/**
 * Xóa tin tức
 */
export async function deleteNews(id) {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

/**
 * Upload ảnh tin tức lên bucket 'assets' (dùng chung cho sản phẩm)
 */
export async function uploadNewsImage(file) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `news/${fileName}`

  const { data, error } = await supabase.storage
    .from('assets')
    .upload(filePath, file)

  if (error) throw error

  // Lấy public URL
  const { data: { publicUrl } } = supabase.storage
    .from('assets')
    .getPublicUrl(filePath)

  return publicUrl
}

/**
 * ==================================================
 * PROVINCE APIS (Specialty Map CMS)
 * ==================================================
 */

/**
 * Lấy danh sách tất cả các tỉnh/thành (kèm các sản phẩm liên kết)
 * @param {boolean} onlyActive - Nếu true chỉ lấy tỉnh đang active (dùng cho map)
 */
export async function getProvinces(onlyActive = false) {
  let query = supabase
    .from('provinces')
    .select(`
      *,
      products:products(id, name, slug, tag, images, is_pinned)
    `)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (onlyActive) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

/**
 * Lấy thông tin 1 tỉnh theo canonical code (vd: 'tayninh', 'haiphong')
 */
export async function getProvinceByCode(code) {
  const { data, error } = await supabase
    .from('provinces')
    .select(`
      *,
      products:products(
        *,
        categories(*),
        variants:product_variants(*)
      )
    `)
    .eq('code', code)
    .single()

  if (error) throw error
  return data
}

/**
 * Tạo tỉnh/thành mới
 */
export async function createProvince(provinceData) {
  const { data, error } = await supabase
    .from('provinces')
    .insert([provinceData])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Cập nhật thông tin tỉnh/thành
 */
export async function updateProvince(id, provinceData) {
  const { data, error } = await supabase
    .from('provinces')
    .update(provinceData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Xóa tỉnh/thành
 */
export async function deleteProvince(id) {
  const { error } = await supabase
    .from('provinces')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

/**
 * Tải ảnh đại diện tỉnh/thành lên bucket 'assets'
 */
export async function uploadProvinceImage(file, provinceCode) {
  const fileExt = file.name.split('.').pop()
  const fileName = `provinces/${provinceCode || 'general'}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  const { error } = await supabase.storage
    .from('assets')
    .upload(fileName, file)

  if (error) throw error

  const { data: publicUrlData } = supabase.storage
    .from('assets')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}

/**
 * Xóa ảnh tỉnh/thành từ bucket 'assets'
 */
export async function deleteProvinceImage(imageUrl) {
  if (!imageUrl) return
  const match = imageUrl.match(/\/storage\/v1\/object\/public\/assets\/(.+)$/)
  if (match && match[1]) {
    const path = match[1]
    const { error } = await supabase.storage
      .from('assets')
      .remove([path])

    if (error) console.error("Error deleting province image:", error)
  }
}

/**
 * Gán hoặc gỡ sản phẩm vào một tỉnh/thành
 */
export async function assignProductProvince(productId, provinceId) {
  const { data, error } = await supabase
    .from('products')
    .update({ province_id: provinceId })
    .eq('id', productId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Gán nhiều sản phẩm vào một tỉnh/thành cùng lúc
 */
export async function assignMultipleProductsToProvince(productIds, provinceId) {
  if (!productIds || productIds.length === 0) return []

  const { data, error } = await supabase
    .from('products')
    .update({ province_id: provinceId })
    .in('id', productIds)
    .select()

  if (error) throw error
  return data
}

/**
 * Bật/tắt ghim nổi bật cho sản phẩm trong tỉnh (is_pinned)
 */
export async function toggleProductPinned(productId, isPinned) {
  const { data, error } = await supabase
    .from('products')
    .update({ is_pinned: isPinned })
    .eq('id', productId)
    .select()
    .single()

  if (error) throw error
  return data
}


