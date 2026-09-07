import { supabase } from '../config/supabase.js'
import crypto from 'crypto'

// ============================================================
// HELPERS
// ============================================================

const JWT_SECRET = process.env.JWT_SECRET || ''
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET not configured. Auth endpoints will not work securely.')
}

/**
 * Hash password bằng SHA-256 + salt (tương thích với frontend cũ)
 */
function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(password + (salt || ''))
    .digest('hex')
}

/**
 * Tạo JWT token đơn giản (HMAC-SHA256)
 */
function createToken(payload, expiresInSeconds = 7 * 24 * 3600) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const body = Buffer.from(JSON.stringify({
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  })).toString('base64url')

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url')

  return `${header}.${body}.${signature}`
}

/**
 * Xác minh JWT token
 */
function verifyToken(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, body, signature] = parts
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url')

    if (signature !== expectedSig) return null

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload
  } catch (e) {
    return null
  }
}

/**
 * Middleware xác thực token cho các route bảo vệ
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Truy cập bị từ chối. Cần đăng nhập.' })
  }

  const token = authHeader.slice(7)
  const payload = verifyToken(token)
  if (!payload) {
    return res.status(401).json({ error: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' })
  }

  req.user = payload
  next()
}

/**
 * Middleware kiểm tra quyền ADMIN
 */
export function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Chỉ Quản trị viên mới có quyền thực hiện thao tác này.' })
  }
  next()
}

// ============================================================
// CONTROLLERS
// ============================================================

/**
 * POST /api/auth/login — Đăng nhập admin/sales
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ Email và Mật khẩu.' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // 1. Truy vấn tài khoản từ admin_accounts (service key bypass RLS)
    const { data: account, error } = await supabase
      .from('admin_accounts')
      .select('id, email, full_name, phone, role, password_hash, password_salt, is_active, avatar_url, last_login')
      .eq('email', cleanEmail)
      .single()

    if (error || !account) {
      return res.status(401).json({ error: 'Tài khoản Email không tồn tại trên hệ thống.' })
    }

    if (!account.is_active) {
      return res.status(403).json({ error: 'Tài khoản này đang bị tạm khóa. Vui lòng liên hệ Quản trị viên.' })
    }

    // 2. Xác minh mật khẩu
    const computedHash = hashPassword(password, account.password_salt)
    if (computedHash !== account.password_hash) {
      return res.status(401).json({ error: 'Mật khẩu không chính xác.' })
    }

    // 3. Cập nhật last_login
    const now = new Date().toISOString()
    try {
      await supabase
        .from('admin_accounts')
        .update({ last_login: now })
        .eq('id', account.id)
    } catch (e) {
      // Không block login nếu update last_login thất bại
    }

    // 4. Parse permissions từ avatar_url nếu có
    let permissions = null
    if (account.avatar_url && typeof account.avatar_url === 'string' && account.avatar_url.startsWith('{')) {
      try { permissions = JSON.parse(account.avatar_url) } catch (e) {}
    }

    // 5. Tạo JWT token
    const tokenPayload = {
      id: account.id,
      email: account.email,
      full_name: account.full_name,
      phone: account.phone || '',
      role: account.role || 'SALES',
      permissions: permissions,
    }

    const token = createToken(tokenPayload)

    // 6. Trả về user info + token (KHÔNG bao gồm password_hash/salt)
    res.json({
      success: true,
      token,
      user: {
        id: account.id,
        email: account.email,
        full_name: account.full_name,
        phone: account.phone || '',
        role: account.role || 'SALES',
        permissions: permissions,
        avatar_url: account.avatar_url || '',
        last_login: now,
      }
    })
  } catch (err) {
    console.error('Auth login error:', err)
    res.status(500).json({ error: 'Lỗi server. Vui lòng thử lại.' })
  }
}

/**
 * POST /api/auth/verify — Kiểm tra token còn hợp lệ không
 */
export async function verify(req, res) {
  // authMiddleware đã verify và gắn req.user
  res.json({ success: true, user: req.user })
}

/**
 * GET /api/auth/accounts — Lấy danh sách tài khoản (chỉ admin)
 */
export async function getAccounts(req, res) {
  try {
    const { data, error } = await supabase
      .from('admin_accounts')
      .select('id, email, full_name, phone, role, is_active, avatar_url, last_login, created_at, updated_at')
      .order('created_at', { ascending: true })

    if (error) throw error

    // Parse permissions từ avatar_url
    const accounts = (data || []).map(account => {
      let permissions = null
      if (account.avatar_url && typeof account.avatar_url === 'string' && account.avatar_url.startsWith('{')) {
        try { permissions = JSON.parse(account.avatar_url) } catch (e) {}
      }
      return { ...account, permissions }
    })

    res.json({ success: true, data: accounts })
  } catch (err) {
    console.error('getAccounts error:', err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
}

/**
 * POST /api/auth/accounts — Tạo tài khoản nhân viên mới (chỉ admin)
 */
export async function createAccount(req, res) {
  try {
    const { email, full_name, phone, password, role } = req.body

    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu.' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // Kiểm tra email đã tồn tại chưa
    const { data: existing } = await supabase
      .from('admin_accounts')
      .select('id')
      .eq('email', cleanEmail)
      .single()

    if (existing) {
      return res.status(409).json({ error: 'Tài khoản Email này đã tồn tại.' })
    }

    // Hash password
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = hashPassword(password, salt)

    const newAccount = {
      email: cleanEmail,
      full_name: full_name.trim(),
      phone: phone ? phone.trim() : '',
      role: role || 'SALES',
      password_hash: hash,
      password_salt: salt,
      is_active: true,
    }

    const { data, error } = await supabase
      .from('admin_accounts')
      .insert([newAccount])
      .select('id, email, full_name, phone, role, is_active, created_at')
      .single()

    if (error) throw error

    res.status(201).json({ success: true, data })
  } catch (err) {
    console.error('createAccount error:', err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
}

/**
 * PUT /api/auth/accounts/:id — Cập nhật tài khoản (admin)
 */
export async function updateAccount(req, res) {
  try {
    const { id } = req.params
    const { full_name, phone, email, newPassword, is_active, role, permissions } = req.body

    const updates = { updated_at: new Date().toISOString() }

    if (full_name !== undefined) updates.full_name = full_name.trim()
    if (phone !== undefined) updates.phone = phone.trim()
    if (email !== undefined) updates.email = email.trim().toLowerCase()
    if (is_active !== undefined) updates.is_active = Boolean(is_active)
    if (role !== undefined) updates.role = role
    if (permissions !== undefined) {
      updates.avatar_url = typeof permissions === 'string' ? permissions : JSON.stringify(permissions)
    }

    if (newPassword) {
      const salt = crypto.randomBytes(16).toString('hex')
      updates.password_hash = hashPassword(newPassword, salt)
      updates.password_salt = salt
    }

    const { data, error } = await supabase
      .from('admin_accounts')
      .update(updates)
      .eq('id', id)
      .select('id, email, full_name, phone, role, is_active, avatar_url, updated_at')
      .single()

    if (error) throw error

    res.json({ success: true, data })
  } catch (err) {
    console.error('updateAccount error:', err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
}

/**
 * DELETE /api/auth/accounts/:id — Xóa tài khoản (admin, không thể xóa chính mình)
 */
export async function deleteAccount(req, res) {
  try {
    const { id } = req.params

    if (req.user.id === id) {
      return res.status(400).json({ error: 'Bạn không thể xóa chính tài khoản đang đăng nhập.' })
    }

    const { error } = await supabase
      .from('admin_accounts')
      .delete()
      .eq('id', id)

    if (error) throw error

    res.json({ success: true })
  } catch (err) {
    console.error('deleteAccount error:', err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
}

/**
 * PUT /api/auth/profile — Cập nhật profile chính mình (cần mật khẩu hiện tại để đổi password)
 */
export async function updateProfile(req, res) {
  try {
    const userId = req.user.id
    const { currentPassword, newPassword, full_name, phone, email } = req.body

    // Lấy tài khoản hiện tại
    const { data: account, error: fetchErr } = await supabase
      .from('admin_accounts')
      .select('id, password_hash, password_salt')
      .eq('id', userId)
      .single()

    if (fetchErr || !account) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản.' })
    }

    const updates = { updated_at: new Date().toISOString() }

    // Nếu đổi mật khẩu, yêu cầu mật khẩu hiện tại
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Vui lòng nhập Mật khẩu hiện tại.' })
      }
      const checkHash = hashPassword(currentPassword, account.password_salt)
      if (checkHash !== account.password_hash) {
        return res.status(401).json({ error: 'Mật khẩu hiện tại không chính xác.' })
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' })
      }
      const salt = crypto.randomBytes(16).toString('hex')
      updates.password_hash = hashPassword(newPassword, salt)
      updates.password_salt = salt
    }

    if (full_name !== undefined) updates.full_name = full_name.trim()
    if (phone !== undefined) updates.phone = phone.trim()
    if (email !== undefined) updates.email = email.trim().toLowerCase()

    const { data, error } = await supabase
      .from('admin_accounts')
      .update(updates)
      .eq('id', userId)
      .select('id, email, full_name, phone, role, is_active, avatar_url, updated_at')
      .single()

    if (error) throw error

    res.json({ success: true, data })
  } catch (err) {
    console.error('updateProfile error:', err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
}
