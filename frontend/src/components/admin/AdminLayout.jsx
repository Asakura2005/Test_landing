import React, { useState, useEffect, useMemo, useRef } from 'react'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  MapPin, 
  FolderTree, 
  Newspaper, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet,
  UserCheck
} from 'lucide-react'
import QuickSearchModal from './QuickSearchModal'

export default function AdminLayout({
  activeTab = 'dashboard',
  onTabChange,
  onLogout,
  currentUser = null,
  productsCount = 0,
  newLeadsCount = 0,
  products = [],
  leads = [],
  onQuickAddProduct,
  onQuickAddNews,
  onQuickAddProvince,
  children
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isLeadAlertsOpen, setIsLeadAlertsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true)

  const topbarControlsRef = useRef(null)

  const isSales = currentUser?.role === 'SALES'

  // Auto close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (topbarControlsRef.current && !topbarControlsRef.current.contains(e.target)) {
        setIsQuickAddOpen(false)
        setIsNotificationsOpen(false)
        setIsLeadAlertsOpen(false)
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchModalOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Navigation Items according to User Role
  const navItems = useMemo(() => {
    if (isSales) {
      return [
        {
          id: 'dashboard',
          label: 'Tổng quan hệ thống',
          icon: LayoutDashboard,
          badge: null,
          badgeColor: null
        },
        {
          id: 'leads',
          label: 'Lead & Khách hàng',
          icon: Users,
          badge: newLeadsCount > 0 ? `${newLeadsCount} Mới` : null,
          badgeColor: 'bg-[#C89B3C] text-white shadow-xs'
        },
        {
          id: 'products',
          label: 'Tra cứu Sản phẩm & Giá',
          icon: Package,
          badge: productsCount > 0 ? `${productsCount}` : null,
          badgeColor: 'bg-emerald-100 text-[#0F5132]'
        },
        {
          id: 'provinces',
          label: 'Bản đồ đặc sản',
          icon: MapPin,
          badge: '34 Vùng',
          badgeColor: 'bg-emerald-50 text-[#0F5132] border border-emerald-200'
        }
      ]
    }

    return [
      {
        id: 'dashboard',
        label: 'Tổng quan hệ thống',
        icon: LayoutDashboard,
        badge: null,
        badgeColor: null
      },
      {
        id: 'products',
        label: 'Sản phẩm & Biến thể',
        icon: Package,
        badge: productsCount > 0 ? `${productsCount}` : null,
        badgeColor: 'bg-emerald-100 text-[#0F5132]'
      },
      {
        id: 'leads',
        label: 'Lead & Khách hàng',
        icon: Users,
        badge: newLeadsCount > 0 ? `${newLeadsCount} Mới` : null,
        badgeColor: 'bg-[#C89B3C] text-white shadow-xs'
      },
      {
        id: 'provinces',
        label: 'Bản đồ đặc sản',
        icon: MapPin,
        badge: '34 Vùng',
        badgeColor: 'bg-emerald-50 text-[#0F5132] border border-emerald-200'
      },
      {
        id: 'categories',
        label: 'Danh mục & Vùng miền',
        icon: FolderTree,
        badge: null,
        badgeColor: null
      },
      {
        id: 'news',
        label: 'Tin tức & Truyền thông',
        icon: Newspaper,
        badge: null,
        badgeColor: null
      },
      {
        id: 'settings',
        label: 'Cài đặt hệ thống',
        icon: Settings,
        badge: null,
        badgeColor: null
      }
    ]
  }, [isSales, productsCount, newLeadsCount])

  // Close dropdowns on outside click
  useEffect(() => {
    const closeDropdowns = () => {
      setIsQuickAddOpen(false)
      setIsNotificationsOpen(false)
      setIsLeadAlertsOpen(false)
    }
    window.addEventListener('click', closeDropdowns)
    return () => window.removeEventListener('click', closeDropdowns)
  }, [])

  const handleNavClick = (tabId) => {
    if (onTabChange) onTabChange(tabId)
    setIsMobileSidebarOpen(false)
  }

  const currentNav = navItems.find(item => item.id === activeTab) || navItems[0] || { label: 'Lead & Khách hàng' }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F4F8F4] flex flex-row antialiased text-[#11261B] font-body selection:bg-[#0F5132] selection:text-white">
      
      {/* Quick Command Search Modal (Ctrl + K) */}
      <QuickSearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        leads={leads}
        onNavigateTab={onTabChange}
        onQuickAction={(action) => {
          if (action === 'add-product' && onQuickAddProduct && !isSales) onQuickAddProduct()
          if (action === 'add-news' && onQuickAddNews && !isSales) onQuickAddNews()
          if (action === 'add-province' && onQuickAddProvince && !isSales) onQuickAddProvince()
        }}
      />

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* ============================================================ */}
      {/* 1. SIDEBAR NAVIGATION                                        */}
      {/* ============================================================ */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${isSidebarCollapsed ? 'w-20' : 'w-72'}
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          h-full bg-white border-r border-[#D8E5DA] shadow-lg lg:shadow-none
          flex flex-col justify-between transition-all duration-200 ease-in-out shrink-0 select-none
        `}
      >
        {/* Brand Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#0F5132] flex items-center justify-center text-white font-bold text-sm shrink-0">
              H
            </div>
            {(!isSidebarCollapsed || typeof window !== 'undefined' && window.innerWidth < 1024) && (
              <div className={`flex flex-col min-w-0 ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
                <span className="font-heading font-bold text-sm tracking-tight text-gray-900 truncate">
                  HAQ FOOD B2B
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 tracking-wider uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#0F5132]" />
                  {isSales ? 'Sales Portal' : 'Enterprise Admin'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Toggle Button */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title={isSidebarCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 text-gray-500 hover:text-black rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-3 py-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {!isSidebarCollapsed && (
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {isSales ? 'Kinh doanh' : 'Quản trị hệ thống'}
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer
                  ${isActive 
                    ? 'bg-[#0F5132] text-white font-semibold' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                  ${isSidebarCollapsed ? 'lg:justify-center lg:px-0 lg:h-9 lg:w-9 lg:mx-auto' : ''}
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />

                {(!isSidebarCollapsed || typeof window !== 'undefined' && window.innerWidth < 1024) && (
                  <span className={`flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
                    {item.label}
                  </span>
                )}

                {(!isSidebarCollapsed || typeof window !== 'undefined' && window.innerWidth < 1024) && item.badge && (
                  <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0 ${isActive ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-gray-100 text-gray-600')} ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Bottom Profile Section */}
        <div className="p-3 border-t border-gray-200 bg-gray-50/50 shrink-0">
          <div className={`flex items-center gap-2.5 ${isSidebarCollapsed ? 'lg:justify-center lg:flex-col' : ''}`}>
            <div className="relative shrink-0">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-xs ${
                isSales ? 'bg-amber-600' : 'bg-[#0F5132]'
              }`}>
                {currentUser?.full_name?.charAt(0) || (isSales ? 'S' : 'A')}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" title="Trực tuyến" />
            </div>

            {(!isSidebarCollapsed || typeof window !== 'undefined' && window.innerWidth < 1024) && (
              <div className={`flex-1 min-w-0 ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
                <div className="text-xs font-semibold text-gray-900 truncate">
                  {currentUser?.full_name || (isSales ? 'Nhân Viên Sales' : 'Quản Trị Viên')}
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  {isSales ? 'Sales Rep' : 'Admin'}
                </div>
              </div>
            )}

            <button
              onClick={onLogout}
              title="Đăng xuất khỏi hệ thống"
              className={`p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer ${isSidebarCollapsed ? 'lg:mt-1' : ''}`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* 2. MAIN VIEWPORT                                             */}
      {/* ============================================================ */}
      <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">
        
        {/* STICKY TOP HEADER */}
        <header className="h-14 bg-white border-b border-gray-200 shrink-0 px-4 lg:px-6 flex items-center justify-between gap-4 z-30">
          
          {/* Left section: Hamburger (Mobile) + Breadcrumb + Global Search */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
              title="Mở menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Compact Breadcrumb */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap shrink-0">
              <span className="font-semibold text-gray-700">HAQ Portal</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">{currentNav.label || 'Tổng quan'}</span>
            </div>

            {/* Global Search Button / Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-2 w-full max-w-xs px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-500 hover:border-gray-400 hover:bg-white transition-all group min-w-0"
            >
              <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 shrink-0" />
              <span className="truncate flex-1 text-left hidden sm:inline">Tìm kiếm sản phẩm, leads...</span>
              <span className="truncate flex-1 text-left sm:hidden">Tìm...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-mono text-gray-400">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right section: Role Badge + Lead Alerts + Notifications + CTAs */}
          <div ref={topbarControlsRef} className="flex items-center gap-2 sm:gap-2.5 relative">

            {/* User Role & Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen)
                  setIsLeadAlertsOpen(false)
                  setIsNotificationsOpen(false)
                  setIsQuickAddOpen(false)
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors cursor-pointer shadow-2xs"
                title="Tài khoản cá nhân"
              >
                <div className="w-5 h-5 rounded-full bg-[#0F5132]/10 text-[#0F5132] font-bold text-[10px] flex items-center justify-center">
                  {(currentUser?.email || 'A').charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline truncate max-w-[120px]">{currentUser?.email}</span>
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                  isSales ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-emerald-100 text-[#0F5132] border border-emerald-200'
                }`}>
                  {isSales ? 'Sales' : 'Admin'}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-3 bg-gray-50 rounded-lg mb-1 border border-gray-100">
                    <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Đang đăng nhập</div>
                    <div className="font-bold text-xs text-gray-900 truncate mt-0.5">{currentUser?.email}</div>
                    <div className="text-[11px] text-[#0F5132] font-medium mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {isSales ? 'Chuyên viên Kinh doanh B2B' : 'Quản trị viên Hệ thống Cấp cao'}
                    </div>
                  </div>
                  {!isSales && (
                    <button
                      onClick={() => {
                        onTabChange('settings')
                        setIsUserMenuOpen(false)
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors cursor-pointer text-left"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      Cài đặt & Phân quyền
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      onLogout()
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-left mt-0.5"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất khỏi hệ thống
                  </button>
                </div>
              )}
            </div>

            {/* Lead Inquiries Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLeadAlertsOpen(!isLeadAlertsOpen)
                  setIsNotificationsOpen(false)
                  setIsQuickAddOpen(false)
                  setIsUserMenuOpen(false)
                }}
                className={`p-1.5 rounded-lg border transition-colors relative cursor-pointer ${
                  isLeadAlertsOpen 
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Yêu cầu báo giá mới"
              >
                <Users className="w-4 h-4" />
                {newLeadsCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[9px] font-bold shadow-xs">
                    {newLeadsCount}
                  </span>
                )}
              </button>

              {isLeadAlertsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-3.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Yêu cầu báo giá ({newLeadsCount} mới)
                    </h4>
                    <button 
                      onClick={() => { onTabChange('leads'); setIsLeadAlertsOpen(false); }}
                      className="text-[11px] font-bold text-[#0F5132] hover:underline cursor-pointer"
                    >
                      Xem tất cả
                    </button>
                  </div>
                  <div className="mt-2.5 space-y-2 max-h-64 overflow-y-auto pr-0.5">
                    {leads && leads.length > 0 ? leads.slice(0, 4).map((lead) => (
                      <div 
                        key={lead.id} 
                        onClick={() => {
                          onTabChange('leads')
                          setIsLeadAlertsOpen(false)
                        }}
                        className="p-2.5 rounded-lg bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 hover:border-emerald-200 text-xs space-y-1 cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">{lead.full_name || 'Khách hàng B2B'}</span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString('vi-VN') : 'Mới'}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 truncate">{lead.company || lead.phone || lead.email}</div>
                        <div className="text-[11px] text-[#0F5132] font-semibold truncate bg-white px-2 py-0.5 rounded border border-gray-200 inline-block">
                          {lead.need || 'Tư vấn phân phối B2B'}
                        </div>
                      </div>
                    )) : (
                      <div className="p-6 text-center text-xs text-gray-400">
                        Chưa có yêu cầu báo giá mới nào.
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onTabChange('leads')
                      setIsLeadAlertsOpen(false)
                    }}
                    className="w-full mt-3 py-2 text-center text-xs font-bold text-[#0F5132] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Mở Pipeline CRM Quản lý Leads →
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  setIsLeadAlertsOpen(false)
                  setIsQuickAddOpen(false)
                  setIsUserMenuOpen(false)
                }}
                className={`p-1.5 rounded-lg border transition-colors relative cursor-pointer ${
                  isNotificationsOpen 
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Thông báo hệ thống"
              >
                <Bell className="w-4 h-4" />
                {hasUnreadAlerts && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-3.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800">Thông Báo Hệ Thống</h4>
                    {hasUnreadAlerts && (
                      <button
                        onClick={() => setHasUnreadAlerts(false)}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                      >
                        Đã đọc tất cả
                      </button>
                    )}
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs">
                      <div className="font-bold text-[#0F5132] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đồng bộ Cơ sở dữ liệu Cloud
                      </div>
                      <div className="text-[11px] text-gray-600 mt-1">
                        Dữ liệu {productsCount} sản phẩm và các danh mục B2B đã được lưu trữ an toàn trên Supabase.
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                      <div className="font-bold text-gray-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0F5132]" />
                        Bảo mật Phân quyền & Mã hóa
                      </div>
                      <div className="text-[11px] text-gray-600 mt-1">
                        Cơ chế phân quyền Admin/Sales và mã hóa mật khẩu SHA-256 đang hoạt động chuẩn xác.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Add Button */}
            {!isSales && (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsQuickAddOpen(!isQuickAddOpen)
                    setIsNotificationsOpen(false)
                    setIsLeadAlertsOpen(false)
                    setIsUserMenuOpen(false)
                  }}
                  className="h-8 px-3 rounded-lg bg-[#0F5132] text-white font-medium text-xs hover:bg-[#14532D] transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-semibold">Thêm mới</span>
                  <ChevronDown className="w-3 h-3 opacity-80" />
                </button>

                {isQuickAddOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                      onClick={() => {
                        setIsQuickAddOpen(false)
                        if (onQuickAddProduct) onQuickAddProduct()
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-gray-800 hover:bg-emerald-50 hover:text-[#0F5132] rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-[#0F5132]" />
                      <span>Thêm Sản Phẩm Mới</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsQuickAddOpen(false)
                        if (onQuickAddNews) onQuickAddNews()
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-gray-800 hover:bg-emerald-50 hover:text-[#0F5132] rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <Newspaper className="w-4 h-4 text-gray-600" />
                      <span>Đăng Tin Tức B2B Mới</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsQuickAddOpen(false)
                        if (onQuickAddProvince) onQuickAddProvince()
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-gray-800 hover:bg-emerald-50 hover:text-[#0F5132] rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span>Gán Đặc Sản Tỉnh Thành</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* View Public Website CTA */}
            <button
              onClick={() => window.open('/', '_blank')}
              className="h-8 flex items-center gap-1.5 px-3 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
              title="Mở Trang chủ Web trong tab mới"
            >
              <span>Xem Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT BODY */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
