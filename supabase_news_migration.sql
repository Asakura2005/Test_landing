-- ==============================================================================
-- HAQ FOOD: SUPABASE NEWS & EDITORIAL ARTICLES MIGRATION
-- Bảng tin tức, bài viết B2B, chuẩn hóa SEO Meta SERP & Open Graph
-- Chạy toàn bộ script này trong Supabase -> SQL Editor -> RUN
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT DEFAULT 'Thị trường & Xuất khẩu',
    summary TEXT,
    content TEXT,
    image_url TEXT,
    author TEXT DEFAULT 'Ban Truyền Thông HAQ FOOD',
    source_name TEXT,
    source_url TEXT,
    is_pinned BOOLEAN DEFAULT FALSE,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT DEFAULT 'nông sản sạch, bánh tráng xuất khẩu, báo giá sỉ haq food',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nếu bảng đã tồn tại từ trước, tự động bổ sung các cột còn thiếu
ALTER TABLE IF EXISTS public.news 
  ADD COLUMN IF NOT EXISTS source_name TEXT,
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
  ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Ban Truyền Thông HAQ FOOD',
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT NOW();

-- Bật bảo mật Row Level Security (RLS)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Cấp quyền truy cập
DROP POLICY IF EXISTS "Cho phép tất cả đọc tin tức" ON public.news;
CREATE POLICY "Cho phép tất cả đọc tin tức" ON public.news FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép thêm tin tức" ON public.news;
CREATE POLICY "Cho phép thêm tin tức" ON public.news FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép cập nhật tin tức" ON public.news;
CREATE POLICY "Cho phép cập nhật tin tức" ON public.news FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Cho phép xóa tin tức" ON public.news;
CREATE POLICY "Cho phép xóa tin tức" ON public.news FOR DELETE USING (true);

-- Index tăng tốc truy vấn SEO & Danh sách
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news (slug);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_is_pinned ON public.news (is_pinned DESC);
