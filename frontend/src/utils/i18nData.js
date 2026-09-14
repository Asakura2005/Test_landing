/**
 * HAQ FOOD — Client-Side Database Localization Engine
 * Tự động chuyển đổi dữ liệu thực thể lấy từ Supabase (Sản phẩm, Danh mục, Biến thể, Tỉnh thành, Tin tức)
 * sang Tiếng Anh ('en'), Tiếng Hàn ('ko'), hoặc Tiếng Trung ('zh').
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
    zh: {
      name: '全部产品',
      shortName: '全部',
      desc: 'HAQ FOOD 旗下全系列高品质包装加工食品与精选特色农特零食目录。',
      featured: 'HAQ 招牌风味拌米纸',
      featuredDesc: '采用自动化对流热风烘干工艺制造，严格符合 ISO 22000 与 HACCP 国际食品安全标准。',
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
    zh: {
      name: '米纸休闲零食',
      shortName: '米纸',
      desc: '酥脆烘烤米纸（牛肉、鲜虾、芝士）与越南传统特色拌米纸。',
      featured: 'HAQ 招牌风味拌米纸',
      featuredDesc: '自动化烘干工艺融合纯正鲜虾与牛肉风味调配。',
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
    zh: {
      name: '酥脆烘烤米纸',
      shortName: '烘烤米纸',
      desc: '现代对流热风烘干超酥脆米纸，拥有牛肉、鲜虾、猪肉松等多种风味。',
      featured: '酥脆烘烤米纸 (鲜虾味)',
      featuredDesc: '天然海虾精细调味，符合 ISO 22000 与 HACCP 严苛标准。',
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
    zh: {
      name: '酥脆烘烤米纸',
      shortName: '烘烤米纸',
      desc: '现代对流热风烘干超酥脆米纸，拥有牛肉、鲜虾、猪肉松等多种风味。',
      featured: '酥脆烘烤米纸 (鲜虾味)',
      featuredDesc: '天然海虾精细调味，符合 ISO 22000 与 HACCP 严苛标准。',
    },
  },
  'banh-trang-tron': {
    en: {
      name: 'Seasoned Mixed Rice Paper',
      shortName: 'Mixed Rice Paper',
      desc: 'Shredded and rolled rice paper snacks with chicken lemongrass and spicy shrimp satay.',
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
    zh: {
      name: '特色调味拌米纸',
      shortName: '拌米纸',
      desc: '切丝与卷装米纸零食，搭配柠檬叶鸡肉丝和微辣鲜虾沙爹酱。',
      featured: '柠檬叶鸡肉卷米纸',
      featuredDesc: '软糯筋道米纸丝与鲜香鸡肉丝、清香柠檬叶的完美组合。',
    },
  },
  'bnh-trng-trn': {
    en: {
      name: 'Seasoned Mixed Rice Paper',
      shortName: 'Mixed Rice Paper',
      desc: 'Shredded and rolled rice paper snacks with chicken lemongrass and spicy shrimp satay.',
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
    zh: {
      name: '特色调味拌米纸',
      shortName: '拌米纸',
      desc: '切丝与卷装米纸零食，搭配柠檬叶鸡肉丝和微辣鲜虾沙爹酱。',
      featured: '柠檬叶鸡肉卷米纸',
      featuredDesc: '软糯筋道米纸丝与鲜香鸡肉丝、清香柠檬叶的完美组合。',
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
    zh: {
      name: '传统风味糕点',
      shortName: '传统糕点',
      desc: '越南传统鲜绿豆糕、香脆杏仁饼及纯正椰奶点心。',
      featured: '新鲜绿豆糕',
      featuredDesc: '入口即化的越南传统名点，纯天然精选原料制作。',
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
    zh: {
      name: '传统绿豆糕',
      shortName: '绿豆糕',
      desc: '享誉盛名的海阳传统风味绿豆糕，包含原味、斑斓叶味及混合风味。',
      featured: '新鲜绿豆糕 250g',
      featuredDesc: '百年经典传统配方，入口细腻柔滑，甜而不腻。',
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
    zh: {
      name: '高品质爆米花',
      shortName: '爆米花',
      desc: '高膨化度爆米花，裹满香浓焦糖黄油与醇厚芝士。',
      featured: '焦糖黄油爆米花',
      featuredDesc: '粒粒饱满爆裂，裹以金黄香脆的浓郁焦糖糖衣。',
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
    zh: {
      name: '香脆杏仁饼',
      shortName: '杏仁饼',
      desc: '浓郁牛油起酥杏仁饼，完全符合亚洲各市场的高标准出口规范。',
      featured: '传统风味杏仁饼',
      featuredDesc: '色泽金黄诱人，满缀香烤切片杏仁，酥脆可口。',
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
    zh: {
      name: '椰奶香糕',
      shortName: '椰奶糕',
      desc: '传统手工配方制作的椰奶糕与豆乳糕，保留天然微甜醇香。',
      featured: '槟椥椰奶香糕',
      featuredDesc: '采用湄公河三角洲天然新鲜椰浆精工秘制，浓郁椰香。',
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
    zh: {
      name: '绿豆软糕与传统点心',
      shortName: '绿豆糕',
      desc: '新鲜绿豆糕与传统软糕，保留地道纯正的原汁原味。',
      featured: '新鲜绿豆糕 250g',
      featuredDesc: '入口细腻绵软，清甜适口，经典的越南特色名产。',
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
    zh: {
      name: '特色匠心糖点',
      shortName: '特色点心',
      desc: '精选自越南历史悠久的传统手工艺名村特色点心。',
      featured: '精选传统杂锦糕点',
      featuredDesc: '匠心传承手工温度，兼顾深厚文化底蕴与严苛食品安全。',
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
    zh: {
      name: '精选肉干零食',
      shortName: '肉干',
      desc: '精选上等牛肉干与猪肉脯，严格品控下融合天然香料慢工细作。',
      featured: '特级五香牛肉干',
      featuredDesc: '精选精瘦牛肉，以香茅、辣椒和传统天然香辛料精心腌制。',
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
    zh: {
      name: '精选肉干零食',
      shortName: '肉干',
      desc: '精选上等牛肉干与猪肉脯，严格品控下融合天然香料慢工细作。',
      featured: '特级五香牛肉干',
      featuredDesc: '精选精瘦牛肉，以香茅、辣椒和传统天然香辛料精心腌制。',
    },
  },
}

export function translateCategoryName(catName, language = 'vi') {
  if (!catName || language === 'vi') return catName
  const lower = catName.trim().toLowerCase()
  if (lower.includes('sấy giòn') || lower.includes('bánh tráng sấy')) {
    return CATEGORY_I18N['banh-trang-say-gion']?.[language]?.name || catName
  }
  if (lower.includes('trộn')) {
    return CATEGORY_I18N['banh-trang-tron']?.[language]?.name || catName
  }
  if (lower.includes('bánh tráng')) {
    return CATEGORY_I18N['banh-trang']?.[language]?.name || catName
  }
  if (lower.includes('đậu xanh')) {
    return CATEGORY_I18N['banh-dau-xanh']?.[language]?.name || catName
  }
  if (lower.includes('bắp rang') || lower.includes('bap rang')) {
    return CATEGORY_I18N['bap-rang-bo']?.[language]?.name || catName
  }
  if (lower.includes('hạnh nhân')) {
    return CATEGORY_I18N['banh-hanh-nhan']?.[language]?.name || catName
  }
  if (lower.includes('bánh sữa')) {
    return CATEGORY_I18N['banh-sua']?.[language]?.name || catName
  }
  if (lower.includes('bánh dẻo')) {
    return CATEGORY_I18N['banh-deo']?.[language]?.name || catName
  }
  if (lower.includes('thịt khô') || lower.includes('thịt')) {
    return CATEGORY_I18N['thit-kho']?.[language]?.name || catName
  }
  if (lower.includes('các loại bánh')) {
    return CATEGORY_I18N['cac-loai-banh']?.[language]?.name || catName
  }
  if (lower.includes('bánh khác')) {
    return CATEGORY_I18N['banh-khac']?.[language]?.name || catName
  }
  return catName
}

// =============================================================================
// 2. TỪ ĐIỂN BẢN ĐỊA HÓA SẢN PHẨM (PRODUCTS)
// Toàn bộ sản phẩm từ Supabase Database kèm tên, mô tả đầy đủ
// =============================================================================
export const PRODUCT_I18N = {
  // 1. Bánh tráng sấy giòn vị chà bông
  'banh-trang-say-gion-vi-tra-bong': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Pork Floss Flavor)',
      desc: 'Ultra-crispy baked rice paper infused with premium golden savory pork floss and signature seasonings. Delivers an irresistibly crunchy, well-balanced salty-sweet snack suitable for all occasions.',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (포크플로스맛)',
      desc: '바삭하게 구워낸 라이스페이퍼에 부드럽고 짭조름한 프리미엄 포크플로스와 특제 양념이 조화롭게 어우러져 남녀노소 누구나 언제 어디서나 맛있게 즐길 수 있는 스낵입니다.',
    },
    zh: {
      name: 'HOKI - 酥脆烘烤米纸 (猪肉松味)',
      desc: '超酥脆烘烤米纸，缀以精选上等金黄香脆猪肉松与特调咸香秘制调味，咸甜适中，香脆可口，是居家休闲与聚会的理想零食。',
    },
  },

  // 2. Bánh tráng sấy giòn vị bò
  'banh-trang-say-gion-vi-bo': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Beef Flavor)',
      desc: 'Crispy convective-dried rice paper infused with rich spiced beef flavor, balanced with fragrant seasonings for a deeply satisfying crunch with warm notes of chili and lemongrass.',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (소고기맛)',
      desc: '바삭한 대류 열풍 건조 라이스페이퍼에 진하고 풍부한 소고기 풍미와 천연 향신료가 조화를 이루어 씹을수록 깊은 감칠맛과 기분 좋은 바삭함을 선사합니다.',
    },
    zh: {
      name: 'HOKI - 酥脆烘烤米纸 (牛肉味)',
      desc: '对流热风烘烤的超酥脆米纸，融入浓郁地道的五香牛肉鲜香与天然香辛料，层层入味，酥香微辣，越嚼越有滋味。',
    },
  },

  // 3. Bánh tráng sấy giòn vị tôm
  'banh-trang-say-gion-vi-tom': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Shrimp Flavor)',
      desc: 'Crispy and fragrant baked rice paper infused with rich shrimp flavor and signature seasonings, offering a harmonious salty-sweet taste. Each crunchy bite is full of natural shrimp flavor, making it a convenient snack for any moment.',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (새우맛)',
      desc: '바삭하고 고소하게 구워낸 라이스페이퍼에 진한 새우 맛과 특제 양념이 어우러져 조화로운 단짠의 풍미를 선사합니다. 한입 베어 물면 바삭한 식감과 진한 새우 풍미가 가득해 언제 어디서나 즐기기 좋은 간식입니다.',
    },
    zh: {
      name: 'HOKI - 酥脆烘烤米纸 (鲜虾味)',
      desc: '香脆酥松的烘烤米纸，饱含浓郁海虾鲜味与秘制调味料，咸甜交融，恰到好处。每一口咬下都满溢鲜虾风味与酥脆口感，是随时随地享用的便捷休闲零食。',
    },
  },

  // 4. Bánh tráng trộn gà lá chanh
  'banh-trang-tron-ga-la-chanh': {
    en: {
      name: 'HOKI - Mixed Rice Paper with Chicken & Lime Leaves',
      desc: 'Soft and chewy rice paper blended with savory shredded chicken, julienned kaffir lime leaves, crispy fried shallots, and signature seasonings. Mildly spicy with a refreshing citrus aroma that makes it utterly addictive.',
    },
    ko: {
      name: 'HOKI - 치킨 라임잎 비빔 라이스페이퍼',
      desc: '부드럽고 쫄깃한 라이스페이퍼에 맛있는 닭고기, 얇게 썬 라임잎, 튀긴 샬롯과 특제 양념이 어우러져 있습니다. 은은한 매콤함과 조화로운 단짠, 상큼한 라임잎 향이 어우러져 자꾸만 손이 가는 매력적인 간식입니다.',
    },
    zh: {
      name: 'HOKI - 拌米纸 (柠檬叶鸡肉味)',
      desc: '软糯筋道的米纸丝，拌入鲜香鸡肉丝、精切柠檬叶细丝、金黄炸红葱头与特制香料。微辣适口，咸甜均衡，伴随清新柑橘柠檬叶香气，令人回味无穷。',
    },
  },

  // 5. Bánh tráng trộn sợi sa tế tôm
  'banh-trang-tron-sa-te-tom': {
    en: {
      name: 'HOKI - Shredded Rice Paper with Shrimp Satay',
      desc: 'Soft and chewy shredded rice paper combined with rich, spicy and aromatic shrimp satay, blended with golden shallots and signature seasonings. Perfectly spicy and savory with robust sea shrimp aroma.',
    },
    ko: {
      name: 'HOKI - 새우 사테 비빔 라이스페이퍼',
      desc: '쫄깃하고 부드러운 채 썬 라이스페이퍼에 진하고 매콤한 새우 사테, 바삭한 샬롯과 특제 양념이 어우러져 있습니다. 적당한 단짠의 조화와 매콤한 맛, 특유의 새우 풍미가 어우러져 먹을수록 당기는 맛있는 간식입니다.',
    },
    zh: {
      name: 'HOKI - 拌米纸丝 (鲜虾沙爹味)',
      desc: '筋道爽滑的米纸丝，融入香浓微辣的鲜虾沙爹酱，搭配香脆炸红葱头与秘制香辛料。咸甜微辣完美平衡，海虾香气独特浓郁，越嚼越香，风味令人着迷。',
    },
  },

  // 6. Bánh đậu xanh vị lá dứa
  'banh-dau-xanh-vi-la-dua': {
    en: {
      name: 'Fresh Mung Bean Cake with Pandan Flavor',
      desc: 'Pure fresh mung bean cake subtly blended with natural fragrant pandan extract. Melts smoothly on the palate with a refreshing, delicate aroma and gentle sweetness.',
    },
    ko: {
      name: '판단잎 신선 녹두 케이크',
      desc: '신선한 100% 순수 녹두에 천연 판단잎의 은은하고 산뜻한 향을 더하여 입안에서 부드럽게 녹아내리는 베트남 전통 명가 디저트입니다.',
    },
    zh: {
      name: '新鲜绿豆糕 (斑斓叶味)',
      desc: '精选新鲜纯绿豆与天然清香斑斓叶汁巧妙融合，口感细腻柔滑，甜度清雅适口，入口即化，茶歇品鉴的经典雅致茶点。',
    },
  },

  // 7. Bánh đậu xanh tươi mix vị
  'banh-dau-xanh-tuoi-mix-vi': {
    en: {
      name: 'Fresh Mung Bean Cake (Assorted Flavors Box)',
      desc: 'Assorted gift box featuring a rich variety of classic and modern mung bean cakes. Crafted from pristine whole mung beans, preserving authentic texture and delicate sweetness.',
    },
    ko: {
      name: '모듬 신선 녹두 케이크 (혼합 선물세트)',
      desc: '전통과 현대의 다채로운 풍미를 한 상자에 정성껏 담아 신선한 녹두의 풍부한 맛을 다양하게 경험할 수 있는 프리미엄 선물용 디저트 세트입니다.',
    },
    zh: {
      name: '新鲜绿豆糕 (混合口味礼盒装)',
      desc: '荟萃传统原味与现代多元风味的新鲜绿豆糕组合装，选用上等天然纯绿豆精心制作，细腻醇厚，带来丰富多层次的地道美味体验。',
    },
  },

  // 8. Bánh đậu xanh tươi
  'banh-dau-xanh-tuoi': {
    en: {
      name: 'Traditional Fresh Mung Bean Cake',
      desc: 'Famous Hai Duong heritage recipe made from 100% pure selected mung beans. Silky smooth texture that gently melts in your mouth with an elegant, natural sweetness.',
    },
    ko: {
      name: '전통 신선 녹두 케이크',
      desc: '수백 년 전통 하이즈엉 명가 레시피로 엄선된 순수 녹두만을 사용하여 입안 가득 은은한 단맛과 부드럽게 녹아내리는 전통의 풍미를 간직한 대표 특산품입니다.',
    },
    zh: {
      name: '传统新鲜绿豆糕',
      desc: '传承越南海阳百年经典传统配方，精选优质纯绿豆精工慢制，豆香浓郁醇厚，入口细腻爽滑，清甜不腻，尽显传统饮食精粹。',
    },
  },

  // Catalog supplementary items
  'bap-rang-bo-caramel': {
    en: {
      name: 'Caramel Butter Popcorn',
      desc: 'Gourmet popped corn glazed with sweet rich caramel butter, delightfully crunchy in every kernel.',
    },
    ko: {
      name: '카라멜 버터 팝콘',
      desc: '고소한 버터와 달콤한 카라멜 코팅을 입혀 한 알 한 알 바삭함이 살아있는 프리미엄 팝콘입니다.',
    },
    zh: {
      name: '焦糖黄油爆米花',
      desc: '高膨化精选爆米花，裹以浓郁香甜的焦糖黄油脆皮糖衣，粒粒香脆醇厚。',
    },
  },

  'banh-hanh-nhan': {
    en: {
      name: 'Premium Almond Pastries',
      desc: 'Flaky and buttery artisan biscuits covered with fragrant roasted almond slices, meeting export standards for Asian markets.',
    },
    ko: {
      name: '프리미엄 아몬드 페이스트리',
      desc: '고소한 버터 풍미와 슬라이스 아몬드의 바삭함이 어우러진 아시아 수출 규격의 프리미엄 디저트 비스킷.',
    },
    zh: {
      name: '香脆起酥杏仁饼',
      desc: '浓郁纯正黄油起酥工艺，缀满香烤天然杏仁切片，酥脆微甜，符合亚洲高端食品出口规范。',
    },
  },

  'banh-sua-dua': {
    en: {
      name: 'Ben Tre Coconut Milk Cake',
      desc: 'Traditional Mekong Delta delicacy crafted with pure aromatic coconut milk, offering delicate natural sweetness.',
    },
    ko: {
      name: '벤째 코코넛 밀크 케이크',
      desc: '메콩델타산 신선한 순수 코코넛 밀크로 정성껏 빚어낸 진하고 고소한 풍미의 전통 특산 과자.',
    },
    zh: {
      name: '槟椥天然椰奶香糕',
      desc: '选用湄公河三角洲优质天然椰浆古法熬制，椰香浓郁悠长，甘醇软糯。',
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
  'banh-trang-say-gion-tra-bong': 'banh-trang-say-gion-vi-tra-bong',

  // Bò
  'banh-trang-say-gion-vi-bo': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-bo-50g': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-bo': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-gion-bo': 'banh-trang-say-gion-vi-bo',

  // Tôm
  'banh-trang-say-gion-vi-tom': 'banh-trang-say-gion-vi-tom',
  'banh-trang-say-tom-50g': 'banh-trang-say-gion-vi-tom',
  'banh-trang-say-tom': 'banh-trang-say-gion-vi-tom',
  'banh-trang-say-gion-tom': 'banh-trang-say-gion-vi-tom',

  // Gà lá chanh
  'banh-trang-tron-ga-la-chanh': 'banh-trang-tron-ga-la-chanh',
  'banh-trang-cuon-ga-la-chanh-100g': 'banh-trang-tron-ga-la-chanh',
  'banh-trang-cuon-ga': 'banh-trang-tron-ga-la-chanh',
  'banh-trang-tron-ga': 'banh-trang-tron-ga-la-chanh',

  // Sa tế tôm
  'banh-trang-tron-sa-te-tom': 'banh-trang-tron-sa-te-tom',
  'banh-trang-soi-sa-te-tom-100g': 'banh-trang-tron-sa-te-tom',
  'banh-trang-tron-haq': 'banh-trang-tron-sa-te-tom',
  'banh-trang-tron-sa-te': 'banh-trang-tron-sa-te-tom',

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

  // Bắp rang bơ & khác
  'bap-rang-bo': 'bap-rang-bo-caramel',
  'bap-rang-bo-caramel': 'bap-rang-bo-caramel',
  'banh-hanh-nhan': 'banh-hanh-nhan',
  'banh-hanh-nhan-thuong-hang': 'banh-hanh-nhan',
  'banh-sua': 'banh-sua-dua',
  'banh-sua-dua': 'banh-sua-dua',
}

// =============================================================================
// 3. TỪ ĐIỂN DỊCH TAGS, HIGHLIGHTS & VARIANTS
// =============================================================================
export const TAG_TRANSLATIONS = {
  'chủ lực': { en: 'Flagship', ko: '대표 상품', zh: '核心名产' },
  'bán chạy': { en: 'Best Seller', ko: '베스트셀러', zh: '热销爆款' },
  'mới': { en: 'New Arrival', ko: '신제품', zh: '新品上市' },
  'đặc sản': { en: 'Specialty', ko: '지역 특산', zh: '地方特产' },
  'đặc sản tây ninh': { en: 'Tay Ninh Specialty', ko: '떠이닌 특산', zh: '西宁特产' },
  'đặc sản hải dương': { en: 'Hai Duong Specialty', ko: '하이즈엉 특산', zh: '海阳特产' },
  'đặc sản hà nội': { en: 'Hanoi Specialty', ko: '하노이 특산', zh: '河内名产' },
  'đặc sản bến tre': { en: 'Ben Tre Specialty', ko: '벤째 특산', zh: '槟椥特产' },
  'đặc sản đà lạt': { en: 'Da Lat Specialty', ko: '달랏 특산', zh: '大叻特产' },
  'flagship': { en: 'Flagship', ko: '대표 상품', zh: '核心名产' },
  'best seller': { en: 'Best Seller', ko: '베스트셀러', zh: '热销爆款' },
}

export function translateTag(tag, language = 'vi') {
  if (!tag || language === 'vi') return tag
  const normalized = tag.trim().toLowerCase()
  const match = TAG_TRANSLATIONS[normalized]
  if (match && match[language]) return match[language]
  return tag
}

export const HIGHLIGHT_TRANSLATIONS = {
  'bánh tráng sấy': { en: 'Baked rice paper', ko: '구운 라이스페이퍼', zh: '烘烤米纸' },
  'bánh tráng': { en: 'Rice paper', ko: '라이스페이퍼', zh: '米纸' },
  'bánh tráng trộn': { en: 'Mixed rice paper', ko: '비빔 라이스페이퍼', zh: '特色拌米纸' },
  'bánh đậu xanh': { en: 'Mung bean cake', ko: '녹두 케이크', zh: '传统绿豆糕' },
  'vị chà bông': { en: 'Pork floss flavor', ko: '포크플로스맛', zh: '猪肉松味' },
  'vị bò': { en: 'Beef flavor', ko: '소고기맛', zh: '牛肉味' },
  'vị tôm': { en: 'Shrimp flavor', ko: '새우맛', zh: '鲜虾味' },
  'vị gà lá chanh': { en: 'Chicken & lime leaves flavor', ko: '치킨 라임잎맛', zh: '柠檬叶鸡肉味' },
  'vị sa tế tôm': { en: 'Shrimp satay flavor', ko: '새우 사테맛', zh: '鲜虾沙爹味' },
  'vị lá dứa': { en: 'Pandan flavor', ko: '판단잎맛', zh: '斑斓叶味' },
  'mix vị': { en: 'Assorted flavors', ko: '모듬 풍미', zh: '混合口味' },
  'đậu xanh tươi': { en: 'Fresh mung beans', ko: '신선 녹두', zh: '新鲜绿豆' },
  'best seller': { en: 'Best Seller', ko: '베스트셀러', zh: '热销爆款' },
  'chuẩn haccp & iso': { en: 'HACCP & ISO Certified', ko: 'HACCP 및 ISO 인증', zh: '符合 HACCP 与 ISO 标准' },
  'không chiên qua dầu': { en: 'Non-fried technology', ko: '기름에 튀기지 않음', zh: '非油炸烘焙工艺' },
  'nguyên liệu tự nhiên': { en: 'Natural ingredients', ko: '천연 원재료 사용', zh: '纯正天然精选原料' },
}

export function translateHighlight(hl, language = 'vi') {
  if (!hl || language === 'vi') return hl
  const normalized = hl.trim().toLowerCase()
  const match = HIGHLIGHT_TRANSLATIONS[normalized]
  if (match && match[language]) return match[language]
  return hl
}

export const PACKAGING_TRANSLATIONS = {
  'hũ nhựa': { en: 'Plastic Jar', ko: '플라스틱 용기', zh: '塑料密封罐' },
  'hũ Nhựa': { en: 'Plastic Jar', ko: '플라스틱 용기', zh: '塑料密封罐' },
  'túi zip đáy đứng': { en: 'Stand-up Zip Pouch', ko: '스탠드 지퍼백', zh: '自立拉链袋' },
  'túi zip': { en: 'Zip Pouch', ko: '지퍼백', zh: '拉链袋' },
  'hộp nhựa': { en: 'Plastic Box', ko: '플라스틱 박스', zh: '塑料盒' },
  'hộp nhựa tròn': { en: 'Round Plastic Container', ko: '원형 플라스틱 케이스', zh: '圆形塑料盒' },
  'hộp giấy': { en: 'Paper Gift Box', ko: '종이 선물 상자', zh: '精美纸质礼盒' },
  'thùng carton': { en: 'Master Carton', ko: '카톤 박스', zh: '瓦楞纸箱' },
}

export const SHELF_LIFE_TRANSLATIONS = {
  '6 tháng': { en: '6 months', ko: '6개월', zh: '6 个月' },
  '6 tháng ': { en: '6 months', ko: '6개월', zh: '6 个月' },
  '6': { en: '6 months', ko: '6개월', zh: '6 个月' },
  '1 tháng': { en: '1 month', ko: '1개월', zh: '1 个月' },
  '1 tháng ': { en: '1 month', ko: '1개월', zh: '1 个月' },
  '1': { en: '1 month', ko: '1개월', zh: '1 个月' },
  '3 tháng': { en: '3 months', ko: '3개월', zh: '3 个月' },
  '9 tháng': { en: '9 months', ko: '9개월', zh: '9 个月' },
  '12 tháng': { en: '12 months', ko: '12개월', zh: '12 个月' },
  '12 tháng ': { en: '12 months', ko: '12개월', zh: '12 个月' },
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
  const normalized = String(shelf).trim().toLowerCase()
  const match = SHELF_LIFE_TRANSLATIONS[normalized]
  if (match && match[language]) return match[language]
  return shelf
}

export function translateShelfLife(shelf, language = 'vi') {
  return translateVariantShelf(shelf, language)
}

export const VARIANT_SIZE_TRANSLATIONS = {
  'tiêu chuẩn': { en: 'Standard', ko: '표준', zh: '标准规格' },
  '50g': { en: '50g', ko: '50g', zh: '50克' },
  '100g': { en: '100g', ko: '100g', zh: '100克' },
  '110g': { en: '110g', ko: '110g', zh: '110克' },
  '200g': { en: '200g', ko: '200g', zh: '200克' },
  '250g': { en: '250g', ko: '250g', zh: '250克' },
  'gói 50g': { en: 'Pack 50g', ko: '팩 50g', zh: '50克袋装' },
  'túi zip 100g': { en: 'Zip Pouch 100g', ko: '지퍼백 100g', zh: '100克拉链袋装' },
  'hũ 200g': { en: 'Jar 200g', ko: '용기 200g', zh: '200克罐装' },
  'hộp 110g': { en: 'Box 110g', ko: '박스 110g', zh: '110克盒装' },
  'hộp 250g': { en: 'Box 250g', ko: '박스 250g', zh: '250克盒装' },
}

export function translateVariantSize(size, language = 'vi') {
  if (!size || language === 'vi') return size
  const normalized = size.trim().toLowerCase()
  if (VARIANT_SIZE_TRANSLATIONS[normalized]?.[language]) {
    return VARIANT_SIZE_TRANSLATIONS[normalized][language]
  }
  return size
}

export const STORAGE_GUIDE_TRANSLATIONS = {
  default: {
    en: 'Store in a cool, dry place away from direct sunlight. Seal tightly after opening.',
    ko: '직사광선을 피해 서늘하고 건조한 곳에 보관하십시오. 개봉 후에는 밀봉하여 보관하십시오.',
    zh: '请置于阴凉干燥处，避免阳光直射。开封后请密封保存并尽快食用。',
  },
}

export function translateStorageGuide(guide, language = 'vi') {
  if (!guide || language === 'vi') return guide
  const lower = guide.toLowerCase()
  if (lower.includes('khô ráo') || lower.includes('thoáng mát') || lower.includes('nơi khô')) {
    return STORAGE_GUIDE_TRANSLATIONS.default[language] || guide
  }
  return guide
}

export const INGREDIENTS_TRANSLATIONS = {
  'bánh tráng sấy giòn vị chà bông': {
    en: 'Rice flour, premium dried pork floss, vegetable oil, sugar, iodized salt, garlic, chili, natural seasonings.',
    ko: '쌀가루, 프리미엄 돼지고기 플로스, 식물성 유지, 설탕, 요오드 소금, 마늘, 고추, 천연 조미료.',
    zh: '大米粉、精选优质猪肉松、植物油、白砂糖、食用盐、大蒜、辣椒、天然复合调味料。',
  },
  'bánh tráng sấy giòn vị bò': {
    en: 'Rice flour, dried beef seasonings, chili, lemongrass, garlic, vegetable oil, sugar, salt, natural spices.',
    ko: '쌀가루, 건조 소고기 시즈닝, 고추, 레몬그라스, 마늘, 식물성 유지, 설탕, 소금, 천연 향신료.',
    zh: '大米粉、香醇牛肉风味调料、辣椒、香茅、大蒜、精炼植物油、白砂糖、食用盐、天然香辛料。',
  },
  'bánh tráng sấy giòn vị tôm': {
    en: 'Rice flour, shrimp seasoning, sea salt, vegetable oil, garlic, chili, natural spices.',
    ko: '쌀가루, 천연 새우 시즈닝, 천일염, 식물성 유지, 마늘, 고추, 천연 향신료.',
    zh: '大米粉、海虾调味粉、天然海盐、植物油、大蒜、辣椒、天然辛香料。',
  },
  'bánh tráng trộn gà lá chanh': {
    en: 'Shredded rice paper, seasoned dried chicken, dried lime leaves, fried crispy shallots, vegetable oil, signature satay sauce.',
    ko: '채 썬 라이스페이퍼, 양념 건조 닭고기, 건조 라임잎, 바삭한 튀긴 샬롯, 식물성 유지, 특제 사테 소스.',
    zh: '米纸条丝、五香鸡肉丝、精选柠檬叶细丝、香酥炸红葱头、精炼植物油、特调沙爹拌酱。',
  },
  'bánh tráng trộn sợi sa tế tôm': {
    en: 'Shredded rice paper, dried shrimp seasoning, spicy chili satay oil, fried crispy shallots, garlic, sea salt.',
    ko: '채 썬 라이스페이퍼, 건새우 시즈닝, 매콤한 고추 사테유, 튀긴 샬롯, 마늘, 천일염.',
    zh: '米纸丝、鲜香虾味粉、香辣辣椒沙爹油、香脆炸红葱头、大蒜、天然海盐。',
  },
  'bánh đậu xanh vị lá dứa': {
    en: '100% pure mung bean powder, fresh pandan extract, refined cane sugar, pure vegetable oil.',
    ko: '100% 순수 녹두 분말, 천연 판단잎 추출물, 정제 사탕수수 설탕, 순수 식물성 유지.',
    zh: '100% 纯天然绿豆粉、天然新鲜斑斓叶萃取汁、精制白砂糖、纯正植物油。',
  },
  'bánh đậu xanh tươi mix vị': {
    en: 'Selected mung bean flour, pandan extract, cane sugar, pure vegetable oil, natural assorted flavorings.',
    ko: '엄선된 녹두 분말, 판단잎 추출물, 사탕수수 설탕, 식물성 유지, 천연 모듬 풍미료.',
    zh: '特选纯天然绿豆粉、清香斑斓汁、优质白砂糖、纯植物油、天然风味调配成分。',
  },
  'bánh đậu xanh tươi': {
    en: '100% selected Vietnamese mung bean powder, refined cane sugar, pure vegetable oil.',
    ko: '엄선된 100% 베트남산 녹두 분말, 정제 사탕수수 설탕, 순수 식물성 유지.',
    zh: '100% 精选纯正越南绿豆粉、白砂糖、优质精炼植物油。',
  },
}

export function translateIngredients(ing, language = 'vi', slugOrName = '') {
  if (!ing || language === 'vi') return ing
  const cleanKey = (slugOrName || '').toLowerCase()
  for (const [key, trans] of Object.entries(INGREDIENTS_TRANSLATIONS)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      if (trans[language]) return trans[language]
    }
  }
  const lower = ing.toLowerCase()
  if (lower.includes('đậu xanh') && lower.includes('lá dứa')) {
    return INGREDIENTS_TRANSLATIONS['bánh đậu xanh vị lá dứa'][language] || ing
  }
  if (lower.includes('đậu xanh') && lower.includes('mix')) {
    return INGREDIENTS_TRANSLATIONS['bánh đậu xanh tươi mix vị'][language] || ing
  }
  if (lower.includes('đậu xanh')) {
    return INGREDIENTS_TRANSLATIONS['bánh đậu xanh tươi'][language] || ing
  }
  if (lower.includes('gà lá chanh') || lower.includes('gà')) {
    return INGREDIENTS_TRANSLATIONS['bánh tráng trộn gà lá chanh'][language] || ing
  }
  if (lower.includes('sa tế') || lower.includes('sa tế tôm')) {
    return INGREDIENTS_TRANSLATIONS['bánh tráng trộn sợi sa tế tôm'][language] || ing
  }
  if (lower.includes('chà bông') || lower.includes('tra-bong')) {
    return INGREDIENTS_TRANSLATIONS['bánh tráng sấy giòn vị chà bông'][language] || ing
  }
  if (lower.includes('bò')) {
    return INGREDIENTS_TRANSLATIONS['bánh tráng sấy giòn vị bò'][language] || ing
  }
  if (lower.includes('tôm')) {
    return INGREDIENTS_TRANSLATIONS['bánh tráng sấy giòn vị tôm'][language] || ing
  }
  return ing
}

export function translateCertifications(cert, language = 'vi') {
  if (!cert || language === 'vi') return cert
  const lower = cert.toLowerCase()
  if (lower.includes('iso') || lower.includes('haccp')) {
    if (language === 'en') return 'ISO 22000:2018 & HACCP Certified'
    if (language === 'ko') return 'ISO 22000:2018 및 HACCP 국제 표준 인증'
    if (language === 'zh') return '符合 ISO 22000:2018 与 HACCP 国际食品安全认证'
  }
  return cert
}

// =============================================================================
// 4. TỪ ĐIỂN BẢN ĐỊA HÓA TOÀN BỘ 34 TỈNH THÀNH (PROVINCES) + QUẦN ĐẢO
// =============================================================================
export const PROVINCE_I18N = {
  'HANOI': {
    en: { name: 'Hanoi', region: 'Northern Vietnam', tag: 'Hanoi Specialty', desc: 'Culinary heart of Vietnam and headquarters of HAQ FOOD.' },
    ko: { name: '하노이', region: '베트남 북부', tag: '하노이 특산', desc: '베트남 식문화의 중심이자 HAQ FOOD 본사 소재지.' },
    zh: { name: '河内', region: '越南北部', tag: '河内名产', desc: '越南传统饮食文化与经济中心，HAQ FOOD 总部所在地。' },
  },
  'HAIPHONG': {
    en: { name: 'Hai Phong', region: 'Northern Vietnam', tag: 'Hai Phong Specialty', desc: 'Major northern port city famous for coastal seafood and crispy specialties.' },
    ko: { name: '하이퐁', region: '베트남 북부', tag: '하이퐁 특산', desc: '풍부한 해산물과 바삭한 특산물로 유명한 북부 최대 항구 도시.' },
    zh: { name: '海防', region: '越南北部', tag: '海防特产', desc: '越南北方核心海港城市，以海鲜干货与酥脆特产闻名。' },
  },
  'TAYNINH': {
    en: { name: 'Tay Ninh', region: 'Southern Vietnam', tag: 'Tay Ninh Specialty', desc: 'Famed homeland of sun-baked rice paper and savory shrimp salt.' },
    ko: { name: '떠이닌', region: '베트남 남부', tag: '떠이닌 특산', desc: '베트남 전통 햇볕 건조 라이스페이퍼와 새우 소금의 발원지.' },
    zh: { name: '西宁', region: '越南南部', tag: '西宁特产', desc: '闻名遐迩的日晒米纸与特产香浓虾盐发源地。' },
  },
  'HAIDUONG': {
    en: { name: 'Hai Duong', region: 'Northern Vietnam', tag: 'Hai Duong Specialty', desc: 'Centuries of tradition producing pristine fresh mung bean cakes.' },
    ko: { name: '하이즈엉', region: '베트남 북부', tag: '하이즈엉 특산', desc: '수백 년 전통의 순수 녹두 케이크로 유명한 유서 깊은 고장.' },
    zh: { name: '海阳', region: '越南北部', tag: '海阳特产', desc: '拥有数百年悠久历史的传统纯正鲜绿豆糕之乡。' },
  },
  'BENTRE': {
    en: { name: 'Ben Tre', region: 'Southern Vietnam', tag: 'Ben Tre Specialty', desc: 'Coconut capital of Vietnam, home of pure aromatic coconut milk.' },
    ko: { name: '벤째', region: '베트남 남부', tag: '벤째 특산', desc: '순수하고 달콤한 유기농 코코넛 밀크를 자랑하는 코코넛의 본고장.' },
    zh: { name: '槟椥', region: '越南南部', tag: '槟椥特产', desc: '越南椰子之都，纯正香浓有机椰浆的盛产地。' },
  },
  'BACGIANG': {
    en: { name: 'Bac Giang', region: 'Northern Vietnam', tag: 'Bac Giang Specialty', desc: 'Famous for luscious sweet lychees and Chu clean rice noodles.' },
    ko: { name: '박장', region: '베트남 북부', tag: '박장 특산', desc: '달콤한 리치와 전통 쌀국수 특산지로 널리 알려진 고장.' },
    zh: { name: '北江', region: '越南北部', tag: '北江特产', desc: '以清甜多汁的陆岸荔枝和传统洁净米粉享誉海内外。' },
  },
  'LAMDONG': {
    en: { name: 'Lam Dong (Da Lat)', region: 'Central Vietnam', tag: 'Da Lat Specialty', desc: 'Highland plateau renowned for freeze-dried fruit chips and herbal teas.' },
    ko: { name: '럼동 (달랏)', region: '베트남 중부', tag: '달랏 특산', desc: '동결 건조 과일칩과 허브티로 유명한 청정 고원 지대.' },
    zh: { name: '林同 (大叻)', region: '越南中部', tag: '大叻特产', desc: '温带高原胜地，以冻干果蔬脆片和天然花草茶闻名。' },
  },
  'DANANG': {
    en: { name: 'Da Nang', region: 'Central Vietnam', tag: 'Da Nang Specialty', desc: 'Coastal hub famous for dried seafood and central Vietnamese cuisine.' },
    ko: { name: '다낭', region: '베트남 중부', tag: '다낭 특산', desc: '건조 해산물과 중부 특색 요리로 유명한 해안 중심 도시.' },
    zh: { name: '岘港', region: '越南中部', tag: '岘港名产', desc: '沿海核心港口城市，以海鲜干货和独特中部风味美食著称。' },
  },
  'TTHUE': {
    en: { name: 'Thua Thien Hue', region: 'Central Vietnam', tag: 'Hue Royal Specialty', desc: 'Ancient imperial city renowned for royal confectionery and lotus seeds.' },
    ko: { name: '후에', region: '베트남 중부', tag: '후에 궁중 특산', desc: '궁중 전통 다과와 연꽃 씨앗 특산물로 유명한 역사 도시.' },
    zh: { name: '承天顺化', region: '越南中部', tag: '顺化宫廷特产', desc: '千年古都，以精致典雅的宫廷茶点点心和天然白莲子闻名。' },
  },
  'HUE': {
    en: { name: 'Thua Thien Hue', region: 'Central Vietnam', tag: 'Hue Royal Specialty', desc: 'Ancient imperial city renowned for royal confectionery and lotus seeds.' },
    ko: { name: '후에', region: '베트남 중부', tag: '후에 궁중 특산', desc: '궁중 전통 다과와 연꽃 씨앗 특산물로 유명한 역사 도시.' },
    zh: { name: '承天顺化', region: '越南中部', tag: '顺化宫廷特产', desc: '千年古都，以精致典雅的宫廷茶点点心和天然白莲子闻名。' },
  },
  'HCM': {
    en: { name: 'Ho Chi Minh City', region: 'Southern Vietnam', tag: 'Saigon Specialty', desc: 'Dynamic commercial metropolis and major food innovation center of Vietnam.' },
    ko: { name: '호치민시', region: '베트남 남부', tag: '사이공 특산', desc: '베트남 최대의 상업 대도시이자 현대식 식품 유통 및 혁신의 중심지.' },
    zh: { name: '胡志明市', region: '越南南部', tag: '西贡名产', desc: '越南现代商业大都市与前沿食品创新研发与分销中心。' },
  },
  'CANTHO': {
    en: { name: 'Can Tho', region: 'Southern Vietnam', tag: 'Mekong Specialty', desc: 'Heart of the Mekong Delta, known for rice paper and fruit processing.' },
    ko: { name: '껀터', region: '베트남 남부', tag: '메콩 특산', desc: '메콩델타의 중심지로 풍부한 열대 과일과 전통 라이스페이퍼 산지.' },
    zh: { name: '芹苴', region: '越南南部', tag: '九龙江特产', desc: '湄公河三角洲核心腹地，盛产热带丰饶果蔬与传统米制品。' },
  },
  'CAOBANG': {
    en: { name: 'Cao Bang', region: 'Northern Vietnam', tag: 'Cao Bang Specialty', desc: 'Northern highland province famous for black jelly and organic chestnuts.' },
    ko: { name: '까오방', region: '베트남 북부', tag: '까오방 특산', desc: '전통 밤과 청정 고산 지대 천연 임산물로 유명한 북부 명소.' },
    zh: { name: '高平', region: '越南北部', tag: '高平特产', desc: '越南北部高原名省，以优质天然板栗和高山纯正土特产闻名。' },
  },
  'DIENBIEN': {
    en: { name: 'Dien Bien', region: 'Northern Vietnam', tag: 'Dien Bien Specialty', desc: 'Famed for premium aromatic Dien Bien sticky rice and buffalo jerky.' },
    ko: { name: '디엔비엔', region: '베트남 북부', tag: '디엔비엔 특산', desc: '향긋한 특산 찹쌀과 전통 훈제 육포로 널리 알려진 고장.' },
    zh: { name: '奠边', region: '越南北部', tag: '奠边特产', desc: '享誉全国的奠边特产香糯米与传统风味手撕熏肉干。' },
  },
  'LAICHAU': {
    en: { name: 'Lai Chau', region: 'Northern Vietnam', tag: 'Lai Chau Specialty', desc: 'Northwest highland province known for mountain tea and wild honey.' },
    ko: { name: '라이쩌우', region: '베트남 북부', tag: '라이쩌우 특산', desc: '고산 청정 야생 꿀과 명품 산악 차로 유명한 청정 지역.' },
    zh: { name: '莱州', region: '越南北部', tag: '莱州特产', desc: '西北部崇山峻岭胜地，以天然野蜂蜜和高山古树茶著称。' },
  },
  'LANGSON': {
    en: { name: 'Lang Son', region: 'Northern Vietnam', tag: 'Lang Son Specialty', desc: 'Key trade gateway known for star anise, roasted duck, and dried fruits.' },
    ko: { name: '랑선', region: '베트남 북부', tag: '랑선 특산', desc: '스타 아니스(팔각)와 전통 훈제 구이로 유명한 북부 무역 거점.' },
    zh: { name: '谅山', region: '越南北部', tag: '谅山特产', desc: '重要边贸口岸名城，以特产八角茴香和传统干果香辛料闻名。' },
  },
  'QUANGNINH': {
    en: { name: 'Quang Ninh', region: 'Northern Vietnam', tag: 'Ha Long Specialty', desc: 'Home of Ha Long Bay, famous for squid patties and premium dried seafood.' },
    ko: { name: '꽝닌', region: '베트남 북부', tag: '하롱 특산', desc: '하롱베이의 본고장이자 프리미엄 건조 해산물과 오징어 어묵 명산지.' },
    zh: { name: '广宁', region: '越南北部', tag: '下龙名产', desc: '下龙湾所在地，以手工墨鱼饼及高品质深海海鲜干货著称。' },
  },
  'SONLA': {
    en: { name: 'Son La', region: 'Northern Vietnam', tag: 'Son La Specialty', desc: 'Highland agricultural hub producing Arabica coffee and dried plums.' },
    ko: { name: '선라', region: '베트남 북부', tag: '선라 특산', desc: '아라비카 커피와 건자두 등 다양한 고원 청정 농산물 재배지.' },
    zh: { name: '山罗', region: '越南北部', tag: '山罗特产', desc: '西北温带高原农业重镇，盛产高品质阿拉比卡咖啡与天然果干。' },
  },
  'TUYENQUANG': {
    en: { name: 'Tuyen Quang', region: 'Northern Vietnam', tag: 'Tuyen Quang Specialty', desc: 'Green valleys famous for sweet Soi Ha pomelos and Shan Tuyet tea.' },
    ko: { name: '뚜옌꽝', region: '베트남 북부', tag: '뚜옌꽝 특산', desc: '달콤한 자몽과 청정 샨뚜옛 전통 녹차 산지.' },
    zh: { name: '宣光', region: '越南北部', tag: '宣光特产', desc: '青山绿水环绕，以清甜多汁的柚子和古树雪茶享誉北方。' },
  },
  'LAOCAI': {
    en: { name: 'Lao Cai (Sa Pa)', region: 'Northern Vietnam', tag: 'Sa Pa Specialty', desc: 'Cool mountain region renowned for Sa Pa salmon, dried beef, and forest mushrooms.' },
    ko: { name: '라오까이 (사파)', region: '베트남 북부', tag: '사파 특산', desc: '시원한 기후의 사파 고원에서 채취한 버섯과 고급 훈제 육류 특산지.' },
    zh: { name: '老街 (沙坝)', region: '越南北部', tag: '沙坝特产', desc: '沙坝清凉温带胜地，盛产珍稀野生食用菌与高原香熏肉干。' },
  },
  'THAINGUYEN': {
    en: { name: 'Thai Nguyen', region: 'Northern Vietnam', tag: 'Thai Nguyen Specialty', desc: 'Famed green tea capital of Vietnam with centuries of artisan cultivation.' },
    ko: { name: '타이응우옌', region: '베트남 북부', tag: '타이응우옌 특산', desc: '베트남 최고의 명품 녹차 생산지로 유서 깊은 차 문화의 중심.' },
    zh: { name: '太原', region: '越南北部', tag: '太原名茶', desc: '享负盛名的越南名茶之都，数百年传承高山清香绿茶工艺。' },
  },
  'PHUTHO': {
    en: { name: 'Phu Tho', region: 'Northern Vietnam', tag: 'Ancestral Specialty', desc: 'Ancestral land of Vietnam, famous for sweet Doan Hung pomelos and sour meat.' },
    ko: { name: '푸토', region: '베트남 북부', tag: '푸토 특산', desc: '베트남 건국의 발원지이자 달콤한 자몽과 전통 발효 특산품의 고장.' },
    zh: { name: '富寿', region: '越南北部', tag: '富寿名产', desc: '雄王肇基之祖地，盛产清甜段雄柚子与传统发酵风味肉食。' },
  },
  'BACNINH': {
    en: { name: 'Bac Ninh', region: 'Northern Vietnam', tag: 'Kinh Bac Specialty', desc: 'Cultural Kinh Bac region famous for Diem village sticky rice cakes.' },
    ko: { name: '박닌', region: '베트남 북부', tag: '박닌 특산', desc: '유서 깊은 낀박 문화의 중심지로 전통 떡과 전통 과자 명산지.' },
    zh: { name: '北宁', region: '越南北部', tag: '京北名产', desc: '千年京北古韵名邦，以传统手工艺糯米点心和名优糕点闻名。' },
  },
  'HUNGYEN': {
    en: { name: 'Hung Yen', region: 'Northern Vietnam', tag: 'Hung Yen Specialty', desc: 'Famed nationwide for sweet cage longans and lotus seed confections.' },
    ko: { name: '흥옌', region: '베트남 북부', tag: '흥옌 특산', desc: '달콤한 특산 롱간(용안육)과 연꽃씨 전통 다과로 유명한 고장.' },
    zh: { name: '兴安', region: '越南北部', tag: '兴安特产', desc: '名冠全越的兴安笼眼龙眼肉与御用天然莲子点心发源地。' },
  },
  'NINHBINH': {
    en: { name: 'Ninh Binh', region: 'Northern Vietnam', tag: 'Trang An Specialty', desc: 'Ancient capital renowned for crispy scorched rice and mountain goat meat.' },
    ko: { name: '닌빈', region: '베트남 북부', tag: '닌빈 특산', desc: '천혜의 자연경관과 고소한 바삭 누룽지 과자로 유명한 관광 명소.' },
    zh: { name: '宁平', region: '越南北部', tag: '长安特产', desc: '千年古都长安山水名胜地，以传统金黄香脆锅巴名点享誉全境。' },
  },
  'THANHHOA': {
    en: { name: 'Thanh Hoa', region: 'Central Vietnam', tag: 'Thanh Hoa Specialty', desc: 'Historical gateway province famous for sour pork rolls and gai cakes.' },
    ko: { name: '타인호아', region: '베트남 중부', tag: '타인호아 특산', desc: '베트남 전통 발효 넴추아와 전통 흑떡으로 유명한 역사 도시.' },
    zh: { name: '清化', region: '越南中部', tag: '清化特产', desc: '南北过渡历史枢纽，以独特的传统酸肉卷（Nem chua）和苎麻叶糕闻名。' },
  },
  'NGHEAN': {
    en: { name: 'Nghe An', region: 'Central Vietnam', tag: 'Nghe An Specialty', desc: 'Homeland of President Ho Chi Minh, famous for spicy eel and Cu Do peanut candy.' },
    ko: { name: '응에안', region: '베트남 중부', tag: '응에안 특산', desc: '호치민 주석의 고향이자 고소한 땅콩 엿과 중부 특색 요리의 산실.' },
    zh: { name: '乂安', region: '越南中部', tag: '乂安特产', desc: '胡志明主席故里，以香浓传统的古度花生糖（Cu Do）闻名遐迩。' },
  },
  'HATINH': {
    en: { name: 'Ha Tinh', region: 'Central Vietnam', tag: 'Ha Tinh Specialty', desc: 'Famous for authentic Cu Do peanut molasses candy and Phuc Trach pomelos.' },
    ko: { name: '하띤', region: '베트남 중부', tag: '하띤 특산', desc: '원조 꾸도 땅콩 캔디와 푹짝 자몽 등 전통 농특산물의 명산지.' },
    zh: { name: '河静', region: '越南中部', tag: '河静特产', desc: '传统古度花生麦芽糖发源地，拥有清甜特产福泽柚。' },
  },
  'QUANGTRI': {
    en: { name: 'Quang Tri', region: 'Central Vietnam', tag: 'Quang Tri Specialty', desc: 'Central province known for Khe Sanh coffee and herbal root wines.' },
    ko: { name: '꽝찌', region: '베트남 중부', tag: '꽝찌 특산', desc: '케산 고원 커피와 천연 약초로 빚은 전통주가 유명한 고장.' },
    zh: { name: '广治', region: '越南中部', tag: '广治特产', desc: '溪山温和高原咖啡产区，并以传统天然中草药养生特产著称。' },
  },
  'QUANGNGAI': {
    en: { name: 'Quang Ngai', region: 'Central Vietnam', tag: 'Quang Ngai Specialty', desc: 'Coastal province famous for Ly Son single-clove garlic and cane sugar candy.' },
    ko: { name: '꽝응아이', region: '베트남 중부', tag: '꽝응아이 특산', desc: '리선 섬 단일 마늘과 전통 사탕수수 결정체로 유명한 해안 지역.' },
    zh: { name: '广义', region: '越南中部', tag: '广义特产', desc: '以享誉海内外的李山独头蒜和传统纯手工甘蔗结晶糖闻名。' },
  },
  'GIALAI': {
    en: { name: 'Gia Lai', region: 'Central Vietnam', tag: 'Pleiku Specialty', desc: 'Highland province famous for Robusta coffee, dried beef with weaver ant salt.' },
    ko: { name: '잘라이', region: '베트남 중부', tag: '잘라이 특산', desc: '로부스타 커피와 전통 불개미 소금을 곁들인 쇠고기 육포 산지.' },
    zh: { name: '嘉莱', region: '越南中部', tag: '波来古特产', desc: '西原高原核心，盛产浓郁罗布斯塔咖啡与配黄蚁盐的特色干牛肉。' },
  },
  'KHANHHOA': {
    en: { name: 'Khanh Hoa (Nha Trang)', region: 'Central Vietnam', tag: 'Nha Trang Specialty', desc: 'Coastal paradise renowned for natural bird nest and sun-dried mangoes.' },
    ko: { name: '카인호아 (냐짱)', region: '베트남 중부', tag: '냐짱 특산', desc: '천연 제비집과 햇볕에 말린 망고 등 프리미엄 해양 특산물 중심지.' },
    zh: { name: '庆和 (芽庄)', region: '越南中部', tag: '芽庄名产', desc: '滨海度假胜地，以野生纯正金丝燕窝及天然日晒芒果干闻名。' },
  },
  'DAKLAK': {
    en: { name: 'Dak Lak (Buon Ma Thuot)', region: 'Central Vietnam', tag: 'Coffee Capital', desc: 'World-famous coffee capital of Vietnam, producing rich Robusta and pepper.' },
    ko: { name: '닥락 (부온마투옷)', region: '베트남 중부', tag: '커피 수도', desc: '세계적으로 유명한 베트남 커피의 수도로 진한 로부스타와 후추 산지.' },
    zh: { name: '多乐 (邦美蜀)', region: '越南中部', tag: '咖啡之都', desc: '享誉全球的越南咖啡之都，以浓香醇厚的罗布斯塔咖啡与胡椒闻名。' },
  },
  'DONGNAI': {
    en: { name: 'Dong Nai', region: 'Southern Vietnam', tag: 'Dong Nai Specialty', desc: 'Agricultural manufacturing hub known for Tan Trieu pomelos and roasted cashews.' },
    ko: { name: '동나이', region: '베트남 남부', tag: '동나이 특산', desc: '탄찌에우 자몽과 고소한 볶은 캐슈넛으로 널리 알려진 남부 산업 중심.' },
    zh: { name: '同奈', region: '越南南部', tag: '同奈特产', desc: '南部现代农业加工枢纽，以新潮柚子与香脆原味烤腰果著称。' },
  },
  'VINHLONG': {
    en: { name: 'Vinh Long', region: 'Southern Vietnam', tag: 'Vinh Long Specialty', desc: 'Mekong orchard province renowned for sweet Nam Roi pomelos and sweet potatoes.' },
    ko: { name: '빈롱', region: '베트남 남부', tag: '빈롱 특산', desc: '비옥한 메콩 과수원으로 남로이 자몽과 달콤한 고구마 산지.' },
    zh: { name: '永隆', region: '越南南部', tag: '永隆特产', desc: '湄公河平原沃土果园，以清甜爽口的五代柚（Nam Roi）闻名。' },
  },
  'DONGTHAP': {
    en: { name: 'Dong Thap', region: 'Southern Vietnam', tag: 'Dong Thap Specialty', desc: 'Land of pink lotus flowers, famous for Sa Giang shrimp chips and lotus snacks.' },
    ko: { name: '동탑', region: '베트남 남부', tag: '동탑 특산', desc: '연꽃의 고장으로 유명한 사지앙 새우칩과 연꽃씨 스낵의 발원지.' },
    zh: { name: '同塔', region: '越南南部', tag: '同塔特产', desc: '莲花水乡名胜地，盛产享誉国际的沙江特产鲜虾片与天然脆莲子。' },
  },
  'CAMAU': {
    en: { name: 'Ca Mau', region: 'Southern Vietnam', tag: 'Ca Mau Specialty', desc: 'Southernmost tip of Vietnam, renowned for sea crab and dried giant tiger shrimp.' },
    ko: { name: '까마우', region: '베트남 남부', tag: '까마우 특산', desc: '베트남 최남단 청정 갯벌로 명품 맹그로브 게와 자연산 건새우 산지.' },
    zh: { name: '金瓯', region: '越南南部', tag: '金瓯特产', desc: '越南最南端岬角海湾，以高品质红树林膏蟹与天然海捕大虾干闻名。' },
  },
  'ANGIANG': {
    en: { name: 'An Giang', region: 'Southern Vietnam', tag: 'That Son Specialty', desc: 'Border province famous for Chau Doc fish sauce and Palmyra palm sugar.' },
    ko: { name: '안장', region: '베트남 남부', tag: '안장 특산', desc: '쩌우독 전통 어간장과 달콤한 천연 야자당(Thot Not)의 본고장.' },
    zh: { name: '安江', region: '越南南部', tag: '七山特产', desc: '湄公河上游边贸要地，以朱笃特色传统鱼露与纯正天然棕榈糖闻名。' },
  },
  'HOANGSA': {
    en: { name: 'Hoang Sa (Paracel Islands)', region: 'Central Vietnam', tag: 'Sea Specialty', desc: 'Sacred island territory of Vietnam with pristine marine resources.' },
    ko: { name: '황사 군도', region: '베트남 중부', tag: '해양 특산', desc: '청정 해양 자원을 간직한 베트남의 신성한 도서 영토.' },
    zh: { name: '黄沙群岛', region: '越南中部', tag: '海疆特产', desc: '越南神圣海疆群岛，蕴藏丰饶纯净的海洋渔业资源。' },
  },
  'TRUONGSA': {
    en: { name: 'Truong Sa (Spratly Islands)', region: 'Central Vietnam', tag: 'Island Specialty', desc: 'Sacred island territory of Vietnam rich in deep-sea treasures.' },
    ko: { name: '쯔엉사 군도', region: '베트남 중부', tag: '도서 특산', desc: '풍요로운 심해 자원을 품은 베트남의 신성한 도서 영토.' },
    zh: { name: '长沙群岛', region: '越南中部', tag: '海疆特产', desc: '越南神圣海疆群岛，拥有丰富的深海纯净天然水产资源。' },
  },
}

export const PROVINCE_NAME_LOOKUP = {
  // Codes
  'hanoi': 'HANOI',
  'haiphong': 'HAIPHONG',
  'tthue': 'TTHUE',
  'hue': 'HUE',
  'danang': 'DANANG',
  'hcm': 'HCM',
  'cantho': 'CANTHO',
  'caobang': 'CAOBANG',
  'dienbien': 'DIENBIEN',
  'laichau': 'LAICHAU',
  'langson': 'LANGSON',
  'quangninh': 'QUANGNINH',
  'sonla': 'SONLA',
  'tuyenquang': 'TUYENQUANG',
  'laocai': 'LAOCAI',
  'thainguyen': 'THAINGUYEN',
  'phutho': 'PHUTHO',
  'bacninh': 'BACNINH',
  'hungyen': 'HUNGYEN',
  'ninhbinh': 'NINHBINH',
  'thanhhoa': 'THANHHOA',
  'nghean': 'NGHEAN',
  'hatinh': 'HATINH',
  'quangtri': 'QUANGTRI',
  'quangngai': 'QUANGNGAI',
  'gialai': 'GIALAI',
  'khanhhoa': 'KHANHHOA',
  'lamdong': 'LAMDONG',
  'daklak': 'DAKLAK',
  'dongnai': 'DONGNAI',
  'tayninh': 'TAYNINH',
  'vinhlong': 'VINHLONG',
  'dongthap': 'DONGTHAP',
  'camau': 'CAMAU',
  'angiang': 'ANGIANG',
  'haiduong': 'HAIDUONG',
  'bentre': 'BENTRE',
  'bacgiang': 'BACGIANG',
  'hoangsa': 'HOANGSA',
  'truongsa': 'TRUONGSA',

  // Names Vietnamese
  'hà nội': 'HANOI',
  'hải phòng': 'HAIPHONG',
  'hải dương': 'HAIDUONG',
  'tây ninh': 'TAYNINH',
  'bến tre': 'BENTRE',
  'bắc giang': 'BACGIANG',
  'lâm đồng': 'LAMDONG',
  'đà lạt': 'LAMDONG',
  'đà nẵng': 'DANANG',
  'thừa thiên huế': 'TTHUE',
  'huế': 'HUE',
  'thành phố hồ chí minh': 'HCM',
  'tp. hồ chí minh': 'HCM',
  'tp hồ chí minh': 'HCM',
  'hồ chí minh': 'HCM',
  'cần thơ': 'CANTHO',
  'cao bằng': 'CAOBANG',
  'điện biên': 'DIENBIEN',
  'lai châu': 'LAICHAU',
  'lạng sơn': 'LANGSON',
  'quảng ninh': 'QUANGNINH',
  'sơn la': 'SONLA',
  'tuyên quang': 'TUYENQUANG',
  'lào cai': 'LAOCAI',
  'thái nguyên': 'THAINGUYEN',
  'phú thọ': 'PHUTHO',
  'bắc ninh': 'BACNINH',
  'hưng yên': 'HUNGYEN',
  'ninh bình': 'NINHBINH',
  'thanh hóa': 'THANHHOA',
  'nghệ an': 'NGHEAN',
  'hà tĩnh': 'HATINH',
  'quảng trị': 'QUANGTRI',
  'quảng ngãi': 'QUANGNGAI',
  'gia lai': 'GIALAI',
  'khánh hòa': 'KHANHHOA',
  'nha trang': 'KHANHHOA',
  'đắk lắk': 'DAKLAK',
  'buôn ma thuột': 'DAKLAK',
  'đồng nai': 'DONGNAI',
  'vĩnh long': 'VINHLONG',
  'đồng tháp': 'DONGTHAP',
  'cà mau': 'CAMAU',
  'an giang': 'ANGIANG',
  'hoàng sa': 'HOANGSA',
  'trường sa': 'TRUONGSA',
}

// =============================================================================
// 5. TỪ ĐIỂN VÀ ENGINE BẢN ĐỊA HÓA BÀI VIẾT / TIN TỨC (NEWS & ARTICLES)
// =============================================================================
export const NEWS_CATEGORIES_I18N = {
  'Tất cả': { vi: 'Tất cả', en: 'All News', ko: '전체 소식', zh: '全部资讯' },
  'Tin tức': { vi: 'Tin tức', en: 'News & Updates', ko: '뉴스 및 소식', zh: '新闻动态' },
  'Tuyển dụng': { vi: 'Tuyển dụng', en: 'Careers & Recruitment', ko: '채용 정보', zh: '人才招聘' },
  'Thông cáo báo chí': { vi: 'Thông cáo báo chí', en: 'Press Releases', ko: '보도자료', zh: '企业快讯' },
  'Thị trường & Xuất khẩu': { vi: 'Thị trường & Xuất khẩu', en: 'Market & Global Trade', ko: '시장 및 글로벌 유통', zh: '市场与外贸出口' },
  'Sự kiện & Hoạt động': { vi: 'Sự kiện & Hoạt động', en: 'Events & Exhibitions', ko: '행사 및 전시회', zh: '展会活动与企业纪实' },
  'Chứng nhận & Tiêu chuẩn': { vi: 'Chứng nhận & Tiêu chuẩn', en: 'Certifications & Standards', ko: '인증 및 식품 안전 규격', zh: '认证与国际食品标准' },
  'Chính sách Đại lý': { vi: 'Chính sách Đại lý', en: 'Distributor & Partner Policy', ko: '대리점 및 파트너 정책', zh: '代理加盟与合作政策' },
  'Sản phẩm mới': { vi: 'Sản phẩm mới', en: 'New Product Releases', ko: '신제품 출시', zh: '新品发布' },
}

export function translateNewsCategory(category, language = 'vi') {
  if (!category || language === 'vi') return category || 'Tin tức'
  const trimmed = category.trim()
  const match = NEWS_CATEGORIES_I18N[trimmed]
  if (match && match[language]) return match[language]
  return trimmed
}

export const NEWS_I18N = {
  'hoi-cho-xuc-tien-thuong-mai-viet-trung-2025': {
    en: {
      title: 'HAQ FOOD Participates in the 2025 International Agri-Food Trade Promotion Expo',
      summary: 'Showcasing high-tech crispy baked rice paper and export-grade almond pastries to over 500 international buyers and partners.',
      author: 'HAQ FOOD Media Team',
    },
    ko: {
      title: 'HAQ FOOD, 2025 국제 농식품 무역 촉진 박람회 참가',
      summary: '500여 개 글로벌 바이어 및 유통 파트너를 대상으로 첨단 대류 건조 라이스페이퍼 및 수출 규격 아몬드 페이스트리 제품군 소개.',
      author: 'HAQ FOOD 미디어팀',
    },
    zh: {
      title: 'HAQ FOOD 亮相 2025 国际农食农特产品贸易促进博览会',
      summary: '向海内外逾 500 家采购商与进口贸易代表展示自动化烘干酥脆米纸系列及符合出口标准的香脆杏仁饼。',
      author: 'HAQ FOOD 官方媒体部',
    },
  },
  'nang-cap-day-chuyen-say-nong-2025': {
    en: {
      title: 'HAQ FOOD Expands Automated Convective Drying System Meeting ISO 22000 Standards',
      summary: 'Significant capital investment into advanced temperature-controlled cleanroom drying systems, boosting production capacity by 40%.',
      author: 'HAQ FOOD Media Team',
    },
    ko: {
      title: 'HAQ FOOD, ISO 22000 인증 스마트 자동 대류 건조 라인 확장 투자',
      summary: '온·습도 정밀 제어 클린룸 건조 설비 구축을 통해 생산 능력을 40% 이상 확충하고 글로벌 품질 기준 강화.',
      author: 'HAQ FOOD 미디어팀',
    },
    zh: {
      title: 'HAQ FOOD 斥资扩建符合 ISO 22000 国际认证的智能自动化热风烘干生产线',
      summary: '引进恒温恒湿洁净烘干车间，产能提升达 40%，以现代化技术全面赋能大宗代工与海外出口。',
      author: 'HAQ FOOD 官方媒体部',
    },
  },
  'mo-rong-xuat-khau-sang-thi-truong-dai-loan': {
    en: {
      title: 'Export Consignment of Almond Pastries & Mung Bean Cakes Shipped to Taiwan Market',
      summary: 'Marking an important milestone in expanding HAQ FOOD retail footprint across key East Asian markets with full international compliance.',
      author: 'HAQ FOOD Media Team',
    },
    ko: {
      title: 'HAQ FOOD 아몬드 페이스트리 및 신선 녹두 케이크, 대만 시장 수출 선적 완료',
      summary: '엄격한 국제 식품 안전 규격을 통과하여 아시아 주요 유통 시장 진출을 가속화하는 중요한 이정표 달성.',
      author: 'HAQ FOOD 미디어팀',
    },
    zh: {
      title: 'HAQ FOOD 香脆杏仁饼与传统新鲜绿豆糕集装箱大宗出口交付中国台湾市场',
      summary: '严格通过海外海关检疫与国际食品安全标准检验，标志着品牌在东亚及东南亚市场的纵深拓展。',
      author: 'HAQ FOOD 官方媒体部',
    },
  },
}

export function getLocalizedNews(item, language = 'vi') {
  if (!item) return item
  if (language === 'vi') return item

  // 1. Check explicit multi-lang DB columns
  const langKey = language.toLowerCase()
  const dbTitle = item[`title_${langKey}`] || item[`${langKey}_title`] || item.title_trans?.[langKey]
  const dbSummary = item[`summary_${langKey}`] || item[`${langKey}_summary`] || item.summary_trans?.[langKey]
  const dbContent = item[`content_${langKey}`] || item[`${langKey}_content`] || item.content_trans?.[langKey]

  // 2. Check local dictionary
  const slug = (item.slug || '').toLowerCase().trim()
  const dict = NEWS_I18N[slug]?.[language]

  const resolvedTitle = dbTitle || dict?.title || item.title
  const resolvedSummary = dbSummary || dict?.summary || item.summary
  const resolvedContent = dbContent || item.content

  // Category
  const resolvedCat = translateNewsCategory(item.category, language)

  // Author
  let resolvedAuthor = item.author
  if (item.author && item.author.toLowerCase().includes('haq food')) {
    if (language === 'en') resolvedAuthor = 'HAQ FOOD Media Team'
    else if (language === 'ko') resolvedAuthor = 'HAQ FOOD 미디어팀'
    else if (language === 'zh') resolvedAuthor = 'HAQ FOOD 官方媒体部'
  }

  return {
    ...item,
    title: resolvedTitle,
    summary: resolvedSummary,
    content: resolvedContent,
    category: resolvedCat,
    author: resolvedAuthor,
  }
}

// =============================================================================
// 6. CÁC HÀM XỬ LÝ CHÍNH (MAIN HELPER EXPORTS)
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
    } else if (nameLower.includes('thịt khô') || nameLower.includes('thịt')) {
      translation = CATEGORY_I18N['thit-kho']?.[language]
    } else if (nameLower.includes('bắp rang') || nameLower.includes('bap rang')) {
      translation = CATEGORY_I18N['bap-rang-bo']?.[language]
    } else if (nameLower.includes('hạnh nhân')) {
      translation = CATEGORY_I18N['banh-hanh-nhan']?.[language]
    } else if (nameLower.includes('bánh sữa')) {
      translation = CATEGORY_I18N['banh-sua']?.[language]
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
  if (nameLower.includes('bắp rang') || nameLower.includes('popcorn')) {
    return PRODUCT_I18N['bap-rang-bo-caramel']?.[language]
  }
  if (nameLower.includes('hạnh nhân') || nameLower.includes('almond')) {
    return PRODUCT_I18N['banh-hanh-nhan']?.[language]
  }
  if (nameLower.includes('bánh sữa') || nameLower.includes('sữa dừa')) {
    return PRODUCT_I18N['banh-sua-dua']?.[language]
  }

  return null
}

/**
 * Bản địa hóa một Product object
 * Đảm bảo dịch trung thực 1:1 từ dữ liệu Supabase Database,
 * bao gồm tên, mô tả, danh mục, tag, highlights, shelf life, bảo quản, thành phần, và variants.
 */
export function getLocalizedProduct(product, language = 'vi') {
  if (!product) return product
  if (language === 'vi') return product

  const translation = findProductTranslation(product, language)

  // Translate nested category if exists
  const localizedCat = product.categories
    ? getLocalizedCategory(product.categories, language)
    : product.categories

  // Translate category string
  const resolvedCategory = localizedCat?.name || translateCategoryName(product.category, language) || product.category

  // Translate nested province if exists
  const localizedProv = product.provinces
    ? getLocalizedProvince(product.provinces, language)
    : product.provinces

  // Translate variants
  const localizedVariants = (product.variants || []).map((v) => ({
    ...v,
    size: translateVariantSize(v.size, language),
    pack: translateVariantPack(v.pack, language),
    shelf: translateVariantShelf(v.shelf, language),
  }))

  // Translate highlights
  const rawHighlights = Array.isArray(product.highlights) ? product.highlights : []
  const localizedHighlights = rawHighlights.map((hl) => translateHighlight(hl, language))

  // Determine localized name:
  let resolvedName = product.name
  if (translation?.name) {
    resolvedName = translation.name
  } else if (language === 'en' && product.en_name) {
    resolvedName = product.en_name
  }

  // Determine localized description:
  let resolvedDesc = ''
  if (product.description && product.description.trim() !== '') {
    resolvedDesc = translation?.desc || product.description
  } else if (translation?.desc) {
    resolvedDesc = translation.desc
  }

  // Shelf life
  const resolvedShelfLife = translateShelfLife(product.shelf_life, language)

  // Storage guide
  const resolvedStorageGuide = translateStorageGuide(product.storage_guide, language)

  // Ingredients
  const resolvedIngredients = translateIngredients(product.ingredients, language, product.slug || product.name)

  // Tag
  const resolvedTag = translateTag(product.tag, language)

  // Certifications
  const resolvedCertifications = translateCertifications(product.certifications, language)

  return {
    ...product,
    name: resolvedName,
    en_name: product.en_name || '',
    category: resolvedCategory,
    description: resolvedDesc,
    short_description: resolvedDesc,
    tag: resolvedTag,
    highlights: localizedHighlights,
    packaging_spec: product.packaging_spec,
    shelf_life: resolvedShelfLife,
    storage_guide: resolvedStorageGuide,
    ingredients: resolvedIngredients,
    certifications: resolvedCertifications,
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
  const resolvedCode = code || PROVINCE_NAME_LOOKUP[nameNorm] || PROVINCE_NAME_LOOKUP[(province.code || '').toLowerCase()] || ''

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
