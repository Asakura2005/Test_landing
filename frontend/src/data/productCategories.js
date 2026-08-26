import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner3 from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

/**
 * SINGLE SOURCE OF TRUTH FOR PRODUCT CATEGORIES
 * Được đồng bộ giữa Header Mega Menu, Mobile Drawer, và Trang Danh mục sản phẩm (/san-pham).
 */
export const PRODUCT_CATEGORIES = [
  {
    id: 'all',
    slug: 'all',
    name: 'Tất cả sản phẩm',
    shortName: 'Tất cả',
    desc: 'Toàn bộ danh mục sản phẩm thực phẩm và đồ ăn vặt đóng gói chất lượng cao của HAQ FOOD.',
    image: heroBanner1,
    featured: 'Bánh tráng trộn HAQ 2021',
    featuredDesc: 'Sản phẩm tiêu biểu làm nên thương hiệu HAQ FOOD trên dây chuyền sấy giòn khép kín ISO 22000 & HACCP.',
    dbMatchSlugs: ['all'],
  },
  {
    id: 'banh-trang',
    slug: 'banh-trang',
    name: 'Bánh tráng',
    shortName: 'Bánh tráng',
    desc: 'Bánh tráng sấy giòn vị bò, tôm, phô mai & bánh tráng trộn chuẩn vị truyền thống.',
    image: heroBanner1,
    featured: 'Bánh tráng trộn HAQ',
    featuredDesc: 'Dây chuyền sấy giòn tự động, kết hợp gia vị tôm và bò khô đậm vị Việt Nam.',
    dbMatchSlugs: ['banh-trang', 'banh-trang-say', 'banh-trang-tron'],
  },
  {
    id: 'banh',
    slug: 'banh',
    name: 'Bánh',
    shortName: 'Bánh',
    desc: 'Bánh hạnh nhân & bánh đậu xanh thượng hạng đạt chuẩn xuất khẩu sang thị trường châu Á.',
    image: heroBanner3,
    featured: 'Bánh hạnh nhân & đậu xanh',
    featuredDesc: 'Nguyên liệu tuyển chọn tự nhiên, vị thanh bùi giòn xốp đạt tiêu chuẩn kiểm định quốc tế.',
    dbMatchSlugs: ['banh', 'banh-hanh-nhan', 'banh-deo', 'banh-khac', 'banh-sua'],
  },
  {
    id: 'do-an-vat',
    slug: 'do-an-vat',
    name: 'Đồ ăn vặt',
    shortName: 'Đồ ăn vặt',
    desc: 'Bắp rang bơ sấy nổ công nghệ cao kết hợp bơ sữa caramel béo ngậy thơm ngon.',
    image: heroBanner2,
    featured: 'Bắp rang bơ cao cấp',
    featuredDesc: 'Hạt bắp nổ tròn đều, lớp sốt caramel và phô mai giòn rụm hấp dẫn.',
    dbMatchSlugs: ['do-an-vat', 'bap-rang-bo'],
  },
  {
    id: 'do-an-kho',
    slug: 'do-an-kho',
    name: 'Đồ ăn khô',
    shortName: 'Đồ ăn khô',
    desc: 'Thịt bò và thịt heo sấy gia vị tự nhiên đậm đà, kiểm soát chất lượng an toàn nghiêm ngặt.',
    image: heroBanner1,
    featured: 'Thịt khô hảo hạng',
    featuredDesc: 'Thịt tươi tẩm ướp gia vị truyền thống, bảo quản tiện lợi và an toàn vệ sinh.',
    dbMatchSlugs: ['do-an-kho', 'thot-kho', 'thit-kho'],
  },
]

/**
 * Lấy thông tin Category theo slug (mặc định trả về category 'all' nếu không tìm thấy)
 */
export function getCategoryBySlug(slug) {
  if (!slug || slug === 'all') return PRODUCT_CATEGORIES[0]
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug) || PRODUCT_CATEGORIES[0]
}

/**
 * Lọc danh sách sản phẩm theo Category slug
 */
export function filterProductsByCategory(products = [], categorySlug = 'all') {
  if (!categorySlug || categorySlug === 'all') return products

  const category = getCategoryBySlug(categorySlug)
  if (!category) return products

  return products.filter((p) => {
    // 1. Kiểm tra theo categories relation từ DB
    const catSlug = p.categories?.slug || ''
    if (category.dbMatchSlugs.includes(catSlug)) return true

    // 2. Kiểm tra theo category_id hoặc category slug trực tiếp
    if (category.dbMatchSlugs.includes(p.category_id)) return true
    if (p.category && category.dbMatchSlugs.includes(p.category)) return true

    // 3. Fallback tìm theo tên sản phẩm
    const nameLower = (p.name || '').toLowerCase()
    if (categorySlug === 'banh-trang' && nameLower.includes('bánh tráng')) return true
    if (categorySlug === 'banh' && (nameLower.includes('bánh hạnh nhân') || nameLower.includes('bánh đậu xanh') || nameLower.includes('bánh dẻo') || nameLower.includes('bánh sữa'))) return true
    if (categorySlug === 'do-an-vat' && nameLower.includes('bắp')) return true
    if (categorySlug === 'do-an-kho' && (nameLower.includes('thịt') || nameLower.includes('khô'))) return true

    return false
  })
}
