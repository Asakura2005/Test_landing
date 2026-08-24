# HAQ FOOD — Landing Page B2B

Trang landing page B2B cho HAQ FOOD — nhà sản xuất và cung ứng sỉ thực phẩm ăn vặt.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + Supabase
- **Deploy**: Vercel
- **Database**: Supabase (PostgreSQL)

## Cấu trúc thư mục

```
├── frontend/               # Giao diện (React + Tailwind)
│   ├── src/
│   │   ├── assets/         # Hình ảnh, fonts
│   │   ├── components/     # StickyNav, Hero, Products, LeadForm...
│   │   ├── hooks/          # useReveal (scroll animation)
│   │   ├── pages/          # Home
│   │   └── services/       # Supabase client
│   └── package.json
│
├── backend/                # API server (Express)
│   ├── src/
│   │   ├── config/         # Supabase config
│   │   ├── controllers/    # Lead controller
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   └── package.json
│
├── .gitignore
├── .env.example
└── README.md
```

## Cài đặt & Chạy

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Supabase Setup

1. Tạo project trên [supabase.com](https://supabase.com)
2. Tạo bảng `leads`:

```sql
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  need TEXT DEFAULT 'Báo giá sỉ',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cho phép insert từ anon key
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON leads FOR INSERT WITH CHECK (true);
```

3. Copy URL + anon key vào file `.env` (xem `.env.example`)

## Deploy lên Vercel

1. Push code lên GitHub
2. Kết nối repo trên [vercel.com](https://vercel.com)
3. Cấu hình:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Thêm Environment Variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
