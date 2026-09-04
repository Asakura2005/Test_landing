import React, { useState, useEffect, Component } from 'react'
import { 
  Plus, 
  Sparkles,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  Home,
  Mail,
  Lock,
  ArrowRight,
  UserCheck
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
import { loginUser, getCurrentUser, logoutUser } from '../services/auth'
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
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser())
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getCurrentUser()))
  
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

  const isSales = currentUser?.role === 'SALES'
  const currentPinnedCount = (products || []).filter(p => p && p.is_pinned).length
  const newLeadsCount = (leads || []).filter(l => l && (l.status === 'NEW' || l.status === 'new' || !l.status)).length

  // Check auth session on mount
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
    }
  }, [])

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    if (!email || !password) {
      setLoginError('Vui lòng nhập đầy đủ Gmail và Mật khẩu!')
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
      setLoginError(err.message || 'Mật khẩu hoặc Gmail không chính xác! Vui lòng thử lại.')
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

  // Product CRUD Handlers (Only for Admin)
  const handleDelete = async (id, name) => {
    if (isSales) return
    if (!window.confirm(`Bạn có chắc chắn muốn xóa "${name}"? Thao tác này không thể hoàn tác.`)) return
    try {
      await deleteProduct(id)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi xóa sản phẩm: " + err.message)
    }
  }

  const handleDuplicate = async (product) => {
    if (isSales) return
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
    if (isSales) return
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData, variantsData)
      } else {
        await createProduct(productData, variantsData)
      }
      setIsModalOpen(false)
      await fetchData()
    } catch (err) {
      throw err
    }
  }

  const openNewModal = () => {
    if (isSales) return
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    if (isSales) return
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const togglePin = async (product) => {
    if (isSales) return
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
    if (isSales) return
    try {
      const nextStatus = product.is_active === false ? true : false
      await updateProduct(product.id, { is_active: nextStatus }, product.variants)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái: " + err.message)
    }
  }

  // Helper quick fill for testing credentials
  const fillCredentials = (type) => {
    if (type === 'admin') {
      setEmail('trantienhung4112005@gmail.com')
      setPassword('Hung4112005@')
    } else if (type === 'sales') {
      setEmail('sales@haqfood.vn')
      setPassword('HaqFood@2024')
    }
  }

  // --- FRAME 01: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F8F4] flex items-center justify-center p-4 selection:bg-[#0F5132] selection:text-white font-body relative overflow-hidden">
        
        {/* Subtle Eco-Pattern Watermark Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0F5132_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0F5132]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C89B3C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="bg-white p-8 sm:p-10 border border-[#D8E5DA] rounded-3xl shadow-2xl shadow-emerald-950/10 w-full max-w-md text-center space-y-6 relative z-10 animate-scaleUp">
          
          {/* Logo HAQ FOOD Dập Nổi */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0F5132] via-[#145e3c] to-[#16A34A] text-white flex items-center justify-center font-heading font-black text-3xl mx-auto shadow-xl shadow-emerald-950/20 border-2 border-white/40 transform hover:scale-105 transition-transform">
              H
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#C89B3C] text-white p-1.5 rounded-full shadow-md border border-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F5132] text-[11px] font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              B2B Enterprise Portal
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#11261B] tracking-tight">
              HAQ FOOD PORTAL
            </h1>
            <p className="text-xs font-semibold text-[#52665A]">
              Hệ thống quản trị kinh doanh & phân quyền bảo mật B2B
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold animate-fadeIn text-left flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#11261B] flex items-center justify-between">
                <span>Gmail / Tài Khoản</span>
                <span className="text-[10px] text-[#52665A] font-normal">Được cấp quyền</span>
              </label>
              
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="admin@haqfood.vn hoặc gmail..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-[#D8E5DA] pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm text-[#11261B] font-semibold focus:outline-none focus:border-[#0F5132] focus:ring-4 focus:ring-[#0F5132]/10 bg-[#F4F8F4]/50 transition-all font-mono"
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#11261B] flex items-center justify-between">
                <span>Mật Khẩu</span>
                <span className="text-[10px] text-[#52665A] font-normal">Bảo mật SHA-256</span>
              </label>
              
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-[#D8E5DA] pl-10 pr-11 py-3 rounded-2xl text-xs sm:text-sm text-[#11261B] font-semibold focus:outline-none focus:border-[#0F5132] focus:ring-4 focus:ring-[#0F5132]/10 bg-[#F4F8F4]/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#52665A] hover:text-[#11261B] p-1"
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between mt-2.5 text-[11px]">
                <label className="flex items-center gap-2 cursor-pointer text-[#52665A] hover:text-[#11261B] select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>Ghi nhớ phiên đăng nhập</span>
                </label>
              </div>
            </div>

            {/* Quick Demo Fill Credentials */}
            <div className="p-3 bg-[#F4F8F4] border border-[#D8E5DA] rounded-2xl space-y-1.5 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#52665A]">
                Tài khoản mẫu thử nghiệm:
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fillCredentials('admin')}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-white border border-[#D8E5DA] hover:border-[#0F5132] text-[11px] font-bold text-[#0F5132] transition-colors"
                >
                  👑 Admin
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('sales')}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-white border border-[#D8E5DA] hover:border-amber-600 text-[11px] font-bold text-amber-800 transition-colors"
                >
                  💼 Sales
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#0F5132] hover:bg-[#16A34A] text-white p-3.5 font-black rounded-2xl text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-emerald-950/15 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <KeyRound className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              )}
              <span>{isSubmitting ? 'Đang xác thực bảo mật...' : 'Đăng Nhập Vào Hệ Thống'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#D8E5DA] flex items-center justify-center gap-2 text-[11px] text-[#52665A]">
            <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
            <span>Mã hóa SHA-256 + Salt • Supabase RLS RBAC</span>
          </div>
        </div>
      </div>
    )
  }

  const [autoOpenNewsCreate, setAutoOpenNewsCreate] = useState(false)

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
      onQuickAddProduct={openNewModal}
      onQuickAddNews={() => {
        setActiveTab('news')
        setAutoOpenNewsCreate(true)
      }}
      onQuickAddProvince={() => setActiveTab('provinces')}
    >
      <AdminErrorBoundary onResetTab={() => setActiveTab('dashboard')}>
        
        {/* 📊 Frame 02: Master Dashboard Overview (Cả Admin và Sales đều xem được) */}
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            products={products}
            leads={leads}
            onNavigateTab={setActiveTab}
            onOpenProductModal={!isSales ? openNewModal : undefined}
            isSales={isSales}
          />
        )}

        {/* 📦 Frame 03: Quản lý Sản phẩm & Biến thể SKU (Admin full, Sales read-only) */}
        {activeTab === 'products' && (
          <ProductsManager
            products={products}
            isLoading={isLoading}
            onRefresh={fetchData}
            onOpenCreateModal={openNewModal}
            onOpenEditModal={openEditModal}
            onDuplicateProduct={handleDuplicate}
            onDeleteProduct={handleDelete}
            onTogglePin={togglePin}
            onToggleActive={toggleActive}
            currentPinnedCount={currentPinnedCount}
            isReadOnly={isSales}
          />
        )}

        {/* 👥 Frame 05: Quản lý Leads CRM & Pipeline */}
        {activeTab === 'leads' && <LeadsManager />}

        {/* 🗺️ Frame 06: Quản lý Đặc sản Vùng miền & Bản đồ 34 Vùng (Sales chỉ xem tra cứu) */}
        {activeTab === 'provinces' && (
          <ProvinceManager 
            products={products} 
            onProductsChange={fetchData} 
            isReadOnly={isSales}
          />
        )}

        {/* 🗂️ Module Danh mục (Chỉ Admin mới có quyền truy cập & chỉnh sửa) */}
        {activeTab === 'categories' && !isSales && (
          <CategoryManager 
            products={products} 
          />
        )}

        {/* 📰 Frame 07: Quản lý Tin tức & Bài viết B2B (Admin only) */}
        {activeTab === 'news' && !isSales && (
          <NewsManager 
            autoOpenCreate={autoOpenNewsCreate}
            onResetAutoOpen={() => setAutoOpenNewsCreate(false)}
          />
        )}

        {/* ⚙️ Module Cài đặt & Phân quyền (Admin only) */}
        {activeTab === 'settings' && !isSales && <SettingsManager />}

        {/* 📈 Advanced Sub-Dashboards (Admin only) */}
        {activeTab === 'dashboard_marketing' && !isSales && <MarketingDashboard />}
        {activeTab === 'dashboard_sales' && <SalesDashboard />}
        {activeTab === 'dashboard_management' && !isSales && <ManagementDashboard />}
      </AdminErrorBoundary>

      {/* Frame 04: Drawer / Modal Thêm/Sửa Sản phẩm (Multi-tab) */}
      {isModalOpen && !isSales && (
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
