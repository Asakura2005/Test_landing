import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_PUBLIC_SUPABASE_URL || 'https://yknnmkocgqbfkmonbvbn.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrbm5ta29jZ3FiZmttb25idmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NDA1NzMsImV4cCI6MjEwMzExNjU3M30.sdPOiUez26Gp-NU-EXf_4f3qDNA816LTdrWbMeF-V4I'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Gửi lead (yêu cầu báo giá) vào bảng "leads"
 */
export async function submitLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      full_name: leadData.full_name,
      company: leadData.company,
      phone: leadData.phone,
      need: leadData.need,
      note: leadData.note,
      created_at: new Date().toISOString(),
    }])
  
  if (error) throw error
  return data
}

/**
 * Lấy danh sách Leads
 */
export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Cập nhật trạng thái Lead (ví dụ: 'contacted')
 */
export async function updateLeadStatus(id, status) {
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) throw error
  return data
}

/**
 * Xóa một Lead
 */
export async function deleteLead(id) {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

/**
 * Lấy danh sách sản phẩm (kèm variants và categories)
 */
export async function getProducts() {
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

  let query = supabase
    .from('products')
    .select(`
      *,
      categories(*),
      variants:product_variants(*)
    `)

  if (isUUID) {
    query = query.eq('id', slug)
  } else {
    query = query.eq('slug', slug)
  }

  const { data, error } = await query.single()

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
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Lấy chi tiết tin tức theo slug
 */
export async function getNewsBySlug(slug) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

/**
 * Tạo tin tức mới
 */
export async function createNews(newsData) {
  const { data, error } = await supabase
    .from('news')
    .insert([newsData])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Cập nhật tin tức
 */
export async function updateNews(id, newsData) {
  const { data, error } = await supabase
    .from('news')
    .update(newsData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
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
