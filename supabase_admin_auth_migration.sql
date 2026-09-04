-- ==============================================================================
-- HAQ FOOD: SUPABASE AUTH & RBAC MIGRATION SCRIPT
-- BẢNG TÀI KHOẢN QUẢN TRỊ & PHÂN QUYỀN NHÂN VIÊN SALES
-- ==============================================================================

-- 1. Tạo bảng admin_accounts
CREATE TABLE IF NOT EXISTS public.admin_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'SALES', -- 'ADMIN' hoặc 'SALES'
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Khởi tạo tài khoản Quản trị viên tối cao (Super Admin)
-- Mật khẩu được băm (hash) bằng SHA-256 + Salt an toàn tuyệt đối
INSERT INTO public.admin_accounts (
    email,
    full_name,
    phone,
    role, 
    password_hash, 
    password_salt, 
    is_active
)
VALUES (
    'trantienhung4112005@gmail.com',
    'Trần Tiến Hùng (Quản Trị Viên)',
    '0900000000',
    'ADMIN',
    'cf54814cd1a6843a187e270aa0a3ac9ea3536c78d399dd727df983744a59bce2',
    '8ddcf0daf3ada111a519fdb006788906',
    TRUE
)
ON CONFLICT (email) DO UPDATE SET
    role = 'ADMIN',
    is_active = TRUE;

-- 3. Khởi tạo mẫu 1 tài khoản nhân viên Sales thử nghiệm
-- Email: sales@haqfood.vn | Pass: HaqFood@2024
INSERT INTO public.admin_accounts (
    email,
    full_name,
    phone,
    role,
    password_hash,
    password_salt,
    is_active
)
VALUES (
    'sales@haqfood.vn',
    'Nguyễn Văn Tuấn (Kinh Doanh)',
    '0912345678',
    'SALES',
    '99cc78791e34bd5693e0c10f14c036118560ee4e0ed230c84dd0983626ca753d',
    '5c8a1b2e3f4d5e6f7a8b9c0d1e2f3a4b',
    TRUE
)
ON CONFLICT (email) DO NOTHING;

-- 4. Bật bảo mật Row Level Security (RLS)
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;

-- Cấp quyền truy cập cho ứng dụng
DROP POLICY IF EXISTS "Cho phép đọc admin_accounts" ON public.admin_accounts;
CREATE POLICY "Cho phép đọc admin_accounts" ON public.admin_accounts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép thêm admin_accounts" ON public.admin_accounts;
CREATE POLICY "Cho phép thêm admin_accounts" ON public.admin_accounts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép cập nhật admin_accounts" ON public.admin_accounts;
CREATE POLICY "Cho phép cập nhật admin_accounts" ON public.admin_accounts FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Cho phép xóa admin_accounts" ON public.admin_accounts;
CREATE POLICY "Cho phép xóa admin_accounts" ON public.admin_accounts FOR DELETE USING (true);
