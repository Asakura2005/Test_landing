import catAllImg from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catDoAnVatImg from '../assets/categories/category_do_an_vat.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'

// Local product image assets
import banhTrangSayTomImg from '../assets/products/banh_trang_say_tom_50g.jpg'
import banhTrangSayBoImg from '../assets/products/banh_trang_say_bo_50g.jpg'
import banhTrangSayChaBongImg from '../assets/products/banh_trang_say_cha_bong_50g.jpg'
import banhTrangCuonGaImg from '../assets/products/banh_trang_cuon_ga_la_chanh_100g.jpg'
import banhTrangSaTeTomImg from '../assets/products/banh_trang_soi_sa_te_tom_100g.jpg'
import banhHanhNhanImg from '../assets/products/banh_hanh_nhan_truyen_thong_130g.jpg'
import banhHanhNhanTraXanhImg from '../assets/products/banh_hanh_nhan_tra_xanh_130g.jpg'
import banhDauXanhImg from '../assets/products/banh_dau_xanh_tuoi_250g.jpg'
import banhDauXanhLaDuaImg from '../assets/products/banh_dau_xanh_la_dua_250g.jpg'
import banhDauXanhMixViImg from '../assets/products/banh_dau_xanh_mix_vi_250g.jpg'
import banhSuaDuaImg from '../assets/products/banh_sua_dua_130g.jpg'

export const PRODUCT_IMAGE_MAP = {
  'banh-trang-say-gion-vi-tom': banhTrangSayTomImg,
  'Banh-trang-say-gion-vi-tom': banhTrangSayTomImg,
  'banh-trang-say-bo-50g': banhTrangSayBoImg,
  'banh-trang-say-gion-vi-bo': banhTrangSayBoImg,
  'banh-trang-say-cha-bong-50g': banhTrangSayChaBongImg,
  'Banh-trang-say-gion-vi-tra-bong': banhTrangSayChaBongImg,
  'banh-trang-say-gion-vi-tra-bong': banhTrangSayChaBongImg,
  'banh-trang-tron-ga-la-chanh': banhTrangCuonGaImg,
  'banh-trang-tron-sa-te-tom': banhTrangSaTeTomImg,
  'banh-trang-tron-haq': banhTrangSaTeTomImg,
  'banh-dau-xanh-vi-la-dua': banhDauXanhLaDuaImg,
  'banh-dau-xanh-tuoi-mix-vi': banhDauXanhMixViImg,
  'banh-dau-xanh-tuoi': banhDauXanhImg,
  'banh-dau-xanh-tuoi-250g': banhDauXanhImg,
  'banh-dau-xanh-truyen-thong': banhDauXanhImg,
  'banh-hanh-nhan-truyen-thong-130g': banhHanhNhanImg,
  'banh-hanh-nhan-cao-cap': banhHanhNhanImg,
  'banh-hanh-nhan-tra-xanh-130g': banhHanhNhanTraXanhImg,
  'banh-sua-dua-130g': banhSuaDuaImg,
  'bap-rang-bo-caramel': catDoAnVatImg,
  'bap-rang-bo-pho-mai': catDoAnVatImg,
  'thit-bo-kho-hao-hang': catDoAnKhoImg,
  'thit-heo-kho-chay-toi': catDoAnKhoImg,
}

/**
 * Hàm giải quyết ảnh sản phẩm an toàn và fallback nhiều cấp
 */
export function resolveProductImage(product, categorySlug = null) {
  if (!product) return catAllImg
  if (product.slug && PRODUCT_IMAGE_MAP[product.slug]) {
    return PRODUCT_IMAGE_MAP[product.slug]
  }
  if (product.image_url && typeof product.image_url === 'string' && product.image_url.startsWith('http')) {
    return product.image_url
  }
  if (product.images && product.images[0] && typeof product.images[0] === 'string' && product.images[0].startsWith('http')) {
    return product.images[0]
  }
  if (product.image && typeof product.image === 'string' && product.image.startsWith('http')) {
    return product.image
  }
  if (categorySlug && CATEGORY_VISUALS[categorySlug]?.image) {
    return CATEGORY_VISUALS[categorySlug].image
  }
  if (product.categories?.slug && CATEGORY_VISUALS[product.categories.slug]?.image) {
    return CATEGORY_VISUALS[product.categories.slug].image
  }
  return catBanhTrangImg
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
    featuredDesc: 'Bánh nướng giòn tan bùi thơm hạt hạnh nhân tự nhiên, đạt chuẩn ISO 22000.',
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
    desc: 'Các dòng bánh nướng và bánh ngọt đa dạng của HAQ FOOD.',
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
}

/**
 * Danh mục mặc định (Fallback khi chưa tải được từ DB)
 */
export const DEFAULT_DB_CATEGORIES = [
  { id: '01bdfbc2-bc45-4f8b-aba0-e4d47fe70966', name: 'Bánh Tráng', slug: 'banh-trang', parent_id: null, sort_order: 0 },
  { id: '89affdd7-e480-4a0d-8db1-b15e8d619df9', name: 'Bánh tráng sấy', slug: 'banh-trang-say', parent_id: '01bdfbc2-bc45-4f8b-aba0-e4d47fe70966', sort_order: 0 },
  { id: 'd0feed03-78e6-4325-86a1-b27a9411c205', name: 'Bánh Tráng trộn', slug: 'banh-trang-tron', parent_id: '01bdfbc2-bc45-4f8b-aba0-e4d47fe70966', sort_order: 1 },
  { id: '69b66cf7-e253-44d1-9037-cb6d6fe7dfb6', name: 'Bắp Rang Bơ', slug: 'bap-rang-bo', parent_id: null, sort_order: 1 },
  { id: '7b16741d-a09a-485b-9242-ecb1132eb146', name: 'Bánh Hạnh Nhân', slug: 'banh-hanh-nhan', parent_id: null, sort_order: 2 },
  { id: '23901975-7129-4130-9a54-d7d6e4bc7532', name: 'Bánh Sữa', slug: 'banh-sua', parent_id: null, sort_order: 3 },
  { id: 'a5f914f4-da3f-4afa-9e44-5b1192465c71', name: 'Bánh Dẻo', slug: 'banh-deo', parent_id: null, sort_order: 4 },
  { id: 'aea0547a-4522-4af9-9adc-9ccfb4ad5619', name: 'Bánh Khác', slug: 'banh-khac', parent_id: null, sort_order: 5 },
  { id: 'e77a7f3a-48db-4777-82d8-60ff6f2a1ac5', name: 'Thịt khô', slug: 'thot-kho', parent_id: null, sort_order: 6 },
]

/**
 * Xây dựng cây danh mục phân cấp (Parent - Children Tree) từ danh sách Database phẳng
 */
export function buildCategoryTree(rawCategories = []) {
  const cats = (rawCategories && rawCategories.length > 0) ? rawCategories : DEFAULT_DB_CATEGORIES

  // 1. Tạo node gốc "Tất cả sản phẩm"
  const allNode = {
    id: 'all',
    name: 'Tất cả sản phẩm',
    shortName: 'Tất cả',
    slug: 'all',
    parent_id: null,
    children: [],
    ...CATEGORY_VISUALS['all'],
  }

  // 2. Tìm các root categories (parent_id === null hoặc undefined)
  const rootCats = cats
    .filter((c) => !c.parent_id)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((root) => {
      const visual = CATEGORY_VISUALS[root.slug] || CATEGORY_VISUALS['all']
      // Tìm các con của root
      const children = cats
        .filter((c) => c.parent_id === root.id)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((child) => {
          const childVisual = CATEGORY_VISUALS[child.slug] || visual
          return {
            ...child,
            shortName: child.name,
            image: childVisual.image,
            desc: child.description || childVisual.desc,
            featured: childVisual.featured,
            featuredDesc: childVisual.featuredDesc,
          }
        })

      return {
        ...root,
        shortName: root.name,
        children,
        image: visual.image,
        desc: root.description || visual.desc,
        featured: visual.featured,
        featuredDesc: visual.featuredDesc,
      }
    })

  return [allNode, ...rootCats]
}

/**
 * Lấy tất cả category IDs (bao gồm cả con) thuộc về 1 slug hoặc ID
 */
export function getCategoryAndChildrenIds(categoryTree, targetSlugOrId) {
  if (!targetSlugOrId || targetSlugOrId === 'all') return null

  for (const root of categoryTree) {
    if (root.slug === targetSlugOrId || root.id === targetSlugOrId) {
      const ids = [root.id]
      if (root.children && root.children.length > 0) {
        root.children.forEach((c) => ids.push(c.id))
      }
      return ids
    }
    if (root.children && root.children.length > 0) {
      const child = root.children.find((c) => c.slug === targetSlugOrId || c.id === targetSlugOrId)
      if (child) return [child.id]
    }
  }

  return [targetSlugOrId]
}

/**
 * Tìm category node theo slug (tìm trong cả root và children)
 */
export function findCategoryBySlug(categoryTree, slug) {
  if (!slug || slug === 'all') return categoryTree[0]

  for (const root of categoryTree) {
    if (root.slug === slug || root.id === slug) return root
    if (root.children && root.children.length > 0) {
      const child = root.children.find((c) => c.slug === slug || c.id === slug)
      if (child) return child
    }
  }

  return categoryTree[0]
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
      if (effectiveSlug === 'banh-trang' && (p.categories.slug === 'banh-trang-say' || p.categories.slug === 'banh-trang-say-gion' || p.categories.slug === 'banh-trang-tron' || p.categories.slug === 'bnh-trng-trn')) return true
      if (effectiveSlug === 'cac-loai-banh' && (p.categories.slug === 'banh-dau-xanh' || p.categories.slug === 'banh-hanh-nhan' || p.categories.slug === 'banh-sua' || p.categories.slug === 'banh-deo' || p.categories.slug === 'banh-khac')) return true
    }

    // 3. Fallback theo chuỗi slug trực tiếp
    if (p.category === effectiveSlug) return true
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
    if (effectiveSlug === 'cac-loai-banh' && (nameLower.includes('hạnh nhân') || nameLower.includes('đậu xanh') || nameLower.includes('sữa dừa') || nameLower.includes('bánh dẻo'))) return true

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
