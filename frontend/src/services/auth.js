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

// Session Security: TTL (Time To Live)
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 ngày cho "Ghi nhớ đăng nhập"

// Login Rate Limiting
const LOGIN_ATTEMPTS_KEY = 'haq_login_attempts'
const LOGIN_LOCKOUT_KEY = 'haq_login_lockout_until'
const LOGIN_MAX_ATTEMPTS = 5
const LOGIN_LOCKOUT_MS = 30 * 1000 // Khoá 30 giây sau 5 lần sai

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
  return encryptObject(account, ACCOUNT_SENSITIVE_FIELDS)
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

  return {
    ...account,
    role,
    email:     await decryptData(rawEmail),
    full_name: await decryptData(rawName),
    phone:     await decryptData(rawPhone),
    permissions: finalPermissions
  }
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
    return await Promise.all(parsed.map(decryptAccount))
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
      const assignedRole = authData.user.user_metadata?.role || 
        (cleanEmail.includes('sales') ? 'SALES' : 'ADMIN')
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

    return {
      ...parsed,
      id: parsed.id,
      role,
      permissions: finalPermissions,
      full_name: parsed.full_name && !String(parsed.full_name).startsWith('enc_v1:') 
        ? parsed.full_name 
        : (parsed.role === 'SALES' ? 'Nhân Viên Sales' : 'Quản Trị Viên')
    }
  } catch (e) {
    return null
  }
}

/**
 * Đăng xuất an toàn
 */
export async function logoutUser() {
  if (typeof window === 'undefined') return
  try {
    await supabase.auth.signOut()
  } catch (e) {}
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
  localStorage.removeItem('haq_admin_auth')
}

/**
 * Đổi thông tin Admin (Email, Mật khẩu, Họ tên, SĐT)
 */
export async function updateAdminProfile({ email, currentPassword, newPassword, full_name, phone }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) throw new Error('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!')

  const accounts = await getAllAccounts()
  const accountIndex = accounts.findIndex(a => a.id === currentUser.id || a.email.toLowerCase() === currentUser.email.toLowerCase())
  if (accountIndex === -1) throw new Error('Không tìm thấy tài khoản người dùng!')

  const account = { ...accounts[accountIndex] }

  // Nếu muốn đổi mật khẩu, bắt buộc phải nhập đúng mật khẩu hiện tại
  if (newPassword) {
    if (!currentPassword) {
      throw new Error('Vui lòng nhập Mật khẩu hiện tại để xác thực thay đổi!')
    }
    const checkHash = await hashPassword(currentPassword, account.password_salt)
    if (checkHash !== account.password_hash) {
      throw new Error('Mật khẩu hiện tại không chính xác!')
    }
    if (newPassword.length < 6) {
      throw new Error('Mật khẩu mới phải có độ dài tối thiểu 6 ký tự!')
    }
    const newSalt = generateSalt()
    const newHash = await hashPassword(newPassword, newSalt)
    account.password_salt = newSalt
    account.password_hash = newHash
  }

  if (email && email.trim().toLowerCase() !== account.email.toLowerCase()) {
    const cleanNewEmail = email.trim().toLowerCase()
    const isExisted = accounts.some((a, idx) => idx !== accountIndex && a.email.toLowerCase() === cleanNewEmail)
    if (isExisted) {
      throw new Error('Email này đã được sử dụng bởi một tài khoản khác!')
    }
    account.email = cleanNewEmail
  }

  if (full_name) account.full_name = full_name.trim()
  if (phone !== undefined) account.phone = phone.trim()
  account.updated_at = new Date().toISOString()

  // 🔐 Mã hoá PII trước khi ghi lên Supabase
  const encryptedForDB = await encryptObject({
    email:     account.email,
    full_name: account.full_name,
    phone:     account.phone,
    password_hash: account.password_hash,
    password_salt: account.password_salt,
    updated_at: account.updated_at
  }, ACCOUNT_SENSITIVE_FIELDS)

  try {
    await supabase
      .from('admin_accounts')
      .update(encryptedForDB)
      .eq('id', account.id)
  } catch (e) {
    console.warn("Supabase update account warn:", e.message)
  }

  // Cập nhật Local Vault (mã hoá)
  accounts[accountIndex] = account
  await saveAccountsToLocal(accounts)

  // 🔐 Cập nhật lại Session (mã hoá PII)
  const updatedSessionUser = {
    ...currentUser,
    email: account.email,
    full_name: account.full_name,
    phone: account.phone
  }
  const encryptedSession = await encryptObject(updatedSessionUser, ACCOUNT_SENSITIVE_FIELDS)
  const storage = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, JSON.stringify(encryptedSession))

  return updatedSessionUser
}

/**
 * Thêm tài khoản nhân viên Sales mới
 */
export async function createSalesAccount({ email, full_name, phone, password }) {
  if (!email || !password || !full_name) {
    throw new Error('Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu khởi tạo!')
  }

  const cleanEmail = email.trim().toLowerCase()
  const accounts = await getAllAccounts()
  if (accounts.some(a => a.email.toLowerCase() === cleanEmail)) {
    throw new Error('Tài khoản Email này đã tồn tại!')
  }

  const salt = generateSalt()
  const hash = await hashPassword(password, salt)

  const newAccount = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'acc-' + Date.now(),
    email: cleanEmail,
    full_name: full_name.trim(),
    phone: phone ? phone.trim() : '',
    role: 'SALES',
    password_hash: hash,
    password_salt: salt,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  // 🔐 Mã hoá PII trước khi INSERT vào Supabase
  const encryptedForDB = await encryptObject({
    id: newAccount.id,
    email: newAccount.email,
    full_name: newAccount.full_name,
    phone: newAccount.phone,
    role: 'SALES',
    password_hash: hash,
    password_salt: salt,
    is_active: true,
    created_at: newAccount.created_at,
    updated_at: newAccount.updated_at
  }, ACCOUNT_SENSITIVE_FIELDS)

  try {
    const { data, error } = await supabase
      .from('admin_accounts')
      .insert([encryptedForDB])
      .select()
    if (!error && data && data.length > 0) {
      newAccount.id = data[0].id
    }
  } catch (e) {
    console.warn("Supabase createSalesAccount warn:", e.message)
  }

  // Lưu local (mã hoá)
  accounts.push(newAccount)
  await saveAccountsToLocal(accounts)

  return newAccount
}

/**
 * Đổi trạng thái hoặc reset mật khẩu cho nhân viên Sales
 */
export async function updateSalesAccount(accountId, { is_active, newPassword, full_name, phone }) {
  const accounts = await getAllAccounts()
  const idx = accounts.findIndex(a => a.id === accountId)
  if (idx === -1) throw new Error('Không tìm thấy tài khoản nhân viên!')

  const account = { ...accounts[idx] }
  if (is_active !== undefined) account.is_active = Boolean(is_active)
  if (full_name) account.full_name = full_name.trim()
  if (phone !== undefined) account.phone = phone.trim()

  if (newPassword) {
    const salt = generateSalt()
    const newHash = await hashPassword(newPassword, salt)
    account.password_salt = salt
    account.password_hash = newHash
  }

  account.updated_at = new Date().toISOString()

  // 🔐 Mã hoá PII trước khi UPDATE lên Supabase
  const encryptedForDB = await encryptObject({
    is_active: account.is_active,
    full_name: account.full_name,
    phone: account.phone,
    password_hash: account.password_hash,
    password_salt: account.password_salt,
    updated_at: account.updated_at
  }, ACCOUNT_SENSITIVE_FIELDS)

  try {
    await supabase
      .from('admin_accounts')
      .update(encryptedForDB)
      .eq('id', accountId)
  } catch (e) {
    console.warn("Supabase updateSalesAccount warn:", e.message)
  }

  accounts[idx] = account
  await saveAccountsToLocal(accounts)

  return account
}

/**
 * Xóa tài khoản nhân viên Sales
 */
export async function deleteSalesAccount(accountId) {
  const currentUser = await getCurrentUser()
  if (currentUser && currentUser.id === accountId) {
    throw new Error('Bạn không thể xóa chính tài khoản đang đăng nhập!')
  }

  try {
    await supabase
      .from('admin_accounts')
      .delete()
      .eq('id', accountId)
  } catch (e) {
    console.warn("Supabase deleteSalesAccount warn:", e.message)
  }

  const accounts = await getAllAccounts()
  const filtered = accounts.filter(a => a.id !== accountId)
  await saveAccountsToLocal(filtered)
  return true
}

/**
 * Cập nhật vai trò và phân quyền chi tiết cho tài khoản
 */
export async function updateAccountPermissions(accountId, { role, permissions, is_active }) {
  const accounts = await getAllAccounts()
  const idx = accounts.findIndex(a => a.id === accountId)
  if (idx === -1) throw new Error('Không tìm thấy tài khoản nhân viên!')

  const account = { ...accounts[idx] }
  if (role) account.role = role
  if (is_active !== undefined) account.is_active = Boolean(is_active)
  if (permissions !== undefined) {
    account.permissions = permissions
    account.avatar_url = typeof permissions === 'string' ? permissions : JSON.stringify(permissions)
  }

  account.updated_at = new Date().toISOString()

  // Chuẩn bị payload cập nhật Supabase
  const updatePayload = {
    role: account.role,
    is_active: account.is_active,
    avatar_url: account.avatar_url || null,
    updated_at: account.updated_at
  }

  try {
    const { error } = await supabase
      .from('admin_accounts')
      .update(updatePayload)
      .eq('id', accountId)
    if (error) console.warn('Supabase update permissions error:', error.message)
  } catch (e) {
    console.warn('Supabase updateAccountPermissions warn:', e.message)
  }

  accounts[idx] = account
  await saveAccountsToLocal(accounts)

  // Nếu cập nhật chính tài khoản đang đăng nhập, đồng bộ lại phiên làm việc
  const currentUser = await getCurrentUser()
  if (currentUser && currentUser.id === accountId) {
    currentUser.role = account.role
    currentUser.permissions = account.permissions
    currentUser.avatar_url = account.avatar_url
    const storage = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage
    const raw = storage.getItem(SESSION_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        parsed.role = account.role
        parsed.permissions = account.permissions
        parsed.avatar_url = account.avatar_url
        storage.setItem(SESSION_KEY, JSON.stringify(parsed))
      } catch (e) {}
    }
  }

  return account
}


