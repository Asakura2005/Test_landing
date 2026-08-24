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
 * Lấy danh sách sản phẩm (kèm variants)
 */
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*)
    `)
    .order('is_pinned', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

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
