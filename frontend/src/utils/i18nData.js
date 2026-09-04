/**
 * HAQ FOOD — Client-Side Database Localization Engine
 * Tự động chuyển đổi dữ liệu thực thể lấy từ Supabase (Sản phẩm, Danh mục, Tỉnh thành)
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
}

// =============================================================================
// 2. TỪ ĐIỂN BẢN ĐỊA HÓA SẢN PHẨM (PRODUCTS)
// =============================================================================
export const PRODUCT_I18N = {
  // 1. Bánh tráng sấy giòn vị tôm
  'banh-trang-say-gion-vi-tom': {
    en: {
      name: 'Crispy Baked Rice Paper (Shrimp Flavor) 50g',
      sub: 'HAQ FOOD Signature Crispy Snack',
      desc: 'Crispy baked rice paper infused with natural sea shrimp seasoning. Produced on an automated convective drying line with ISO 22000 & HACCP standards.',
      highlights: ['Naturally seasoned with sea shrimp', 'Convective drying, no oily residue', 'Hygienic aluminum foil pouch', 'ISO 22000:2018 & HACCP certified'],
      spec: '50g / pack, 40 packs / carton',
      shelf_life: '9 months from manufacturing date',
      storage: 'Store in a cool, dry place away from direct sunlight',
    },
    ko: {
      name: '바삭한 구운 라이스페이퍼 (새우맛) 50g',
      sub: 'HAQ FOOD 대표 크리스피 스낵',
      desc: '천연 새우 시즈닝으로 감칠맛을 더한 바삭한 구운 라이스페이퍼. ISO 22000 및 HACCP 인증 자동 대류 열풍 건조 라인에서 생산.',
      highlights: ['천연 바다 새우 시즈닝 함유', '기름기 없는 위생 대류 건조 공법', '습기 차단 알루미늄 포장', 'ISO 22000 & HACCP 국제 안전 인증'],
      spec: '50g / 팩, 40팩 / 상자',
      shelf_life: '제조일로부터 9개월',
      storage: '직사광선을 피하고 건냉한 곳에 보관',
    },
  },

  // 2. Bánh tráng sấy bò 50g
  'banh-trang-say-bo-50g': {
    en: {
      name: 'Crispy Baked Rice Paper (Beef Flavor) 50g',
      sub: 'Savory Dried Beef Infused Snack',
      desc: 'Crispy baked rice paper with rich savory beef flavor, perfectly crunchy and hygienic.',
      highlights: ['Authentic Vietnamese spiced beef seasoning', 'Crispy texture, non-greasy', 'Food grade safety packaging'],
      spec: '50g / pack, 40 packs / carton',
      shelf_life: '9 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '바삭한 구운 라이스페이퍼 (소고기맛) 50g',
      sub: '진한 소고기 풍미의 구운 스낵',
      desc: '진한 소고기 풍미와 기분 좋은 바삭함을 선사하는 크리스피 구운 라이스페이퍼.',
      highlights: ['베트남 정통 양념 소고기 풍미', '담백하고 바삭한 무기름 건조', '안전한 위생 밀폐 포장'],
      spec: '50g / 팩, 40팩 / 상자',
      shelf_life: '제조일로부터 9개월',
      storage: '건냉한 곳에 실온 보관',
    },
  },

  // 3. Bánh tráng sấy chà bông 50g
  'banh-trang-say-cha-bong-50g': {
    en: {
      name: 'Crispy Baked Rice Paper (Pork Floss) 50g',
      sub: 'Savory Golden Pork Floss',
      desc: 'Crunchy baked rice paper topped with savory golden pork floss and special seasonings.',
      highlights: ['Topped with savory golden pork floss', 'Clean hot-air baking', 'ISO 22000 & HACCP standard'],
      spec: '50g / pack, 40 packs / carton',
      shelf_life: '9 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '바삭한 구운 라이스페이퍼 (포크플로스맛) 50g',
      sub: '고소한 돼지고기 플로스 토핑',
      desc: '바삭한 라이스페이퍼 위에 고소하고 짭조름한 돼지고기 플로스를 듬뿍 올린 스낵.',
      highlights: ['풍성한 골든 포크플로스 토핑', '위생적인 열풍 로스팅 공정', 'ISO 22000 & HACCP 인증'],
      spec: '50g / 팩, 40팩 / 상자',
      shelf_life: '제조일로부터 9개월',
      storage: '건랭한 곳에 보관',
    },
  },

  // 4. Bánh tráng trộn cuộn gà lá chanh
  'banh-trang-tron-ga-la-chanh': {
    en: {
      name: 'Rolled Rice Paper with Chicken & Lime Leaf 100g',
      sub: 'Vietnamese Street Food Delight',
      desc: 'Soft and chewy rolled rice paper combined with spicy shredded chicken and fresh kaffir lime leaves.',
      highlights: ['Real spicy shredded chicken', 'Fragrant kaffir lime aroma', 'Ready-to-eat convenient roll format'],
      spec: '100g / pack, 30 packs / carton',
      shelf_life: '6 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '치킨 라임잎 롤 라이스페이퍼 100g',
      sub: '베트남 길거리 미식의 고급화',
      desc: '쫄깃한 라이스페이퍼 롤에 매콤한 찢은 닭가슴살과 상큼한 라임잎 풍미가 조화로운 스낵.',
      highlights: ['매콤한 닭가슴살 토핑 함유', '상큼한 베트남 라임잎 풍미', '먹기 편한 핑거푸드 롤 타입'],
      spec: '100g / 팩, 30팩 / 상자',
      shelf_life: '제조일로부터 6개월',
      storage: '건냉한 곳에 보관',
    },
  },

  // 5. Bánh tráng trộn sa tế tôm
  'banh-trang-tron-sa-te-tom': {
    en: {
      name: 'Shredded Rice Paper with Spicy Shrimp Sate 100g',
      sub: 'Authentic Saigon Mixed Rice Paper',
      desc: 'Traditional Vietnamese shredded rice paper mixed with fragrant spicy shrimp sate sauce.',
      highlights: ['Spicy shrimp sate sauce', 'Soft, chewy shredded texture', 'Modern cleanroom packaging'],
      spec: '100g / pack, 30 packs / carton',
      shelf_life: '6 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '매콤 새우 사테 비빔 라이스페이퍼 100g',
      sub: '사이공 정통 비빔 라이스페이퍼',
      desc: '감칠맛 넘치는 새우 사테 소스로 매콤하게 버무린 베트남 정통 비빔 라이스페이퍼.',
      highlights: ['특제 매콤 새우 사테 소스', '쫄깃하고 부드러운 면발형 식감', '현대식 무균 포장 라인'],
      spec: '100g / 팩, 30팩 / 상자',
      shelf_life: '제조일로부터 6개월',
      storage: '건냉한 곳에 보관',
    },
  },

  // 6. Bánh hạnh nhân truyền thống
  'banh-hanh-nhan-truyen-thong-130g': {
    en: {
      name: 'Traditional Almond Pastry 130g',
      sub: 'Export Quality Baked Biscuit',
      desc: 'Crispy and buttery baked pastry made with premium sliced almonds. Meeting export standards for Taiwan and Korea.',
      highlights: ['Abundant sliced roasted almonds', 'Golden flaky buttery crust', 'Export grade to Taiwan & Korea'],
      spec: '130g / box, 24 boxes / carton',
      shelf_life: '12 months from manufacturing date',
      storage: 'Store in a cool, dry place away from heat',
    },
    ko: {
      name: '전통 아몬드 페이스트리 130g',
      sub: '수출 규격 프리미엄 구운 과자',
      desc: '고소한 슬라이스 아몬드와 버터 풍미가 어우러진 바삭한 구운 과자. 한국 및 대만 수출 품질 규격 충족.',
      highlights: ['엄선된 로스팅 슬라이스 아몬드', '바삭하고 고소한 버터 풍미', '한국 및 대만 수출 정식 규격'],
      spec: '130g / 박스, 24박스 / 상자',
      shelf_life: '제조일로부터 12개월',
      storage: '직사광선 및 고온 다습한 곳을 피함',
    },
  },

  // 7. Bánh hạnh nhân trà xanh
  'banh-hanh-nhan-tra-xanh-130g': {
    en: {
      name: 'Matcha Green Tea Almond Pastry 130g',
      sub: 'Green Tea & Roasted Almond Harmony',
      desc: 'Fragrant matcha green tea combined with crunchy roasted almonds in a delicate flaky biscuit.',
      highlights: ['Premium pure green tea powder', 'Crunchy almond topping', 'Light, balanced sweetness'],
      spec: '130g / box, 24 boxes / carton',
      shelf_life: '12 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '말차 그린티 아몬드 페이스트리 130g',
      sub: '말차와 구운 아몬드의 은은한 조화',
      desc: '향긋한 말차와 고소한 로스팅 아몬드가 어우러진 바삭하고 섬세한 프리미엄 비스킷.',
      highlights: ['고급 순수 녹차 파우더 함유', '바삭한 슬라이스 아몬드 토핑', '달지 않고 담백한 고급 디저트'],
      spec: '130g / 박스, 24박스 / 상자',
      shelf_life: '제조일로부터 12개월',
      storage: '서늘하고 건조한 실온 보관',
    },
  },

  // 8. Bánh đậu xanh tươi
  'banh-dau-xanh-tuoi-250g': {
    en: {
      name: 'Fresh Mung Bean Cake 250g',
      sub: 'Centuries-Old Hai Duong Specialty',
      desc: 'Traditional Hai Duong specialty made from pure fresh mung beans, melt-in-the-mouth texture with subtle sweetness.',
      highlights: ['100% pure selected mung beans', 'Silky melt-in-mouth texture', 'Refined sugar reduction recipe'],
      spec: '250g / box, 20 boxes / carton',
      shelf_life: '6 months from manufacturing date',
      storage: 'Store at room temperature or cool pantry',
    },
    ko: {
      name: '프레시 녹두 케이크 250g',
      sub: '하이즈엉 수백 년 전통 특산품',
      desc: '순수 녹두만을 엄선하여 입안에서 부드럽게 녹아내리는 은은한 단맛의 베트남 하이즈엉 전통 특산떡.',
      highlights: ['100% 엄선된 순수 녹두 분말', '부드럽게 녹아내리는 실크 식감', '당도를 낮춘 건강한 레시피'],
      spec: '250g / 박스, 20박스 / 상자',
      shelf_life: '제조일로부터 6개월',
      storage: '직사광선을 피해 실온 보관',
    },
  },

  // 9. Bánh sữa dừa
  'banh-sua-dua-130g': {
    en: {
      name: 'Ben Tre Coconut Milk Cake 130g',
      sub: 'Tropical Ben Tre Coconut Specialty',
      desc: 'Rich and aromatic cake crafted with natural Ben Tre coconut milk and crispy toasted coconut flakes.',
      highlights: ['Pure natural Ben Tre coconut milk', 'Aromatic roasted coconut flakes', 'Delicate natural sweetness'],
      spec: '130g / pack, 30 packs / carton',
      shelf_life: '9 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '코코넛 밀크 케이크 130g',
      sub: '베트남 벤째 천연 코코넛 특산',
      desc: '베트남 벤째산 천연 코코넛 밀크와 고소하게 구운 코코넛 플레이크의 풍부한 향미.',
      highlights: ['벤째산 천연 코코넛 밀크 원액', '고소하게 구운 코코넛 플레이크', '자연스럽고 풍부한 코코넛 향'],
      spec: '130g / 팩, 30팩 / 상자',
      shelf_life: '제조일로부터 9개월',
      storage: '건냉한 곳에 실온 보관',
    },
  },

  // 10. Bắp rang bơ caramel
  'bap-rang-bo-caramel': {
    en: {
      name: 'Caramel Glazed Popcorn',
      sub: 'Sweet & Crunchy Gourmet Popcorn',
      desc: 'Gourmet popped corn coated with golden caramel butter glaze, perfectly crunchy.',
      highlights: ['Rich caramel butter coating', 'Non-GMO corn kernels', 'Crispy and lightweight snacking'],
      spec: '80g / pack, 24 packs / carton',
      shelf_life: '9 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '카라멜 글레이즈드 팝콘',
      sub: '달콤 바삭 프리미엄 팝콘',
      desc: '달콤한 골든 카라멜 버터 코팅으로 한층 더 바삭하고 진한 풍미를 자랑하는 프리미엄 팝콘.',
      highlights: ['풍부한 카라멜 버터 글레이즈', 'Non-GMO 엄선 옥수수알', '바삭하고 깔끔한 식감'],
      spec: '80g / 팩, 24팩 / 상자',
      shelf_life: '제조일로부터 9개월',
      storage: '건냉한 곳에 보관',
    },
  },

  // 11. Bắp rang bơ phô mai
  'bap-rang-bo-pho-mai': {
    en: {
      name: 'Savory Cheddar Cheese Popcorn',
      sub: 'Rich Cheesy Crunch',
      desc: 'Air-popped corn coated with rich cheddar cheese powder.',
      highlights: ['Authentic cheddar cheese seasoning', 'Zero trans fat popped corn', 'Fun & savory treat'],
      spec: '80g / pack, 24 packs / carton',
      shelf_life: '9 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '체다 치즈 팝콘',
      sub: '고소 짭조름 치즈 팝콘',
      desc: '진한 체다 치즈 파우더를 듬뿍 입혀 짭조름하고 고소한 맛이 일품인 팝콘.',
      highlights: ['진한 체다 치즈 시즈닝', '트랜스지방 0g 건강 팝핑', '남녀노소 즐기는 단짠 스낵'],
      spec: '80g / 팩, 24팩 / 상자',
      shelf_life: '제조일로부터 9개월',
      storage: '건냉한 곳에 보관',
    },
  },

  // 12. Thịt bò khô hảo hạng
  'thit-bo-kho-hao-hang': {
    en: {
      name: 'Premium Spiced Beef Jerky',
      sub: 'Gourmet Vietnamese Dried Beef',
      desc: 'Select lean beef marinated in lemongrass, chili and traditional spices, gently dried to perfection.',
      highlights: ['100% premium lean beef cut', 'Authentic lemongrass and chili marinade', 'High protein savory snack'],
      spec: '100g / bag, 24 bags / carton',
      shelf_life: '12 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '프리미엄 소고기 육포 (비프 저키)',
      sub: '베트남 정통 양념 프리미엄 육포',
      desc: '엄선된 소고기 살코기에 레몬그라스, 고추 및 전통 향신료를 재워 정성껏 건조한 고급 육포.',
      highlights: ['100% 엄선된 소고기 순살코기', '레몬그라스 & 고추 천연 숙성', '단백질이 풍부한 고급 안주'],
      spec: '100g / 봉, 24봉 / 상자',
      shelf_life: '제조일로부터 12개월',
      storage: '직사광선을 피해 서늘한 곳에 보관',
    },
  },

  // 13. Thịt heo khô cháy tỏi
  'thit-heo-kho-chay-toi': {
    en: {
      name: 'Crispy Garlic Pork Jerky',
      sub: 'Roasted Garlic Infused Jerky',
      desc: 'Tender pork jerky tossed with aromatic roasted golden crispy garlic flakes.',
      highlights: ['Crispy golden roasted garlic flakes', 'Savory sweet Vietnamese marinade', 'Hygienic sealed packaging'],
      spec: '100g / bag, 24 bags / carton',
      shelf_life: '12 months from manufacturing date',
      storage: 'Store in a cool, dry place',
    },
    ko: {
      name: '크리스피 갈릭 돼지고기 육포',
      sub: '구운 마늘 후레이크 별미 육포',
      desc: '부드러운 돼지고기 육포에 황금빛 바삭한 구운 마늘 후레이크를 더한 별미 육포.',
      highlights: ['바삭하게 구운 황금 마늘칩', '단짠 조화의 베트남식 숙성 양념', '위생 밀봉 알루미늄 포장'],
      spec: '100g / 봉, 24봉 / 상자',
      shelf_life: '제조일로부터 12개월',
      storage: '건냉한 곳에 실온 보관',
    },
  },
}

// =============================================================================
// 3. TỪ ĐIỂN BẢN ĐỊA HÓA TỈNH THÀNH (PROVINCES)
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

// Fallback lookup matching province by name (lowercase Vietnamese)
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
// 4. CÁC HÀM XỬ LÝ CHÍNH (HELPER EXPORTS)
// =============================================================================

/**
 * Bản địa hóa một Category object
 */
export function getLocalizedCategory(category, language = 'vi') {
  if (!category) return category
  if (language === 'vi') return category

  const slug = category.slug || 'all'
  const translation = CATEGORY_I18N[slug]?.[language]

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
 * Bản địa hóa một Product object
 */
export function getLocalizedProduct(product, language = 'vi') {
  if (!product) return product
  if (language === 'vi') return product

  const slug = product.slug || ''
  const translation = PRODUCT_I18N[slug]?.[language]

  // Translate nested category if exists
  const localizedCat = product.categories
    ? getLocalizedCategory(product.categories, language)
    : product.categories

  // Translate nested province if exists
  const localizedProv = product.provinces
    ? getLocalizedProvince(product.provinces, language)
    : product.provinces

  if (!translation) {
    return {
      ...product,
      categories: localizedCat,
      provinces: localizedProv,
    }
  }

  return {
    ...product,
    name: translation.name || product.name,
    en_name: translation.sub || product.en_name,
    description: translation.desc || product.description,
    short_description: translation.desc || product.short_description,
    highlights: translation.highlights || product.highlights,
    packaging_spec: translation.spec || product.packaging_spec,
    shelf_life: translation.shelf_life || product.shelf_life,
    storage_guide: translation.storage || product.storage_guide,
    categories: localizedCat,
    provinces: localizedProv,
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
