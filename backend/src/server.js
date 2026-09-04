import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import leadRoutes from './routes/leadRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50kb' })) // Chặn payload quá lớn

// Security Rate Limiter (Tối đa 10 requests / 1 phút / IP đối với API)
const ipRequestLogs = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 phút
const MAX_REQUESTS_PER_WINDOW = 10

function rateLimitMiddleware(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown_ip'
  const now = Date.now()

  let userLogs = ipRequestLogs.get(ip) || []
  userLogs = userLogs.filter(t => now - t < RATE_LIMIT_WINDOW)

  if (userLogs.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.',
    })
  }

  userLogs.push(now)
  ipRequestLogs.set(ip, userLogs)

  // Dọn dẹp bộ nhớ định kỳ
  if (ipRequestLogs.size > 5000) {
    ipRequestLogs.clear()
  }

  next()
}

app.use('/api', rateLimitMiddleware)

// Routes
app.use('/api', leadRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HAQ FOOD Backend running on http://localhost:${PORT}`)
})
