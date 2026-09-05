import React, { useState, useEffect, Component } from 'react'
import { 
  AlertTriangle,
  RefreshCw,
  Home
} from 'lucide-react'
import { 
  getProducts, 
  deleteProduct, 
  createProduct, 
  updateProduct, 
  getLeads, 
  getOrders, 
  subscribeToLeads 
} from '../services/supabase'
import { loginUser, getCurrentUser, getCurrentUserSync, logoutUser } from '../services/auth'
import AdminLayout from '../components/admin/AdminLayout'
import DashboardOverview from '../components/admin/DashboardOverview'
import ProductsManager from '../components/admin/ProductsManager'
import ProductModal from '../components/admin/ProductModal'
import LeadsManager from '../components/admin/LeadsManager'
import CategoryManager from '../components/admin/CategoryManager'
import NewsManager from '../components/admin/NewsManager'
import ProvinceManager from '../components/admin/ProvinceManager'
import SettingsManager from '../components/admin/SettingsManager'
import MarketingDashboard from '../components/admin/MarketingDashboard'
import SalesDashboard from '../components/admin/SalesDashboard'
import ManagementDashboard from '../components/admin/ManagementDashboard'

// Error Boundary to prevent any blank screen crashes
class AdminErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Admin Error Caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-xl mx-auto my-12 bg-white rounded-3xl border border-red-200 shadow-xl text-center space-y-4 font-body">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-heading text-[#11261B]">Đã xảy ra lỗi khi tải module này</h2>
          <p className="text-xs text-gray-500 font-mono bg-gray-50 p-3 rounded-xl border border-gray-200 text-left overflow-x-auto">
            {this.state.error?.message || 'Lỗi không xác định'}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#0F5132] text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-[#16A34A] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Tải lại trang
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                if (this.props.onResetTab) this.props.onResetTab()
              }}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <Home className="w-4 h-4" />
              Về Trang Tổng Quan
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function Admin() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUserSync())
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getCurrentUserSync()?.role))
  
  // Login Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Products, Leads & Orders Data State
  const [products, setProducts] = useState([])
  const [leads, setLeads] = useState([])
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  
  // Tabs: 'dashboard' | 'products' | 'leads' | 'provinces' | 'categories' | 'news' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard')
  const [autoOpenNewsCreate, setAutoOpenNewsCreate] = useState(false)

  const isSales = currentUser?.role === 'SALES'
  const isAdmin = currentUser?.role === 'ADMIN'
  const permissions = currentUser?.permissions || {}

  // Phân quyền chi tiết:
  const canViewDashboard = isAdmin || Boolean(permissions.dashboard_view ?? true)
  const canViewProducts = isAdmin || Boolean(permissions.products_view ?? true)
  const canCreateProduct = isAdmin || Boolean(permissions.products_create)
  const canEditProduct = isAdmin || Boolean(permissions.products_edit)
  const canDeleteProduct = isAdmin || Boolean(permissions.products_delete)

  const canViewLeads = isAdmin || Boolean(permissions.leads_view ?? true)
  const canHandleLeads = isAdmin || Boolean(permissions.leads_handle ?? true)
  const canEditLeadStatus = isAdmin || Boolean(permissions.leads_edit_status ?? true)
  const canDeleteLead = isAdmin || Boolean(permissions.leads_delete)

  const canViewProvinces = isAdmin || Boolean(permissions.provinces_view ?? true)
  const canManageProvinces = isAdmin || Boolean(permissions.provinces_manage)

  const canViewNews = isAdmin || Boolean(permissions.news_view)
  const canManageNews = isAdmin || Boolean(permissions.news_manage)

  const canViewCategories = isAdmin
  const canViewSettings = isAdmin

  const currentPinnedCount = (products || []).filter(p => p && p.is_pinned).length
  const newLeadsCount = (leads || []).filter(l => l && (l.status === 'NEW' || l.status === 'new' || !l.status)).length

  // Check and verify auth session asynchronously on mount
  useEffect(() => {
    let isMounted = true
    const verifyAuth = async () => {
      try {
        const user = await getCurrentUser()
        if (!isMounted) return
        if (user && user.id && user.role) {
          setCurrentUser(user)
          setIsAuthenticated(true)
        } else {
          setCurrentUser(null)
          setIsAuthenticated(false)
        }
      } catch (err) {
        console.warn('Lỗi kiểm tra phiên làm việc:', err)
        if (!isMounted) return
        setCurrentUser(null)
        setIsAuthenticated(false)
      }
    }

    verifyAuth()
    return () => { isMounted = false }
  }, [])

  // Đảm bảo tài khoản không truy cập các tab chưa được phân quyền
  useEffect(() => {
    if (!currentUser) return
    const isTabPermitted = (tab) => {
      if (isAdmin) return true
      if (tab === 'dashboard') return canViewDashboard
      if (tab === 'products') return canViewProducts
      if (tab === 'leads') return canViewLeads
      if (tab === 'provinces') return canViewProvinces
      if (tab === 'news') return canViewNews
      if (tab === 'categories') return canViewCategories
      if (tab === 'settings') return canViewSettings
      if (['dashboard_marketing', 'dashboard_sales', 'dashboard_management'].includes(tab)) return false
      return true
    }

    if (!isTabPermitted(activeTab)) {
      setActiveTab('dashboard')
    }
  }, [currentUser, activeTab, isAdmin, canViewDashboard, canViewProducts, canViewLeads, canViewProvinces, canViewNews, canViewCategories, canViewSettings])

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    if (!email || !password) {
      setLoginError('Vui lòng nhập đầy đủ Email và Mật khẩu!')
      return
    }

    try {
      setIsSubmitting(true)
      const user = await loginUser(email, password, rememberMe)
      setCurrentUser(user)
      setIsAuthenticated(true)
      setPassword('')
      setActiveTab('dashboard')
    } catch (err) {
      setLoginError(err.message || 'Email hoặc Mật khẩu không chính xác! Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Logout handler
  const handleLogout = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi HAQ FOOD Portal?")) {
      await logoutUser()
      setCurrentUser(null)
      setIsAuthenticated(false)
      setPassword('')
      setActiveTab('dashboard')
    }
  }

  // Fetch all products, leads, and orders
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [productsData, leadsData, ordersData] = await Promise.allSettled([
        getProducts(),
        getLeads(),
        getOrders()
      ])
      
      if (productsData.status === 'fulfilled' && Array.isArray(productsData.value)) {
        setProducts(productsData.value)
      } else {
        setProducts([])
      }
      if (leadsData.status === 'fulfilled' && Array.isArray(leadsData.value)) {
        setLeads(leadsData.value)
      } else {
        setLeads([])
      }
      if (ordersData.status === 'fulfilled' && Array.isArray(ordersData.value)) {
        setOrders(ordersData.value)
      } else {
        setOrders([])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()

      // Lắng nghe Realtime khi có Lead mới phát sinh
      const unsub = subscribeToLeads((newLead) => {
        if (newLead) {
          setLeads(prev => [newLead, ...prev.filter(l => l.id !== newLead.id)])
        }
      })

      return () => {
        if (typeof unsub === 'function') unsub()
      }
    }
  }, [isAuthenticated])

  // Product CRUD Handlers (Protected by Granular Permissions)
  const handleDelete = async (id, name) => {
    if (!canDeleteProduct) return
    if (!window.confirm(`Bạn có chắc chắn muốn xóa "${name}"? Thao tác này không thể hoàn tác.`)) return
    try {
      await deleteProduct(id)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi xóa sản phẩm: " + err.message)
    }
  }

  const handleDuplicate = async (product) => {
    if (!canEditProduct && !canCreateProduct) return
    try {
      const duplicateData = {
        name: `${product.name} (Bản sao)`,
        slug: `${product.slug}-copy-${Date.now().toString().slice(-4)}`,
        category: product.category,
        category_id: product.category_id,
        description: product.description,
        images: product.images || [],
        tag: product.tag,
        is_pinned: false,
        is_active: true,
        province_id: product.province_id
      }
      const duplicateVariants = (product.variants || []).map(v => ({
        sku: v.sku ? `${v.sku}-COPY` : '',
        name: v.name,
        price: v.price,
        wholesale_price: v.wholesale_price,
        unit: v.unit,
        weight: v.weight,
        min_order: v.min_order
      }))
      await createProduct(duplicateData, duplicateVariants)
      await fetchData()
      alert("Đã nhân bản sản phẩm thành công!")
    } catch (err) {
      alert("Lỗi nhân bản: " + err.message)
    }
  }

  const handleSave = async (productData, variantsData) => {
    if (!canCreateProduct && !canEditProduct) return
    try {
      if (editingProduct) {
        if (!canEditProduct) return
        await updateProduct(editingProduct.id, productData, variantsData)
      } else {
        if (!canCreateProduct) return
        await createProduct(productData, variantsData)
      }
      setIsModalOpen(false)
      await fetchData()
    } catch (err) {
      throw err
    }
  }

  const openNewModal = () => {
    if (!canCreateProduct) return
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    if (!canEditProduct) return
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const togglePin = async (product) => {
    if (!canEditProduct) return
    if (!product.is_pinned && currentPinnedCount >= 6) {
      alert("Đã đạt tối đa 6 sản phẩm ghim TOP trang chủ. Vui lòng bỏ ghim sản phẩm khác trước.")
      return
    }
    try {
      await updateProduct(product.id, { is_pinned: !product.is_pinned }, product.variants)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi đổi trạng thái ghim: " + err.message)
    }
  }

  const toggleActive = async (product) => {
    if (!canEditProduct) return
    try {
      const nextStatus = product.is_active === false ? true : false
      await updateProduct(product.id, { is_active: nextStatus }, product.variants)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái: " + err.message)
    }
  }

  // --- FRAME 01: ENTERPRISE B2B LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 selection:bg-[#0F5132] selection:text-white font-body">
        <div className="bg-white p-8 sm:p-10 border border-slate-200 rounded-xl shadow-lg w-full max-w-md space-y-6">
          
          {/* Header & Corporate Identity */}
          <div className="text-center space-y-2 pb-2 border-b border-slate-100">
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-emerald-50 text-[#0F5132] border border-emerald-200">
              B2B Enterprise Portal
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              HAQ FOOD
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Cổng Quản Trị & Vận Hành Doanh Nghiệp
            </p>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium text-left leading-relaxed">
              {loginError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Email doanh nghiệp
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-slate-300 px-3.5 py-2.5 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] bg-white transition"
                autoFocus
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium transition select-none"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-slate-300 px-3.5 py-2.5 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] bg-white transition"
                required
              />
            </div>

            {/* Session Persistence */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#0F5132] rounded border-slate-300 focus:ring-[#0F5132] cursor-pointer"
                />
                <span>Ghi nhớ đăng nhập trên thiết bị này</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#0F5132] hover:bg-[#145E3C] disabled:bg-slate-300 disabled:text-slate-500 text-white py-3 px-4 font-bold rounded-lg text-sm transition duration-150 shadow-sm disabled:cursor-not-allowed text-center"
            >
              {isSubmitting ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}
            </button>
          </form>

          {/* Footer Notice */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-1 text-[11px] text-slate-400 font-medium">
            <p>Hệ thống quản lý nội bộ HAQ FOOD</p>
            <p>Truy cập chỉ dành cho nhân sự được phân quyền</p>
          </div>
        </div>
      </div>
    )
  }
 
  // --- RENDER DASHBOARD LAYOUT & ACTIVE TAB ---
  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
      currentUser={currentUser}
      productsCount={products.length}
      newLeadsCount={newLeadsCount}
      products={products}
      leads={leads}
      orders={orders}
      onQuickAddProduct={canCreateProduct ? openNewModal : undefined}
      onQuickAddNews={canManageNews ? () => {
        setActiveTab('news')
        setAutoOpenNewsCreate(true)
      } : undefined}
      onQuickAddProvince={canManageProvinces ? () => setActiveTab('provinces') : undefined}
    >
      <AdminErrorBoundary onResetTab={() => setActiveTab('dashboard')}>
        
        {/* 📊 Frame 02: Master Dashboard Overview */}
        {activeTab === 'dashboard' && canViewDashboard && (
          <DashboardOverview 
            products={products}
            leads={leads}
            onNavigateTab={setActiveTab}
            onOpenProductModal={canCreateProduct ? openNewModal : undefined}
            isSales={!isAdmin}
          />
        )}

        {/* 📦 Frame 03: Quản lý Sản phẩm & Biến thể SKU */}
        {activeTab === 'products' && canViewProducts && (
          <ProductsManager
            products={products}
            isLoading={isLoading}
            onRefresh={fetchData}
            onOpenCreateModal={canCreateProduct ? openNewModal : undefined}
            onOpenEditModal={canEditProduct ? openEditModal : undefined}
            onDuplicateProduct={(canEditProduct || canCreateProduct) ? handleDuplicate : undefined}
            onDeleteProduct={canDeleteProduct ? handleDelete : undefined}
            onTogglePin={canEditProduct ? togglePin : undefined}
            onToggleActive={canEditProduct ? toggleActive : undefined}
            currentPinnedCount={currentPinnedCount}
            isReadOnly={!canCreateProduct && !canEditProduct}
          />
        )}

        {/* 👥 Frame 05: Quản lý Leads CRM & Pipeline */}
        {activeTab === 'leads' && canViewLeads && <LeadsManager />}

        {/* 🗺️ Frame 06: Quản lý Đặc sản Vùng miền & Bản đồ 34 Vùng */}
        {activeTab === 'provinces' && canViewProvinces && (
          <ProvinceManager 
            products={products} 
            onProductsChange={fetchData} 
            isReadOnly={!canManageProvinces}
          />
        )}

        {/* 🗂️ Module Danh mục (Chỉ Admin mới có quyền truy cập & chỉnh sửa) */}
        {activeTab === 'categories' && canViewCategories && (
          <CategoryManager 
            products={products} 
          />
        )}

        {/* 📰 Frame 07: Quản lý Tin tức & Bài viết B2B */}
        {activeTab === 'news' && canViewNews && (
          <NewsManager 
            autoOpenCreate={autoOpenNewsCreate && canManageNews}
            onResetAutoOpen={() => setAutoOpenNewsCreate(false)}
            canManage={canManageNews}
            isReadOnly={!canManageNews}
          />
        )}

        {/* ⚙️ Module Cài đặt & Phân quyền (Admin only) */}
        {activeTab === 'settings' && canViewSettings && <SettingsManager />}

        {/* 📈 Advanced Sub-Dashboards (Admin only) */}
        {activeTab === 'dashboard_marketing' && isAdmin && <MarketingDashboard />}
        {activeTab === 'dashboard_sales' && (isAdmin || isSales) && <SalesDashboard />}
        {activeTab === 'dashboard_management' && isAdmin && <ManagementDashboard />}
      </AdminErrorBoundary>

      {/* Frame 04: Drawer / Modal Thêm/Sửa Sản phẩm (Multi-tab) */}
      {isModalOpen && (canCreateProduct || canEditProduct) && (
        <ProductModal 
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          currentPinnedCount={currentPinnedCount}
        />
      )}
    </AdminLayout>
  )
}
