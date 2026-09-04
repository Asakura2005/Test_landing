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
  UserCheck,
  ShoppingBag,
  Phone,
  Clock,
  ArrowRight,
  Copy,
  Check,
  CheckCheck
} from 'lucide-react'
import QuickSearchModal from './QuickSearchModal'

// Format relative time helper
function formatTimeAgo(isoString) {
  if (!isoString) return 'Gần đây'
  try {
    const d = new Date(isoString)
    if (isNaN(d.getTime())) return 'Gần đây'
    const diffSec = Math.floor((Date.now() - d.getTime()) / 1000)
    if (diffSec < 60) return 'Vừa xong'
    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return `${diffMin} phút trước`
    const diffHours = Math.floor(diffMin / 60)
    if (diffHours < 24) return `${diffHours} giờ trước`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Hôm qua'
    if (diffDays < 7) return `${diffDays} ngày trước`
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
  } catch {
    return 'Gần đây'
  }
}

export default function AdminLayout({
  activeTab = 'dashboard',
  onTabChange,
  onLogout,
  currentUser = null,
  productsCount = 0,
  newLeadsCount = 0,
  products = [],
  leads = [],
  orders = [],
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

  // Tracking Leads unread badge with localStorage
  const [leadsLastSeen, setLeadsLastSeen] = useState(() => localStorage.getItem('haq_admin_leads_last_seen'))
  const [copiedPhone, setCopiedPhone] = useState(null)

  // Tracking Notifications unread state with localStorage
  const [notifsLastSeen, setNotifsLastSeen] = useState(() => localStorage.getItem('haq_admin_notifs_last_seen'))
  const [notifTab, setNotifTab] = useState('all') // 'all' | 'activity' | 'system'

  const topbarControlsRef = useRef(null)

  const isSales = currentUser?.role === 'SALES'

  // Auto close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (topbarControlsRef.current && !topbarControlsRef.current.contains(e.target)) {
        setIsQuickAddOpen(false)
        setIsNotificationsOpen(false)
        setIsLeadAlertsOpen(false)
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

  // Sort leads (newest first)
  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
  }, [leads])

  // Real unread leads count
  const unreadLeadsCount = useMemo(() => {
    if (!leads || leads.length === 0) return 0
    if (!leadsLastSeen) return Math.min(newLeadsCount || leads.length, 99)
    const seenTime = new Date(leadsLastSeen).getTime()
    const count = leads.filter(l => {
      const created = l.created_at ? new Date(l.created_at).getTime() : 0
      return created > seenTime
    }).length
    return count
  }, [leads, leadsLastSeen, newLeadsCount])

  const handleMarkAllLeadsSeen = (e) => {
    e.stopPropagation()
    const now = new Date().toISOString()
    localStorage.setItem('haq_admin_leads_last_seen', now)
    setLeadsLastSeen(now)
  }

  const handleCopyPhone = (e, phone) => {
    e.stopPropagation()
    if (!phone) return
    navigator.clipboard?.writeText(phone)
    setCopiedPhone(phone)
    setTimeout(() => setCopiedPhone(null), 2000)
  }

  // Build dynamic notifications feed from real orders, leads, and system events
  const systemNotifications = useMemo(() => {
    const list = []

    // 1. Orders
    ;(orders || []).slice(0, 5).forEach(order => {
      list.push({
        id: `order-${order.id}`,
        type: 'order',
        category: 'activity',
        title: `Đơn hàng B2B mới #${order.order_code || (order.id ? String(order.id).slice(0, 8) : 'B2B')}`,
        desc: `${order.customer_name || 'Khách hàng B2B'}${order.total_amount ? ` • ${Number(order.total_amount).toLocaleString('vi-VN')} đ` : ''}`,
        timestamp: order.created_at,
        targetTab: 'dashboard_sales'
      })
    })

    // 2. Leads
    ;(leads || []).slice(0, 5).forEach(lead => {
      list.push({
        id: `lead-${lead.id}`,
        type: 'lead',
        category: 'activity',
        title: `Yêu cầu báo giá từ ${lead.full_name || 'Khách hàng B2B'}`,
        desc: `${lead.company ? `${lead.company} • ` : ''}${lead.need || 'Báo giá đại lý'}${lead.phone ? ` • ${lead.phone}` : ''}`,
        timestamp: lead.created_at,
        targetTab: 'leads'
      })
    })

    // Sort by timestamp descending
    list.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))

    // 3. System Cloud Status
    list.push({
      id: 'sys-cloud',
      type: 'system',
      category: 'system',
      title: 'Đồng bộ Supabase Cloud',
      desc: `${productsCount} sản phẩm, ${leads.length} leads và ${orders.length} đơn hàng đã lưu an toàn trên Cloud.`,
      timestamp: null,
      targetTab: 'products'
    })

    list.push({
      id: 'sys-security',
      type: 'system',
      category: 'system',
      title: 'Hạ tầng Bảo mật & Email SMTP',
      desc: `Email SMTP thông báo và Zalo Doanh nghiệp sẵn sàng phản hồi khách sỉ.`,
      timestamp: null,
      targetTab: 'settings'
    })

    return list
  }, [orders, leads, productsCount])

  // Check if there are unread notifications
  const hasUnreadNotifs = useMemo(() => {
    if (!notifsLastSeen) return true
    const seenTime = new Date(notifsLastSeen).getTime()
    const latestOrderTime = orders?.[0]?.created_at ? new Date(orders[0].created_at).getTime() : 0
    const latestLeadTime = leads?.[0]?.created_at ? new Date(leads[0].created_at).getTime() : 0
    return latestOrderTime > seenTime || latestLeadTime > seenTime
  }, [orders, leads, notifsLastSeen])

  const handleMarkAllNotifsRead = (e) => {
    e.stopPropagation()
    const now = new Date().toISOString()
    localStorage.setItem('haq_admin_notifs_last_seen', now)
    setNotifsLastSeen(now)
  }

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

            {/* Lead Inquiries Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLeadAlertsOpen(!isLeadAlertsOpen)
                  setIsNotificationsOpen(false)
                  setIsQuickAddOpen(false)
                }}
                className={`p-1.5 rounded-lg border transition-colors relative cursor-pointer ${
                  isLeadAlertsOpen 
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Yêu cầu báo giá mới"
              >
                <Users className="w-4 h-4" />
                {unreadLeadsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-150">
                    {unreadLeadsCount > 99 ? '99+' : unreadLeadsCount}
                  </span>
                )}
              </button>

              {isLeadAlertsOpen && (
                <div className="absolute right-0 mt-2 w-88 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                      {unreadLeadsCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                      <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800">
                        Yêu cầu báo giá ({unreadLeadsCount > 0 ? `${unreadLeadsCount} mới` : `${leads.length} tổng`})
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadLeadsCount > 0 && (
                        <button 
                          onClick={handleMarkAllLeadsSeen}
                          className="text-[10px] font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded transition-colors cursor-pointer"
                          title="Xóa dấu thông báo đỏ"
                        >
                          Đã xem
                        </button>
                      )}
                      <button 
                        onClick={() => { onTabChange('leads'); setIsLeadAlertsOpen(false); }}
                        className="text-[11px] font-bold text-[#0F5132] hover:underline cursor-pointer"
                      >
                        Xem CRM
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1.5 max-h-72 overflow-y-auto pr-0.5">
                    {sortedLeads && sortedLeads.length > 0 ? sortedLeads.slice(0, 5).map((lead) => (
                      <div 
                        key={lead.id} 
                        onClick={() => {
                          onTabChange('leads')
                          setIsLeadAlertsOpen(false)
                        }}
                        className="p-2.5 rounded-lg bg-gray-50/80 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 text-xs transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-[#0F5132]/10 text-[#0F5132] font-bold text-[11px] flex items-center justify-center shrink-0">
                              {(lead.full_name || 'K').charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-gray-900 truncate">{lead.full_name || 'Khách hàng B2B'}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 shrink-0 flex items-center gap-1 font-mono">
                            <Clock className="w-2.5 h-2.5" />
                            {formatTimeAgo(lead.created_at)}
                          </span>
                        </div>

                        <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-gray-500">
                          <span className="truncate">{lead.company || lead.region || 'Đại lý B2B'}</span>
                          {lead.phone && (
                            <div className="flex items-center gap-1 shrink-0 font-mono text-gray-600 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                              <Phone className="w-2.5 h-2.5 text-emerald-600" />
                              <span>{lead.phone}</span>
                              <button
                                type="button"
                                onClick={(e) => handleCopyPhone(e, lead.phone)}
                                className="text-gray-400 hover:text-gray-700 ml-0.5 cursor-pointer"
                                title="Sao chép SĐT"
                              >
                                {copiedPhone === lead.phone ? (
                                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-[11px]">
                          <span className="bg-emerald-50 text-[#0F5132] font-medium px-2 py-0.5 rounded border border-emerald-100 truncate max-w-[200px]">
                            {lead.need || 'Tư vấn phân phối B2B'}
                          </span>
                          <span className="text-[10px] text-gray-400 group-hover:text-[#0F5132] flex items-center gap-0.5 font-medium transition-colors">
                            Mở CRM <ArrowRight className="w-3 h-3" />
                          </span>
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
                    className="w-full mt-2.5 py-2 text-center text-xs font-bold text-[#0F5132] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Mở Pipeline CRM Quản lý Leads</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                }}
                className={`p-1.5 rounded-lg border transition-colors relative cursor-pointer ${
                  isNotificationsOpen 
                    ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Thông báo hệ thống"
              >
                <Bell className="w-4 h-4" />
                {hasUnreadNotifs && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white animate-pulse" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-88 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#0F5132]" />
                      Thông Báo Hệ Thống
                    </h4>
                    {hasUnreadNotifs && (
                      <button
                        onClick={handleMarkAllNotifsRead}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <CheckCheck className="w-3 h-3 text-emerald-600" />
                        Đã đọc tất cả
                      </button>
                    )}
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-1 mt-2 p-0.5 bg-gray-100 rounded-lg text-[11px] font-medium text-gray-600">
                    <button
                      onClick={() => setNotifTab('all')}
                      className={`flex-1 py-1 text-center rounded transition-colors cursor-pointer ${
                        notifTab === 'all' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'hover:text-gray-900'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setNotifTab('activity')}
                      className={`flex-1 py-1 text-center rounded transition-colors cursor-pointer ${
                        notifTab === 'activity' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'hover:text-gray-900'
                      }`}
                    >
                      Đơn & Lead
                    </button>
                    <button
                      onClick={() => setNotifTab('system')}
                      className={`flex-1 py-1 text-center rounded transition-colors cursor-pointer ${
                        notifTab === 'system' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'hover:text-gray-900'
                      }`}
                    >
                      Hệ thống
                    </button>
                  </div>

                  {/* Notification Items */}
                  <div className="mt-2 space-y-1.5 max-h-72 overflow-y-auto pr-0.5">
                    {systemNotifications
                      .filter(item => notifTab === 'all' || item.category === notifTab)
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (item.targetTab) onTabChange(item.targetTab)
                            setIsNotificationsOpen(false)
                          }}
                          className="p-2.5 rounded-lg bg-gray-50/80 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 text-xs transition-all cursor-pointer group"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="p-1.5 rounded-lg bg-white border border-gray-200 shadow-2xs shrink-0 mt-0.5">
                              {item.type === 'order' && <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />}
                              {item.type === 'lead' && <Users className="w-3.5 h-3.5 text-blue-600" />}
                              {item.type === 'system' && item.id === 'sys-cloud' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                              {item.type === 'system' && item.id === 'sys-security' && <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-gray-900 truncate group-hover:text-[#0F5132] transition-colors">
                                  {item.title}
                                </span>
                                {item.timestamp && (
                                  <span className="text-[10px] text-gray-400 shrink-0 font-mono">
                                    {formatTimeAgo(item.timestamp)}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
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
