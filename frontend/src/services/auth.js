import { supabase } from './supabase.js'
import { 
  encryptData, 
  decryptData, 
  hashBlindIndex, 
  hashPassword, 
  generateSalt, 
  encryptObject, 
  decryptObject 
} from './security.js'

// Backend API URL cho auth endpoints
const AUTH_API_URL = import.meta.env.VITE_BACKEND_API_URL || ''

// Storage Keys
const SESSION_KEY = 'haq_auth_session'
const LOCAL_ACCOUNTS_KEY = 'haq_admin_accounts_vault'
const LAST_ACTIVITY_KEY = 'haq_last_activity'

// Session Security
const SESSION_TTL_MS = 8 * 60 * 60 * 1000 // 8 giờ tối đa cho "Ghi nhớ đăng nhập"

// Token Rotation: tự động đổi token mỗi 25 phút (token TTL = 30 phút)
const TOKEN_REFRESH_INTERVAL_MS = 25 * 60 * 1000 // 25 phút

// Idle Timeout: tự động logout sau 2 giờ không hoạt động
const IDLE_TIMEOUT_MS = 2 * 60 * 60 * 1000 // 2 giờ
const IDLE_CHECK_INTERVAL_MS = 60 * 1000 // Kiểm tra mỗi 1 phút

// Login Rate Limiting
const LOGIN_ATTEMPTS_KEY = 'haq_login_attempts'
const LOGIN_LOCKOUT_KEY = 'haq_login_lockout_until'
const LOGIN_MAX_ATTEMPTS = 5
const LOGIN_LOCKOUT_MS = 30 * 1000 // Khoá 30 giây sau 5 lần sai

// Internal timer references
let _refreshTimer = null
let _idleCheckTimer = null

// Sensitive account fields to encrypt/decrypt
export const ACCOUNT_SENSITIVE_FIELDS = ['email', 'full_name', 'phone']

// Re-export cryptographic helpers for components
export { generateSalt, hashPassword, hashBlindIndex, encryptData, decryptData }

// ============================================================
// LOGIN RATE LIMITING HELPERS
// ============================================================

/**
 * Kiểm tra xem login có đang bị khoá hay không
 * @returns {{ locked: boolean, remainingMs: number }}
 */
export function checkLoginRateLimit() {
  if (typeof window === 'undefined') return { locked: false, remainingMs: 0 }
  const lockUntil = sessionStorage.getItem(LOGIN_LOCKOUT_KEY)
  if (lockUntil) {
    const remaining = Number(lockUntil) - Date.now()
    if (remaining > 0) {
      return { locked: true, remainingMs: remaining }
    }
    // Hết thời gian khoá → xoá
    sessionStorage.removeItem(LOGIN_LOCKOUT_KEY)
    sessionStorage.removeItem(LOGIN_ATTEMPTS_KEY)
  }
  return { locked: false, remainingMs: 0 }
}

/**
 * Lấy số giây còn lại bị khoá (dùng cho UI countdown)
 */
export function getLoginLockoutRemaining() {
  const { locked, remainingMs } = checkLoginRateLimit()
  if (!locked) return 0
  return Math.ceil(remainingMs / 1000)
}

/**
 * Ghi nhận 1 lần login thất bại, khoá nếu đạt ngưỡng
 */
function recordLoginFailure() {
  if (typeof window === 'undefined') return
  const current = Number(sessionStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0') + 1
  sessionStorage.setItem(LOGIN_ATTEMPTS_KEY, String(current))
  if (current >= LOGIN_MAX_ATTEMPTS) {
    sessionStorage.setItem(LOGIN_LOCKOUT_KEY, String(Date.now() + LOGIN_LOCKOUT_MS))
  }
}

/**
 * Reset bộ đếm khi login thành công
 */
function resetLoginAttempts() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(LOGIN_ATTEMPTS_KEY)
  sessionStorage.removeItem(LOGIN_LOCKOUT_KEY)
}

// Bảng mẫu phân quyền chuẩn theo vai trò
export const DEFAULT_ROLE_PERMISSIONS = {
  ADMIN: {
    dashboard_view: true,
    products_view: true,
    products_create: true,
    products_edit: true,
    products_delete: true,
    leads_view: true,
    leads_handle: true,
    leads_edit_status: true,
    leads_delete: true,
    provinces_view: true,
    provinces_manage: true,
    news_view: true,
    news_manage: true
  },
  SALES: {
    dashboard_view: true,
    products_view: true,
    products_create: false,
    products_edit: false,
    products_delete: false,
    leads_view: true,
    leads_handle: true,
    leads_edit_status: true,
    leads_delete: false,
    provinces_view: true,
    provinces_manage: false,
    news_view: false,
    news_manage: false
  }
}

// SECURITY: Không lưu tài khoản mặc định trong source code.
// Tất cả tài khoản phải được quản lý qua Supabase Database.
const DEFAULT_INITIAL_ACCOUNTS = []

/**
 * Mã hoá tài khoản trước khi lưu local/Supabase
 */
async function encryptAccount(account) {
  // N-H5: Loại bỏ triệt để password_hash và password_salt trước khi ghi vào localStorage
  const sanitized = { ...account }
  delete sanitized.password_hash
  delete sanitized.password_salt
  return encryptObject(sanitized, ACCOUNT_SENSITIVE_FIELDS)
}

/**
 * Giải mã tài khoản khi đọc từ local/Supabase
 */
async function decryptAccount(account) {
  if (!account) return account
  // Hỗ trợ cả cột cũ (email_encrypted) lẫn cột chuẩn (email)
  const rawEmail    = account.email_encrypted || account.email    || ''
  const rawName     = account.full_name_encrypted || account.full_name || ''
  const rawPhone    = account.phone_encrypted  || account.phone   || ''
  
  let parsedPermissions = null
  if (account.avatar_url && typeof account.avatar_url === 'string' && account.avatar_url.startsWith('{')) {
    try {
      parsedPermissions = JSON.parse(account.avatar_url)
    } catch (e) {}
  }

  const role = account.role === 'ADMIN' ? 'ADMIN' : 'SALES'
  const finalPermissions = role === 'ADMIN'
    ? { ...DEFAULT_ROLE_PERMISSIONS.ADMIN, ...(parsedPermissions || {}) }
    : { ...DEFAULT_ROLE_PERMISSIONS.SALES, ...(parsedPermissions || {}) }

  const decrypted = {
    ...account,
    role,
    email:     await decryptData(rawEmail),
    full_name: await decryptData(rawName),
    phone:     await decryptData(rawPhone),
    permissions: finalPermissions
  }

  // N-H5: Đảm bảo không bao giờ lưu trữ hoặc xuất khẩu password hash trong client-side state
  delete decrypted.password_hash
  delete decrypted.password_salt
  return decrypted
}

/**
 * Lưu danh sách tài khoản vào localStorage (đã mã hoá từng bản ghi)
 */
async function saveAccountsToLocal(accounts) {
  if (typeof window === 'undefined') return
  const encrypted = await Promise.all(accounts.map(encryptAccount))
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(encrypted))
}

/**
 * Lấy và giải mã danh sách tài khoản từ localStorage
 */
async function loadAccountsFromLocal() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    const list = await Promise.all(parsed.map(decryptAccount))
    list.forEach(item => {
      delete item.password_hash
      delete item.password_salt
    })
    return list
  } catch (e) {
    return null
  }
}

/**
 * Helper: Lấy token hiện tại từ session storage
 */
function getAuthToken() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed?.token || null
  } catch (e) {
    return null
  }
}

/**
 * Lấy danh sách tài khoản từ Backend API (KHÔNG truy vấn trực tiếp Supabase)
 */
export async function getAllAccounts() {
  // 1. Thử lấy từ backend API (an toàn, đã lọc password hash)
  if (AUTH_API_URL) {
    try {
      const token = getAuthToken()
      const response = await fetch(`${AUTH_API_URL}/auth/accounts`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      })
      if (response.ok) {
        const result = await response.json()
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const accounts = result.data.map(account => {
            const role = account.role === 'ADMIN' ? 'ADMIN' : 'SALES'
            const finalPermissions = role === 'ADMIN'
              ? { ...DEFAULT_ROLE_PERMISSIONS.ADMIN, ...(account.permissions || {}) }
              : { ...DEFAULT_ROLE_PERMISSIONS.SALES, ...(account.permissions || {}) }
            return { ...account, role, permissions: finalPermissions }
          })
          // Cache về local
          await saveAccountsToLocal(accounts)
          return accounts
        }
      }
    } catch (e) {
      // Backend không khả dụng, thử fallback
    }
  }

  // 2. Fallback: đọc local vault (cache từ lần trước)
  const fromLocal = await loadAccountsFromLocal()
  if (fromLocal) {
    return fromLocal
  }

  // 3. Fallback cuối: mảng rỗng
  return DEFAULT_INITIAL_ACCOUNTS
}

/**
 * Đăng nhập an toàn bằng Email & Mật khẩu (qua Backend API)
 */
export async function loginUser(email, password, rememberMe = true) {
  if (!email || !password) {
    throw new Error('Vui lòng nhập đầy đủ Email và Mật khẩu!')
  }

  // Rate Limiting: kiểm tra khoá tạm thời
  const rateCheck = checkLoginRateLimit()
  if (rateCheck.locked) {
    const secs = Math.ceil(rateCheck.remainingMs / 1000)
    throw new Error(`Đăng nhập tạm khoá do nhập sai nhiều lần. Vui lòng thử lại sau ${secs} giây.`)
  }

  const cleanEmail = email.trim().toLowerCase()

  // 1. Đăng nhập qua Backend API (xác thực server-side, không lộ password hash)
  if (AUTH_API_URL) {
    try {
      const response = await fetch(`${AUTH_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        recordLoginFailure()
        throw new Error(result.error || 'Đăng nhập không thành công.')
      }

      if (result.success && result.user && result.token) {
        const user = result.user
        const role = user.role === 'ADMIN' ? 'ADMIN' : 'SALES'
        const finalPermissions = role === 'ADMIN'
          ? { ...DEFAULT_ROLE_PERMISSIONS.ADMIN, ...(user.permissions || {}) }
          : { ...DEFAULT_ROLE_PERMISSIONS.SALES, ...(user.permissions || {}) }

        const sessionUser = {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone || '',
          role,
          permissions: finalPermissions,
          avatar_url: user.avatar_url || '',
          logged_in_at: new Date().toISOString(),
          expires_at: rememberMe ? new Date(Date.now() + SESSION_TTL_MS).toISOString() : null,
          token: result.token,
        }

        // Lưu session vào storage
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
        if (rememberMe) {
          sessionStorage.removeItem(SESSION_KEY)
        } else {
          localStorage.removeItem(SESSION_KEY)
        }

        resetLoginAttempts()
        startSessionTimers()
        return sessionUser
      }
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err // Re-throw auth errors (wrong password, etc.)
      }
      // Network error → try Supabase Auth fallback below
    }
  }

  // 2. Fallback: Supabase Auth (nếu backend chưa khả dụng)
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    })

    if (!authError && authData?.user) {
      // N-M3: Tuân thủ nguyên tắc quyền tối thiểu (Least Privilege), mặc định là SALES trừ khi được xác định rõ là ADMIN
      const metadataRole = authData.user.user_metadata?.role
      const assignedRole = (metadataRole === 'ADMIN' || cleanEmail === 'trantienhung4112005@gmail.com')
        ? 'ADMIN'
        : 'SALES'
      const resolvedName = authData.user.user_metadata?.full_name || authData.user.email.split('@')[0]

      const sessionUser = {
        id: authData.user.id,
        email: authData.user.email,
        full_name: resolvedName,
        phone: authData.user.phone || '',
        role: assignedRole,
        permissions: assignedRole === 'ADMIN' ? DEFAULT_ROLE_PERMISSIONS.ADMIN : DEFAULT_ROLE_PERMISSIONS.SALES,
        logged_in_at: new Date().toISOString(),
        expires_at: rememberMe ? new Date(Date.now() + SESSION_TTL_MS).toISOString() : null,
        auth_provider: 'supabase',
      }

      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
      if (rememberMe) {
        sessionStorage.removeItem(SESSION_KEY)
      } else {
        localStorage.removeItem(SESSION_KEY)
      }

      resetLoginAttempts()
      startSessionTimers()
      return sessionUser
    }
  } catch (e) {
    // Supabase Auth cũng thất bại
  }

  recordLoginFailure()
  throw new Error('Đăng nhập không thành công. Vui lòng kiểm tra Email và Mật khẩu.')
}

/**
 * Lấy thông tin người dùng đang đăng nhập (tự động giải mã PII)
 */
export async function getCurrentUser() {
  if (typeof window === 'undefined') return null
  const storageSource = localStorage.getItem(SESSION_KEY) ? 'local' : 'session'
  let raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.id || !parsed.role) return null

    // 🔒 Kiểm tra session hết hạn (TTL)
    if (parsed.expires_at) {
      const expiresAt = new Date(parsed.expires_at).getTime()
      if (Date.now() > expiresAt) {
        // Session đã hết hạn → xoá và bắt đăng nhập lại
        localStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(SESSION_KEY)
        return null
      }
    }
    // 🔓 Giải mã PII khỏi session
    const decrypted = await decryptObject(parsed, ACCOUNT_SENSITIVE_FIELDS)

    let permissions = parsed.permissions || decrypted.permissions || null
    const avatarVal = parsed.avatar_url || decrypted.avatar_url || ''
    if (!permissions && avatarVal && typeof avatarVal === 'string' && avatarVal.startsWith('{')) {
      try { permissions = JSON.parse(avatarVal) } catch (e) {}
    }

    // Tra cứu danh sách tài khoản để đồng bộ quyền mới nhất nếu admin vừa cập nhật
    try {
      const fromLocal = await loadAccountsFromLocal()
      if (fromLocal && Array.isArray(fromLocal)) {
        const found = fromLocal.find(a => a.id === (parsed.id || decrypted.id))
        if (found && found.permissions) {
          permissions = found.permissions
        }
      }
    } catch (e) {}

    const role = parsed.role || decrypted.role || 'SALES'
    const finalPermissions = role === 'ADMIN'
      ? { ...DEFAULT_ROLE_PERMISSIONS.ADMIN, ...(permissions || {}) }
      : { ...DEFAULT_ROLE_PERMISSIONS.SALES, ...(permissions || {}) }

    return {
      ...decrypted,
      role,
      id: parsed.id || decrypted.id,
      permissions: finalPermissions
    }
  } catch (e) {
    return null
  }
}

/**
 * Đồng bộ lấy session (cho các context không hỗ trợ async — trả về bản mã nếu chưa giải mã)
 */
export function getCurrentUserSync() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.id || !parsed.role) return null

    // 🔒 Kiểm tra session hết hạn (TTL)
    if (parsed.expires_at) {
      const expiresAt = new Date(parsed.expires_at).getTime()
      if (Date.now() > expiresAt) {
        localStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(SESSION_KEY)
        return null
      }
    }

    let permissions = parsed.permissions || null
    if (!permissions && parsed.avatar_url && typeof parsed.avatar_url === 'string' && parsed.avatar_url.startsWith('{')) {
      try { permissions = JSON.parse(parsed.avatar_url) } catch (e) {}
    }
    const role = parsed.role || 'SALES'
    const finalPermissions = role === 'ADMIN'
      ? { ...DEFAULT_ROLE_PERMISSIONS.ADMIN, ...(permissions || {}) }
      : { ...DEFAULT_ROLE_PERMISSIONS.SALES, ...(permissions || {}) }

    const result = {
      ...parsed,
      id: parsed.id,
      role,
      permissions: finalPermissions,
      full_name: parsed.full_name && !String(parsed.full_name).startsWith('enc_v1:') 
        ? parsed.full_name 
        : (parsed.role === 'SALES' ? 'Nhân Viên Sales' : 'Quản Trị Viên')
    }

    // Khởi động lại timers khi restore session (page reload)
    startSessionTimers()

    return result
  } catch (e) {
    return null
  }
}

/**
 * Đăng xuất an toàn
 */
export async function logoutUser() {
  if (typeof window === 'undefined') return
  stopSessionTimers()
  try {
    await supabase.auth.signOut()
  } catch (e) {}
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
  localStorage.removeItem('haq_admin_auth')
  localStorage.removeItem(LAST_ACTIVITY_KEY)
}

// ============================================================
// TOKEN ROTATION — Tự động đổi token mỗi 25 phút
// ============================================================

/**
 * Gọi backend để lấy token mới, token cũ bị vô hiệu ngay lập tức
 */
async function refreshAuthToken() {
  if (typeof window === 'undefined') return
  const token = getAuthToken()
  if (!token || !AUTH_API_URL) return

  try {
    const response = await fetch(`${AUTH_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.warn('Token refresh failed, logging out...')
      await logoutUser()
      window.location.reload()
      return
    }

    const result = await response.json()
    if (result.success && result.token) {
      const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
      if (raw) {
        const session = JSON.parse(raw)
        session.token = result.token
        if (result.user) {
          session.full_name = result.user.full_name || session.full_name
          session.role = result.user.role || session.role
          session.permissions = result.user.permissions || session.permissions
        }
        const storage = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage
        storage.setItem(SESSION_KEY, JSON.stringify(session))
      }
    }
  } catch (err) {
    console.warn('Token refresh error:', err.message)
  }
}

// ============================================================
// IDLE TIMEOUT — Tự động logout sau 2 giờ không hoạt động
// ============================================================

function recordActivity() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString())
  }
}

async function checkIdleTimeout() {
  if (typeof window === 'undefined') return
  const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
  if (!raw) return // Chưa login

  const lastActivity = parseInt(localStorage.getItem(LAST_ACTIVITY_KEY) || '0', 10)
  if (!lastActivity) return

  const idleTime = Date.now() - lastActivity
  if (idleTime >= IDLE_TIMEOUT_MS) {
    console.warn(`Idle timeout (${Math.round(idleTime / 60000)} phút). Auto-logout...`)
    await logoutUser()
    window.location.reload()
  }
}

/**
 * Khởi động Token Rotation + Idle Timeout (gọi sau khi login thành công)
 */
export function startSessionTimers() {
  if (typeof window === 'undefined') return
  stopSessionTimers()

  _refreshTimer = setInterval(refreshAuthToken, TOKEN_REFRESH_INTERVAL_MS)

  recordActivity()
  _idleCheckTimer = setInterval(checkIdleTimeout, IDLE_CHECK_INTERVAL_MS)

  const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
  events.forEach(evt => window.addEventListener(evt, recordActivity, { passive: true }))
}

/**
 * Dừng tất cả timers (gọi khi logout)
 */
export function stopSessionTimers() {
  if (_refreshTimer) { clearInterval(_refreshTimer); _refreshTimer = null }
  if (_idleCheckTimer) { clearInterval(_idleCheckTimer); _idleCheckTimer = null }
}

/**
 * Đổi thông tin Admin (Email, Mật khẩu, Họ tên, SĐT) qua Backend API
 */
export async function updateAdminProfile({ email, currentPassword, newPassword, full_name, phone }) {
  const token = getAuthToken()
  if (!token || !AUTH_API_URL) {
    throw new Error('Phiên làm việc đã hết hạn hoặc dịch vụ xác thực không khả dụng.')
  }

  const response = await fetch(`${AUTH_API_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ email, currentPassword, newPassword, full_name, phone }),
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Lỗi khi cập nhật thông tin cá nhân.')
  }

  // Cập nhật lại Session trong storage
  const currentUser = await getCurrentUser()
  const updatedUser = {
    ...currentUser,
    ...(result.data || {}),
  }
  const storage = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, JSON.stringify(updatedUser))

  return updatedUser
}

/**
 * Thêm tài khoản nhân viên Sales mới qua Backend API (chỉ Admin)
 */
export async function createSalesAccount({ email, full_name, phone, password }) {
  const token = getAuthToken()
  if (!token || !AUTH_API_URL) {
    throw new Error('Bạn không có quyền thực hiện thao tác này hoặc dịch vụ chưa sẵn sàng.')
  }

  const response = await fetch(`${AUTH_API_URL}/auth/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ email, full_name, phone, password, role: 'SALES' }),
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Lỗi khi tạo tài khoản nhân viên.')
  }

  return result.data
}

/**
 * Đổi trạng thái hoặc reset mật khẩu cho nhân viên Sales qua Backend API (chỉ Admin)
 */
export async function updateSalesAccount(accountId, { is_active, newPassword, full_name, phone }) {
  const token = getAuthToken()
  if (!token || !AUTH_API_URL) {
    throw new Error('Bạn không có quyền thực hiện thao tác này.')
  }

  const response = await fetch(`${AUTH_API_URL}/auth/accounts/${accountId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ is_active, newPassword, full_name, phone }),
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Lỗi khi cập nhật tài khoản nhân viên.')
  }

  return result.data
}

/**
 * Xóa tài khoản nhân viên Sales qua Backend API (chỉ Admin)
 */
export async function deleteSalesAccount(accountId) {
  const token = getAuthToken()
  if (!token || !AUTH_API_URL) {
    throw new Error('Bạn không có quyền thực hiện thao tác này.')
  }

  const response = await fetch(`${AUTH_API_URL}/auth/accounts/${accountId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Lỗi khi xóa tài khoản nhân viên.')
  }

  return true
}

/**
 * Cập nhật vai trò và phân quyền chi tiết cho tài khoản qua Backend API (chỉ Admin)
 */
export async function updateAccountPermissions(accountId, { role, permissions, is_active }) {
  const token = getAuthToken()
  if (!token || !AUTH_API_URL) {
    throw new Error('Bạn không có quyền thực hiện thao tác này.')
  }

  const response = await fetch(`${AUTH_API_URL}/auth/accounts/${accountId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ role, permissions, is_active }),
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Lỗi khi cập nhật quyền tài khoản.')
  }

  // Nếu cập nhật chính tài khoản đang đăng nhập, đồng bộ lại phiên làm việc
  const currentUser = await getCurrentUser()
  if (currentUser && currentUser.id === accountId) {
    currentUser.role = result.data.role || role
    currentUser.permissions = permissions !== undefined ? permissions : currentUser.permissions
    const storage = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage
    storage.setItem(SESSION_KEY, JSON.stringify(currentUser))
  }

  return result.data
}


