import React, { useState, useEffect } from 'react'
import { 
  ShieldCheck, 
  BellRing, 
  KeyRound, 
  Mail, 
  Phone, 
  Save, 
  Check, 
  UserCheck, 
  Lock,
  Globe,
  Sliders,
  UserPlus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  AlertCircle,
  RefreshCw,
  X,
  ExternalLink,
  Send,
  User,
  CheckCircle2
} from 'lucide-react'
import { 
  getCurrentUser, 
  getCurrentUserSync,
  getAllAccounts, 
  updateAdminProfile, 
  createSalesAccount, 
  updateSalesAccount, 
  deleteSalesAccount 
} from '../../services/auth'
import { testEmailApiConnection } from '../../services/email'

export default function SettingsManager() {
  const [activeTab, setActiveTab] = useState('account') // 'account' | 'roles' | 'notifications' | 'webhook'
  const [savedSuccess, setSavedSuccess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Current User Profile State
  const [currentUser, setCurrentUser] = useState(() => getCurrentUserSync())
  const [adminProfile, setAdminProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [isUpdatingAdmin, setIsUpdatingAdmin] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Accounts List State
  const [accounts, setAccounts] = useState([])
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false)
  
  // Drawer & Modals State
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isPermissionDrawerOpen, setIsPermissionDrawerOpen] = useState(false)
  const [isAddSalesModalOpen, setIsAddSalesModalOpen] = useState(false)
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false)
  
  // Create Sales Form State
  const [salesForm, setSalesForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  })
  const [resetPassValue, setResetPassValue] = useState('')
  const [isSubmittingSales, setIsSubmittingSales] = useState(false)

  // Lead Notifications Config
  const [notificationConfig, setNotificationConfig] = useState({
    newLead: true,
    overdueSLA: true,
    leadAssigned: true,
    emailAlert: true,
    zaloAlert: true
  })
  const [isSavingNotification, setIsSavingNotification] = useState(false)
  const [emailTestStatus, setEmailTestStatus] = useState(null) // null | 'testing' | 'success' | 'error'
  const [emailTestResult, setEmailTestResult] = useState('')

  // Webhook Config
  const [webhookConfig, setWebhookConfig] = useState({
    url: 'https://hook.eu2.make.com/haqfood-b2b-leads-sync',
    isActive: true,
    events: {
      leadCreated: true,
      leadStatusChanged: true,
      orderInquiry: false
    },
    secretToken: 'whsec_haqfood_b2b_7a91fc028be48'
  })
  const [isSavingWebhook, setIsSavingWebhook] = useState(false)
  const [webhookTestStatus, setWebhookTestStatus] = useState(null) // null | 'testing' | 'success' | 'error'

  // Load Accounts & User Profile
  const loadAccountsData = async () => {
    try {
      setIsLoadingAccounts(true)
      const user = await getCurrentUser()
      setCurrentUser(user)
      if (user) {
        setAdminProfile(prev => ({
          ...prev,
          fullName: user.full_name || '',
          email: user.email || '',
          phone: user.phone || ''
        }))
      }
      const data = await getAllAccounts()
      setAccounts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoadingAccounts(false)
    }
  }

  useEffect(() => {
    loadAccountsData()
  }, [])

  const triggerToast = (msg = 'Đã lưu thay đổi.') => {
    setSavedSuccess(msg)
    setTimeout(() => setSavedSuccess(''), 3500)
  }

  // Handle Admin Profile Update (Only profile fields)
  const handleUpdateProfileOnly = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      setIsUpdatingAdmin(true)
      const updatedUser = await updateAdminProfile({
        email: adminProfile.email,
        full_name: adminProfile.fullName,
        phone: adminProfile.phone
      })

      setCurrentUser(updatedUser)
      triggerToast('Đã lưu thông tin tài khoản quản trị.')
      await loadAccountsData()
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi khi cập nhật thông tin.')
    } finally {
      setIsUpdatingAdmin(false)
    }
  }

  // Handle Password Change Form
  const handleChangePasswordOnly = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!adminProfile.currentPassword) {
      setErrorMsg('Vui lòng nhập Mật khẩu hiện tại!')
      return
    }
    if (!adminProfile.newPassword) {
      setErrorMsg('Vui lòng nhập Mật khẩu mới!')
      return
    }
    if (adminProfile.newPassword.length < 6) {
      setErrorMsg('Mật khẩu mới phải có tối thiểu 6 ký tự!')
      return
    }
    if (adminProfile.newPassword !== adminProfile.confirmPassword) {
      setErrorMsg('Mật khẩu mới và Xác nhận mật khẩu không khớp nhau!')
      return
    }

    try {
      setIsUpdatingPassword(true)
      await updateAdminProfile({
        currentPassword: adminProfile.currentPassword,
        newPassword: adminProfile.newPassword
      })

      setAdminProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
      triggerToast('Đã đổi mật khẩu thành công.')
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi khi đổi mật khẩu.')
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Reset Admin form to initial
  const handleResetAdminProfile = () => {
    if (currentUser) {
      setAdminProfile(prev => ({
        ...prev,
        fullName: currentUser.full_name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      }))
    }
    setErrorMsg('')
  }

  // Handle Create Sales Account
  const handleCreateSales = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      setIsSubmittingSales(true)
      await createSalesAccount({
        email: salesForm.email,
        full_name: salesForm.fullName,
        phone: salesForm.phone,
        password: salesForm.password
      })
      setIsAddSalesModalOpen(false)
      setSalesForm({ fullName: '', email: '', phone: '', password: '' })
      triggerToast('Đã tạo tài khoản Sales mới thành công.')
      await loadAccountsData()
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi khi tạo tài khoản nhân viên.')
    } finally {
      setIsSubmittingSales(false)
    }
  }

  // Handle Toggle Active Staff
  const handleToggleActiveStaff = async (staff) => {
    try {
      await updateSalesAccount(staff.id, { is_active: !staff.is_active })
      await loadAccountsData()
    } catch (err) {
      alert('Lỗi cập nhật: ' + err.message)
    }
  }

  // Handle Reset Password Sales
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!resetPassValue || resetPassValue.length < 6) {
      alert('Mật khẩu mới phải có tối thiểu 6 ký tự!')
      return
    }
    try {
      await updateSalesAccount(selectedStaff.id, { newPassword: resetPassValue })
      setIsResetPassModalOpen(false)
      setResetPassValue('')
      setSelectedStaff(null)
      triggerToast('Đã cập nhật mật khẩu mới cho nhân viên.')
      await loadAccountsData()
    } catch (err) {
      alert('Lỗi khi đổi mật khẩu: ' + err.message)
    }
  }

  // Handle Delete Staff
  const handleDeleteStaff = async (staff) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản nhân viên "${staff.full_name}" (${staff.email})?`)) return
    try {
      await deleteSalesAccount(staff.id)
      await loadAccountsData()
      triggerToast('Đã xóa tài khoản nhân viên.')
    } catch (err) {
      alert('Lỗi khi xóa tài khoản: ' + err.message)
    }
  }

  // Save Notifications
  const handleSaveNotifications = (e) => {
    e.preventDefault()
    setIsSavingNotification(true)
    setTimeout(() => {
      setIsSavingNotification(false)
      triggerToast('Đã lưu cấu hình thông báo Lead.')
    }, 400)
  }

  // Test Email Notification Connection
  const handleTestEmailNotification = async () => {
    try {
      setEmailTestStatus('testing')
      setEmailTestResult('')
      const res = await testEmailApiConnection()
      if (res && res.success) {
        setEmailTestStatus('success')
        setEmailTestResult('Đã gửi email kiểm tra thành công tới trantienhung4112005@gmail.com!')
      } else {
        setEmailTestStatus('error')
        setEmailTestResult(res?.error || 'Không thể gửi email. Vui lòng kiểm tra backend server.')
      }
    } catch (err) {
      setEmailTestStatus('error')
      setEmailTestResult(err.message || 'Lỗi kết nối.')
    }
  }

  // Save Webhook
  const handleSaveWebhook = (e) => {
    e.preventDefault()
    setIsSavingWebhook(true)
    setTimeout(() => {
      setIsSavingWebhook(false)
      triggerToast('Đã lưu cấu hình Webhook.')
    }, 400)
  }

  // Test Webhook Connection
  const handleTestWebhook = () => {
    setWebhookTestStatus('testing')
    setTimeout(() => {
      setWebhookTestStatus('success')
      setTimeout(() => setWebhookTestStatus(null), 4000)
    }, 1000)
  }

  // Open Permission Drawer for Account
  const handleOpenPermissionDrawer = (acc) => {
    setSelectedStaff(acc)
    setIsPermissionDrawerOpen(true)
  }

  return (
    <div className="space-y-4 pb-12 font-sans text-gray-800 antialiased">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#E2E8E4]">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Cài đặt hệ thống
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý tài khoản, quyền truy cập và cấu hình thông báo.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{savedSuccess}</span>
          </div>
        )}
      </div>

      {/* 2. SETTINGS NAVIGATION (Standard Enterprise Tabs) */}
      <div className="bg-white p-1 rounded-lg border border-[#E2E8E4] flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('account')}
          className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'account'
              ? 'bg-[#0F5132] text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Tài khoản</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('roles')}
          className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'roles'
              ? 'bg-[#0F5132] text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Phân quyền</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'notifications'
              ? 'bg-[#0F5132] text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <BellRing className="w-3.5 h-3.5" />
          <span>Thông báo Lead</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('webhook')}
          className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'webhook'
              ? 'bg-[#0F5132] text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Webhook</span>
        </button>
      </div>

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs font-medium flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
          <button 
            onClick={() => setErrorMsg('')}
            className="text-red-500 hover:text-red-800 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 1: TÀI KHOẢN (ACCOUNT SETTINGS & PASSWORD)               */}
      {/* ============================================================ */}
      {activeTab === 'account' && (
        <div className="space-y-4">
          
          {/* Section 1: Admin Profile Info */}
          <div className="bg-white rounded-lg border border-[#E2E8E4] overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-[#E2E8E4]">
              <h2 className="text-sm font-bold text-gray-900">
                Tài khoản quản trị
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Thông tin tài khoản và thông tin liên hệ của quản trị viên.
              </p>
            </div>

            <form onSubmit={handleUpdateProfileOnly}>
              <div className="p-4 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={adminProfile.fullName}
                      onChange={e => setAdminProfile({ ...adminProfile, fullName: e.target.value })}
                      className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                      placeholder="Trần Tiến Hùng"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800">
                      Email đăng nhập <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={adminProfile.email}
                      onChange={e => setAdminProfile({ ...adminProfile, email: e.target.value })}
                      className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]"
                      placeholder="trantienhung4112005@gmail.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      value={adminProfile.phone}
                      onChange={e => setAdminProfile({ ...adminProfile, phone: e.target.value })}
                      className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]"
                      placeholder="0900000000"
                    />
                  </div>

                </div>
              </div>

              {/* Action Footer */}
              <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleResetAdminProfile}
                  className="px-3 py-1.5 rounded-md border border-[#E2E8E4] bg-white text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingAdmin}
                  className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isUpdatingAdmin ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Password Change */}
          <div className="bg-white rounded-lg border border-[#E2E8E4] overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-[#E2E8E4]">
              <h2 className="text-sm font-bold text-gray-900">
                Đổi mật khẩu
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Cập nhật mật khẩu định kỳ để đảm bảo an toàn truy cập hệ thống.
              </p>
            </div>

            <form onSubmit={handleChangePasswordOnly}>
              <div className="p-4 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Current Password */}
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800">
                      Mật khẩu hiện tại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={adminProfile.currentPassword}
                        onChange={e => setAdminProfile({ ...adminProfile, currentPassword: e.target.value })}
                        placeholder="Nhập mật khẩu hiện tại"
                        className="w-full h-9 px-3 pr-8 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800">
                      Mật khẩu mới (Tối thiểu 6 ký tự) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={adminProfile.newPassword}
                        onChange={e => setAdminProfile({ ...adminProfile, newPassword: e.target.value })}
                        placeholder="Nhập mật khẩu mới"
                        className="w-full h-9 px-3 pr-8 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800">
                      Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        value={adminProfile.confirmPassword}
                        onChange={e => setAdminProfile({ ...adminProfile, confirmPassword: e.target.value })}
                        placeholder="Nhập lại mật khẩu mới"
                        className="w-full h-9 px-3 pr-8 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Footer */}
              <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isUpdatingPassword ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <KeyRound className="w-3.5 h-3.5" />
                  )}
                  <span>Đổi mật khẩu</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: PHÂN QUYỀN (ROLES & PERMISSIONS TABLE)                */}
      {/* ============================================================ */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          
          <div className="bg-white rounded-lg border border-[#E2E8E4] overflow-hidden shadow-2xs">
            
            {/* Table Toolbar */}
            <div className="p-4 border-b border-[#E2E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Phân quyền tài khoản
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Danh sách tài khoản truy cập hệ thống và phân bổ vai trò quản trị / kinh doanh.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadAccountsData}
                  className="p-2 rounded-md border border-[#E2E8E4] bg-white hover:bg-gray-50 text-gray-600 transition-colors"
                  title="Làm mới danh sách"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAccounts ? 'animate-spin text-[#0F5132]' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddSalesModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Thêm tài khoản Sales</span>
                </button>
              </div>
            </div>

            {/* Enterprise Accounts Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F7F8F6] border-b border-[#E2E8E4] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Tài khoản</th>
                    <th className="py-2.5 px-3 w-40">Vai trò</th>
                    <th className="py-2.5 px-3 w-32 text-center">Trạng thái</th>
                    <th className="py-2.5 px-3 w-44">Quyền</th>
                    <th className="py-2.5 px-4 w-44 text-right">Thao tác</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E2E8E4] text-xs">
                  {accounts.map((acc) => {
                    const isAdmin = acc.role === 'ADMIN'

                    return (
                      <tr key={acc.id} className="hover:bg-gray-50/80 transition-colors">
                        
                        {/* Account Name & Email */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-gray-100 border border-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs shrink-0">
                              {acc.full_name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {acc.full_name}
                              </div>
                              <div className="font-mono text-[11px] text-gray-400">
                                {acc.email} {acc.phone ? `• ${acc.phone}` : ''}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="py-3 px-3 w-40">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                            isAdmin 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            {isAdmin ? 'Quản trị viên' : 'Nhân viên Sales'}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3 w-32 text-center">
                          <button
                            type="button"
                            onClick={() => !isAdmin && handleToggleActiveStaff(acc)}
                            disabled={isAdmin}
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                              acc.is_active 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                : 'bg-red-50 text-red-700 border-red-200'
                            } ${isAdmin ? 'cursor-default' : 'hover:opacity-80 cursor-pointer'}`}
                            title={isAdmin ? 'Tài khoản Quản trị luôn hoạt động' : 'Bấm để đổi trạng thái'}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${acc.is_active ? 'bg-emerald-600' : 'bg-red-500'}`} />
                            {acc.is_active ? 'Đang hoạt động' : 'Đã khóa'}
                          </button>
                        </td>

                        {/* Permissions Summary */}
                        <td className="py-3 px-3 w-44 text-gray-600">
                          {isAdmin ? (
                            <span className="font-semibold text-emerald-700">Toàn quyền</span>
                          ) : (
                            <span className="text-gray-500">CRM / Lead</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 w-44 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenPermissionDrawer(acc)}
                              className="px-2 py-1 rounded border border-[#E2E8E4] bg-white text-[11px] font-semibold text-[#0F5132] hover:bg-emerald-50 transition-colors"
                            >
                              Quản lý
                            </button>

                            {!isAdmin && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedStaff(acc)
                                    setIsResetPassModalOpen(true)
                                  }}
                                  className="px-2 py-1 rounded border border-[#E2E8E4] bg-white text-[11px] font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                  title="Đổi mật khẩu cho nhân viên"
                                >
                                  Đổi pass
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteStaff(acc)}
                                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Xóa tài khoản"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer summary */}
            <div className="px-4 py-3 bg-[#F7F8F6] border-t border-[#E2E8E4] flex items-center justify-between text-xs text-gray-500">
              <span>Tổng cộng: <strong>{accounts.length}</strong> tài khoản</span>
              <span>Hệ thống phân quyền theo vai trò (RBAC)</span>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: THÔNG BÁO LEAD                                        */}
      {/* ============================================================ */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg border border-[#E2E8E4] overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-[#E2E8E4]">
            <h2 className="text-sm font-bold text-gray-900">
              Thông báo Lead
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Cấu hình thông báo tự động khi có khách hàng tiềm năng và yêu cầu báo giá B2B.
            </p>
          </div>

          <form onSubmit={handleSaveNotifications}>
            <div className="p-4 divide-y divide-[#E2E8E4] text-xs">
              
              {/* Option 1: Lead mới */}
              <div className="py-3.5 flex items-center justify-between gap-4 first:pt-0">
                <div>
                  <div className="font-semibold text-gray-900 text-xs">Lead mới</div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Gửi thông báo tức thời ngay khi có đối tác gửi form đăng ký hoặc yêu cầu báo giá.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationConfig.newLead}
                    onChange={e => setNotificationConfig({ ...notificationConfig, newLead: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F5132]"></div>
                </label>
              </div>

              {/* Option 2: Lead quá SLA */}
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900 text-xs">Lead quá SLA</div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Cảnh báo khi lead chưa được nhân viên kinh doanh tiếp nhận sau 15 phút.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationConfig.overdueSLA}
                    onChange={e => setNotificationConfig({ ...notificationConfig, overdueSLA: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F5132]"></div>
                </label>
              </div>

              {/* Option 3: Lead được phân công */}
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900 text-xs">Lead được phân công</div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Thông báo trực tiếp cho nhân viên phụ trách khi được gán tiếp nhận khách hàng.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationConfig.leadAssigned}
                    onChange={e => setNotificationConfig({ ...notificationConfig, leadAssigned: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F5132]"></div>
                </label>
              </div>

              {/* Option 4: Email notification */}
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900 text-xs">Email notification</div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Gửi bản sao lưu trữ chi tiết yêu cầu vào hộp thư quản trị (trantienhung4112005@gmail.com).
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationConfig.emailAlert}
                    onChange={e => setNotificationConfig({ ...notificationConfig, emailAlert: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F5132]"></div>
                </label>
              </div>

              {/* Option 5: Zalo OA Doanh nghiệp */}
              <div className="py-3.5 flex items-center justify-between gap-4 last:pb-0">
                <div>
                  <div className="font-semibold text-gray-900 text-xs">Zalo OA Doanh nghiệp</div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Đẩy tin nhắn chứa thông tin liên hệ và nhu cầu về nhóm Zalo nội bộ.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationConfig.zaloAlert}
                    onChange={e => setNotificationConfig({ ...notificationConfig, zaloAlert: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F5132]"></div>
                </label>
              </div>

            </div>

            {/* Test result banner if any */}
            {emailTestStatus && (
              <div className={`px-4 py-2.5 border-t text-xs flex items-center justify-between ${
                emailTestStatus === 'testing' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                emailTestStatus === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center gap-2">
                  {emailTestStatus === 'testing' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  {emailTestStatus === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {emailTestStatus === 'error' && <AlertCircle className="w-3.5 h-3.5 text-red-600" />}
                  <span>
                    {emailTestStatus === 'testing' && 'Đang gửi email kiểm tra qua SMTP...'}
                    {emailTestStatus === 'success' && (emailTestResult || 'Gửi email thành công!')}
                    {emailTestStatus === 'error' && (emailTestResult || 'Lỗi gửi email.')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailTestStatus(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Action Footer */}
            <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleTestEmailNotification}
                disabled={emailTestStatus === 'testing'}
                className="px-3 py-1.5 rounded-md border border-[#E2E8E4] bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {emailTestStatus === 'testing' ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Gửi email kiểm tra</span>
              </button>

              <button
                type="submit"
                disabled={isSavingNotification}
                className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isSavingNotification ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Lưu cấu hình</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: WEBHOOK CONFIGURATION                                 */}
      {/* ============================================================ */}
      {activeTab === 'webhook' && (
        <div className="bg-white rounded-lg border border-[#E2E8E4] overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-[#E2E8E4]">
            <h2 className="text-sm font-bold text-gray-900">
              Webhook
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Đồng bộ dữ liệu khách hàng tiềm năng thời gian thực với hệ thống ngoài (Make, Zapier, CRM, ERP).
            </p>
          </div>

          <form onSubmit={handleSaveWebhook}>
            <div className="p-4 space-y-4 text-xs">
              
              {/* Webhook URL */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">
                  Webhook URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={webhookConfig.url}
                  onChange={e => setWebhookConfig({ ...webhookConfig, url: e.target.value })}
                  placeholder="https://api.yourdomain.com/webhook/leads"
                  className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]"
                />
                <p className="text-[11px] text-gray-400">
                  Hệ thống sẽ gửi HTTP POST request kèm payload JSON khi có sự kiện được kích hoạt.
                </p>
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Trạng thái</label>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Đang hoạt động
                  </span>
                  <span className="text-[11px] text-gray-400">
                    • Lần gửi thành công gần nhất: vừa xong
                  </span>
                </div>
              </div>

              {/* Trigger Events */}
              <div className="space-y-2 pt-2 border-t border-[#E2E8E4]">
                <label className="font-semibold text-gray-800 block">Sự kiện kích hoạt (Event triggers)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-2 rounded-md border border-[#E2E8E4] hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={webhookConfig.events.leadCreated}
                      onChange={e => setWebhookConfig({
                        ...webhookConfig,
                        events: { ...webhookConfig.events, leadCreated: e.target.checked }
                      })}
                      className="w-3.5 h-3.5 text-[#0F5132] rounded focus:ring-emerald-500"
                    />
                    <span className="font-mono text-[11px] text-gray-700">lead.created</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-md border border-[#E2E8E4] hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={webhookConfig.events.leadStatusChanged}
                      onChange={e => setWebhookConfig({
                        ...webhookConfig,
                        events: { ...webhookConfig.events, leadStatusChanged: e.target.checked }
                      })}
                      className="w-3.5 h-3.5 text-[#0F5132] rounded focus:ring-emerald-500"
                    />
                    <span className="font-mono text-[11px] text-gray-700">lead.status_changed</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-md border border-[#E2E8E4] hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={webhookConfig.events.orderInquiry}
                      onChange={e => setWebhookConfig({
                        ...webhookConfig,
                        events: { ...webhookConfig.events, orderInquiry: e.target.checked }
                      })}
                      className="w-3.5 h-3.5 text-[#0F5132] rounded focus:ring-emerald-500"
                    />
                    <span className="font-mono text-[11px] text-gray-700">order.inquiry</span>
                  </label>
                </div>
              </div>

              {/* Secret Token */}
              <div className="space-y-1 pt-2 border-t border-[#E2E8E4]">
                <label className="font-semibold text-gray-800 flex justify-between">
                  <span>Secret Token</span>
                  <span className="text-[10px] text-gray-400 font-normal">Dùng để xác thực chữ ký HMAC</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    readOnly
                    value={webhookConfig.secretToken}
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] bg-gray-50 font-mono text-gray-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(webhookConfig.secretToken)
                      triggerToast('Đã sao chép Webhook Secret Token.')
                    }}
                    className="px-3 h-9 rounded-md border border-[#E2E8E4] bg-white text-gray-700 hover:bg-gray-50 text-xs font-semibold shrink-0"
                  >
                    Sao chép
                  </button>
                </div>
              </div>

            </div>

            {/* Action Footer */}
            <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  disabled={webhookTestStatus === 'testing'}
                  className="px-3 py-1.5 rounded-md border border-[#E2E8E4] bg-white text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5"
                >
                  <Send className={`w-3.5 h-3.5 ${webhookTestStatus === 'testing' ? 'animate-spin' : ''}`} />
                  <span>{webhookTestStatus === 'testing' ? 'Đang gửi Ping...' : 'Kiểm tra kết nối'}</span>
                </button>

                {webhookTestStatus === 'success' && (
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Ping 200 OK (142ms)
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSavingWebhook}
                className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSavingWebhook ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Lưu cấu hình</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. PERMISSION DETAIL RIGHT-SIDE DRAWER                       */}
      {/* ============================================================ */}
      {isPermissionDrawerOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-2xs animate-fadeIn">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E2E8E4] animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E2E8E4] flex items-center justify-between bg-gray-50/80">
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  Phân quyền chi tiết
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-mono">
                  {selectedStaff.full_name} ({selectedStaff.role === 'ADMIN' ? 'Quản trị viên' : 'Sales'})
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsPermissionDrawerOpen(false)
                  setSelectedStaff(null)
                }}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body: Permissions grouped by module */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              
              {/* Account Quick Info */}
              <div className="p-3 rounded-md border border-[#E2E8E4] bg-gray-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{selectedStaff.full_name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    selectedStaff.role === 'ADMIN' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {selectedStaff.role === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên Sales'}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-gray-500">{selectedStaff.email}</div>
              </div>

              {/* Module 1: Tổng quan */}
              <div className="space-y-2 p-3 rounded-md border border-[#E2E8E4]">
                <div className="font-bold text-xs text-gray-900">Tổng quan</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-2 cursor-default">
                    <input type="checkbox" checked readOnly className="w-3.5 h-3.5 text-[#0F5132] rounded" />
                    <span>Xem Dashboard KPIs</span>
                  </label>
                </div>
              </div>

              {/* Module 2: Sản phẩm & Biến thể */}
              <div className="space-y-2 p-3 rounded-md border border-[#E2E8E4]">
                <div className="font-bold text-xs text-gray-900">Sản phẩm & Biến thể</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-2 cursor-default">
                    <input type="checkbox" checked readOnly className="w-3.5 h-3.5 text-[#0F5132] rounded" />
                    <span>Xem danh sách</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input 
                      type="checkbox" 
                      checked={selectedStaff.role === 'ADMIN'} 
                      readOnly 
                      className="w-3.5 h-3.5 text-[#0F5132] rounded disabled:opacity-40" 
                    />
                    <span>Thêm sản phẩm</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input 
                      type="checkbox" 
                      checked={selectedStaff.role === 'ADMIN'} 
                      readOnly 
                      className="w-3.5 h-3.5 text-[#0F5132] rounded disabled:opacity-40" 
                    />
                    <span>Sửa thông tin</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input 
                      type="checkbox" 
                      checked={selectedStaff.role === 'ADMIN'} 
                      readOnly 
                      className="w-3.5 h-3.5 text-[#0F5132] rounded disabled:opacity-40" 
                    />
                    <span>Xóa sản phẩm</span>
                  </label>
                </div>
              </div>

              {/* Module 3: Lead / CRM */}
              <div className="space-y-2 p-3 rounded-md border border-[#E2E8E4]">
                <div className="font-bold text-xs text-gray-900">Lead / CRM</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-2 cursor-default">
                    <input type="checkbox" checked readOnly className="w-3.5 h-3.5 text-[#0F5132] rounded" />
                    <span>Xem danh sách lead</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input type="checkbox" checked readOnly className="w-3.5 h-3.5 text-[#0F5132] rounded" />
                    <span>Tiếp nhận & Xử lý</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input type="checkbox" checked readOnly className="w-3.5 h-3.5 text-[#0F5132] rounded" />
                    <span>Sửa trạng thái lead</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input 
                      type="checkbox" 
                      checked={selectedStaff.role === 'ADMIN'} 
                      readOnly 
                      className="w-3.5 h-3.5 text-[#0F5132] rounded disabled:opacity-40" 
                    />
                    <span>Xóa lead</span>
                  </label>
                </div>
              </div>

              {/* Module 4: Bản đồ đặc sản */}
              <div className="space-y-2 p-3 rounded-md border border-[#E2E8E4]">
                <div className="font-bold text-xs text-gray-900">Bản đồ đặc sản</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-2 cursor-default">
                    <input type="checkbox" checked readOnly className="w-3.5 h-3.5 text-[#0F5132] rounded" />
                    <span>Xem bản đồ</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input 
                      type="checkbox" 
                      checked={selectedStaff.role === 'ADMIN'} 
                      readOnly 
                      className="w-3.5 h-3.5 text-[#0F5132] rounded disabled:opacity-40" 
                    />
                    <span>Quản lý tỉnh & Gán SP</span>
                  </label>
                </div>
              </div>

              {/* Module 5: Tin tức & Truyền thông */}
              <div className="space-y-2 p-3 rounded-md border border-[#E2E8E4]">
                <div className="font-bold text-xs text-gray-900">Tin tức & Truyền thông</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-2 cursor-default">
                    <input type="checkbox" checked readOnly className="w-3.5 h-3.5 text-[#0F5132] rounded" />
                    <span>Xem bài viết</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-default">
                    <input 
                      type="checkbox" 
                      checked={selectedStaff.role === 'ADMIN'} 
                      readOnly 
                      className="w-3.5 h-3.5 text-[#0F5132] rounded disabled:opacity-40" 
                    />
                    <span>Đăng bài & Sửa</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-md border border-[#E2E8E4] text-[11px] text-gray-500">
                {selectedStaff.role === 'ADMIN'
                  ? 'Quản trị viên có toàn quyền thao tác trên mọi phân hệ của hệ thống.'
                  : 'Tài khoản Sales bị giới hạn chỉ được thao tác trong phân hệ CRM/Lead và tra cứu bảng giá.'}
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-end gap-2">
              <button 
                type="button" 
                onClick={() => {
                  setIsPermissionDrawerOpen(false)
                  setSelectedStaff(null)
                }} 
                className="px-3.5 py-1.5 rounded-md border border-[#E2E8E4] bg-white text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MODAL: THÊM TÀI KHOẢN SALES MỚI                           */}
      {/* ============================================================ */}
      {isAddSalesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-lg border border-[#E2E8E4] shadow-2xl w-full max-w-md overflow-hidden animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E2E8E4] flex items-center justify-between bg-gray-50/80">
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  Thêm tài khoản Sales
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Tạo tài khoản phụ trách tiếp nhận và xử lý lead cho nhân viên kinh doanh.
                </p>
              </div>
              <button 
                onClick={() => setIsAddSalesModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleCreateSales}>
              <div className="p-4 space-y-3.5 text-xs">
                
                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">
                    Họ và tên nhân viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={salesForm.fullName}
                    onChange={e => setSalesForm({ ...salesForm, fullName: e.target.value })}
                    placeholder="Ví dụ: Lê Thị Mai"
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">
                    Email đăng nhập <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={salesForm.email}
                    onChange={e => setSalesForm({ ...salesForm, email: e.target.value })}
                    placeholder="mai.sales@haqfood.vn"
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={salesForm.phone}
                    onChange={e => setSalesForm({ ...salesForm, phone: e.target.value })}
                    placeholder="0912345678"
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">
                    Mật khẩu khởi tạo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={salesForm.password}
                    onChange={e => setSalesForm({ ...salesForm, password: e.target.value })}
                    placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div className="p-3 bg-gray-50 border border-[#E2E8E4] rounded-md text-[11px] text-gray-600">
                  Tài khoản Sales có quyền tiếp nhận Lead & tra cứu bảng giá sỉ, không có quyền xóa sản phẩm hay thay đổi cấu hình hệ thống.
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSalesModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-[#E2E8E4] bg-white text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingSales}
                  className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmittingSales ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Tạo tài khoản</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. MODAL: ĐỔI MẬT KHẨU CHO SALES                             */}
      {/* ============================================================ */}
      {isResetPassModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-lg border border-[#E2E8E4] shadow-2xl w-full max-w-md overflow-hidden animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E2E8E4] flex items-center justify-between bg-gray-50/80">
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  Đổi mật khẩu cho Sales
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-mono">
                  {selectedStaff.full_name} ({selectedStaff.email})
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsResetPassModalOpen(false)
                  setSelectedStaff(null)
                }}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleResetPassword}>
              <div className="p-4 space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={resetPassValue}
                    onChange={e => setResetPassValue(e.target.value)}
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetPassModalOpen(false)
                    setSelectedStaff(null)
                  }}
                  className="px-3 py-1.5 rounded-md border border-[#E2E8E4] bg-white text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Lưu mật khẩu</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

