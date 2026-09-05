/**
 * HAQ FOOD — Client-Side Database Localization Engine
 * Tự động chuyển đổi dữ liệu thực thể lấy từ Supabase (Sản phẩm, Danh mục, Biến thể, Tỉnh thành)
 * sang Tiếng Anh ('en') hoặc Tiếng Hàn ('ko').
 */

// =============================================================================
// 1. TỪ ĐIỂN BẢN ĐỊA HÓA DANH MỤC (CATEGORIES)
// =============================================================================
export const CATEGORY_I18N = {
  'all': {
    en: {
      name: 'All Products',
      shortName: 'All',
      desc: 'Comprehensive catalog of premium packaged foods and Vietnamese specialties by HAQ FOOD.',
      featured: 'HAQ Signature Mixed Rice Paper',
      featuredDesc: 'Flagship product produced on an automated convective drying line with ISO 22000 & HACCP standards.',
    },
    ko: {
      name: '전체 제품',
      shortName: '전체',
      desc: 'HAQ FOOD의 프리미엄 가공식품 및 베트남 특산 스낵 전체 카탈로그.',
      featured: 'HAQ 대표 비빔 라이스페이퍼',
      featuredDesc: 'ISO 22000 및 HACCP 인증 자동 대류 열풍 건조 라인에서 생산되는 대표 상품.',
    },
  },
  'banh-trang': {
    en: {
      name: 'Rice Paper Snacks',
      shortName: 'Rice Paper',
      desc: 'Crispy baked rice paper (beef, shrimp, cheese) and traditional mixed rice paper.',
      featured: 'HAQ Mixed Rice Paper',
      featuredDesc: 'Automated drying technology infused with shrimp and beef seasonings.',
    },
    ko: {
      name: '라이스페이퍼 제품군',
      shortName: '라이스페이퍼',
      desc: '바삭한 구운 라이스페이퍼(소고기, 새우, 치즈) 및 정통 비빔 라이스페이퍼.',
      featured: 'HAQ 비빔 라이스페이퍼',
      featuredDesc: '자동화 건조 기술과 새우, 소고기 시즈닝의 완벽한 조화.',
    },
  },
  'banh-trang-say': {
    en: {
      name: 'Crispy Baked Rice Paper',
      shortName: 'Baked Rice Paper',
      desc: 'Ultra-crispy baked rice paper with modern convective drying in beef, shrimp, pork floss.',
      featured: 'Crispy Baked Rice Paper (Shrimp)',
      featuredDesc: 'Naturally seasoned with sea shrimp, meeting ISO 22000 & HACCP standards.',
    },
    ko: {
      name: '바삭 구운 라이스페이퍼',
      shortName: '구운 라이스페이퍼',
      desc: '현대식 대류 열풍 건조 기술로 바삭하게 구워낸 소고기, 새우, 포크플로스 맛.',
      featured: '바삭 구운 라이스페이퍼 (새우맛)',
      featuredDesc: '천연 새우의 풍미를 담아 ISO 22000 및 HACCP 기준을 충족.',
    },
  },
  'banh-trang-say-gion': {
    en: {
      name: 'Crispy Baked Rice Paper',
      shortName: 'Baked Rice Paper',
      desc: 'Ultra-crispy baked rice paper with modern convective drying in beef, shrimp, pork floss.',
      featured: 'Crispy Baked Rice Paper (Shrimp)',
      featuredDesc: 'Naturally seasoned with sea shrimp, meeting ISO 22000 & HACCP standards.',
    },
    ko: {
      name: '바삭 구운 라이스페이퍼',
      shortName: '구운 라이스페이퍼',
      desc: '현대식 대류 열풍 건조 기술로 바삭하게 구워낸 소고기, 새우, 포크플로스 맛.',
      featured: '바삭 구운 라이스페이퍼 (새우맛)',
      featuredDesc: '천연 새우의 풍미를 담아 ISO 22000 및 HACCP 기준을 충족.',
    },
  },
  'banh-trang-tron': {
    en: {
      name: 'Seasoned Mixed Rice Paper',
      shortName: 'Mixed Rice Paper',
      desc: 'Shredded and rolled rice paper snacks with chicken lemongrass and spicy shrimp sate.',
      featured: 'Rolled Rice Paper with Chicken & Lime Leaf',
      featuredDesc: 'Chewy rice paper strips combined with spicy dried chicken and fresh kaffir lime.',
    },
    ko: {
      name: '양념 비빔 라이스페이퍼',
      shortName: '비빔 라이스페이퍼',
      desc: '특제 양념과 치킨 레몬그라스, 새우 사테 풍미의 라이스페이퍼 스낵.',
      featured: '치킨 라임잎 롤 라이스페이퍼',
      featuredDesc: '쫄깃한 라이스페이퍼와 매콤한 닭가슴살, 상큼한 라임잎의 환상적인 조합.',
    },
  },
  // DB typo alias
  'bnh-trng-trn': {
    en: {
      name: 'Seasoned Mixed Rice Paper',
      shortName: 'Mixed Rice Paper',
      desc: 'Shredded and rolled rice paper snacks with chicken lemongrass and spicy shrimp sate.',
      featured: 'Rolled Rice Paper with Chicken & Lime Leaf',
      featuredDesc: 'Chewy rice paper strips combined with spicy dried chicken and fresh kaffir lime.',
    },
    ko: {
      name: '양념 비빔 라이스페이퍼',
      shortName: '비빔 라이스페이퍼',
      desc: '특제 양념과 치킨 레몬그라스, 새우 사테 풍미의 라이스페이퍼 스낵.',
      featured: '치킨 라임잎 롤 라이스페이퍼',
      featuredDesc: '쫄깃한 라이스페이퍼와 매콤한 닭가슴살, 상큼한 라임잎의 환상적인 조합.',
    },
  },
  'cac-loai-banh': {
    en: {
      name: 'Traditional Pastries & Cakes',
      shortName: 'Pastries & Cakes',
      desc: 'Traditional Vietnamese fresh mung bean cakes, almond cookies, and coconut pastries.',
      featured: 'Fresh Mung Bean Cakes',
      featuredDesc: 'Melt-in-your-mouth traditional delicacy with pure natural ingredients.',
    },
    ko: {
      name: '전통 제과 및 케이크',
      shortName: '전통 제과',
      desc: '베트남 전통 녹두 케이크, 아몬드 비스킷 및 코코넛 특산 과자.',
      featured: '프레시 녹두 케이크',
      featuredDesc: '입안에서 부드럽게 녹아내리는 순수 천연 원료의 전통 특산 디저트.',
    },
  },
  'banh-dau-xanh': {
    en: {
      name: 'Mung Bean Cakes',
      shortName: 'Mung Bean',
      desc: 'Famous Hai Duong traditional mung bean cakes in fresh, pandan, and assorted flavors.',
      featured: 'Fresh Mung Bean Cake 250g',
      featuredDesc: 'Centuries-old recipe, melts smoothly in your mouth with delicate sweetness.',
    },
    ko: {
      name: '녹두 케이크',
      shortName: '녹두 과자',
      desc: '유서 깊은 하이즈엉 전통 신선 녹두, 판단잎 및 모듬 풍미 케이크.',
      featured: '프레시 녹두 케이크 250g',
      featuredDesc: '수백 년 전통 하이즈엉 레시피의 은은한 단맛.',
    },
  },
  'bap-rang-bo': {
    en: {
      name: 'Gourmet Popcorn',
      shortName: 'Popcorn',
      desc: 'High-expansion popped corn coated with rich caramel butter and savory cheese.',
      featured: 'Caramel Butter Popcorn',
      featuredDesc: 'Evenly popped kernels glazed with sweet rich caramel crunch.',
    },
    ko: {
      name: '프리미엄 팝콘',
      shortName: '팝콘',
      desc: '풍부한 카라멜 버터와 치즈 시즈닝을 입힌 바삭한 프리미엄 팝콘.',
      featured: '카라멜 버터 팝콘',
      featuredDesc: '알맞게 터진 옥수수에 달콤한 카라멜 코팅을 입힌 스낵.',
    },
  },
  'banh-hanh-nhan': {
    en: {
      name: 'Almond Pastries',
      shortName: 'Almond Pastries',
      desc: 'Premium buttery and flaky almond biscuits meeting export standards for Asian markets.',
      featured: 'Traditional Almond Pastry',
      featuredDesc: 'Golden crispy texture with fragrant roasted sliced almonds.',
    },
    ko: {
      name: '아몬드 페이스트리',
      shortName: '아몬드 과자',
      desc: '고소한 풍미와 바삭한 식감으로 아시아 시장 수출 기준을 충족하는 프리미엄 비스킷.',
      featured: '전통 아몬드 페이스트리',
      featuredDesc: '슬라이스 아몬드의 고소함과 바삭한 크리스피 식감.',
    },
  },
  'banh-sua': {
    en: {
      name: 'Milk & Coconut Pastries',
      shortName: 'Milk Cakes',
      desc: 'Coconut milk and soy milk cakes with delicate natural sweetness from traditional recipes.',
      featured: 'Ben Tre Coconut Milk Cake',
      featuredDesc: 'Creamy coconut aroma crafted from pure Mekong Delta coconut milk.',
    },
    ko: {
      name: '코코넛 밀크 케이크',
      shortName: '밀크 과자',
      desc: '코코넛 밀크와 콩의 부드럽고 은은한 단맛을 담아낸 전통 특산 과자.',
      featured: '벤째 코코넛 밀크 케이크',
      featuredDesc: '메콩델타산 순수 코코넛 밀크로 빚어낸 진한 코코넛 풍미.',
    },
  },
  'banh-deo': {
    en: {
      name: 'Mung Bean & Sticky Cakes',
      shortName: 'Mung Bean',
      desc: 'Fresh mung bean cakes and soft traditional pastries preserving pure authentic taste.',
      featured: 'Fresh Mung Bean Cake 250g',
      featuredDesc: 'Centuries-old recipe, melts smoothly in your mouth with delicate sweetness.',
    },
    ko: {
      name: '녹두떡 & 전통 과자',
      shortName: '녹두 과자',
      desc: '신선한 녹두와 순수 원재료로 만들어 본연의 담백한 맛을 살린 베트남 전통 과자.',
      featured: '프레시 녹두 케이크 250g',
      featuredDesc: '입안에서 부드럽게 녹아내리는 은은한 단맛의 베트남 전통 특산품.',
    },
  },
  'banh-khac': {
    en: {
      name: 'Specialty Confectionery',
      shortName: 'Specialties',
      desc: 'Selected artisan confectionery from traditional Vietnamese craft villages.',
      featured: 'Assorted Traditional Pastries',
      featuredDesc: 'Crafted with passion, preserving cultural identity and food safety.',
    },
    ko: {
      name: '전통 특산 제과',
      shortName: '특산 제과',
      desc: '베트남 전통 명가에서 엄선한 장인 정신의 전통 제과 라인업.',
      featured: '모듬 전통 특산 과자',
      featuredDesc: '위생적인 공정으로 전통의 맛과 식품 안전을 동시에 만족.',
    },
  },
  'thit-kho': {
    en: {
      name: 'Dried Jerky & Meat Snacks',
      shortName: 'Jerky',
      desc: 'Premium dried beef and pork jerky infused with natural spices under strict QC.',
      featured: 'Premium Spiced Beef Jerky',
      featuredDesc: 'Tender lean beef marinated in lemongrass, chili and traditional spices.',
    },
    ko: {
      name: '프리미엄 육포 & 건조육',
      shortName: '육포',
      desc: '엄격한 위생 검수 하에 천연 향신료로 풍미를 더한 프리미엄 소고기 및 돼지고기 육포.',
      featured: '프리미엄 소고기 육포',
      featuredDesc: '레몬그라스와 고추 등 천연 향신료를 재워 정성껏 말린 고급 육포.',
    },
  },
  'thot-kho': {
    en: {
      name: 'Dried Jerky & Meat Snacks',
      shortName: 'Jerky',
      desc: 'Premium dried beef and pork jerky infused with natural spices under strict QC.',
      featured: 'Premium Spiced Beef Jerky',
      featuredDesc: 'Tender lean beef marinated in lemongrass, chili and traditional spices.',
    },
    ko: {
      name: '프리미엄 육포 & 건조육',
      shortName: '육포',
      desc: '엄격한 위생 검수 하에 천연 향신료로 풍미를 더한 프리미엄 소고기 및 돼지고기 육포.',
      featured: '프리미엄 소고기 육포',
      featuredDesc: '레몬그라스와 고추 등 천연 향신료를 재워 정성껏 말린 고급 육포.',
    },
  },
}

// =============================================================================
// 2. TỪ ĐIỂN BẢN ĐỊA HÓA SẢN PHẨM (PRODUCTS)
// Khớp chính xác toàn bộ 8 sản phẩm thực tế từ Supabase Database
// =============================================================================
export const PRODUCT_I18N = {
  // ---------------------------------------------------------------------------
  // 1. HOKI - Bánh tráng sấy giòn vị chà bông (DB slug: Banh-trang-say-gion-vi-tra-bong)
  // ---------------------------------------------------------------------------
  'banh-trang-say-gion-vi-tra-bong': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Pork Floss Flavor)',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (포크플로스맛)',
    },
  },

  // ---------------------------------------------------------------------------
  // 2. HOKI - Bánh tráng sấy giòn vị bò (DB slug: banh-trang-say-gion-vi-bo)
  // ---------------------------------------------------------------------------
  'banh-trang-say-gion-vi-bo': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Beef Flavor)',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (소고기맛)',
    },
  },

  // ---------------------------------------------------------------------------
  // 3. HOKI - Bánh tráng sấy giòn vị tôm (DB slug: Banh-trang-say-gion-vi-tom)
  // ---------------------------------------------------------------------------
  'banh-trang-say-gion-vi-tom': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Shrimp Flavor)',
      desc: 'Crispy and fragrant baked rice paper infused with rich shrimp flavor and signature seasonings, offering a harmonious salty-sweet taste. Each crunchy bite is full of shrimp flavor, making it a convenient snack for any moment.',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (새우맛)',
      desc: '바삭하고 고소하게 구워낸 라이스페이퍼에 진한 새우 맛과 특제 양념이 어우러져 조화로운 단짠의 풍미를 선사합니다. 한입 베어 물면 바삭한 식감과 진한 새우 풍미가 가득해 언제 어디서나 즐기기 좋은 간식입니다.',
    },
  },

  // ---------------------------------------------------------------------------
  // 4. HOKI - Bánh tráng trộn gà lá chanh (DB slug: banh-trang-tron-ga-la-chanh)
  // ---------------------------------------------------------------------------
  'banh-trang-tron-ga-la-chanh': {
    en: {
      name: 'HOKI - Mixed Rice Paper with Chicken & Lime Leaves',
      desc: 'Soft and chewy rice paper blended with savory chicken, julienned lime leaves, fried shallots, and signature seasonings. Mildly spicy with a harmonious salty-sweet balance and subtle lime aroma, creating a flavorful and irresistible snack.',
    },
    ko: {
      name: 'HOKI - 치킨 라임잎 비빔 라이스페이퍼',
      desc: '부드럽고 쫄깃한 라이스페이퍼에 맛있는 닭고기, 얇게 썬 라임잎, 튀긴 샬롯과 특제 양념이 어우러져 있습니다. 은은한 매콤함과 조화로운 단짠, 향긋한 라임잎 향이 어우러져 자꾸만 손이 가는 매력적인 간식입니다.',
    },
  },

  // ---------------------------------------------------------------------------
  // 5. HOKI - Bánh tráng trộn sợi sa tế tôm (DB slug: banh-trang-tron-sa-te-tom)
  // ---------------------------------------------------------------------------
  'banh-trang-tron-sa-te-tom': {
    en: {
      name: 'HOKI - Shredded Rice Paper with Shrimp Satay',
      desc: 'Soft and chewy shredded rice paper combined with rich, spicy and aromatic shrimp satay, blended with fried shallots and signature seasonings. Well-balanced salty-sweet taste with a kick of heat and distinct shrimp aroma, making it an addictive, delicious snack.',
    },
    ko: {
      name: 'HOKI - 새우 사테 비빔 라이스페이퍼',
      desc: '쫄깃하고 부드러운 채 썬 라이스페이퍼에 진하고 매콤한 새우 사테, 바삭한 샬롯과 특제 양념이 어우러져 있습니다. 적당한 단짠의 조화와 매콤한 맛, 특유 của 새우 풍미가 어우러져 먹을수록 당기는 맛있는 간식입니다.',
    },
  },

  // ---------------------------------------------------------------------------
  // 6. Bánh đậu xanh vị lá dứa (DB slug: banh-dau-xanh-vi-la-dua)
  // ---------------------------------------------------------------------------
  'banh-dau-xanh-vi-la-dua': {
    en: {
      name: 'Mung Bean Cake with Pandan Flavor',
    },
    ko: {
      name: '판단잎 녹두 케이크',
    },
  },

  // ---------------------------------------------------------------------------
  // 7. Bánh đậu xanh tươi mix vị (DB slug: banh-dau-xanh-tuoi-mix-vi)
  // ---------------------------------------------------------------------------
  'banh-dau-xanh-tuoi-mix-vi': {
    en: {
      name: 'Fresh Mung Bean Cake (Assorted Flavors)',
    },
    ko: {
      name: '모듬 신선 녹두 케이크',
    },
  },

  // ---------------------------------------------------------------------------
  // 8. Bánh đậu xanh tươi (DB slug: banh-dau-xanh-tuoi)
  // ---------------------------------------------------------------------------
  'banh-dau-xanh-tuoi': {
    en: {
      name: 'Fresh Mung Bean Cake',
    },
    ko: {
      name: '신선 녹두 케이크',
    },
  },
}

// Map các biến thể slug về canonical key trong PRODUCT_I18N
export const PRODUCT_SLUG_ALIASES = {
  // Chà bông
  'banh-trang-say-gion-vi-tra-bong': 'banh-trang-say-gion-vi-tra-bong',
  'banh-trang-say-cha-bong-50g': 'banh-trang-say-gion-vi-tra-bong',
  'banh-trang-say-cha-bong': 'banh-trang-say-gion-vi-tra-bong',
  'banh-trang-say-gion-vi-cha-bong': 'banh-trang-say-gion-vi-tra-bong',

  // Bò
  'banh-trang-say-gion-vi-bo': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-bo-50g': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-bo': 'banh-trang-say-gion-vi-bo',

  // Tôm
  'banh-trang-say-gion-vi-tom': 'banh-trang-say-gion-vi-tom',
  'banh-trang-say-tom-50g': 'banh-trang-say-gion-vi-tom',
  'banh-trang-say-tom': 'banh-trang-say-gion-vi-tom',

  // Gà lá chanh
  'banh-trang-tron-ga-la-chanh': 'banh-trang-tron-ga-la-chanh',
  'banh-trang-cuon-ga-la-chanh-100g': 'banh-trang-tron-ga-la-chanh',
  'banh-trang-cuon-ga': 'banh-trang-tron-ga-la-chanh',

  // Sa tế tôm
  'banh-trang-tron-sa-te-tom': 'banh-trang-tron-sa-te-tom',
  'banh-trang-soi-sa-te-tom-100g': 'banh-trang-tron-sa-te-tom',
  'banh-trang-tron-haq': 'banh-trang-tron-sa-te-tom',

  // Đậu xanh lá dứa
  'banh-dau-xanh-vi-la-dua': 'banh-dau-xanh-vi-la-dua',
  'banh-dau-xanh-la-dua': 'banh-dau-xanh-vi-la-dua',
  'banh-dau-xanh-tuoi-vi-la-dua-250g': 'banh-dau-xanh-vi-la-dua',
  'banh-dau-xanh-la-dua-110g': 'banh-dau-xanh-vi-la-dua',

  // Đậu xanh mix vị
  'banh-dau-xanh-tuoi-mix-vi': 'banh-dau-xanh-tuoi-mix-vi',
  'banh-dau-xanh-mix-vi': 'banh-dau-xanh-tuoi-mix-vi',
  'banh-dau-xanh-tuoi-mix-vi-250g': 'banh-dau-xanh-tuoi-mix-vi',

  // Đậu xanh tươi
  'banh-dau-xanh-tuoi': 'banh-dau-xanh-tuoi',
  'banh-dau-xanh-tuoi-250g': 'banh-dau-xanh-tuoi',
  'banh-dau-xanh-tuoi-110g': 'banh-dau-xanh-tuoi',
  'banh-dau-xanh-truyen-thong': 'banh-dau-xanh-tuoi',
}

// =============================================================================
// 3. TỪ ĐIỂN DỊCH HIGHLIGHTS & VARIANTS
// Dịch 1:1 trung thực các tags/highlights thực tế trong Supabase
// =============================================================================
export const HIGHLIGHT_TRANSLATIONS = {
  'bánh tráng sấy': { en: 'Baked rice paper', ko: '구운 라이스페이퍼' },
  'bánh tráng': { en: 'Rice paper', ko: '라이스페이퍼' },
  'bánh tráng trộn': { en: 'Mixed rice paper', ko: '비빔 라이스페이퍼' },
  'bánh đậu xanh': { en: 'Mung bean cake', ko: '녹두 케이크' },
  'vị chà bông': { en: 'Pork floss flavor', ko: '포크플로스맛' },
  'vị bò': { en: 'Beef flavor', ko: '소고기맛' },
  'vị tôm': { en: 'Shrimp flavor', ko: '새우맛' },
  'vị gà lá chanh': { en: 'Chicken & lime leaves flavor', ko: '치킨 라임잎맛' },
  'vị sa tế tôm': { en: 'Shrimp satay flavor', ko: '새우 사테맛' },
  'vị lá dứa': { en: 'Pandan flavor', ko: '판단잎맛' },
  'mix vị': { en: 'Assorted flavors', ko: '모듬 풍미' },
  'đậu xanh tươi': { en: 'Fresh mung beans', ko: '신선 녹두' },
  'best seller': { en: 'Best Seller', ko: '베스트셀러' },
}

export function translateHighlight(hl, language = 'vi') {
  if (!hl || language === 'vi') return hl
  const normalized = hl.trim().toLowerCase()
  const match = HIGHLIGHT_TRANSLATIONS[normalized]
  if (match && match[language]) return match[language]
  return hl
}

export const PACKAGING_TRANSLATIONS = {
  'hũ nhựa': { en: 'Plastic Jar', ko: '플라스틱 용기' },
  'hũ Nhựa': { en: 'Plastic Jar', ko: '플라스틱 용기' },
  'túi zip đáy đứng': { en: 'Stand-up Zip Pouch', ko: '스탠드 지퍼백' },
  'túi zip': { en: 'Zip Pouch', ko: '지퍼백' },
  'hộp nhựa': { en: 'Plastic Box', ko: '플라스틱 박스' },
  'hộp nhựa tròn': { en: 'Round Plastic Container', ko: '원형 플라스틱 케이스' },
  'hộp giấy': { en: 'Paper Gift Box', ko: '종이 선물 상자' },
  'thùng carton': { en: 'Master Carton', ko: '카톤 박스' },
}

export const SHELF_LIFE_TRANSLATIONS = {
  '6 tháng': { en: '6 months', ko: '6개월' },
  '6 tháng ': { en: '6 months', ko: '6개월' },
  '6': { en: '6 months', ko: '6개월' },
  '1 tháng': { en: '1 month', ko: '1개월' },
  '1 tháng ': { en: '1 month', ko: '1개월' },
  '1': { en: '1 month', ko: '1개월' },
  '9 tháng': { en: '9 months', ko: '9개월' },
  '12 tháng': { en: '12 months', ko: '12개월' },
}

export function translateVariantPack(pack, language = 'vi') {
  if (!pack || language === 'vi') return pack
  const normalized = pack.trim().toLowerCase()
  const match = PACKAGING_TRANSLATIONS[normalized]
  if (match && match[language]) return match[language]
  return pack
}

export function translateVariantShelf(shelf, language = 'vi') {
  if (!shelf || language === 'vi') return shelf
  const normalized = shelf.trim().toLowerCase()
  const match = SHELF_LIFE_TRANSLATIONS[normalized]
  if (match && match[language]) return match[language]
  return shelf
}

// =============================================================================
// 4. TỪ ĐIỂN BẢN ĐỊA HÓA TỈNH THÀNH (PROVINCES)
// =============================================================================
export const PROVINCE_I18N = {
  'HANOI': {
    en: { name: 'Hanoi', region: 'Northern Vietnam', tag: 'Hanoi Specialty', desc: 'Culinary heart of Vietnam and headquarters of HAQ FOOD.' },
    ko: { name: '하노이', region: '베트남 북부', tag: '하노이 특산', desc: '베트남 식문화의 중심이자 HAQ FOOD 본사 소재지.' },
  },
  'TAYNINH': {
    en: { name: 'Tay Ninh', region: 'Southern Vietnam', tag: 'Tay Ninh Specialty', desc: 'Famed homeland of sun-baked rice paper and savory shrimp salt.' },
    ko: { name: '떠이닌', region: '베트남 남부', tag: '떠이닌 특산', desc: '베트남 전통 햇볕 건조 라이스페이퍼와 새우 소금의 발원지.' },
  },
  'HAIDUONG': {
    en: { name: 'Hai Duong', region: 'Northern Vietnam', tag: 'Hai Duong Specialty', desc: 'Centuries of tradition producing pristine fresh mung bean cakes.' },
    ko: { name: '하이즈엉', region: '베트남 북부', tag: '하이즈엉 특산', desc: '수백 년 전통의 순수 녹두 케이크로 유명한 유서 깊은 고장.' },
  },
  'BENTRE': {
    en: { name: 'Ben Tre', region: 'Southern Vietnam', tag: 'Ben Tre Specialty', desc: 'Coconut capital of Vietnam, home of pure aromatic coconut milk.' },
    ko: { name: '벤째', region: '베트남 남부', tag: '벤째 특산', desc: '순수하고 달콤한 유기농 코코넛 밀크를 자랑하는 코코넛의 본고장.' },
  },
  'BACGIANG': {
    en: { name: 'Bac Giang', region: 'Northern Vietnam', tag: 'Bac Giang Specialty', desc: 'Famous for luscious sweet lychees and Chu clean rice noodles.' },
    ko: { name: '박장', region: '베트남 북부', tag: '박장 특산', desc: '달콤한 리치와 전통 쌀국수 특산지로 널리 알려진 고장.' },
  },
  'LAMDONG': {
    en: { name: 'Lam Dong', region: 'Central Vietnam', tag: 'Da Lat Specialty', desc: 'Highland plateau renowned for freeze-dried fruit chips and herbal teas.' },
    ko: { name: '럼동 (달랏)', region: '베트남 중부', tag: '달랏 특산', desc: '동결 건조 과일칩과 허브티로 유명한 청정 고원 지대.' },
  },
  'DANANG': {
    en: { name: 'Da Nang', region: 'Central Vietnam', tag: 'Central Specialty', desc: 'Coastal hub famous for dried seafood and central cuisine.' },
    ko: { name: '다낭', region: '베트남 중부', tag: '중부 특산', desc: '건조 해산물과 중부 특색 요리로 유명한 해안 중심 도시.' },
  },
  'HUE': {
    en: { name: 'Thua Thien Hue', region: 'Central Vietnam', tag: 'Hue Royal Specialty', desc: 'Ancient imperial city renowned for royal confectionery and lotus seeds.' },
    ko: { name: '후에', region: '베트남 중부', tag: '후에 궁중 특산', desc: '궁중 전통 다과와 연꽃 씨앗 특산물로 유명한 역사 도시.' },
  },
}

export const PROVINCE_NAME_LOOKUP = {
  'hà nội': 'HANOI',
  'tây ninh': 'TAYNINH',
  'hải dương': 'HAIDUONG',
  'bến tre': 'BENTRE',
  'bắc giang': 'BACGIANG',
  'lâm đồng': 'LAMDONG',
  'đà nẵng': 'DANANG',
  'thừa thiên huế': 'HUE',
  'huế': 'HUE',
}

// =============================================================================
// 5. CÁC HÀM XỬ LÝ CHÍNH (HELPER EXPORTS)
// =============================================================================

/**
 * Bản địa hóa một Category object
 */
export function getLocalizedCategory(category, language = 'vi') {
  if (!category) return category
  if (language === 'vi') return category

  const rawSlug = (category.slug || 'all').toLowerCase().trim()
  let translation = CATEGORY_I18N[rawSlug]?.[language]

  // Fallback by name keywords if slug didn't match
  if (!translation && category.name) {
    const nameLower = category.name.toLowerCase()
    if (nameLower.includes('sấy giòn') || nameLower.includes('bánh tráng sấy')) {
      translation = CATEGORY_I18N['banh-trang-say-gion']?.[language]
    } else if (nameLower.includes('trộn')) {
      translation = CATEGORY_I18N['banh-trang-tron']?.[language]
    } else if (nameLower.includes('bánh tráng')) {
      translation = CATEGORY_I18N['banh-trang']?.[language]
    } else if (nameLower.includes('đậu xanh')) {
      translation = CATEGORY_I18N['banh-dau-xanh']?.[language]
    } else if (nameLower.includes('các loại bánh')) {
      translation = CATEGORY_I18N['cac-loai-banh']?.[language]
    } else if (nameLower.includes('thịt khô')) {
      translation = CATEGORY_I18N['thit-kho']?.[language]
    } else if (nameLower.includes('bắp rang')) {
      translation = CATEGORY_I18N['bap-rang-bo']?.[language]
    }
  }

  if (!translation) return category

  return {
    ...category,
    name: translation.name || category.name,
    shortName: translation.shortName || category.shortName || category.name,
    desc: translation.desc || category.desc || category.description,
    description: translation.desc || category.description,
    featured: translation.featured || category.featured,
    featuredDesc: translation.featuredDesc || category.featuredDesc,
  }
}

/**
 * Tìm kiếm bản dịch sản phẩm thông minh
 */
function findProductTranslation(product, language = 'vi') {
  if (!product || language === 'vi') return null

  // 1. Check exact slug (lowercase)
  const cleanSlug = (product.slug || '').toLowerCase().trim()
  if (PRODUCT_I18N[cleanSlug]?.[language]) {
    return PRODUCT_I18N[cleanSlug][language]
  }

  // 2. Check alias map
  const canonicalKey = PRODUCT_SLUG_ALIASES[cleanSlug]
  if (canonicalKey && PRODUCT_I18N[canonicalKey]?.[language]) {
    return PRODUCT_I18N[canonicalKey][language]
  }

  // 3. Check name keywords matching fallback
  const nameLower = (product.name || '').toLowerCase()
  if (nameLower.includes('chà bông') || nameLower.includes('tra-bong') || nameLower.includes('trà bông')) {
    return PRODUCT_I18N['banh-trang-say-gion-vi-tra-bong']?.[language]
  }
  if (nameLower.includes('sấy') && (nameLower.includes('bò') || nameLower.includes('beef'))) {
    return PRODUCT_I18N['banh-trang-say-gion-vi-bo']?.[language]
  }
  if (nameLower.includes('sấy') && (nameLower.includes('tôm') || nameLower.includes('shrimp'))) {
    return PRODUCT_I18N['banh-trang-say-gion-vi-tom']?.[language]
  }
  if (nameLower.includes('gà lá chanh') || nameLower.includes('gà')) {
    return PRODUCT_I18N['banh-trang-tron-ga-la-chanh']?.[language]
  }
  if (nameLower.includes('sa tế tôm') || nameLower.includes('sa tế')) {
    return PRODUCT_I18N['banh-trang-tron-sa-te-tom']?.[language]
  }
  if (nameLower.includes('lá dứa') || nameLower.includes('la dua')) {
    return PRODUCT_I18N['banh-dau-xanh-vi-la-dua']?.[language]
  }
  if (nameLower.includes('mix vị') || nameLower.includes('mix vi')) {
    return PRODUCT_I18N['banh-dau-xanh-tuoi-mix-vi']?.[language]
  }
  if (nameLower.includes('đậu xanh tươi') || nameLower.includes('dau xanh')) {
    return PRODUCT_I18N['banh-dau-xanh-tuoi']?.[language]
  }

  return null
}

/**
 * Bản địa hóa một Product object
 * Đảm bảo dịch trung thực 1:1 từ dữ liệu Supabase Database,
 * không tự ý thêm thắt mô tả, điểm nổi bật hoặc quy cách bịa đặt.
 */
export function getLocalizedProduct(product, language = 'vi') {
  if (!product) return product
  if (language === 'vi') return product

  const translation = findProductTranslation(product, language)

  // Translate nested category if exists
  const localizedCat = product.categories
    ? getLocalizedCategory(product.categories, language)
    : product.categories

  // Translate nested province if exists
  const localizedProv = product.provinces
    ? getLocalizedProvince(product.provinces, language)
    : product.provinces

  // Translate variants
  const localizedVariants = (product.variants || []).map((v) => ({
    ...v,
    pack: translateVariantPack(v.pack, language),
    shelf: translateVariantShelf(v.shelf, language),
  }))

  // Translate highlights 1:1 từ đúng các phần tử trong DB product.highlights
  const rawHighlights = Array.isArray(product.highlights) ? product.highlights : []
  const localizedHighlights = rawHighlights.map((hl) => translateHighlight(hl, language))

  // Determine localized name:
  // 1) From translation dictionary (tên chuẩn đã dịch)
  // 2) From product.en_name if English
  // 3) Fallback to product.name
  let resolvedName = product.name
  if (translation?.name) {
    resolvedName = translation.name
  } else if (language === 'en' && product.en_name) {
    resolvedName = product.en_name
  }

  // Determine localized description:
  // Chỉ dịch khi sản phẩm trong DB có mô tả. Nếu DB để trống thì giữ nguyên rỗng,
  // không tự chế thêm văn bản tiếp thị để tránh sai lệch nội dung gốc.
  let resolvedDesc = ''
  if (product.description && product.description.trim() !== '') {
    resolvedDesc = translation?.desc || product.description
  }

  return {
    ...product,
    name: resolvedName,
    en_name: product.en_name || '',
    description: resolvedDesc,
    short_description: resolvedDesc,
    highlights: localizedHighlights,
    packaging_spec: product.packaging_spec,
    shelf_life: product.shelf_life,
    storage_guide: product.storage_guide,
    categories: localizedCat,
    provinces: localizedProv,
    variants: localizedVariants,
  }
}

/**
 * Bản địa hóa một Province object
 */
export function getLocalizedProvince(province, language = 'vi') {
  if (!province) return province
  if (language === 'vi') return province

  const code = (province.code || '').toUpperCase()
  const nameNorm = (province.name || '').trim().toLowerCase()
  const resolvedCode = code || PROVINCE_NAME_LOOKUP[nameNorm] || ''

  const translation = PROVINCE_I18N[resolvedCode]?.[language]

  if (!translation) return province

  return {
    ...province,
    name: translation.name || province.name,
    region: translation.region || province.region,
    tag: translation.tag || province.tag,
    short_description: translation.desc || province.short_description,
    description: translation.desc || province.description,
  }
}
