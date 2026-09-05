/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: CANONICAL PROVINCE CODES (HAQ FOOD)
 * 34 Tỉnh/Thành Đất Liền + 2 Quần Đảo Hoàng Sa & Trường Sa
 * Format: Lowercase slug chuẩn
 * ============================================================================
 */

export const CANONICAL_PROVINCE_CODES = [
  // 6 Đô thị / Thành phố trực thuộc & Trọng điểm
  "hanoi",
  "haiphong",
  "tthue",
  "danang",
  "hcm",
  "cantho",
  // Miền Bắc
  "caobang",
  "dienbien",
  "laichau",
  "langson",
  "quangninh",
  "sonla",
  "tuyenquang",
  "laocai",
  "thainguyen",
  "phutho",
  "bacninh",
  "hungyen",
  "ninhbinh",
  // Miền Trung & Tây Nguyên
  "thanhhoa",
  "nghean",
  "hatinh",
  "quangtri",
  "quangngai",
  "gialai",
  "khanhhoa",
  "lamdong",
  "daklak",
  // Miền Nam & Đồng bằng Sông Cửu Long
  "dongnai",
  "tayninh",
  "vinhlong",
  "dongthap",
  "camau",
  "angiang",
] as const;

export type CanonicalProvinceCode = typeof CANONICAL_PROVINCE_CODES[number];

export const ISLAND_CODES = ["hoangsa", "truongsa"] as const;
export type CanonicalIslandCode = typeof ISLAND_CODES[number];

/**
 * Metadata chuẩn cho 34 Tỉnh/Thành
 */
export interface CanonicalProvinceMeta {
  code: CanonicalProvinceCode;
  name: string;
  region: "Miền Bắc" | "Miền Trung" | "Miền Nam";
}

export const CANONICAL_PROVINCE_MAP: Record<CanonicalProvinceCode, CanonicalProvinceMeta> = {
  hanoi: { code: "hanoi", name: "Hà Nội", region: "Miền Bắc" },
  haiphong: { code: "haiphong", name: "Hải Phòng", region: "Miền Bắc" },
  tthue: { code: "tthue", name: "Huế", region: "Miền Trung" },
  danang: { code: "danang", name: "Đà Nẵng", region: "Miền Trung" },
  hcm: { code: "hcm", name: "TP. Hồ Chí Minh", region: "Miền Nam" },
  cantho: { code: "cantho", name: "Cần Thơ", region: "Miền Nam" },
  caobang: { code: "caobang", name: "Cao Bằng", region: "Miền Bắc" },
  dienbien: { code: "dienbien", name: "Điện Biên", region: "Miền Bắc" },
  hatinh: { code: "hatinh", name: "Hà Tĩnh", region: "Miền Trung" },
  laichau: { code: "laichau", name: "Lai Châu", region: "Miền Bắc" },
  langson: { code: "langson", name: "Lạng Sơn", region: "Miền Bắc" },
  nghean: { code: "nghean", name: "Nghệ An", region: "Miền Trung" },
  quangninh: { code: "quangninh", name: "Quảng Ninh", region: "Miền Bắc" },
  thanhhoa: { code: "thanhhoa", name: "Thanh Hóa", region: "Miền Trung" },
  sonla: { code: "sonla", name: "Sơn La", region: "Miền Bắc" },
  tuyenquang: { code: "tuyenquang", name: "Tuyên Quang", region: "Miền Bắc" },
  laocai: { code: "laocai", name: "Lào Cai", region: "Miền Bắc" },
  thainguyen: { code: "thainguyen", name: "Thái Nguyên", region: "Miền Bắc" },
  phutho: { code: "phutho", name: "Phú Thọ", region: "Miền Bắc" },
  bacninh: { code: "bacninh", name: "Bắc Ninh", region: "Miền Bắc" },
  hungyen: { code: "hungyen", name: "Hưng Yên", region: "Miền Bắc" },
  ninhbinh: { code: "ninhbinh", name: "Ninh Bình", region: "Miền Bắc" },
  quangtri: { code: "quangtri", name: "Quảng Trị", region: "Miền Trung" },
  quangngai: { code: "quangngai", name: "Quảng Ngãi", region: "Miền Trung" },
  gialai: { code: "gialai", name: "Gia Lai", region: "Miền Trung" },
  khanhhoa: { code: "khanhhoa", name: "Khánh Hòa", region: "Miền Trung" },
  lamdong: { code: "lamdong", name: "Lâm Đồng", region: "Miền Trung" },
  daklak: { code: "daklak", name: "Đắk Lắk", region: "Miền Trung" },
  dongnai: { code: "dongnai", name: "Đồng Nai", region: "Miền Nam" },
  tayninh: { code: "tayninh", name: "Tây Ninh", region: "Miền Nam" },
  vinhlong: { code: "vinhlong", name: "Vĩnh Long", region: "Miền Nam" },
  dongthap: { code: "dongthap", name: "Đồng Tháp", region: "Miền Nam" },
  camau: { code: "camau", name: "Cà Mau", region: "Miền Nam" },
  angiang: { code: "angiang", name: "An Giang", region: "Miền Nam" },
};

/**
 * Chuẩn hóa mã tỉnh thành Canonical Province Code từ Supabase DB
 * QUY TẮC TUYỆT ĐỐI: SUPABASE DATABASE LÀ SINGLE SOURCE OF TRUTH.
 * Không dùng keyword matching, không regex, không tra cứu từ điển tĩnh.
 */
export function resolveCanonicalProvinceCode(
  product: {
    province_id?: string | null;
    province_code?: string | null;
    provinceCode?: string | null;
  },
  dbProvinces: Array<{ id: string; code: string }> = []
): CanonicalProvinceCode | null {
  // 1. Khớp chính xác theo province_id khóa ngoại
  if (product.province_id && dbProvinces.length > 0) {
    const matched = dbProvinces.find((p) => p.id === product.province_id);
    if (matched && matched.code) {
      const normalized = matched.code.toLowerCase().trim();
      const canonical = CANONICAL_PROVINCE_CODES.find((c) => c === normalized);
      if (canonical) return canonical;
    }
  }

  // 2. Khớp theo province_code nếu có lưu trực tiếp trong DB
  const rawCode = product.province_code || product.provinceCode;
  if (rawCode) {
    const normalized = rawCode.toLowerCase().trim().replace(/[-_\s]/g, "");
    const matched = CANONICAL_PROVINCE_CODES.find(
      (c) => c === normalized || c === rawCode.toLowerCase().trim()
    );
    if (matched) return matched;
  }

  // 3. Nếu chưa được gán trong DB -> null (Không suy đoán)
  return null;
}

