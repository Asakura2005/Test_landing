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
  'banh-cookies': {
    en: {
      name: 'Cookies & Butter Biscuits',
      shortName: 'Cookies',
      desc: 'Premium crispy butter cookies and chocolate biscuits meeting export standards.',
      featured: 'Butter Cookies Selection',
      featuredDesc: 'Golden buttery aroma baked with fine Danish-style recipe.',
    },
    ko: {
      name: '쿠키 및 비스킷',
      shortName: '쿠키',
      desc: '엄선된 프리미엄 버터 쿠키 및 초콜릿 비스킷 컬렉션.',
      featured: '버터 쿠키 셀렉션',
      featuredDesc: '진한 버터 향과 바삭한 식감의 고급 유러피언 레시피 쿠키.',
    },
    zh: {
      name: '精品曲奇与脆饼',
      shortName: '曲奇',
      desc: '精选上等黄油曲奇与浓郁风味饼干，完全符合严苛出口规范。',
      featured: '精选黄油曲奇礼盒',
      featuredDesc: '色泽金黄诱人，浓醇黄油香气扑鼻，酥脆可口。',
    },
  },
  'banh-cha': {
    en: {
      name: 'Traditional Banh Cha (Crispy Pastry)',
      shortName: 'Banh Cha',
      desc: 'Traditional Hanoi delicacy with lime leaves, candied winter melon, and aromatic spices.',
      featured: 'Traditional Crispy Banh Cha',
      featuredDesc: 'Heritage recipe with authentic Hanoi flavors and delightful crunch.',
    },
    ko: {
      name: '전통 반짜 (라임잎 포크 페이스트리)',
      shortName: '반짜',
      desc: '신선한 라임잎과 동아정과, 천연 향신료가 어우러진 하노이 전통 과자.',
      featured: '전통 바삭 반짜',
      featuredDesc: '하노이 정통 비법으로 구워낸 고소하고 바삭한 전통의 맛.',
    },
    zh: {
      name: '河内传统风味脆饼 (Bánh Chả)',
      shortName: '传统脆饼',
      desc: '河内百年传统名点，融合柠檬叶清香、糖冬瓜与精炼配料精心烘烤。',
      featured: '古传风味香脆 Bánh Chả',
      featuredDesc: '纯正地道河内老风味，咸甜酥香，余味悠长。',
    },
  },
  'do-an-vat-cach-tan': {
    en: {
      name: 'Innovative Modern Snacks',
      shortName: 'Innovative Snacks',
      desc: 'Creative fusion snacks combining Vietnamese culinary heritage with modern convective drying tech.',
      featured: 'HAQ Innovative Snacks',
      featuredDesc: 'Healthy, low-oil crispy snacks with modern appetizing seasonings.',
    },
    ko: {
      name: '혁신 퓨전 스낵',
      shortName: '퓨전 스낵',
      desc: '베트남 전통 미식과 현대식 대류 건조 기술을 융합한 창의적인 스낵 라인업.',
      featured: 'HAQ 혁신 퓨전 스낵',
      featuredDesc: '기름기를 줄이고 원재료 본연의 바삭함을 살린 현대적인 웰빙 스낵.',
    },
    zh: {
      name: '创新风味休闲零食',
      shortName: '创新零食',
      desc: '传统越南美食灵魂与现代化热风烘干工艺的创意融合。',
      featured: 'HAQ 创新休闲零食系列',
      featuredDesc: '低油减负，健康香脆，满足年轻一代挑剔味蕾。',
    },
  },
  'do-an-vat-hien-dai': {
    en: {
      name: 'Modern Trendy Snacks',
      shortName: 'Modern Snacks',
      desc: 'On-trend snacks crafted for modern lifestyles, including gourmet popcorn and crispy rice paper.',
      featured: 'Modern Snack Collection',
      featuredDesc: 'Convenient ready-to-eat snacks meeting ISO 22000 & HACCP standards.',
    },
    ko: {
      name: '트렌디 현대 스낵',
      shortName: '현대 스낵',
      desc: '팝콘, 바삭 라이스페이퍼 등 현대인의 라이프스타일에 맞춘 트렌디 스낵.',
      featured: '모던 스낵 컬렉션',
      featuredDesc: 'ISO 22000 및 HACCP 인증 설비에서 생산되는 위생적이고 편리한 간식.',
    },
    zh: {
      name: '现代潮流休闲零食',
      shortName: '潮流零食',
      desc: '专为现代快节奏生活打造的高品质爆米花、酥脆烘烤米纸等便携零食。',
      featured: '现代潮流零食精选',
      featuredDesc: '严格遵循 ISO 22000 与 HACCP 国际食品规范，开袋即享。',
    },
  },
  'do-an-vat-truyen-thong': {
    en: {
      name: 'Traditional Heritage Snacks',
      shortName: 'Traditional Snacks',
      desc: 'Quintessential Vietnamese delicacies preserving generational culinary heritage.',
      featured: 'Heritage Snack Treasures',
      featuredDesc: 'Pure natural ingredients capturing the authentic soul of Vietnamese food culture.',
    },
    ko: {
      name: '베트남 전통 특산 스낵',
      shortName: '전통 스낵',
      desc: '세대를 이어 전해 내려온 베트남 전통 명가 간식 및 특산 디저트.',
      featured: '전통 특산 스낵 명품',
      featuredDesc: '순수 천연 원료로 빚어낸 베트남 고유의 풍미와 정취.',
    },
    zh: {
      name: '传统地道农特零食',
      shortName: '传统零食',
      desc: '传承世代经典工艺，汇聚纯正越南各省地道传统名点与伴手礼。',
      featured: '传统风味精选代表',
      featuredDesc: '纯天然精选原料，承载浓厚地道的越南传统饮食文化灵魂。',
    },
  },
}

export function translateCategoryName(catName, language = 'vi') {
  if (!catName || language === 'vi') return catName
  const lower = catName.trim().toLowerCase()
  // Direct key lookup
  if (CATEGORY_I18N[lower]?.[language]?.name) {
    return CATEGORY_I18N[lower][language].name
  }
  if (lower.includes('sấy giòn') || lower.includes('bánh tráng sấy') || lower.includes('banh-trang-say')) {
    return CATEGORY_I18N['banh-trang-say-gion']?.[language]?.name || catName
  }
  if (lower.includes('trộn') || lower.includes('banh-trang-tron')) {
    return CATEGORY_I18N['banh-trang-tron']?.[language]?.name || catName
  }
  if (lower.includes('bánh tráng') || lower.includes('banh-trang')) {
    return CATEGORY_I18N['banh-trang']?.[language]?.name || catName
  }
  if (lower.includes('đậu xanh') || lower.includes('dau-xanh')) {
    return CATEGORY_I18N['banh-dau-xanh']?.[language]?.name || catName
  }
  if (lower.includes('bắp rang') || lower.includes('bap-rang') || lower.includes('popcorn')) {
    return CATEGORY_I18N['bap-rang-bo']?.[language]?.name || catName
  }
  if (lower.includes('hạnh nhân') || lower.includes('hanh-nhan')) {
    return CATEGORY_I18N['banh-hanh-nhan']?.[language]?.name || catName
  }
  if (lower.includes('bánh sữa') || lower.includes('banh-sua')) {
    return CATEGORY_I18N['banh-sua']?.[language]?.name || catName
  }
  if (lower.includes('bánh dẻo') || lower.includes('banh-deo')) {
    return CATEGORY_I18N['banh-deo']?.[language]?.name || catName
  }
  if (lower.includes('thịt khô') || lower.includes('thịt') || lower.includes('thit-kho')) {
    return CATEGORY_I18N['thit-kho']?.[language]?.name || catName
  }
  if (lower.includes('cookie')) {
    return CATEGORY_I18N['banh-cookies']?.[language]?.name || catName
  }
  if (lower.includes('chả') || lower.includes('banh-cha')) {
    return CATEGORY_I18N['banh-cha']?.[language]?.name || catName
  }
  if (lower.includes('cách tân') || lower.includes('cach-tan')) {
    return CATEGORY_I18N['do-an-vat-cach-tan']?.[language]?.name || catName
  }
  if (lower.includes('hiện đại') || lower.includes('hien-dai')) {
    return CATEGORY_I18N['do-an-vat-hien-dai']?.[language]?.name || catName
  }
  if (lower.includes('truyền thống') || lower.includes('truyen-thong')) {
    return CATEGORY_I18N['do-an-vat-truyen-thong']?.[language]?.name || catName
  }
  if (lower.includes('các loại bánh') || lower.includes('cac-loai-banh')) {
    return CATEGORY_I18N['cac-loai-banh']?.[language]?.name || catName
  }
  if (lower.includes('bánh khác') || lower.includes('banh-khac')) {
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
  'banh-trang-say-gion-vi-cha-bong': {
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
  'banh-trang-say-gion-vi-sa-te-bo': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Spicy Beef Satay Flavor)',
      desc: 'Crispy convective-dried rice paper coated with rich lemongrass beef satay and warm chili seasonings for an intensely savory, crunchy bite.',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (소고기 사테맛)',
      desc: '바삭한 대류 열풍 건조 라이스페이퍼에 매콤한 소고기 사테 양념과 천연 향신료가 조화를 이루어 씹을수록 감칠맛이 폭발합니다.',
    },
    zh: {
      name: 'HOKI - 酥脆烘烤米纸 (香辣沙爹牛肉味)',
      desc: '对流热风烘干工艺制作的超脆米纸，融入浓郁沙爹牛肉风味与精调辛香料，咸香微辣，香脆爽口。',
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

  // 4. Bánh tráng sấy giòn vị phô mai
  'banh-trang-say-gion-phomai': {
    en: {
      name: 'HOKI - Crispy Baked Rice Paper (Cheese Flavor)',
      desc: 'Crispy convective-dried rice paper generously dusted with savory cheddar cheese powder and golden crispy shallots, delivering a delicious fusion crunch.',
    },
    ko: {
      name: 'HOKI - 바삭 구운 라이스페이퍼 (치즈맛)',
      desc: '바삭한 대류 열풍 건조 라이스페이퍼에 고소하고 짭조름한 프리미엄 치즈 파우더를 듬뿍 뿌린 현대적인 퓨전 스낵입니다.',
    },
    zh: {
      name: 'HOKI - 酥脆烘烤米纸 (芝士味)',
      desc: '精细热风烘烤的超脆米纸，满撒香浓微咸芝士粉，搭配金黄炸葱酥，西式风味与传统米纸的惊艳碰撞。',
    },
  },

  // 5. Bánh tráng sấy thực cẩm
  'banh-trang-say-thuc-cam': {
    en: {
      name: 'HOKI - Multi-Flavor Savory Baked Rice Paper',
      desc: 'Crispy baked rice paper enriched with dried shrimp floss, annatto oil, dried scallions, and fried garlic for a harmonious burst of Vietnamese street flavors.',
    },
    ko: {
      name: 'HOKI - 멀티 플레이버 바삭 구운 라이스페이퍼',
      desc: '말린 새우 보푸라기, 아나토 오일, 건조 쪽파와 튀긴 마늘 등 다채로운 전통 양념이 한데 어우러져 풍성한 풍미를 전합니다.',
    },
    zh: {
      name: 'HOKI - 什锦多风味酥脆烘烤米纸',
      desc: '荟萃精选鲜虾松、胭脂树油、脱水香葱段与香炸蒜粒，色泽诱人，咸香酥脆，风味层次极为丰富。',
    },
  },

  // 6. Bánh tráng trộn gà lá chanh
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

  // 7. Bánh tráng trộn sợi sa tế tôm
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
  'banh-trang-tron-vi-sa-te-tom': {
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

  // 8. Bánh tráng trộn sa tế bò
  'banh-trang-tron-sa-te-bo': {
    en: {
      name: 'HOKI - Shredded Rice Paper with Spicy Beef Satay',
      desc: 'Chewy shredded rice paper coated with savory lemongrass beef satay sauce, crispy fried shallots, and warm Vietnamese street seasonings.',
    },
    ko: {
      name: 'HOKI - 소고기 사테 비빔 라이스페이퍼',
      desc: '쫄깃한 라이스페이퍼에 매콤향긋한 레몬그라스 소고기 사테 양념과 바삭한 샬롯이 어우러져 깊고 진한 감칠맛을 전합니다.',
    },
    zh: {
      name: 'HOKI - 香辣牛肉沙爹拌米纸',
      desc: '招牌韧道米纸丝，浸润香浓香茅牛肉沙爹酱汁，配以香脆葱酥，香辣醇厚，还原纯正越南街头特色风味。',
    },
  },

  // 9. Bắp rang bơ phô mai
  'bap-rang-bo-vi-pho-mai': {
    en: {
      name: 'HOKI - Savory Cheddar Cheese Popcorn',
      desc: 'Gourmet popped corn coated with rich savory cheddar cheese seasoning. Perfectly crispy, delivering a mouthwatering melt-in-the-mouth cheesy crunch.',
    },
    ko: {
      name: 'HOKI - 체다 치즈 팝콘',
      desc: '진하고 고소한 프리미엄 체다 치즈 시즈닝을 듬뿍 입힌 고소하고 바삭한 팝콘. 한 입 가득 퍼지는 풍부한 치즈 풍미가 매력적인 프리미엄 스낵.',
    },
    zh: {
      name: 'HOKI - 浓香芝士风味爆米花',
      desc: '精选高膨化度玉米粒，裹满醇厚香浓的切达芝士粉。金黄诱人，咸香酥脆，每一口都是浓郁回味的芝士盛宴。',
    },
  },

  // 10. Bắp rang bơ caramel
  'bap-rang-bo-caramel': {
    en: {
      name: 'HOKI - Caramel Butter Popcorn',
      desc: 'Gourmet popped corn glazed with sweet rich caramel butter, delightfully crunchy in every kernel.',
    },
    ko: {
      name: 'HOKI - 카라멜 버터 팝콘',
      desc: '고소한 버터와 달콤한 카라멜 코팅을 입혀 한 알 한 알 바삭함이 살아있는 프리미엄 팝콘입니다.',
    },
    zh: {
      name: 'HOKI - 焦糖黄油爆米花',
      desc: '高膨化精选爆米花，裹以浓郁香甜的焦糖黄油脆皮糖衣，粒粒香脆醇厚。',
    },
  },

  // 11. Bắp rang bơ matcha
  'bap-rang-bo-matcha': {
    en: {
      name: 'HOKI - Japanese Matcha Green Tea Popcorn',
      desc: 'Crispy puffed corn coated with genuine green tea matcha glaze, offering a delicate herbal aroma and balanced sweet-earthy finish.',
    },
    ko: {
      name: 'HOKI - 말차 녹차 팝콘',
      desc: '은은하고 깊은 풍미의 천연 말차 파우더와 고소한 버터가 조화롭게 어우러진 산뜻하고 바삭한 프리미엄 그린티 팝콘.',
    },
    zh: {
      name: 'HOKI - 日式抹茶风味爆米花',
      desc: '严选优质天然抹茶粉微苦回甘的纯正茶韵，与酥脆爆米花巧妙交融，清甜甘醇，茶香四溢。',
    },
  },

  // 12. Bắp rang bơ vị truyền thống
  'bap-rang-bo-vi-truyen-thong': {
    en: {
      name: 'HOKI - Classic Sweet Butter Popcorn',
      desc: 'Perfectly popped corn kernels lightly sweetened and tossed with pure creamy butter and a pinch of fine salt.',
    },
    ko: {
      name: 'HOKI - 오리지널 스위트 버터 팝콘',
      desc: '순수 천연 버터와 알맞은 단맛이 어우러져 남녀노소 누구나 질리지 않고 즐길 수 있는 클래식 오리지널 팝콘.',
    },
    zh: {
      name: 'HOKI - 原味经典黄油爆米花',
      desc: '选用优质玉米粒爆裂成型，裹以醇香天然黄油与微甜糖衣，香甜酥脆，回味纯净。',
    },
  },

  // 13. Bánh cookies
  'banh-cookies': {
    en: {
      name: 'HAQ - Premium Butter Cookies Selection',
      desc: 'Crispy, golden artisan cookies baked with rich dairy butter and fine wheat flour. Perfectly flaky texture that pairs exquisitely with tea or coffee.',
    },
    ko: {
      name: 'HAQ - 프리미엄 버터 쿠키 컬렉션',
      desc: '고급 천연 버터와 엄선된 밀가루로 정성껏 구워낸 황금빛 쿠키. 입안 가득 퍼지는 부드러운 버터 향과 기분 좋은 바삭함이 일품입니다.',
    },
    zh: {
      name: 'HAQ - 精品黄油曲奇饼干',
      desc: '严选优质天然黄油与精制小麦粉精心烘焙，色泽金黄，奶香浓郁，口感酥松轻盈，茶歇相伴的上乘点心。',
    },
  },

  // 14. Bánh sữa đậu
  'banh-sua-dau': {
    en: {
      name: 'HAQ - Soy Milk & Butter Soft Pastries',
      desc: 'Soft and delicate traditional pastries crafted from pure soybeans and creamy dairy butter. Mildly sweet with a comforting, natural aroma.',
    },
    ko: {
      name: 'HAQ - 두유 버터 소프트 페이스트리' ,
      desc: '순수 대두의 고소함과 신선한 버터 풍미가 조화롭게 어우러진 부드러운 전통 디저트. 은은한 단맛과 편안한 풍미가 특징입니다.',
    },
    zh: {
      name: 'HAQ - 传统鲜香豆乳酥点',
      desc: '选用天然优质大豆配合醇正黄油慢火制作，豆香醇正悠远，奶香细腻，软糯适口，甜度温和。',
    },
  },

  // 15. Bánh sữa dừa
  'banh-sua-dua': {
    en: {
      name: 'HAQ - Ben Tre Coconut Milk Cake',
      desc: 'Traditional Mekong Delta delicacy crafted with pure aromatic coconut milk, offering delicate natural sweetness.',
    },
    ko: {
      name: 'HAQ - 벤째 코코넛 밀크 케이크',
      desc: '메콩델타산 신선한 순수 코코넛 밀크로 정성껏 빚어낸 진하고 고소한 풍미의 전통 특산 과자.',
    },
    zh: {
      name: 'HAQ - 槟椥天然椰奶香糕',
      desc: '选用湄公河三角洲优质天然椰浆古法熬制，椰香浓郁悠长，甘醇软糯。',
    },
  },

  // 16. Bánh dẻo khoai môn mochi chà bông trứng muối
  'banh-deo-khoai-mon-mochi-cha-bong-trung-muoi': {
    en: {
      name: 'HAQ - Taro Mochi Pastry with Pork Floss & Salted Egg',
      desc: 'Multi-layered artisan pastry filled with fragrant taro paste, chewy mochi, savory pork floss, and rich salted egg yolk. A harmonious blend of sweet and savory.',
    },
    ko: {
      name: 'HAQ - 토란 모찌 포크플로스 솔티드에그 페이스트리',
      desc: '향긋한 토란 앙금, 쫄깃한 모찌 찹쌀떡, 짭조름한 포크플로스와 고소한 염지 계란 노른자가 층층이 어우러진 단짠 명품 페이스트리.',
    },
    zh: {
      name: 'HAQ - 香芋麻薯肉松咸蛋黄软糯糕',
      desc: '多重丰富层次：绵密香浓芋泥、软糯拉丝麻薯、鲜美金黄肉松与醇香咸蛋黄完美交融，咸甜相宜，回味无穷。',
    },
  },

  // 17. Bánh dẻo trứng muối
  'banh-deo-trung-muoi': {
    en: {
      name: 'HAQ - Traditional Soft Pastry with Salted Egg Yolk',
      desc: 'Classic Vietnamese soft-skin glutinous pastry enclosing sweet mung bean filling and a whole savory salted egg yolk center.',
    },
    ko: {
      name: 'HAQ - 전통 솔티드에그 소프트 페이스트리',
      desc: '부드럽고 쫄깃한 찹쌀 피 속에 달콤한 녹두 앙금과 고소하고 짭조름한 염지 계란 노른자가 통째로 들어간 베트남 정통 명절 디저트.',
    },
    zh: {
      name: 'HAQ - 传统咸蛋黄软糯月糕',
      desc: '传统糯米冰皮包裹细腻温润绿豆沙与一整颗金黄油润咸蛋黄，软糯香甜中透着咸香，经典传世美味。',
    },
  },

  // 18. Bánh hạnh nhân truyền thống
  'banh-hanh-nhan-truyen-thong': {
    en: {
      name: 'HAQ - Classic Golden Almond Pastries',
      desc: 'Traditional buttery flaky biscuits encrusted with golden roasted sliced almonds. Export quality with authentic crunch.',
    },
    ko: {
      name: 'HAQ - 전통 오리지널 아몬드 페이스트리',
      desc: '바삭하고 고소한 버터 쿠키 도우에 듬뿍 올린 슬라이스 아몬드가 일품인 아시아 수출 규격의 대표 아몬드 비스킷.',
    },
    zh: {
      name: 'HAQ - 传统原味香脆杏仁酥饼',
      desc: '经典传统黄油起酥配方，面层铺满厚厚香烤天然扁桃仁片，色泽金黄璀璨，酥脆浓郁。',
    },
  },
  'banh-hanh-nhan': {
    en: {
      name: 'HAQ - Premium Almond Pastries',
      desc: 'Flaky and buttery artisan biscuits covered with fragrant roasted almond slices, meeting export standards for Asian markets.',
    },
    ko: {
      name: 'HAQ - 프리미엄 아몬드 페이스트리',
      desc: '고소한 버터 풍미와 슬라이스 아몬드의 바삭함이 어우러진 아시아 수출 규격의 프리미엄 디저트 비스킷.',
    },
    zh: {
      name: 'HAQ - 香脆起酥杏仁饼',
      desc: '浓郁纯正黄油起酥工艺，缀满香烤天然杏仁切片，酥脆微甜，符合亚洲高端食品出口规范。',
    },
  },

  // 19. Bánh hạnh nhân trà xanh
  'banh-hanh-nhan-tra-xanh': {
    en: {
      name: 'HAQ - Crispy Green Tea Almond Pastries',
      desc: 'Artisan flaky biscuits layered with fragrant roasted almond slices and premium green tea matcha extract.',
    },
    ko: {
      name: 'HAQ - 바삭 녹차 아몬드 페이스트리',
      desc: '고소하게 구워낸 슬라이스 아몬드와 은은한 그린티 말차 풍미가 완벽한 조화를 이루는 프리미엄 아몬드 비스킷.',
    },
    zh: {
      name: 'HAQ - 清香绿茶杏仁酥饼',
      desc: '金黄酥脆起酥饼缀满香烤天然杏仁片，沁润清新绿茶香韵，茶香与坚果脂香相得益彰。',
    },
  },

  // 20. Bánh hạnh nhân ca cao
  'banh-hanh-nhan-ca-cao': {
    en: {
      name: 'HAQ - Crispy Cocoa Almond Pastries',
      desc: 'Flaky and buttery artisan biscuits infused with rich pure cocoa powder and generous roasted almond slices.',
    },
    ko: {
      name: 'HAQ - 바삭 코코아 아몬드 페이스트리',
      desc: '진한 순수 코코아의 풍미와 고소한 슬라이스 아몬드가 어우러져 깊고 그윽한 달콤쌉싸름한 맛을 전하는 비스킷.',
    },
    zh: {
      name: 'HAQ - 浓香可可杏仁酥饼',
      desc: '优质纯可可的浓郁微苦与香烤杏仁片的温润坚果香气完美结合，层叠酥脆，回味绵长。',
    },
  },

  // 21. Bánh hạnh nhân hỗn hợp
  'banh-hanh-nhan-hon-hop': {
    en: {
      name: 'HAQ - Assorted Flavors Almond Pastries Box',
      desc: 'Luxury gift box presenting classic, cocoa, and green tea almond pastries. A crunchy and elegant indulgence.',
    },
    ko: {
      name: 'HAQ - 모듬 아몬드 페이스트리 선물세트',
      desc: '오리지널, 코코아, 녹차 등 다채로운 아몬드 비스킷을 고급스러운 한 상자에 담아낸 선물용 프리미엄 셀렉션.',
    },
    zh: {
      name: 'HAQ - 多口味混合装香脆杏仁饼礼盒',
      desc: '尊享礼盒汇聚原味、可可与清香绿茶三款招牌杏仁酥饼，坚果醇厚，起酥层层分明，礼赠佳品。',
    },
  },

  // 22. Bánh đậu xanh tươi
  'banh-dau-xanh-tuoi': {
    en: {
      name: 'HAQ - Traditional Fresh Mung Bean Cake',
      desc: 'Famous Hai Duong heritage recipe made from 100% pure selected mung beans. Silky smooth texture that gently melts in your mouth with an elegant, natural sweetness.',
    },
    ko: {
      name: 'HAQ - 전통 신선 녹두 케이크',
      desc: '수백 년 전통 하이즈엉 명가 레시피로 엄선된 순수 녹두만을 사용하여 입안 가득 은은한 단맛과 부드럽게 녹아내리는 전통의 풍미를 간직한 대표 특산품입니다.',
    },
    zh: {
      name: 'HAQ - 传统新鲜绿豆糕',
      desc: '传承越南海阳百年经典传统配方，精选优质纯绿豆精工慢制，豆香浓郁醇厚，入口细腻爽滑，清甜不腻，尽显传统饮食精粹。',
    },
  },

  // 23. Bánh đậu xanh vị lá dứa
  'banh-dau-xanh-vi-la-dua': {
    en: {
      name: 'HAQ - Fresh Mung Bean Cake with Pandan Flavor',
      desc: 'Pure fresh mung bean cake subtly blended with natural fragrant pandan extract. Melts smoothly on the palate with a refreshing, delicate aroma and gentle sweetness.',
    },
    ko: {
      name: 'HAQ - 판단잎 신선 녹두 케이크',
      desc: '신선한 100% 순수 녹두에 천연 판단잎의 은은하고 산뜻한 향을 더하여 입안에서 부드럽게 녹아내리는 베트남 전통 명가 디저트입니다.',
    },
    zh: {
      name: 'HAQ - 新鲜绿豆糕 (斑斓叶味)',
      desc: '精选新鲜纯绿豆与天然清香斑斓叶汁巧妙融合，口感细腻柔滑，甜度清雅适口，入口即化，茶歇品鉴的经典雅致茶点。',
    },
  },

  // 24. Bánh đậu xanh tươi vị đậu đỏ
  'banh-dau-xanh-tuoi-vi-dau-do': {
    en: {
      name: 'HAQ - Fresh Mung Bean Cake with Red Bean Flavor',
      desc: 'Unique fusion of fresh whole mung beans and sweet red beans. Ultra-smooth texture with dual bean richness and balanced sweetness.',
    },
    ko: {
      name: 'HAQ - 팥맛 신선 녹두 케이크',
      desc: '신선한 녹두와 달콤하고 풍부한 팥의 영양이 조화롭게 어우러진 부드러운 전통 케이크로 깊고 은은한 감미를 선사합니다.',
    },
    zh: {
      name: 'HAQ - 新鲜绿豆糕 (红豆风味)',
      desc: '严选优质纯绿豆粉与精研红豆沙双豆融合，豆香更加浓郁醇厚，粉质细腻柔和，甜度恰到好处。',
    },
  },

  // 25. Bánh đậu xanh mix vị
  'banh-dau-xanh-mix-vi': {
    en: {
      name: 'HAQ - Fresh Mung Bean Cake (Assorted Flavors Box)',
      desc: 'Assorted gift box featuring classic original, aromatic pandan, and red bean mung bean cakes. A delightful celebration of Vietnamese confectionery.',
    },
    ko: {
      name: 'HAQ - 모듬 신선 녹두 케이크 (혼합 선물세트)',
      desc: '오리지널 전통 녹두, 싱그러운 판단잎, 달콤한 팥 풍미를 정갈한 한 상자에 모아 다양한 맛의 향연을 즐길 수 있는 특산 선물세트.',
    },
    zh: {
      name: 'HAQ - 新鲜绿豆糕 (混合口味礼盒装)',
      desc: '精心组合原味绿豆、清香斑斓与香甜红豆三款传统糕点，粉质细腻柔滑，一次尽享丰富多样的地道传统美味。',
    },
  },
  'banh-dau-xanh-tuoi-mix-vi': {
    en: {
      name: 'HAQ - Fresh Mung Bean Cake (Assorted Flavors Box)',
      desc: 'Assorted gift box featuring a rich variety of classic and modern mung bean cakes. Crafted from pristine whole mung beans, preserving authentic texture and delicate sweetness.',
    },
    ko: {
      name: 'HAQ - 모듬 신선 녹두 케이크 (혼합 선물세트)',
      desc: '전통과 현대의 다채로운 풍미를 한 상자에 정성껏 담아 신선한 녹두의 풍부한 맛을 다양하게 경험할 수 있는 프리미엄 선물용 디저트 세트입니다.',
    },
    zh: {
      name: 'HAQ - 新鲜绿豆糕 (混合口味礼盒装)',
      desc: '荟萃传统原味与现代多元风味的新鲜绿豆糕组合装，选用上等天然纯绿豆精心制作，细腻醇厚，带来丰富多层次的地道美味体验。',
    },
  },

  // 26. Bánh chả hương vị cổ truyền
  'banh-cha': {
    en: {
      name: 'HAQ - Traditional Hanoi Crispy Pastry (Banh Cha)',
      desc: 'Historic Hanoi street specialty featuring golden-brown pastry crust stuffed with candied winter melon, aromatic kaffir lime leaves, and spices.',
    },
    ko: {
      name: 'HAQ - 하노이 전통 라임잎 페이스트리 (반짜)',
      desc: '달콤한 동아정과와 상큼한 라임잎, 고소한 버터 풍미의 바삭한 피가 어우러진 하노이의 대표적인 전통 향토 과자 반짜.',
    },
    zh: {
      name: 'HAQ - 河内传统风味香脆饼 (Bánh Chả)',
      desc: '越南首都河内享负盛名的传统老字号名点，外皮焦香金黄酥脆，内裹糖冬瓜与精切柠檬叶细丝，香气馥郁，经典古早味。',
    },
  },

  // 27. Khô bò sốt chanh
  'kho-bo-sot-chanh': {
    en: {
      name: 'HAQ - Premium Beef Jerky with Zesty Lime Sauce',
      desc: 'Select tender lean beef marinated in zesty fresh lime juice, tomyum spices, lemongrass, and natural chilies. Chewy and deeply flavorful.',
    },
    ko: {
      name: 'HAQ - 상큼한 라임 소스 프리미엄 비프 저키',
      desc: '엄선된 소고기에 신선한 생라임 소스와 매콤상큼한 톰얌 향신료, 레몬그라스를 재워 부드럽고 쫄깃한 식감을 살린 특급 육포.',
    },
    zh: {
      name: 'HAQ - 特级青柠酱汁手撕牛肉干',
      desc: '严选优质大块精瘦牛肉，调入鲜榨青柠汁、冬阴功辛香料、香茅与鲜辣椒精心慢制，鲜嫩筋道，酸辣开胃，回味醇厚。',
    },
  },

  // 28. Khô viên vị bò
  'kho-vien-vi-bo': {
    en: {
      name: 'HAQ - Tender Spiced Jerky Bites (Beef Flavor)',
      desc: 'Bite-sized tender meat cubes slowly seasoned with five-spice, ginger, lemongrass, and natural beef seasonings. Juicy, chewy, and robust.',
    },
    ko: {
      name: 'HAQ - 소고기 풍미 큐브 육포',
      desc: '한 입 크기로 먹기 편한 부드러운 고기 큐브에 오향분, 생강, 레몬그라스와 특제 소고기 양념을 깊숙이 배어들게 한 쫄깃한 간식.',
    },
    zh: {
      name: 'HAQ - 秘制五香牛肉风味肉粒',
      desc: '一口一块的便携肉粒，浸润特调五香粉、鲜生姜、香茅与纯正牛肉香韵，肉质紧实有嚼劲，鲜香浓郁。',
    },
  },

  // 29. Khô sợi vị bò
  'kho-soi-vi-bo': {
    en: {
      name: 'HAQ - Shredded Spiced Jerky (Beef Flavor)',
      desc: 'Hand-pulled tender meat shreds delicately seasoned with turmeric curry, natural spices, and five-spice beef aroma. Perfect with lime and chili sauce.',
    },
    ko: {
      name: 'HAQ - 소고기 풍미 찢은 육포',
      desc: '결대로 정성껏 찢어낸 고기 가닥에 강황 카레, 오향분과 진한 소고기 양념이 골고루 배어들어 맥주 안주나 간식으로 최고인 육포.',
    },
    zh: {
      name: 'HAQ - 秘制五香牛肉风味手撕肉丝',
      desc: '沿纹理精心手撕成丝，浸透姜黄咖喱、五香调味与醇浓牛肉风味，丝丝入味，佐酒茶叙的上乘佐食。',
    },
  },
}

// Map các biến thể slug về canonical key trong PRODUCT_I18N
export const PRODUCT_SLUG_ALIASES = {
  // Chà bông
  'banh-trang-say-gion-vi-tra-bong': 'banh-trang-say-gion-vi-tra-bong',
  'banh-trang-say-gion-vi-cha-bong': 'banh-trang-say-gion-vi-tra-bong',
  'banh-trang-say-gion-cha-bong': 'banh-trang-say-gion-vi-tra-bong',
  'banh-trang-say-cha-bong': 'banh-trang-say-gion-vi-tra-bong',

  // Bò
  'banh-trang-say-gion-vi-bo': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-gion-bo': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-bo': 'banh-trang-say-gion-vi-bo',
  'banh-trang-say-gion-vi-sa-te-bo': 'banh-trang-say-gion-vi-sa-te-bo',
  'banh-trang-tron-sa-te-bo': 'banh-trang-tron-sa-te-bo',

  // Tôm
  'banh-trang-say-gion-vi-tom': 'banh-trang-say-gion-vi-tom',
  'banh-trang-say-gion-tom': 'banh-trang-say-gion-vi-tom',
  'banh-trang-say-tom': 'banh-trang-say-gion-vi-tom',
  'banh-trang-tron-vi-sa-te-tom': 'banh-trang-tron-sa-te-tom',
  'banh-trang-tron-sa-te-tom': 'banh-trang-tron-sa-te-tom',

  // Phô mai
  'banh-trang-say-gion-phomai': 'banh-trang-say-gion-phomai',
  'banh-trang-say-gion-vi-pho-mai': 'banh-trang-say-gion-phomai',
  'bap-rang-bo-vi-pho-mai': 'bap-rang-bo-vi-pho-mai',
  'bap-rang-bo-pho-mai': 'bap-rang-bo-vi-pho-mai',

  // Thực cẩm
  'banh-trang-say-thuc-cam': 'banh-trang-say-thuc-cam',

  // Gà lá chanh
  'banh-trang-tron-ga-la-chanh': 'banh-trang-tron-ga-la-chanh',
  'banh-trang-tron-ga': 'banh-trang-tron-ga-la-chanh',

  // Đậu xanh
  'banh-dau-xanh-vi-la-dua': 'banh-dau-xanh-vi-la-dua',
  'banh-dau-xanh-la-dua': 'banh-dau-xanh-vi-la-dua',
  'banh-dau-xanh-tuoi': 'banh-dau-xanh-tuoi',
  'banh-dau-xanh': 'banh-dau-xanh-tuoi',
  'banh-dau-xanh-tuoi-mix-vi': 'banh-dau-xanh-tuoi-mix-vi',
  'banh-dau-xanh-mix-vi': 'banh-dau-xanh-mix-vi',
  'banh-dau-xanh-tuoi-vi-dau-do': 'banh-dau-xanh-tuoi-vi-dau-do',
  'banh-dau-xanh-dau-do': 'banh-dau-xanh-tuoi-vi-dau-do',

  // Bắp rang bơ
  'bap-rang-bo-caramel': 'bap-rang-bo-caramel',
  'bap-rang-bo-matcha': 'bap-rang-bo-matcha',
  'bap-rang-bo-vi-truyen-thong': 'bap-rang-bo-vi-truyen-thong',

  // Hạnh nhân
  'banh-hanh-nhan': 'banh-hanh-nhan',
  'banh-hanh-nhan-truyen-thong': 'banh-hanh-nhan-truyen-thong',
  'banh-hanh-nhan-tra-xanh': 'banh-hanh-nhan-tra-xanh',
  'banh-hanh-nhan-ca-cao': 'banh-hanh-nhan-ca-cao',
  'banh-hanh-nhan-hon-hop': 'banh-hanh-nhan-hon-hop',

  // Bánh khác
  'banh-cookies': 'banh-cookies',
  'banh-sua-dau': 'banh-sua-dau',
  'banh-sua-dua': 'banh-sua-dua',
  'banh-cha': 'banh-cha',
  'banh-deo-khoai-mon-mochi-cha-bong-trung-muoi': 'banh-deo-khoai-mon-mochi-cha-bong-trung-muoi',
  'banh-deo-trung-muoi': 'banh-deo-trung-muoi',

  // Thịt khô
  'kho-bo-sot-chanh': 'kho-bo-sot-chanh',
  'kho-vien-vi-bo': 'kho-vien-vi-bo',
  'kho-soi-vi-bo': 'kho-soi-vi-bo',
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

export function translateVariantPack(pack, language = 'vi') {
  if (!pack || language === 'vi') return pack
  const normalized = pack.trim().toLowerCase()
  const match = PACKAGING_TRANSLATIONS[normalized]
  if (match && match[language]) return match[language]
  return pack
}

export const SHELF_LIFE_TRANSLATIONS = {
  '6 tháng': { en: '6 months', ko: '6개월', zh: '6 个月' },
  '3 tháng': { en: '3 months', ko: '3개월', zh: '3 个月' },
  '4 tháng': { en: '4 months', ko: '4개월', zh: '4 个月' },
  '5 tháng': { en: '5 months', ko: '5개월', zh: '5 个月' },
  '9 tháng': { en: '9 months', ko: '9개월', zh: '9 个月' },
  '12 tháng': { en: '12 months', ko: '12개월', zh: '12 个月' },
  '30 ngày': { en: '30 days', ko: '30일', zh: '30 天' },
  '45 ngày': { en: '45 days', ko: '45일', zh: '45 天' },
  '180 ngày': { en: '180 days', ko: '180일', zh: '180 天' },
}

export function translateVariantShelf(shelf, language = 'vi') {
  if (!shelf || language === 'vi') return shelf
  const normalized = String(shelf).trim()
  const lower = normalized.toLowerCase()

  // Match range e.g. "6-12 tháng"
  if (lower.includes('6-12') && lower.includes('tháng')) {
    if (lower.includes('kể từ') || lower.includes('ngày sản xuất')) {
      if (language === 'en') return '6–12 months from date of manufacture'
      if (language === 'ko') return '제조일로부터 6-12개월'
      if (language === 'zh') return '自生产之日起 6–12 个月'
    }
    if (language === 'en') return '6–12 months'
    if (language === 'ko') return '6-12개월'
    if (language === 'zh') return '6–12 个月'
  }

  // Match "X ngày kể từ ngày sản xuất" or "X ngày"
  const dayMatch = lower.match(/(\d+)\s*ngày/)
  if (dayMatch) {
    const d = dayMatch[1]
    if (lower.includes('kể từ') || lower.includes('ngày sản xuất')) {
      if (language === 'en') return `${d} days from date of manufacture`
      if (language === 'ko') return `제조일로부터 ${d}일`
      if (language === 'zh') return `自生产之日起 ${d} 天`
    }
    if (language === 'en') return `${d} days`
    if (language === 'ko') return `${d}일`
    if (language === 'zh') return `${d} 天`
  }

  // Match "X tháng kể từ ngày sản xuất" or "X tháng"
  const monthMatch = lower.match(/(\d+)\s*tháng/)
  if (monthMatch) {
    const m = monthMatch[1]
    if (lower.includes('kể từ') || lower.includes('ngày sản xuất')) {
      if (language === 'en') return `${m} months from date of manufacture`
      if (language === 'ko') return `제조일로부터 ${m}개월`
      if (language === 'zh') return `自生产之日起 ${m} 个月`
    }
    if (language === 'en') return `${m} months`
    if (language === 'ko') return `${m}개월`
    if (language === 'zh') return `${m} 个月`
  }

  const exact = SHELF_LIFE_TRANSLATIONS[lower]
  if (exact && exact[language]) return exact[language]
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
    en: 'Store in a cool, dry place away from direct sunlight, insects, and high temperatures. Best consumed promptly after opening. Do not use if expired or showing signs of deterioration.',
    ko: '직사광선, 해충 및 고온을 피해 서늘하고 건조한 곳에 보관하십시오. 개봉 후에는 가급적 빨리 섭취하십시오. 변질되었거나 유통기한이 지난 제품은 섭취하지 마십시오.',
    zh: '请保存在阴凉干燥处，避免阳光直射、昆虫接触及高温环境。开封后请尽快食用完毕。产品受潮发霉或已过保质期时请勿食用。',
  },
  jerky: {
    en: 'Consume directly after opening. Best served with fresh lime or chili sauce. Recommended to store in refrigerator. Keep in a cool, dry place away from sunlight. Do not consume if expired or package is compromised.',
    ko: '개봉 후 즉시 섭취하십시오. 신선한 라임이나 칠리소스와 곁들이면 더욱 맛있습니다. 냉장 보관을 권장합니다. 직사광선을 피해 서늘하고 건조한 곳에 보관하십시오. 유통기한이 지났거나 포장이 훼손된 제품은 섭취하지 마십시오.',
    zh: '开封后即可直接食用。佐以鲜柠檬或辣椒酱风味更佳。建议冷藏保存。请存放于阴凉干燥处，避免阳光直射。若包装破损或产品已过保质期请勿食用。',
  },
}

export function translateStorageGuide(guide, language = 'vi') {
  if (!guide || language === 'vi') return guide
  const lower = guide.toLowerCase()
  if (lower.includes('tủ lạnh') || lower.includes('tương ớt') || lower.includes('chanh tươi')) {
    return STORAGE_GUIDE_TRANSLATIONS.jerky[language] || guide
  }
  if (lower.includes('khô ráo') || lower.includes('thoáng mát') || lower.includes('nơi khô') || lower.includes('bao bì')) {
    return STORAGE_GUIDE_TRANSLATIONS.default[language] || guide
  }
  return guide
}

export const INGREDIENTS_TRANSLATIONS = {
  'banh-trang-say-gion-vi-tra-bong': {
    en: 'Rice paper (60%), dried savory pork floss (15%), garlic oil (6%), refined sugar (5%), fried shallots (4%), dried garlic (4%), iodized salt (4%), chili (2%).',
    ko: '라이스페이퍼(60%), 건조 포크플로스(15%), 마늘오일(6%), 정제설탕(5%), 튀긴 샬롯(4%), 건마늘(4%), 요오드 소금(4%), 고추(2%).',
    zh: '米纸 (60%)、精选猪肉松 (15%)、蒜香油 (6%)、白砂糖 (5%)、炸红葱 (4%)、脱水大蒜 (4%)、食用盐 (4%)、辣椒 (2%)。',
  },
  'banh-trang-say-gion-vi-cha-bong': {
    en: 'Rice paper (60%), dried savory pork floss (15%), garlic oil (6%), refined sugar (5%), fried shallots (4%), dried garlic (4%), iodized salt (4%), chili (2%).',
    ko: '라이스페이퍼(60%), 건조 포크플로스(15%), 마늘오일(6%), 정제설탕(5%), 튀긴 샬롯(4%), 건마늘(4%), 요오드 소금(4%), 고추(2%).',
    zh: '米纸 (60%)、精选猪肉松 (15%)、蒜香油 (6%)、白砂糖 (5%)、炸红葱 (4%)、脱水大蒜 (4%)、食用盐 (4%)、辣椒 (2%)。',
  },
  'banh-trang-say-gion-vi-bo': {
    en: 'Rice paper (60%), spiced beef seasonings (15%), chili satay oil (6%), fried shallots (5%), sugar (5%), garlic (5%), iodized salt (4%).',
    ko: '라이스페이퍼(60%), 양념 소고기 시즈닝(15%), 칠리 사테 오일(6%), 튀긴 샬롯(5%), 설탕(5%), 마늘(5%), 소금(4%).',
    zh: '米纸 (60%)、牛肉风味调味料 (15%)、辣椒沙爹油 (6%)、炸红葱 (5%)、白砂糖 (5%)、大蒜 (5%)、食用盐 (4%)。',
  },
  'banh-trang-say-gion-vi-sa-te-bo': {
    en: 'Rice paper (60%), spiced beef seasonings (15%), chili satay oil (6%), fried shallots (5%), sugar (5%), garlic (5%), iodized salt (4%).',
    ko: '라이스페이퍼(60%), 양념 소고기 시즈닝(15%), 칠리 사테 오일(6%), 튀긴 샬롯(5%), 설탕(5%), 마늘(5%), 소금(4%).',
    zh: '米纸 (60%)、牛肉风味调味料 (15%)、辣椒沙爹油 (6%)、炸红葱 (5%)、白砂糖 (5%)、大蒜 (5%)、食用盐 (4%)。',
  },
  'banh-trang-say-gion-vi-tom': {
    en: 'Rice paper (60%), dried seasoned baby shrimp (15%), garlic oil (6%), refined sugar (5%), fried shallots (4%), dried garlic (4%), salt (4%), chili (2%).',
    ko: '라이스페이퍼(60%), 건조 양념 새우(15%), 마늘오일(6%), 정제설탕(5%), 튀긴 샬롯(4%), 건마늘(4%), 소금(4%), 고추(2%).',
    zh: '米纸 (60%)、烘烤鲜虾肉松 (15%)、蒜香油 (6%)、白砂糖 (5%)、香炸红葱 (4%)、脱水蒜粒 (4%)、食用盐 (4%)、辣椒 (2%)。',
  },
  'banh-trang-say-gion-phomai': {
    en: 'Rice paper (60%), cheddar cheese powder (12%), fried shallots (10%), garlic oil, refined sugar, salt, natural flavorings.',
    ko: '라이스페이퍼(60%), 체다 치즈 파우더(12%), 튀긴 샬롯(10%), 마늘오일, 정제설탕, 소금, 천연 향료.',
    zh: '米纸 (60%)、切达芝士粉 (12%)、香炸红葱 (10%)、大蒜油、白砂糖、食用盐、天然香辛料。',
  },
  'banh-trang-say-thuc-cam': {
    en: 'Rice paper (60%), dried shrimp floss (10%), annatto seed oil (6%), fried shallots (5%), dried scallions (5%), refined sugar (5%), dried garlic (5%), iodized salt (4%).',
    ko: '라이스페이퍼(60%), 건조 새우 플로스(10%), 아나토 오일(6%), 튀긴 샬롯(5%), 건조 쪽파(5%), 설탕(5%), 건마늘(5%), 소금(4%).',
    zh: '米纸 (60%)、鲜虾松 (10%)、天然胭脂树红油 (6%)、炸红葱酥 (5%)、脱水香葱 (5%)、白砂糖 (5%)、脱水蒜粒 (5%)、食用盐 (4%)。',
  },
  'banh-trang-tron-ga-la-chanh': {
    en: 'Shredded rice paper, shredded seasoned chicken, kaffir lime leaves, fresh chili, sugar, iodized salt, crispy fried shallots, garlic.',
    ko: '채 썬 라이스페이퍼, 양념 닭고기, 라임잎, 생고추, 설탕, 요오드 소금, 바삭한 튀긴 샬롯, 마늘.',
    zh: '米纸丝、鲜香鸡肉丝、精选柠檬叶、新鲜辣椒、白砂糖、食用盐、香脆红葱酥、大蒜。',
  },
  'banh-trang-tron-vi-sa-te-tom': {
    en: 'Shredded rice paper, spicy shrimp satay sauce, fresh chili, cane sugar, iodized salt, fried shallots, garlic oil.',
    ko: '채 썬 라이스페이퍼, 매콤한 새우 사테, 생고추, 사탕수수 설탕, 요오드 소금, 튀긴 샬롯, 마늘오일.',
    zh: '米纸丝、鲜香虾味沙爹酱、鲜辣椒、白砂糖、食用盐、香炸红葱、蒜香调味油。',
  },
  'banh-trang-tron-sa-te-bo': {
    en: 'Shredded rice paper, spicy beef satay seasonings, lemongrass, chili, cane sugar, iodized salt, fried shallots, garlic.',
    ko: '채 썬 라이스페이퍼, 매콤한 소고기 사테 양념, 레몬그라스, 고추, 설탕, 소금, 튀긴 샬롯, 마늘.',
    zh: '米纸丝、香辣牛肉沙爹酱、香茅、辣椒、白砂糖、食用盐、炸红葱酥、大蒜。',
  },
  'bap-rang-bo-caramel': {
    en: 'Non-GMO American popping corn, pure butter oil, refined sugar, rich golden caramel glaze.',
    ko: '논-GMO 미국산 팝콘 옥수수, 순수 버터 오일, 정제 설탕, 리치 골든 카라멜 코팅.',
    zh: '精选非转基因爆裂玉米、纯正黄油、精制白砂糖、浓香焦糖浆。',
  },
  'bap-rang-bo-vi-pho-mai': {
    en: 'Non-GMO American popping corn, pure butter oil, refined sugar, savory cheddar cheese seasoning powder.',
    ko: '논-GMO 미국산 팝콘 옥수수, 순수 버터 오일, 정제 설탕, 프리미엄 체다 치즈 파우더.',
    zh: '精选非转基因爆裂玉米、纯正黄油、精制白砂糖、特级切达芝士调味粉。',
  },
  'bap-rang-bo-matcha': {
    en: 'Non-GMO American popping corn, pure butter oil, refined cane sugar, pure Japanese matcha green tea powder.',
    ko: '논-GMO 미국산 팝콘 옥수수, 순수 버터 오일, 정제 설탕, 천연 말차 녹차 파우더.',
    zh: '精选非转基因爆裂玉米、天然黄油、精制白砂糖、纯正日本抹茶粉。',
  },
  'bap-rang-bo-vi-truyen-thong': {
    en: 'Non-GMO American popping corn, pure butter oil, refined sugar, pure sea salt.',
    ko: '논-GMO 미국산 팝콘 옥수수, 순수 버터 오일, 정제 설탕, 천일염.',
    zh: '精选非转基因爆裂玉米、纯正黄油、精制白砂糖、食用精盐。',
  },
  'banh-cookies': {
    en: 'Fine wheat flour, pure European dairy butter, refined cane sugar, fresh chicken eggs, whole milk powder, natural vanilla.',
    ko: '고급 소맥분, 유럽산 순수 천연 버터, 정제 설탕, 신선한 계란, 전지분유, 천연 바닐라.',
    zh: '精选特级小麦粉、天然优质黄油、精制白砂糖、新鲜鸡蛋、全脂奶粉、天然香草。',
  },
  'banh-sua-dau': {
    en: 'Wheat flour (35%), vegetable margarine (24%), cane sugar (17%), soy bean powder, whole fresh milk.',
    ko: '소맥분(35%), 식물성 마가린(24%), 사탕수수 설탕(17%), 대두 분말, 신선한 원유.',
    zh: '小麦粉 (35%)、精炼植物黄油 (24%)、白砂糖 (17%)、天然大豆粉、纯鲜牛奶。',
  },
  'banh-sua-dua': {
    en: 'Pure Ben Tre coconut milk, premium glutinous rice flour, cane sugar, condensed milk, malt syrup.',
    ko: '벤째산 순수 코코넛 밀크, 프리미엄 찹쌀가루, 사탕수수 설탕, 연유, 맥아당.',
    zh: '越南槟椥纯正天然椰浆、精制糯米粉、白砂糖、炼乳、麦芽糖。',
  },
  'banh-deo-khoai-mon-mochi-cha-bong-trung-muoi': {
    en: 'Glutinous rice flour, fresh taro paste, chewy mochi, premium savory pork floss, salted egg yolk, vegetable oil, cane sugar.',
    ko: '찹쌀가루, 신선한 토란 앙금, 쫄깃한 모찌 찹쌀떡, 프리미엄 포크플로스, 염지 계란 노른자, 식물성 유지, 설탕.',
    zh: '优质糯米粉、新鲜香芋泥、软糯拉丝麻薯、特级金黄猪肉松、油润咸蛋黄、精炼植物油、白砂糖。',
  },
  'banh-deo-trung-muoi': {
    en: 'Glutinous rice flour, smooth mung bean paste, whole salted egg yolk, vegetable oil, refined cane sugar.',
    ko: '찹쌀가루, 부드러운 녹두 앙금, 통 염지 계란 노른자, 식물성 유지, 정제 설탕.',
    zh: '精选糯米粉、温润细腻绿豆沙、整颗金黄咸蛋黄、精炼植物油、精制白砂糖。',
  },
  'banh-hanh-nhan-ca-cao': {
    en: 'Wheat flour (43%), tapioca starch (16%), refined sugar (16%), sliced almonds (12%), vegetable margarine, pure cocoa powder (5%).',
    ko: '소맥분(43%), 타피오카 전분(16%), 정제설탕(16%), 슬라이스 아몬드(12%), 식물성 마가린, 순수 코코아 분말(5%).',
    zh: '小麦粉 (43%)、木薯淀粉 (16%)、精制白砂糖 (16%)、香烤切片杏仁 (12%)、植物黄油、纯可可粉 (5%)。',
  },
  'banh-hanh-nhan-tra-xanh': {
    en: 'Wheat flour (43%), tapioca starch (16%), refined sugar (16%), sliced almonds (12%), vegetable margarine, green tea powder (5%).',
    ko: '소맥분(43%), 타피오카 전분(16%), 정제설탕(16%), 슬라이스 아몬드(12%), 식물성 마가린, 녹차 분말(5%).',
    zh: '小麦粉 (43%)、木薯淀粉 (16%)、精制白砂糖 (16%)、香烤切片杏仁 (12%)、植物黄油、精选绿茶粉 (5%)。',
  },
  'banh-hanh-nhan-truyen-thong': {
    en: 'Wheat flour (43%), tapioca starch (16%), refined sugar (16%), sliced almonds (15%), vegetable margarine, natural flavor.',
    ko: '소맥분(43%), 타피오카 전분(16%), 정제설탕(16%), 슬라이스 아몬드(15%), 식물성 마가린, 천연 바닐라 향.',
    zh: '小麦粉 (43%)、木薯淀粉 (16%)、精制白砂糖 (16%)、香烤切片杏仁 (15%)、植物黄油、天然香草提取物。',
  },
  'banh-hanh-nhan-hon-hop': {
    en: 'Wheat flour, sliced almonds, vegetable margarine, refined sugar, pure cocoa powder, green tea powder, natural vanilla.',
    ko: '소맥분, 슬라이스 아몬드, 식물성 마가린, 정제설탕, 순수 코코아 분말, 녹차 분말, 천연 바닐라.',
    zh: '特级小麦粉、香脆杏仁切片、植物黄油、精制白砂糖、纯可可粉、精研绿茶粉、天然香草。',
  },
  'banh-dau-xanh-vi-la-dua': {
    en: 'Selected pure mung beans (65%), refined cane sugar, glutinous rice flour, vegetable oil, natural pandan leaf extract, vanillin, food preservatives (INS 202).',
    ko: '엄선된 순수 녹두(65%), 정제 사탕수수 설탕, 찹쌀가루, 식물성 유지, 천연 판단잎 추출물, 바닐린, 식품보존료(INS 202).',
    zh: '精选脱皮纯绿豆 (65%)、精制白砂糖、糯米粉、精炼植物油、天然斑斓叶汁、食用香草醛、食品保鲜剂 (INS 202)。',
  },
  'banh-dau-xanh-tuoi-vi-dau-do': {
    en: 'Pure mung beans (35%), select red beans (35%), refined cane sugar, glutinous rice flour, vegetable oil, vanilla and red bean flavorings, humectant (INS 422), preservative (INS 202).',
    ko: '순수 녹두(35%), 엄선된 팥(35%), 정제 사탕수수 설탕, 찹쌀가루, 식물성 유지, 바닐라 및 팥 향료, 보습제(INS 422), 보존료(INS 202).',
    zh: '精选脱皮纯绿豆 (35%)、精选红小豆 (35%)、精制白砂糖、糯米粉、植物油、红豆与香草天然复合调味料、保水增润剂 (INS 422)、食品保鲜剂 (INS 202)。',
  },
  'banh-dau-xanh-tuoi': {
    en: 'Selected pure mung beans (65%), refined cane sugar, glutinous rice flour, vegetable oil, natural vanilla, humectant (INS 422), preservative (INS 202).',
    ko: '엄선된 순수 녹두(65%), 정제 사탕수수 설탕, 찹쌀가루, 식물성 유지, 천연 바닐라, 보습제(INS 422), 보존료(INS 202).',
    zh: '100% 精选脱皮纯绿豆 (65%)、精制白砂糖、糯米粉、精炼植物油、天然香草素、保水剂 (INS 422)、食品保鲜剂 (INS 202)。',
  },
  'banh-dau-xanh-mix-vi': {
    en: 'Selected mung beans, red beans, pandan leaf extract, refined sugar, glutinous rice flour, vegetable oil, natural flavorings.',
    ko: '엄선된 녹두, 팥, 천연 판단잎 추출물, 정제 사탕수수 설탕, 찹쌀가루, 식물성 유지, 천연 향미료.',
    zh: '精选纯绿豆、精制红小豆、天然新鲜斑斓叶萃取汁、白砂糖、糯米粉、纯正植物油、天然风味调味料。',
  },
  'banh-cha': {
    en: 'Fine wheat flour, cane sugar, malt syrup, vegetable oil, butter, diced pork fat, candied winter melon, fresh kaffir lime leaves, five-spice.',
    ko: '소맥분, 사탕수수 설탕, 맥아당 시럽, 식물성 유지, 버터, 돼지 비계 큐브, 동아정과, 신선한 라임잎, 오향분.',
    zh: '特制小麦粉、精制白砂糖、麦芽糖浆、植物油、优质黄油、秘制猪肥肉丁、腌制糖冬瓜条、鲜切柠檬叶丝、传统五香粉。',
  },
  'kho-soi-vi-bo': {
    en: 'Lean meat (80%), sugar, oyster sauce, iodized salt, annatto oil, fish sauce, fresh ginger, lemongrass, fresh chili, chili powder, turmeric curry, five-spice, natural beef aroma, flavor enhancer (INS 621).',
    ko: '정육(80%), 설탕, 굴소스, 요오드 소금, 아나토 오일, 피시소스, 생강, 레몬그라스, 생고추, 고춧가루, 강황 카레, 오향분, 천연 소고기 향, 향미증진제(INS 621).',
    zh: '精选鲜肉 (80%)、白砂糖、特级蚝油、食用盐、胭脂树红油、传统鱼露、鲜生姜、香茅、鲜辣椒、辣椒粉、姜黄咖喱、五香粉、天然牛肉香精、风味增味剂 (INS 621)。',
  },
  'kho-vien-vi-bo': {
    en: 'Select tender meat (80%), cane sugar, oyster sauce, sea salt, annatto oil, fish sauce, fresh ginger, lemongrass, fresh chili, chili powder, turmeric curry, five-spice, natural beef aroma, flavor enhancer (INS 621).',
    ko: '엄선육(80%), 설탕, 굴소스, 천일염, 아나토 오일, 피시소스, 생강, 레몬그라스, 고추, 고춧가루, 강황 카레, 오향분, 천연 소고기 향, 향미증진제(INS 621).',
    zh: '精选嫩肉 (80%)、白砂糖、蚝油、天然海盐、胭脂树红油、优质鱼露、鲜姜、香茅、辣椒、辣椒粉、姜黄咖喱粉、传统五香粉、天然牛肉香辛料、增味剂 (INS 621)。',
  },
  'kho-bo-sot-chanh': {
    en: 'Selected beef (50%), buffalo meat (30%), zesty lime sauce (5%), tomyum spices, malt syrup, iodized salt, sugar, vegetable oil, onion powder, fresh ginger, curry, lemongrass, citric acid (INS E330), natural paprika extract (INS 160C).',
    ko: '엄선된 소고기(50%), 버팔로육(30%), 상큼한 라임 소스(5%), 톰얌 향신료, 맥아당, 요오드 소금, 설탕, 식물성 유지, 양파가루, 생강, 카레, 레몬그라스, 구연산(INS E330), 파프리카 추출색소(INS 160C).',
    zh: '精选牛肉 (50%)、水牛肉 (30%)、鲜榨青柠汁复合调味酱 (5%)、冬阴功辛香料、麦芽糖、食用盐、白砂糖、植物油、洋葱粉、生姜、咖喱、香茅、柠檬酸调节剂 (INS E330)、天然红椒提取物 (INS 160C)。',
  },
}

export function translateIngredients(ing, language = 'vi', slugOrName = '') {
  if (!ing || language === 'vi') return ing
  const cleanKey = (slugOrName || '').toLowerCase().trim()
  
  // 1. Exact or alias match from dictionary
  if (INGREDIENTS_TRANSLATIONS[cleanKey]?.[language]) {
    return INGREDIENTS_TRANSLATIONS[cleanKey][language]
  }
  const alias = PRODUCT_SLUG_ALIASES[cleanKey]
  if (alias && INGREDIENTS_TRANSLATIONS[alias]?.[language]) {
    return INGREDIENTS_TRANSLATIONS[alias][language]
  }

  // 2. Keyword fallback matching
  for (const [key, trans] of Object.entries(INGREDIENTS_TRANSLATIONS)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      if (trans[language]) return trans[language]
    }
  }

  const lower = (ing || '').toLowerCase()
  if (lower.includes('bò') && lower.includes('chanh')) {
    return INGREDIENTS_TRANSLATIONS['kho-bo-sot-chanh'][language] || ing
  }
  if (lower.includes('thịt gà') && lower.includes('bò')) {
    return INGREDIENTS_TRANSLATIONS['kho-soi-vi-bo'][language] || ing
  }
  if (lower.includes('thịt heo') && lower.includes('bò')) {
    return INGREDIENTS_TRANSLATIONS['kho-vien-vi-bo'][language] || ing
  }
  if (lower.includes('bánh chả') || lower.includes('mỡ lợn') || lower.includes('mứt bí')) {
    return INGREDIENTS_TRANSLATIONS['banh-cha'][language] || ing
  }
  if (lower.includes('đậu đỏ')) {
    return INGREDIENTS_TRANSLATIONS['banh-dau-xanh-tuoi-vi-dau-do'][language] || ing
  }
  if (lower.includes('đậu xanh') && lower.includes('lá dứa')) {
    return INGREDIENTS_TRANSLATIONS['banh-dau-xanh-vi-la-dua'][language] || ing
  }
  if (lower.includes('đậu xanh') && lower.includes('mix')) {
    return INGREDIENTS_TRANSLATIONS['banh-dau-xanh-mix-vi'][language] || ing
  }
  if (lower.includes('đậu xanh')) {
    return INGREDIENTS_TRANSLATIONS['banh-dau-xanh-tuoi'][language] || ing
  }
  if (lower.includes('ngô mỹ') && lower.includes('caramel')) {
    return INGREDIENTS_TRANSLATIONS['bap-rang-bo-caramel'][language] || ing
  }
  if (lower.includes('ngô mỹ') && lower.includes('phô mai')) {
    return INGREDIENTS_TRANSLATIONS['bap-rang-bo-vi-pho-mai'][language] || ing
  }
  if (lower.includes('ngô mỹ')) {
    return INGREDIENTS_TRANSLATIONS['bap-rang-bo-vi-truyen-thong'][language] || ing
  }
  if (lower.includes('hạnh nhân') && lower.includes('ca cao')) {
    return INGREDIENTS_TRANSLATIONS['banh-hanh-nhan-ca-cao'][language] || ing
  }
  if (lower.includes('hạnh nhân') && lower.includes('trà xanh')) {
    return INGREDIENTS_TRANSLATIONS['banh-hanh-nhan-tra-xanh'][language] || ing
  }
  if (lower.includes('hạnh nhân')) {
    return INGREDIENTS_TRANSLATIONS['banh-hanh-nhan-truyen-thong'][language] || ing
  }
  if (lower.includes('sữa dừa') || lower.includes('cốt dừa')) {
    return INGREDIENTS_TRANSLATIONS['banh-sua-dua'][language] || ing
  }
  if (lower.includes('sữa đậu') || lower.includes('đậu nành')) {
    return INGREDIENTS_TRANSLATIONS['banh-sua-dau'][language] || ing
  }
  if (lower.includes('gà') && lower.includes('lá chanh')) {
    return INGREDIENTS_TRANSLATIONS['banh-trang-tron-ga-la-chanh'][language] || ing
  }
  if (lower.includes('sa tế tôm') || lower.includes('sa tế')) {
    return INGREDIENTS_TRANSLATIONS['banh-trang-tron-vi-sa-te-tom'][language] || ing
  }
  if (lower.includes('thực cẩm') || lower.includes('dầu điều')) {
    return INGREDIENTS_TRANSLATIONS['banh-trang-say-thuc-cam'][language] || ing
  }
  if (lower.includes('phô mai') || lower.includes('pho mai')) {
    return INGREDIENTS_TRANSLATIONS['banh-trang-say-gion-phomai'][language] || ing
  }
  if (lower.includes('chà bông') || lower.includes('tra-bong')) {
    return INGREDIENTS_TRANSLATIONS['banh-trang-say-gion-vi-tra-bong'][language] || ing
  }
  if (lower.includes('bò')) {
    return INGREDIENTS_TRANSLATIONS['banh-trang-say-gion-vi-bo'][language] || ing
  }
  if (lower.includes('tôm') || lower.includes('ruốc sấy')) {
    return INGREDIENTS_TRANSLATIONS['banh-trang-say-gion-vi-tom'][language] || ing
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
  'chien-luoc-toan-cau-hoa-dac-san-nong-san-viet-cua-nu-ceo-haq-da-vao-my-han-muc-tieu-ke-tiep-la-nhat-ban': {
    en: {
      title: "HAQ Female CEO's Strategy to Globalize Vietnamese Agri-Food Specialties: Entering US & Korea, Next Target Japan",
      summary: "Exclusive interview with CEO Tong Thi Ngan on the inspiring journey of elevating crispy baked rice paper, fresh mung bean cakes, and Vietnamese specialties under ISO 22000 & HACCP standards into demanding international markets.",
      author: 'Ngoc Tho - My Luong (Trang Trai Viet)',
    },
    ko: {
      title: "베트남 농특산물 글로벌화에 나선 HAQ 여성 CEO의 전략: 미국·한국 진출에 이어 다음 목표는 일본",
      summary: "통티응언(Tong Thi Ngan) 대표 독점 인터뷰: ISO 22000 및 HACCP 국제 인증을 바탕으로 베트남 특산 구운 라이스페이퍼와 신선 녹두 케이크로 까다로운 글로벌 유통 시장을 개척하는 혁신 스토리.",
      author: '응옥토 - 미르엉 (Trang Trai Viet)',
    },
    zh: {
      title: "HAQ 女性 CEO 的越南农特产品全球化战略：已成功进军美韩，下一步剑指日本",
      summary: "独家专访河内 HAQ 股份公司总经理宋氏银（Tống Thị Ngân）：依托 ISO 22000 与 HACCP 国际食品认证体系，带领越南特色烘烤米纸、新鲜绿豆糕及农特零食征服严苛国际市场的出海征程。",
      author: '玉寿 - 媚良 (Trang Trai Viet 报道)',
    },
  },
  'adasdasd': {
    en: {
      title: "HAQ FOOD Corporate Update",
      summary: "Latest operational activities and partner collaboration milestones at HAQ FOOD.",
      author: 'HAQ FOOD Media Team',
    },
    ko: {
      title: "HAQ FOOD 기업 소식",
      summary: "HAQ FOOD의 최신 비즈니스 활동 및 파트너십 협력 소식.",
      author: 'HAQ FOOD 미디어팀',
    },
    zh: {
      title: "HAQ FOOD 企业最新动向",
      summary: "HAQ FOOD 最新业务运营纪实与战略合作伙伴携手新动态。",
      author: 'HAQ FOOD 官方媒体部',
    },
  },
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
  if (language === 'vi') {
    return {
      ...product,
      canonical_name: product.canonical_name || product._originalName || product.vi_name || product.name,
      canonical_slug: product.canonical_slug || product.slug,
      canonical_category: product.canonical_category || product.categories?.name || product.category || '',
    }
  }

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

  // Preserve the raw Vietnamese name before translation as canonical_name
  const canonicalName = product.canonical_name || product._originalName || product.vi_name || product.name || resolvedName

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
    canonical_name: canonicalName,
    canonical_slug: product.canonical_slug || product.slug,
    en_name: product.en_name || '',
    category: resolvedCategory,
    canonical_category: product.canonical_category || product.categories?.name || product.category || resolvedCategory,
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
