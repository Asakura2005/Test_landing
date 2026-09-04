-- ==============================================================================
-- HAQ FOOD: SUPABASE MIGRATION SCRIPT (FIXED & UNIVERSAL COMPATIBILITY)
-- TRACKING -> LEADS CRM -> ORDERS & REVENUE PIPELINE
-- ==============================================================================

-- 1. Bổ sung các trường Tracking & CRM vào bảng LEADS hiện tại
ALTER TABLE IF EXISTS public.leads 
  ADD COLUMN IF NOT EXISTS utm_source TEXT DEFAULT 'direct',
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS session_id TEXT,
  ADD COLUMN IF NOT EXISTS last_product_id TEXT,
  ADD COLUMN IF NOT EXISTS last_product_name TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'NEW',
  ADD COLUMN IF NOT EXISTS assigned_to TEXT,
  ADD COLUMN IF NOT EXISTS sales_name TEXT,
  ADD COLUMN IF NOT EXISTS lost_reason TEXT,
  ADD COLUMN IF NOT EXISTS lost_note TEXT,
  ADD COLUMN IF NOT EXISTS estimated_value NUMERIC(15, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Bảng Nhân viên Sales / CSKH (Sales Reps)
CREATE TABLE IF NOT EXISTS public.sales_reps (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'SALES', -- SALES, LEADER, MANAGER
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed mẫu 3 nhân viên sales
INSERT INTO public.sales_reps (full_name, email, phone, role)
VALUES 
  ('Nguyễn Văn Tuấn', 'tuan.sales@haqfood.vn', '0912345678', 'LEADER'),
  ('Lê Thị Mai', 'mai.sales@haqfood.vn', '0923456789', 'SALES'),
  ('Trần Quốc Huy', 'huy.sales@haqfood.vn', '0934567890', 'SALES')
ON CONFLICT (email) DO NOTHING;

-- 3. Bảng Lịch sử thay đổi trạng thái Lead & Ghi chú chăm sóc (Audit Log & Notes)
-- Dùng TEXT cho lead_id để tương thích 100% dù leads.id là UUID hay BIGINT
CREATE TABLE IF NOT EXISTS public.lead_status_history (
  id BIGSERIAL PRIMARY KEY,
  lead_id TEXT NOT NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by_name TEXT DEFAULT 'Hệ thống / Admin',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Bảng Đơn hàng B2B (Orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  order_code TEXT UNIQUE NOT NULL,
  lead_id TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  company_name TEXT,
  assigned_sales_id BIGINT,
  sales_name TEXT,
  total_amount NUMERIC(15, 2) DEFAULT 0,
  status TEXT DEFAULT 'COMPLETED', -- PENDING, COMPLETED, CANCELLED
  utm_source TEXT DEFAULT 'direct',
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Bảng Chi tiết Đơn hàng (Order Items)
CREATE TABLE IF NOT EXISTS public.order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  variant_name TEXT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price NUMERIC(15, 2) NOT NULL DEFAULT 0,
  total_price NUMERIC(15, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Bảng Thống kê Lý do thất bại (Lead Lost Reasons Reference)
CREATE TABLE IF NOT EXISTS public.lead_lost_reasons (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'PRICE', -- PRICE, PRODUCT, COMPETITOR, SERVICE, INVALID
  sort_order INT DEFAULT 0
);

INSERT INTO public.lead_lost_reasons (code, title, category, sort_order)
VALUES 
  ('PRICE_HIGH', 'Giá sỉ cao hơn kỳ vọng / Yêu cầu chiết khấu thêm', 'PRICE', 1),
  ('NO_CONTACT', 'Không liên hệ được (Thuê bao / Sai số / Không nghe máy)', 'SERVICE', 2),
  ('PRODUCT_MISMATCH', 'Sản phẩm không phù hợp quy cách / mẫu mã mong muốn', 'PRODUCT', 3),
  ('NO_CERT', 'Yêu cầu chứng nhận riêng chưa đáp ứng kịp (FDA / Halal / Xuất khẩu)', 'PRODUCT', 4),
  ('COMPETITOR', 'Đã chọn đối thủ cạnh tranh khác', 'COMPETITOR', 5),
  ('SLOW_RESPONSE', 'Thời gian phản hồi chậm hơn đơn vị khác', 'SERVICE', 6),
  ('SURVEY_ONLY', 'Chỉ tham khảo giá, chưa có kế hoạch mở đại lý / bán hàng', 'INVALID', 7),
  ('OTHER', 'Lý do khác (Ghi chú chi tiết)', 'OTHER', 8)
ON CONFLICT (code) DO NOTHING;

-- 7. Bật RLS Policy bảo mật & Cấp quyền truy cập
ALTER TABLE public.sales_reps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read sales_reps" ON public.sales_reps;
CREATE POLICY "Allow read sales_reps" ON public.sales_reps FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow modify sales_reps" ON public.sales_reps;
CREATE POLICY "Allow modify sales_reps" ON public.sales_reps FOR ALL USING (true);

ALTER TABLE public.lead_status_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read lead_status_history" ON public.lead_status_history;
CREATE POLICY "Allow read lead_status_history" ON public.lead_status_history FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow insert lead_status_history" ON public.lead_status_history;
CREATE POLICY "Allow insert lead_status_history" ON public.lead_status_history FOR INSERT WITH CHECK (true);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read orders" ON public.orders;
CREATE POLICY "Allow read orders" ON public.orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow modify orders" ON public.orders;
CREATE POLICY "Allow modify orders" ON public.orders FOR ALL USING (true);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read order_items" ON public.order_items;
CREATE POLICY "Allow read order_items" ON public.order_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow modify order_items" ON public.order_items;
CREATE POLICY "Allow modify order_items" ON public.order_items FOR ALL USING (true);

ALTER TABLE public.lead_lost_reasons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read lead_lost_reasons" ON public.lead_lost_reasons;
CREATE POLICY "Allow read lead_lost_reasons" ON public.lead_lost_reasons FOR SELECT USING (true);
