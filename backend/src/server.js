import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import leadRoutes from './routes/leadRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

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
