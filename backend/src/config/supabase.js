import { createClient } from '@supabase/supabase-js'
import WebSocket from 'ws'
import dotenv from 'dotenv'

dotenv.config()

// SECURITY: Biến môi trường bắt buộc — không dùng fallback hardcode
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'FATAL: Missing required environment variables SUPABASE_URL and/or SUPABASE_SERVICE_KEY. ' +
    'Please configure them in your .env file or deployment platform.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    transport: WebSocket,
  },
})
