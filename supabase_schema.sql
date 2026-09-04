-- =======================================================
-- HAQ FOOD B2B DATABASE SCHEMA SETUP
-- Chạy toàn bộ script này trong Supabase -> SQL Editor -> RUN
-- =======================================================

-- 1. BẢNG LEADS (Yêu cầu báo giá & Khách hàng B2B CRM)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    need TEXT,
    note TEXT,
    status TEXT DEFAULT 'new',
    scale TEXT DEFAULT 'provincial_agent',
    estimated_volume TEXT
);

-- Bật bảo mật RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Cấp quyền truy cập cho Leads
DROP POLICY IF EXISTS "Cho phép tất cả thêm lead" ON public.leads;
CREATE POLICY "Cho phép tất cả thêm lead" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép tất cả đọc lead" ON public.leads;
CREATE POLICY "Cho phép tất cả đọc lead" ON public.leads FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép tất cả cập nhật lead" ON public.leads;
CREATE POLICY "Cho phép tất cả cập nhật lead" ON public.leads FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Cho phép tất cả xóa lead" ON public.leads;
CREATE POLICY "Cho phép tất cả xóa lead" ON public.leads FOR DELETE USING (true);
