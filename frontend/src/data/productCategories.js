import catAllImg from '../assets/herobanner/hero_banner_1.webp'
import catBanhTrangImg from '../assets/categories/category_banh_trang.webp'
import { optimizeSupabaseImageUrl } from '../utils/imageOptimizer'

// Fallback an toàn cho các danh mục trỏ về ảnh hợp lệ hiện có
const catBanhImg = catBanhTrangImg
const catDoAnVatImg = catBanhTrangImg
const catDoAnKhoImg = catBanhTrangImg

export const PRODUCT_IMAGE_MAP = {}

/**
 * Hàm giải quyết ảnh sản phẩm an toàn và fallback nhiều cấp (Ưu tiên ảnh Supabase Storage tối ưu kích thước)
 */
export function resolveProductImage(product, categorySlug = null, options = { width: 360, quality: 80, resize: 'contain' }) {
  if (!product) return catAllImg
  let rawUrl = ''
  if (product.image_url && typeof product.image_url === 'string' && product.image_url.startsWith('http')) {
    rawUrl = product.image_url
  } else if (product.images && product.images[0] && typeof product.images[0] === 'string' && product.images[0].startsWith('http')) {
    rawUrl = product.images[0]
  } else if (product.image && typeof product.image === 'string' && product.image.startsWith('http')) {
    rawUrl = product.image
  } else if (categorySlug && CATEGORY_VISUALS[categorySlug]?.image) {
    return CATEGORY_VISUALS[categorySlug].image
  } else if (product.categories?.slug && CATEGORY_VISUALS[product.categories.slug]?.image) {
    return CATEGORY_VISUALS[product.categories.slug].image
  } else {
    return catBanhTrangImg
  }

  return optimizeSupabaseImageUrl(rawUrl, options)
}


/**
 * Visual Asset mapping theo slug hoặc từ khóa
 */
export const CATEGORY_VISUALS = {
  'all': {
    image: catAllImg,
    desc: 'Toàn bộ danh mục sản phẩm thực phẩm và đồ ăn vặt đóng gói chất lượng cao của HAQ FOOD.',
    featured: 'Bánh tráng trộn HAQ 2021',
    featuredDesc: 'Sản phẩm tiêu biểu làm nên thương hiệu HAQ FOOD trên dây chuyền sấy giòn khép kín ISO 22000 & HACCP.',
  },
  'banh-trang': {
    image: catBanhTrangImg,
    desc: 'Bánh tráng sấy giòn vị bò, tôm, phô mai & bánh tráng trộn chuẩn vị truyền thống.',
    featured: 'Bánh tráng trộn HAQ',
    featuredDesc: 'Dây chuyền sấy giòn tự động, kết hợp gia vị tôm và bò khô đậm vị Việt Nam.',
  },
  'banh-trang-say': {
    image: catBanhTrangImg,
    desc: 'Bánh tráng sấy giòn rụm với công nghệ sấy nhiệt hiện đại, các vị bò, tôm, chà bông.',
    featured: 'Bánh tráng sấy giòn vị tôm',
    featuredDesc: 'Giòn rụm đậm đà vị tôm biển tự nhiên, đạt chuẩn ISO 22000 & HACCP.',
  },
  'banh-trang-tron': {
    image: catBanhTrangImg,
    desc: 'Bánh tráng trộn dạng sợi và dạng cuộn gà lá chanh, sa tế tôm cay nồng đậm vị.',
    featured: 'Bánh tráng trộn gà lá chanh',
    featuredDesc: 'Sợi bánh tráng dẻo thơm hòa quyện khô gà cay cay và hương lá chanh tươi.',
  },
  'bap-rang-bo': {
    image: catDoAnVatImg,
    desc: 'Bắp rang bơ sấy nổ công nghệ cao kết hợp bơ sữa caramel béo ngậy thơm ngon.',
    featured: 'Bắp rang bơ Caramel',
    featuredDesc: 'Hạt bắp nổ tròn đều, lớp sốt caramel và phô mai giòn rụm hấp dẫn.',
  },
  'banh-hanh-nhan': {
    image: catBanhImg,
    desc: 'Bánh hạnh nhân thượng hạng thơm bùi giòn xốp đạt chuẩn xuất khẩu sang thị trường châu Á.',
    featured: 'Bánh hạnh nhân thượng hạng',
    featuredDesc: 'Bánh hạnh nhân giòn tan bùi thơm hạt hạnh nhân tự nhiên, đạt chuẩn ISO 22000.',
  },
  'banh-deo': {
    image: catBanhImg,
    desc: 'Bánh dẻo truyền thống ngọt thanh dịu mát từ bột nếp và nhân đậu tự nhiên.',
    featured: 'Bánh dẻo truyền thống',
    featuredDesc: 'Vị ngọt thanh tao lưu giữ nét đẹp văn hóa ẩm thực truyền thống.',
  },
  'banh-sua': {
    image: catBanhImg,
    desc: 'Bánh sữa dừa và bánh sữa đậu thơm ngậy béo bùi từ nguồn sữa nguyên chất.',
    featured: 'Bánh sữa dừa tươi',
    featuredDesc: 'Thơm ngậy vị sữa tự nhiên kết hợp dừa sấy bùi béo.',
  },
  'banh-khac': {
    image: catBanhImg,
    desc: 'Các dòng bánh truyền thống và bánh ngọt đa dạng của HAQ FOOD.',
    featured: 'Bánh đậu xanh tươi',
    featuredDesc: 'Đậu xanh nguyên chất tươi ngon, bổ dưỡng cho cả gia đình.',
  },
  'thot-kho': {
    image: catDoAnKhoImg,
    desc: 'Thịt bò và thịt heo sấy gia vị tự nhiên đậm đà, kiểm soát chất lượng an toàn nghiêm ngặt.',
    featured: 'Thịt bò khô hảo hạng',
    featuredDesc: 'Thịt tươi tẩm ướp gia vị sả ớt truyền thống, bảo quản an toàn.',
  },
  'thit-kho': {
    image: catDoAnKhoImg,
    desc: 'Thịt bò và thịt heo sấy gia vị tự nhiên đậm đà, kiểm soát chất lượng an toàn nghiêm ngặt.',
    featured: 'Thịt bò khô hảo hạng',
    featuredDesc: 'Thịt tươi tẩm ướp gia vị sả ớt truyền thống, bảo quản an toàn.',
  },
  'do-an-vat-cach-tan': {
    image: catDoAnVatImg,
    desc: 'Các dòng sản phẩm đồ ăn vặt sáng tạo, bánh tráng sấy giòn, bánh tráng trộn đậm vị Việt Nam.',
    featured: 'Bánh tráng trộn HAQ 2021',
    featuredDesc: 'Sợi bánh tráng dẻo thơm hòa quyện khô gà cay cay và hương sa tế tôm đậm đà.',
  },
  'do-an-vat-hien-dai': {
    image: catBanhImg,
    desc: 'Đồ ăn vặt hiện đại chuẩn vị, kết hợp tinh hoa truyền thống và công nghệ sấy khép kín.',
    featured: 'Bánh chả cổ truyền',
    featuredDesc: 'Bánh chả lá chanh giòn rụm, hương thơm nồng nàn lưu giữ tinh hoa ẩm thực Hà Thành.',
  },
  'do-an-vat-truyen-thong': {
    image: catDoAnVatImg,
    desc: 'Đồ ăn vặt và bánh ngọt truyền thống tuyển chọn từ các vùng miền nông sản Việt Nam.',
    featured: 'Bắp rang bơ Caramel',
    featuredDesc: 'Hạt bắp nổ giòn xốp vàng óng, quyện sốt bơ caramel béo ngậy thơm lừng.',
  },
  'banh-cookies': {
    image: catBanhImg,
    desc: 'Bánh cookies và bánh quy bơ thơm bùi giòn xốp, đạt tiêu chuẩn xuất khẩu sang các thị trường quốc tế.',
    featured: 'Bánh Cookies hạt cà phê',
    featuredDesc: 'Thơm lừng hương vị cà phê nguyên chất, giòn tan đậm đà khó cưỡng.',
  },
  'banh-cha': {
    image: catBanhImg,
    desc: 'Bánh chả truyền thống Hà Nội thơm hương lá chanh, mứt bí và thịt mỡ đường giòn bùi.',
    featured: 'Bánh chả hương vị cổ truyền',
    featuredDesc: 'Vị giòn rụm đậm đà khó quên, món quà ẩm thực truyền thống Việt Nam.',
  },
  'banh-dau-xanh': {
    image: catBanhImg,
    desc: 'Bánh đậu xanh ngọt thanh, thơm dịu tan ngay nơi đầu lưỡi từ đậu xanh nguyên chất hảo hạng.',
    featured: 'Bánh đậu xanh tươi',
    featuredDesc: 'Ngọt bùi thanh tao, thưởng thức trọn vẹn cùng chén trà sen ấm nóng.',
  },
}

/**
 * Danh mục mặc định (Đồng bộ chuẩn xác theo Cây danh mục Supabase Database)
 */
export const DEFAULT_DB_CATEGORIES = [
  // 3 Danh mục Gốc (Root Categories - parent_id: null)
  { id: '1e953d88-e338-4eba-baf7-246c25a70ba9', name: 'Đồ Ăn Vặt Cách Tân', slug: 'do-an-vat-cach-tan', parent_id: null, sort_order: 0 },
  { id: '299ff047-323a-4802-aef4-fdb93c8aa9ae', name: 'Đồ Ăn Vặt Hiện Đại', slug: 'do-an-vat-hien-dai', parent_id: null, sort_order: 1 },
  { id: 'f3209c71-5042-4492-baa7-3ca48e48b480', name: 'Đồ Ăn Vặt Truyền Thống', slug: 'do-an-vat-truyen-thong', parent_id: null, sort_order: 2 },

  // Danh mục Con của "Đồ Ăn Vặt Cách Tân"
  { id: '80bc73cb-630d-4e41-a693-160a97e8625d', name: 'Bánh Tráng Trộn', slug: 'banh-trang-tron', parent_id: '1e953d88-e338-4eba-baf7-246c25a70ba9', sort_order: 0 },
  { id: '62a1f64e-b304-4812-885d-5bc2bc2661c2', name: 'Bánh Tráng Sấy', slug: 'banh-trang-say', parent_id: '1e953d88-e338-4eba-baf7-246c25a70ba9', sort_order: 1 },
  { id: '9edbf52d-f370-44a3-928b-9543994330a7', name: 'Bánh Cookies', slug: 'banh-cookies', parent_id: '1e953d88-e338-4eba-baf7-246c25a70ba9', sort_order: 2 },
  { id: '4585f70d-2887-4dd0-9f9c-08efad2cc324', name: 'Bánh Sữa', slug: 'banh-sua', parent_id: '1e953d88-e338-4eba-baf7-246c25a70ba9', sort_order: 3 },
  { id: 'c6eb5d6e-afc8-4cac-87af-f5e114dd5424', name: 'Bánh Dẻo', slug: 'banh-deo', parent_id: '1e953d88-e338-4eba-baf7-246c25a70ba9', sort_order: 4 },
  { id: '47daa91e-063c-45c4-a686-598e551033d3', name: 'Thịt Khô', slug: 'thit-kho', parent_id: '1e953d88-e338-4eba-baf7-246c25a70ba9', sort_order: 5 },

  // Danh mục Con của "Đồ Ăn Vặt Hiện Đại"
  { id: '46d23453-12b5-46e8-b3af-74aca32d42bf', name: 'Bánh Chả', slug: 'banh-cha', parent_id: '299ff047-323a-4802-aef4-fdb93c8aa9ae', sort_order: 0 },

  // Danh mục Con của "Đồ Ăn Vặt Truyền Thống"
  { id: 'a6be5c29-23f8-443f-92c8-fd5124913ba2', name: 'Bắp Rang Bơ', slug: 'bap-rang-bo', parent_id: 'f3209c71-5042-4492-baa7-3ca48e48b480', sort_order: 0 },
  { id: '56b49304-66b3-4aed-bef0-a8d96cb652c0', name: 'Bánh Đậu xanh', slug: 'banh-dau-xanh', parent_id: 'f3209c71-5042-4492-baa7-3ca48e48b480', sort_order: 1 },
  { id: '1dc82d4c-80f9-4f45-8c39-a6e2a84261f6', name: 'Bánh Hạnh Nhân', slug: 'banh-hanh-nhan', parent_id: 'f3209c71-5042-4492-baa7-3ca48e48b480', sort_order: 2 },
]

/**
 * Xây dựng cây danh mục phân cấp (Parent - Children Tree) từ danh sách Database phẳng
 */
export function buildCategoryTree(rawCategories = []) {
  const cats = (Array.isArray(rawCategories) && rawCategories.length > 0)
    ? rawCategories.filter((c) => c && typeof c === 'object')
    : DEFAULT_DB_CATEGORIES

  // 1. Tạo node gốc "Tất cả sản phẩm"
  const allNode = {
    id: 'all',
    name: 'Tất cả sản phẩm',
    shortName: 'Tất cả',
    slug: 'all',
    parent_id: null,
    children: [],
    ...(CATEGORY_VISUALS['all'] || {}),
  }

  // 2. Tìm các root categories (parent_id === null hoặc undefined)
  const rootCats = cats
    .filter((c) => c && !c.parent_id)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((root) => {
      const visual = (root.slug && CATEGORY_VISUALS[root.slug]) || CATEGORY_VISUALS['all'] || {}
      // Tìm các con của root
      const children = cats
        .filter((c) => c && c.parent_id === root.id)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((child) => {
          const childVisual = (child.slug && CATEGORY_VISUALS[child.slug]) || visual || {}
          return {
            ...child,
            shortName: child.name || '',
            image: childVisual.image,
            desc: child.description || childVisual.desc || '',
            featured: childVisual.featured || '',
            featuredDesc: childVisual.featuredDesc || '',
          }
        })

      return {
        ...root,
        shortName: root.name || '',
        children,
        image: visual.image,
        desc: root.description || visual.desc || '',
        featured: visual.featured || '',
        featuredDesc: visual.featuredDesc || '',
      }
    })

  return [allNode, ...rootCats]
}

/**
 * Lấy tất cả category IDs (bao gồm cả con) thuộc về 1 slug hoặc ID
 */
export function getCategoryAndChildrenIds(categoryTree = [], targetSlugOrId) {
  if (!targetSlugOrId || targetSlugOrId === 'all' || !Array.isArray(categoryTree)) return null

  for (const root of categoryTree) {
    if (!root) continue
    if (root.slug === targetSlugOrId || root.id === targetSlugOrId) {
      const ids = [root.id]
      if (root.children && root.children.length > 0) {
        root.children.forEach((c) => c?.id && ids.push(c.id))
      }
      return ids
    }
    if (root.children && root.children.length > 0) {
      const child = root.children.find((c) => c && (c.slug === targetSlugOrId || c.id === targetSlugOrId))
      if (child) return [child.id]
    }
  }

  return [targetSlugOrId]
}

/**
 * Tìm category node theo slug (tìm trong cả root và children)
 */
export function findCategoryBySlug(categoryTree = [], slug) {
  const fallback = {
    id: 'all',
    name: 'Tất cả sản phẩm',
    shortName: 'Tất cả',
    slug: 'all',
    children: [],
    ...(CATEGORY_VISUALS['all'] || {}),
  }

  if (!Array.isArray(categoryTree) || categoryTree.length === 0) return fallback
  if (!slug || slug === 'all') return categoryTree[0] || fallback

  for (const root of categoryTree) {
    if (!root) continue
    if (root.slug === slug || root.id === slug) return root
    if (root.children && root.children.length > 0) {
      const child = root.children.find((c) => c && (c.slug === slug || c.id === slug))
      if (child) return child
    }
  }

  return categoryTree[0] || fallback
}

/**
 * Lọc danh sách sản phẩm theo Category Slug & Subcategory Slug từ DB
 */
export function filterProductsByDbCategory(products = [], activeSlug = 'all', subSlug = null, categoryTree = []) {
  if (!products || products.length === 0) return []
  if (!activeSlug || activeSlug === 'all') return products

  // Nếu có chọn sub-category cụ thể
  const effectiveSlug = subSlug || activeSlug
  const matchingIds = getCategoryAndChildrenIds(categoryTree, effectiveSlug)

  return products.filter((p) => {
    // 1. So khớp theo category_id từ DB
    if (matchingIds && p.category_id && matchingIds.includes(p.category_id)) return true

    // 2. So khớp theo relation categories.slug hoặc categories.id
    if (p.categories) {
      if (matchingIds && matchingIds.includes(p.categories.id)) return true
      if (p.categories.slug === effectiveSlug) return true
      if (effectiveSlug === 'do-an-vat-cach-tan' && ['banh-trang', 'banh-trang-say', 'banh-trang-say-gion', 'banh-trang-tron', 'bnh-trng-trn', 'banh-cookies', 'banh-sua', 'banh-deo', 'thit-kho', 'thot-kho'].includes(p.categories.slug)) return true
      if (effectiveSlug === 'do-an-vat-hien-dai' && ['banh-cha'].includes(p.categories.slug)) return true
      if (effectiveSlug === 'do-an-vat-truyen-thong' && ['bap-rang-bo', 'banh-dau-xanh', 'banh-dau-xanh-tuoi', 'banh-hanh-nhan'].includes(p.categories.slug)) return true
      if (effectiveSlug === 'banh-trang' && (p.categories.slug === 'banh-trang-say' || p.categories.slug === 'banh-trang-say-gion' || p.categories.slug === 'banh-trang-tron' || p.categories.slug === 'bnh-trng-trn')) return true
      if (effectiveSlug === 'cac-loai-banh' && (p.categories.slug === 'banh-dau-xanh' || p.categories.slug === 'banh-hanh-nhan' || p.categories.slug === 'banh-sua' || p.categories.slug === 'banh-deo' || p.categories.slug === 'banh-khac')) return true
    }

    // 3. Fallback theo chuỗi slug trực tiếp
    if (p.category === effectiveSlug) return true
    if (effectiveSlug === 'do-an-vat-cach-tan' && ['banh-trang', 'banh-trang-say', 'banh-trang-say-gion', 'banh-trang-tron', 'bnh-trng-trn', 'banh-cookies', 'banh-sua', 'banh-deo', 'thit-kho', 'thot-kho'].includes(p.category)) return true
    if (effectiveSlug === 'do-an-vat-hien-dai' && ['banh-cha'].includes(p.category)) return true
    if (effectiveSlug === 'do-an-vat-truyen-thong' && ['bap-rang-bo', 'banh-dau-xanh', 'banh-dau-xanh-tuoi', 'banh-hanh-nhan'].includes(p.category)) return true
    if (effectiveSlug === 'banh-trang' && (p.category === 'banh-trang-say' || p.category === 'banh-trang-say-gion' || p.category === 'banh-trang-tron' || p.category === 'bnh-trng-trn')) return true
    if (effectiveSlug === 'cac-loai-banh' && (p.category === 'banh-dau-xanh' || p.category === 'banh-hanh-nhan' || p.category === 'banh-sua' || p.category === 'banh-deo' || p.category === 'banh-khac')) return true

    // 4. Fallback theo tên sản phẩm chính xác
    const nameLower = (p.name || '').toLowerCase()
    if ((effectiveSlug === 'banh-trang-say' || effectiveSlug === 'banh-trang-say-gion') && (nameLower.includes('sấy') || nameLower.includes('bánh tráng sấy'))) return true
    if ((effectiveSlug === 'banh-trang-tron' || effectiveSlug === 'bnh-trng-trn') && (nameLower.includes('trộn') || nameLower.includes('sa tế') || nameLower.includes('gà lá chanh'))) return true
    if (effectiveSlug === 'banh-trang' && nameLower.includes('bánh tráng')) return true
    if (effectiveSlug === 'bap-rang-bo' && nameLower.includes('bắp')) return true
    if ((effectiveSlug === 'thot-kho' || effectiveSlug === 'thit-kho') && (nameLower.includes('thịt') || nameLower.includes('khô'))) return true
    if (effectiveSlug === 'banh-hanh-nhan' && nameLower.includes('hạnh nhân')) return true
    if ((effectiveSlug === 'banh-dau-xanh' || effectiveSlug === 'banh-dau-xanh-tuoi') && (nameLower.includes('đậu xanh') || nameLower.includes('dau xanh'))) return true
    if (effectiveSlug === 'banh-sua' && (nameLower.includes('sữa dừa') || nameLower.includes('bánh sữa'))) return true
    if (effectiveSlug === 'banh-deo' && nameLower.includes('dẻo')) return true
    if (effectiveSlug === 'banh-cha' && (nameLower.includes('bánh chả') || nameLower.includes('banh cha'))) return true
    if (effectiveSlug === 'banh-cookies' && (nameLower.includes('cookie') || nameLower.includes('bánh quy'))) return true
    if (effectiveSlug === 'cac-loai-banh' && (nameLower.includes('hạnh nhân') || nameLower.includes('đậu xanh') || nameLower.includes('sữa dừa') || nameLower.includes('bánh dẻo') || nameLower.includes('bánh chả') || nameLower.includes('cookie'))) return true

    return false
  })
}

export const PRODUCT_CATEGORIES = buildCategoryTree(DEFAULT_DB_CATEGORIES)
export function getCategoryBySlug(slug) {
  return findCategoryBySlug(PRODUCT_CATEGORIES, slug)
}
export function filterProductsByCategory(products = [], categorySlug = 'all') {
  return filterProductsByDbCategory(products, categorySlug, null, PRODUCT_CATEGORIES)
}
