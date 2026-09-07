import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import leadRoutes from './routes/leadRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cryptoRoutes from './routes/cryptoRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// N-H3: Bật trust proxy (Render reverse proxy hop count = 1) để Express giải mã req.ip an toàn, chống spoofing
app.set('trust proxy', 1)

// Security Headers (M2: helmet)
app.use(helmet({
  contentSecurityPolicy: false, // API không cần CSP
  crossOriginEmbedderPolicy: false,
}))

// CORS Whitelist (H2)
const ALLOWED_ORIGINS = [
  'https://test-landing-five-blond.vercel.app',
  'http://localhost:5173',   // Vite dev
  'http://localhost:3000',   // Local build
]

app.use(cors({
  origin: function (origin, callback) {
    // Cho phép request không có origin (curl, mobile app, server-to-server)
    if (!origin) return callback(null, true)
    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Blocked by CORS policy.'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '50kb' })) // Chặn payload quá lớn

// ============================================================
// RATE LIMITER (M1: Sliding Window + Periodic Cleanup)
// ============================================================
const ipRequestLogs = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 phút

// Giới hạn theo loại endpoint
const RATE_LIMITS = {
  '/api/auth/login': 10,      // Login: 10/phút (chống brute-force)
  '/api/auth/refresh': 30,    // Refresh: 30/phút
  '/api/leads': 20,           // Lead submit: 20/phút
  default: 60,                // Mặc định: 60/phút
}

// Các endpoint miễn rate limit (gọi nội bộ tần suất cao)
const RATE_LIMIT_EXEMPT = ['/api/crypto/', '/api/health']

// Dọn dẹp bộ nhớ mỗi 5 phút (tránh memory leak)
setInterval(() => {
  const now = Date.now()
  for (const [ip, logs] of ipRequestLogs.entries()) {
    const filtered = logs.filter(t => now - t < RATE_LIMIT_WINDOW)
    if (filtered.length === 0) {
      ipRequestLogs.delete(ip)
    } else {
      ipRequestLogs.set(ip, filtered)
    }
  }
}, 5 * 60 * 1000)

function rateLimitMiddleware(req, res, next) {
  // Bỏ qua cho crypto endpoints
  if (RATE_LIMIT_EXEMPT.some(path => req.path.startsWith(path))) {
    return next()
  }

  // N-H3: Dùng req.ip an toàn từ Express (đã được trust proxy xác thực, chống spoofing qua header X-Forwarded-For)
  const ip = req.ip || req.socket.remoteAddress || 'unknown_ip'
  const cleanPath = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path

  const now = Date.now()
  const key = `${ip}:${cleanPath}`

  let logs = ipRequestLogs.get(key) || []
  logs = logs.filter(t => now - t < RATE_LIMIT_WINDOW)

  // Xác định giới hạn cho endpoint này
  const matchedRoute = Object.keys(RATE_LIMITS).find(r => r !== 'default' && cleanPath.startsWith(r))
  const limit = matchedRoute ? RATE_LIMITS[matchedRoute] : RATE_LIMITS.default

  if (logs.length >= limit) {
    res.set('Retry-After', '60')
    return res.status(429).json({
      error: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.',
    })
  }

  logs.push(now)
  ipRequestLogs.set(key, logs)
  next()
}

app.use('/api', rateLimitMiddleware)

// Routes
app.use('/api', leadRoutes)
app.use('/api', authRoutes)
app.use('/api', cryptoRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HAQ FOOD Backend running on http://localhost:${PORT}`)
})
