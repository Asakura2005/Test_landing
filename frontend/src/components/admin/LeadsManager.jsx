import React, { useState, useEffect, useMemo } from 'react'
import {
  getLeads,
  updateLeadDetails,
  deleteLead,
  submitLead,
  getSalesReps,
  subscribeToLeads
} from '../../services/supabase'
import LeadLostModal from './LeadLostModal'
import OrderCreationModal from './OrderCreationModal'
import {
  Search,
  Plus,
  Phone,
  Mail,
  Copy,
  Check,
  RefreshCw,
  X,
  Trash2,
  Send,
  Calendar,
  AlertTriangle,
  Clock,
  Building,
  User,
  MapPin,
  ExternalLink,
  ChevronDown,
  LayoutGrid,
  Table,
  CheckCircle2,
  MessageCircle,
  FileText
} from 'lucide-react'

// 5 Standard B2B CRM Pipeline Stages
const CRM_STAGES = [
  {
    id: 'NEW',
    label: 'Mới tiếp nhận',
    dotColor: 'bg-blue-600',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    shortLabel: 'Mới tiếp nhận'
  },
  {
    id: 'CONTACTED',
    label: 'Đang liên hệ / Tư vấn',
    dotColor: 'bg-amber-500',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    shortLabel: 'Đang tư vấn'
  },
  {
    id: 'CONSULTING',
    label: 'Đã gửi báo giá & HĐ mẫu',
    dotColor: 'bg-indigo-600',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    shortLabel: 'Đã báo giá'
  },
  {
    id: 'CONVERTED',
    label: 'Đã chốt đại lý',
    dotColor: 'bg-[#0F5132]',
    badgeClass: 'bg-emerald-50 text-[#0F5132] border-emerald-200',
    shortLabel: 'Đã chốt'
  },
  {
    id: 'NOT_CONVERTED',
    label: 'Không chuyển đổi',
    dotColor: 'bg-gray-500',
    badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
    shortLabel: 'Hủy / Thất bại'
  }
]

// UTM Source Labels
const UTM_LABELS = {
  all: 'Tất cả nguồn UTM',
  google: 'Google Search / Ads',
  facebook: 'Facebook Ads',
  tiktok: 'TikTok',
  zalo: 'Zalo OA',
  direct: 'Trực tiếp (Direct)'
}

export default function LeadsManager() {
  const [leads, setLeads] = useState([])
  const [salesReps, setSalesReps] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' | 'table'
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all')
  const [selectedSalesFilter, setSelectedSalesFilter] = useState('all')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest') // 'newest' | 'oldest' | 'sla'

  // Selected Lead for Detail Drawer
  const [selectedLead, setSelectedLead] = useState(null)
  const [newInternalNote, setNewInternalNote] = useState('')
  const [copiedPhoneId, setCopiedPhoneId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Modals
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false)
  const [lostModalLead, setLostModalLead] = useState(null)
  const [orderModalLead, setOrderModalLead] = useState(null)

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    full_name: '',
    company: '',
    phone: '',
    email: '',
    region: 'Hà Nội',
    need: 'Đại lý & Nhà phân phối',
    note: '',
    utm_source: 'direct'
  })

  // Normalize stage string
  const normalizeStage = (status) => {
    const norm = String(status || 'NEW').toUpperCase()
    if (norm === 'CONTACTING') return 'CONTACTED'
    if (norm === 'QUOTED' || norm === 'QUALIFIED') return 'CONSULTING'
    if (norm === 'PARTNER' || norm === 'ORDERED') return 'CONVERTED'
    if (norm === 'ARCHIVED' || norm === 'REJECTED' || norm === 'LOST') return 'NOT_CONVERTED'
    return norm
  }

  // Format relative time helper
  const formatTimeAgo = (isoString) => {
    if (!isoString) return 'Gần đây'
    try {
      const d = new Date(isoString)
      if (isNaN(d.getTime())) return 'Gần đây'
      const diffMs = Date.now() - d.getTime()
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMins / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffMins < 1) return 'Vừa xong'
      if (diffMins < 60) return `${diffMins} phút trước`
      if (diffHours < 24) return `${diffHours} giờ trước`
      if (diffDays === 1) return 'Hôm qua'
      return `${diffDays} ngày trước`
    } catch {
      return 'Gần đây'
    }
  }

  // SLA Calculation Helper
  const getSlaInfo = (lead) => {
    if (!lead || !lead.created_at) return { status: 'none', label: 'N/A', isOverdue: false }
    const stage = normalizeStage(lead.status)
    if (stage !== 'NEW') {
      return { status: 'done', label: 'Đã phản hồi', isOverdue: false }
    }

    const createdTime = new Date(lead.created_at).getTime()
    if (isNaN(createdTime)) return { status: 'none', label: 'N/A', isOverdue: false }

    const elapsedMs = Date.now() - createdTime
    const slaLimitMs = 2 * 3600 * 1000 // 2 hours SLA limit

    if (elapsedMs > slaLimitMs) {
      const overdueMs = elapsedMs - slaLimitMs
      const overdueMins = Math.floor(overdueMs / 60000)
      const overdueHours = Math.floor(overdueMins / 60)
      const minsMod = overdueMins % 60
      const label = overdueHours > 0 ? `SLA quá hạn ${overdueHours}h ${minsMod}m` : `SLA quá hạn ${overdueMins}m`
      return { status: 'overdue', label, isOverdue: true }
    } else {
      const remainingMs = slaLimitMs - elapsedMs
      const remainingMins = Math.floor(remainingMs / 60000)
      const remainingHours = Math.floor(remainingMins / 60)
      const minsMod = remainingMins % 60
      const label = remainingHours > 0 ? `SLA còn ${remainingHours}h ${minsMod}m` : `SLA còn ${remainingMins}m`
      return { status: 'pending', label, isOverdue: false }
    }
  }

  // Priority Calculator
  const getLeadPriority = (lead) => {
    if (!lead) return { label: 'Bình thường', isHigh: false }
    const est = Number(lead.estimated_value) || 0
    const need = String(lead.need || '').toLowerCase()
    if (est >= 50000000 || need.includes('đại lý cấp 1') || need.includes('npp') || need.includes('xuất khẩu')) {
      return { label: 'Cao', isHigh: true }
    }
    return { label: 'Bình thường', isHigh: false }
  }

  // Fetch leads and sales reps
  const fetchLeadsData = async () => {
    try {
      setIsLoading(true)
      const [leadsData, salesData] = await Promise.allSettled([
        getLeads(),
        getSalesReps()
      ])
      if (leadsData.status === 'fulfilled' && Array.isArray(leadsData.value)) {
        setLeads(leadsData.value)
      } else {
        setLeads([])
      }
      if (salesData.status === 'fulfilled' && Array.isArray(salesData.value)) {
        setSalesReps(salesData.value)
      } else {
        setSalesReps([])
      }
    } catch (err) {
      console.warn("fetchLeads error:", err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeadsData()
    let unsub = null
    try {
      unsub = subscribeToLeads((newLead) => {
        if (newLead) {
          setLeads((prev) => [newLead, ...(prev || [])])
          showToast(`Lead mới từ ${newLead.full_name || 'Khách hàng'}`)
        }
      })
    } catch (e) {
      console.warn("Realtime sub error:", e)
    }
    return () => {
      if (typeof unsub === 'function') {
        try { unsub() } catch { }
      }
    }
  }, [])

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // 1-Click Copy Phone
  const handleCopyPhone = (e, phone, id) => {
    e.stopPropagation()
    if (!phone) return
    try {
      navigator.clipboard.writeText(String(phone))
      setCopiedPhoneId(id)
      setTimeout(() => setCopiedPhoneId(null), 1500)
    } catch (err) {
      console.error(err)
    }
  }

  // Update Status Stage
  const handleStageChange = async (id, targetStatus) => {
    const lead = (leads || []).find(l => l && String(l.id) === String(id))
    if (!lead) return

    if (targetStatus === 'NOT_CONVERTED') {
      setLostModalLead(lead)
      return
    }

    if (targetStatus === 'CONVERTED' || targetStatus === 'ORDERED') {
      setOrderModalLead(lead)
      return
    }

    try {
      const updated = await updateLeadDetails(id, { status: targetStatus }, `Chuyển trạng thái sang ${targetStatus}`)
      setLeads(prev => (prev || []).map(l => l && String(l.id) === String(id) ? { ...l, ...updated, status: targetStatus } : l))
      if (selectedLead && String(selectedLead.id) === String(id)) {
        setSelectedLead(prev => ({ ...prev, status: targetStatus }))
      }
      showToast(`Đã chuyển sang: ${CRM_STAGES.find(s => s.id === targetStatus)?.label || targetStatus}`)
    } catch (err) {
      console.error(err)
    }
  }

  // Assign Sales Rep
  const handleAssignSales = async (leadId, salesId) => {
    const rep = (salesReps || []).find(s => s && String(s.id) === String(salesId))
    const salesName = rep ? rep.full_name : 'Chưa phân công'
    try {
      await updateLeadDetails(leadId, {
        assigned_to: salesId || null,
        sales_name: salesName
      }, `Phân công xử lý cho Sales: ${salesName}`)

      setLeads(prev => (prev || []).map(l => l && String(l.id) === String(leadId) ? { ...l, assigned_to: salesId, sales_name: salesName } : l))
      if (selectedLead && String(selectedLead.id) === String(leadId)) {
        setSelectedLead(prev => ({ ...prev, assigned_to: salesId, sales_name: salesName }))
      }
      showToast(`Đã giao cho: ${salesName}`)
    } catch (err) {
      console.error(err)
    }
  }

  // Confirm Lost Reason
  const handleConfirmLost = async (lostReason, lostNote) => {
    if (!lostModalLead) return
    try {
      await updateLeadDetails(lostModalLead.id, {
        status: 'NOT_CONVERTED',
        lost_reason: lostReason,
        lost_note: lostNote,
      }, `Không chuyển đổi: ${lostReason} - ${lostNote}`)

      setLeads(prev => (prev || []).map(l => l && String(l.id) === String(lostModalLead.id) ? {
        ...l,
        status: 'NOT_CONVERTED',
        lost_reason: lostReason,
        lost_note: lostNote
      } : l))

      if (selectedLead && String(selectedLead.id) === String(lostModalLead.id)) {
        setSelectedLead(prev => ({ ...prev, status: 'NOT_CONVERTED', lost_reason: lostReason, lost_note: lostNote }))
      }
      showToast('Đã lưu lý do không chuyển đổi')
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  // Delete Lead
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Xác nhận xóa dữ liệu Lead "${name}"?`)) return
    try {
      await deleteLead(id)
      setLeads(prev => (prev || []).filter(l => l && String(l.id) !== String(id)))
      if (selectedLead && String(selectedLead.id) === String(id)) setSelectedLead(null)
      showToast(`Đã xóa Lead ${name}`)
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  // Add Internal Note to Lead
  const handleAddNote = async () => {
    if (!newInternalNote.trim() || !selectedLead) return
    const updatedNote = newInternalNote.trim()
    try {
      await updateLeadDetails(selectedLead.id, { note: updatedNote }, updatedNote)
      const updatedHistory = [
        { author: 'Sales / QTV', text: updatedNote, time: 'Vừa xong' },
        ...(selectedLead.notes_history || [])
      ]
      const updatedLead = {
        ...selectedLead,
        note: updatedNote,
        notes_history: updatedHistory
      }
      setLeads(prev => (prev || []).map(l => l && String(l.id) === String(selectedLead.id) ? updatedLead : l))
      setSelectedLead(updatedLead)
      setNewInternalNote('')
      showToast("Đã lưu ghi chú")
    } catch (err) {
      alert('Lỗi lưu ghi chú: ' + err.message)
    }
  }

  // Create Manual New Lead
  const handleCreateLead = async (e) => {
    e.preventDefault()
    if (!newLeadForm.full_name || !newLeadForm.phone) {
      alert("Vui lòng nhập họ tên và số điện thoại!")
      return
    }

    try {
      const created = await submitLead({
        ...newLeadForm,
        status: 'NEW',
      })
      const newLeadObj = Array.isArray(created) ? created[0] : created
      if (newLeadObj) {
        setLeads(prev => [newLeadObj, ...(prev || [])])
      }
      setIsNewLeadModalOpen(false)
      setNewLeadForm({
        full_name: '',
        company: '',
        phone: '',
        email: '',
        region: 'Hà Nội',
        need: 'Đại lý & Nhà phân phối',
        note: '',
        utm_source: 'direct'
      })
      showToast("Đã tạo Lead mới thành công")
    } catch (err) {
      alert("Lỗi tạo lead: " + err.message)
    }
  }

  // SLA Overdue Leads (> 2 hours in NEW stage)
  const overdueLeads = useMemo(() => {
    if (!Array.isArray(leads)) return []
    const twoHoursAgo = Date.now() - 2 * 3600 * 1000
    return leads.filter(l => {
      if (!l) return false
      const isNew = normalizeStage(l.status) === 'NEW'
      if (!isNew) return false
      if (!l.created_at) return false
      const ts = new Date(l.created_at).getTime()
      return !isNaN(ts) && ts < twoHoursAgo
    })
  }, [leads])

  // Count leads per stage
  const stageCounts = useMemo(() => {
    const counts = { NEW: 0, CONTACTED: 0, CONSULTING: 0, CONVERTED: 0, NOT_CONVERTED: 0 }
    if (Array.isArray(leads)) {
      leads.forEach(l => {
        if (l) {
          const st = normalizeStage(l.status)
          if (counts[st] !== undefined) counts[st]++
        }
      })
    }
    return counts
  }, [leads])

  // Filtered and Sorted Leads
  const filteredLeads = useMemo(() => {
    if (!Array.isArray(leads)) return []
    const q = String(searchQuery || '').trim().toLowerCase()

    let result = leads.filter(l => {
      if (!l) return false

      const name = String(l.full_name || '').toLowerCase()
      const comp = String(l.company || '').toLowerCase()
      const phone = String(l.phone || '')
      const need = String(l.need || '').toLowerCase()
      const prod = String(l.last_product_name || '').toLowerCase()

      const matchSearch = !q ||
        name.includes(q) ||
        comp.includes(q) ||
        phone.includes(q) ||
        need.includes(q) ||
        prod.includes(q)

      const matchSource = selectedSourceFilter === 'all' || String(l.utm_source || 'direct') === selectedSourceFilter
      const matchSales = selectedSalesFilter === 'all' || String(l.assigned_to) === String(selectedSalesFilter)
      const matchStatus = selectedStatusFilter === 'all' || normalizeStage(l.status) === selectedStatusFilter

      return matchSearch && matchSource && matchSales && matchStatus
    })

    // Sorting
    result.sort((a, b) => {
      const timeA = new Date(a.created_at || 0).getTime()
      const timeB = new Date(b.created_at || 0).getTime()
      if (sortBy === 'oldest') return timeA - timeB
      return timeB - timeA
    })

    return result
  }, [leads, searchQuery, selectedSourceFilter, selectedSalesFilter, selectedStatusFilter, sortBy])

  const inProgressCount = stageCounts['NEW'] + stageCounts['CONTACTED'] + stageCounts['CONSULTING']

  return (
    <div className="space-y-4 font-sans text-gray-900 antialiased">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-medium flex items-center gap-2 border border-gray-800 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. SLA ALERT BAR (Compact & Factual) */}
      {overdueLeads.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-medium min-w-0 truncate">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">
              <strong>SLA:</strong> {overdueLeads.length} Lead chưa được liên hệ quá 2 giờ
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedStatusFilter('NEW')
              setSearchQuery('')
              if (overdueLeads[0]) setSelectedLead(overdueLeads[0])
            }}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-md transition-colors shrink-0"
          >
            Xử lý ngay
          </button>
        </div>
      )}

      {/* 2. COMPACT PAGE HEADER & VIEW SWITCHER */}
      <div className="bg-white px-4 py-3 rounded-lg border border-[#E2E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title, Subtitle and Stats */}
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-base font-bold text-gray-900 tracking-tight">Lead & Khách hàng</h1>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
              <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">{leads.length} Lead</span>
              <span>·</span>
              <span className="text-gray-600">{inProgressCount} đang xử lý</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">{stageCounts['CONVERTED']} đã chốt</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý Lead, tư vấn và quá trình chốt đơn B2B.
          </p>
        </div>

        {/* View Switcher & Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Segmented Control */}
          <div className="inline-flex rounded-md border border-gray-300 p-0.5 bg-gray-50">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Bảng</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F5132] hover:bg-[#14532D] text-white font-medium text-xs rounded-md transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Lead</span>
          </button>
        </div>
      </div>

      {/* 3. SEARCH & FILTER TOOLBAR (Single compact bar, 40-44px) */}
      <div className="bg-white p-2.5 rounded-md border border-[#E2E8E4] flex flex-wrap items-center gap-2 text-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm khách hàng, công ty, SĐT, sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
          />
        </div>

        {/* Source Filter */}
        <select
          value={selectedSourceFilter}
          onChange={(e) => setSelectedSourceFilter(e.target.value)}
          className="h-8 px-2.5 text-xs rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-[#0F5132]"
        >
          <option value="all">Nguồn UTM: Tất cả</option>
          <option value="google">Google Ads / Search</option>
          <option value="facebook">Facebook Ads</option>
          <option value="tiktok">TikTok Video</option>
          <option value="zalo">Zalo OA</option>
          <option value="direct">Trực tiếp (Direct)</option>
        </select>

        {/* Sales Filter */}
        <select
          value={selectedSalesFilter}
          onChange={(e) => setSelectedSalesFilter(e.target.value)}
          className="h-8 px-2.5 text-xs rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-[#0F5132]"
        >
          <option value="all">Sales: Tất cả</option>
          {(salesReps || []).map(s => (
            <option key={s.id} value={s.id}>{s.full_name}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          className="h-8 px-2.5 text-xs rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-[#0F5132]"
        >
          <option value="all">Trạng thái: Tất cả</option>
          {CRM_STAGES.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>

        {/* Sort Filter */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-8 px-2.5 text-xs rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-[#0F5132]"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>

        {/* Refresh Button */}
        <button
          onClick={fetchLeadsData}
          title="Làm mới dữ liệu"
          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 text-gray-600 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* 4. MAIN VIEWPORT (KANBAN OR TABLE) */}
      {isLoading ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-lg border border-[#E2E8E4]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0F5132] mb-2" />
          <p className="text-xs font-medium">Đang tải dữ liệu CRM...</p>
        </div>
      ) : viewMode === 'kanban' ? (
        /* KANBAN BOARD */
        <div className="flex gap-3 overflow-x-auto pb-4 items-start scrollbar-thin">
          {CRM_STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter(l => normalizeStage(l?.status) === stage.id)
            return (
              <div
                key={stage.id}
                className="bg-[#F7F8F6] rounded-lg border border-[#E2E8E4] flex flex-col w-[280px] min-w-[280px] shrink-0"
              >
                {/* Column Header (Neutral with subtle status dot) */}
                <div className="px-3 py-2.5 border-b border-[#E2E8E4] flex items-center justify-between bg-[#F7F8F6] rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${stage.dotColor}`} />
                    <h3 className="font-semibold text-xs text-gray-900">{stage.shortLabel}</h3>
                  </div>
                  <span className="text-[11px] font-semibold bg-white px-2 py-0.5 rounded text-gray-600 border border-gray-200">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Column Records List */}
                <div className="p-2 space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto min-h-[140px]">
                  {stageLeads.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 text-xs">
                      Không có bản ghi
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const sla = getSlaInfo(lead)
                      const priority = getLeadPriority(lead)
                      const rawPhone = lead?.phone ? String(lead.phone) : ''
                      const cleanPhone = rawPhone.replace(/[^0-9]/g, '')

                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`w-full p-3 bg-white rounded-md border text-xs transition-all cursor-pointer shadow-xs hover:border-gray-400 hover:shadow-sm ${
                            sla.isOverdue
                              ? 'border-red-300 ring-1 ring-red-200'
                              : 'border-[#E2E8E4]'
                          }`}
                        >
                          {/* Row 1: Name & Time */}
                          <div className="flex items-baseline justify-between gap-1 mb-1">
                            <span className="font-bold text-gray-900 truncate">
                              {lead.full_name || 'Khách hàng'}
                            </span>
                            <span className="text-[10px] text-gray-400 shrink-0">
                              {formatTimeAgo(lead.created_at)}
                            </span>
                          </div>

                          {/* Row 2: Phone & 1-Click Copy */}
                          <div className="flex items-center justify-between text-gray-600 mb-1.5">
                            <div className="flex items-center gap-1 font-mono font-medium text-gray-800">
                              <span>{rawPhone || 'Chưa có SĐT'}</span>
                            </div>
                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              {rawPhone && (
                                <button
                                  onClick={(e) => handleCopyPhone(e, rawPhone, lead.id)}
                                  className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                  title="Sao chép SĐT"
                                >
                                  {copiedPhoneId === lead.id ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              )}
                              {cleanPhone && (
                                <a
                                  href={`https://zalo.me/${cleanPhone}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-1.5 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded text-[10px] font-semibold transition-colors"
                                  title="Nhắn tin Zalo"
                                >
                                  Zalo
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Row 3: Company & Location */}
                          <div className="text-[11px] text-gray-600 mb-1.5 flex items-center gap-1 truncate">
                            <span className="truncate">{lead.company || 'Khách lẻ'}</span>
                            {lead.region && (
                              <>
                                <span className="text-gray-300">·</span>
                                <span className="text-gray-500 shrink-0">{lead.region}</span>
                              </>
                            )}
                          </div>

                          {/* Row 4: Requirement / Product */}
                          {(lead.last_product_name || lead.need) && (
                            <div className="text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 mb-2 truncate">
                              <span className="font-medium text-gray-900">{lead.last_product_name || lead.need}</span>
                            </div>
                          )}

                          {/* Row 5: Footer Metadata (Sales, Source, SLA) */}
                          <div className="pt-2 border-t border-gray-100 flex flex-col gap-1 text-[10px]">
                            <div className="flex items-center justify-between text-gray-500">
                              <span className="truncate">
                                Sales: <span className="text-gray-800 font-medium">{lead.sales_name || 'Chưa phân công'}</span>
                              </span>
                              <span className="text-gray-400 uppercase font-mono text-[9px]">
                                {lead.utm_source || 'direct'}
                              </span>
                            </div>

                            {/* SLA & Priority Indicator */}
                            <div className="flex items-center justify-between pt-0.5">
                              {sla.status !== 'none' && (
                                <span className={`font-medium ${
                                  sla.isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'
                                }`}>
                                  {sla.label}
                                </span>
                              )}
                              {priority.isHigh && (
                                <span className="text-amber-700 font-semibold ml-auto">
                                  Ưu tiên cao
                                </span>
                              )}
                            </div>
                          </div>

                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* TABLE VIEW (Professional Enterprise Data Table) */
        <div className="bg-white rounded-lg border border-[#E2E8E4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7F8F6] border-b border-[#E2E8E4] text-gray-600 font-semibold text-[11px]">
                  <th className="py-2.5 px-3">Khách hàng</th>
                  <th className="py-2.5 px-3">Doanh nghiệp</th>
                  <th className="py-2.5 px-3">Nhu cầu / Sản phẩm</th>
                  <th className="py-2.5 px-3">Nguồn</th>
                  <th className="py-2.5 px-3">Khu vực</th>
                  <th className="py-2.5 px-3">Sales</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3">Ngày tạo</th>
                  <th className="py-2.5 px-3">SLA</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8E4]">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-gray-400">
                      Không tìm thấy Lead nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const sla = getSlaInfo(lead)
                    const rawPhone = lead?.phone ? String(lead.phone) : ''
                    const cleanPhone = rawPhone.replace(/[^0-9]/g, '')
                    const currentStage = CRM_STAGES.find(s => s.id === normalizeStage(lead?.status))

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        {/* 1. Customer */}
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-gray-900">{lead.full_name || 'Khách hàng'}</div>
                          <div className="text-[11px] font-mono text-gray-500">{lead.phone || 'Chưa có SĐT'}</div>
                        </td>

                        {/* 2. Company */}
                        <td className="py-2.5 px-3 text-gray-700">
                          {lead.company || '—'}
                        </td>

                        {/* 3. Requirement */}
                        <td className="py-2.5 px-3 max-w-[200px]">
                          <div className="font-medium text-gray-900 truncate">{lead.last_product_name || lead.need || 'Báo giá sỉ'}</div>
                          {lead.note && <div className="text-[11px] text-gray-400 truncate">{lead.note}</div>}
                        </td>

                        {/* 4. UTM Source */}
                        <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px] uppercase">
                          {lead.utm_source || 'direct'}
                        </td>

                        {/* 5. Region */}
                        <td className="py-2.5 px-3 text-gray-700">
                          {lead.region || 'Toàn quốc'}
                        </td>

                        {/* 6. Sales Owner */}
                        <td className="py-2.5 px-3 text-gray-800">
                          {lead.sales_name || <span className="text-gray-400">Chưa giao</span>}
                        </td>

                        {/* 7. Status */}
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${
                            currentStage?.badgeClass || 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${currentStage?.dotColor || 'bg-gray-400'}`} />
                            {currentStage?.shortLabel || lead.status}
                          </span>
                        </td>

                        {/* 8. Created Date */}
                        <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap text-[11px]">
                          {formatTimeAgo(lead.created_at)}
                        </td>

                        {/* 9. SLA */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {sla.status !== 'none' ? (
                            <span className={`text-[11px] font-medium ${
                              sla.isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'
                            }`}>
                              {sla.label}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                        {/* 10. Actions */}
                        <td className="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          {cleanPhone && (
                            <a
                              href={`https://zalo.me/${cleanPhone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded text-[11px] font-medium transition-colors inline-block"
                            >
                              Zalo
                            </a>
                          )}
                          <a
                            href={lead.email ? `mailto:${lead.email}?subject=${encodeURIComponent('HAQ FOOD - Báo Giá Sỉ & Chính Sách Phân Phối')}` : `mailto:?subject=${encodeURIComponent('HAQ FOOD - Báo Giá Sỉ & Chính Sách Phân Phối')}`}
                            className="px-2 py-1 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded text-[11px] font-medium transition-colors inline-block"
                          >
                            Mail
                          </a>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. LEAD DETAIL DRAWER (SLIDE OVER) */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-lg bg-white h-full shadow-xl flex flex-col border-l border-[#E2E8E4] animate-slideInRight"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-[#E2E8E4] flex items-center justify-between bg-[#F7F8F6]">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {selectedLead.full_name || 'Hồ sơ Lead'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedLead.company ? `${selectedLead.company} · ` : ''}{selectedLead.region || 'Toàn quốc'}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-5 space-y-5 flex-1 overflow-y-auto text-xs">
              
              {/* Quick Communication Actions */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${selectedLead.phone || ''}`}
                  className="py-2 px-3 rounded-md bg-emerald-50 text-[#0F5132] border border-emerald-200 text-center font-medium hover:bg-[#0F5132] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Gọi điện
                </a>
                <a
                  href={`https://zalo.me/${String(selectedLead.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-center font-medium hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat Zalo
                </a>
                <a
                  href={
                    selectedLead.email
                      ? `mailto:${encodeURIComponent(selectedLead.email)}?subject=${encodeURIComponent('HAQ FOOD - Báo Giá Sỉ & Chính Sách Phân Phối')}`
                      : '#'
                  }
                  className="py-2 px-3 rounded-md bg-gray-50 text-gray-700 border border-gray-300 text-center font-medium hover:bg-gray-800 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Gửi Mail
                </a>
              </div>

              {/* Status & Sales Assignment */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#F7F8F6] rounded-md border border-[#E2E8E4]">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Trạng thái Pipeline</label>
                  <select
                    value={normalizeStage(selectedLead.status)}
                    onChange={(e) => handleStageChange(selectedLead.id, e.target.value)}
                    className="w-full p-1.5 bg-white border border-gray-300 rounded-md font-medium text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  >
                    {CRM_STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Phân công Sales</label>
                  <select
                    value={selectedLead.assigned_to || ''}
                    onChange={(e) => handleAssignSales(selectedLead.id, e.target.value)}
                    className="w-full p-1.5 bg-white border border-gray-300 rounded-md font-medium text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  >
                    <option value="">Chưa phân công</option>
                    {(salesReps || []).map(s => (
                      <option key={s.id} value={s.id}>{s.full_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lead Details Table */}
              <div className="border border-[#E2E8E4] rounded-md overflow-hidden">
                <div className="bg-[#F7F8F6] px-3 py-2 border-b border-[#E2E8E4] font-semibold text-gray-700 text-[11px]">
                  Thông tin chi tiết
                </div>
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 px-3 text-gray-500 w-36 bg-gray-50/50">Số điện thoại</td>
                      <td className="py-2 px-3 font-mono font-medium text-gray-900">{selectedLead.phone || 'Chưa có'}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-500 bg-gray-50/50">Email</td>
                      <td className="py-2 px-3 text-gray-900">{selectedLead.email || 'Chưa có'}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-500 bg-gray-50/50">Doanh nghiệp</td>
                      <td className="py-2 px-3 text-gray-900">{selectedLead.company || 'Không có'}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-500 bg-gray-50/50">Khu vực</td>
                      <td className="py-2 px-3 text-gray-900">{selectedLead.region || 'Toàn quốc'}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-500 bg-gray-50/50">Nguồn UTM</td>
                      <td className="py-2 px-3 font-mono text-gray-700">{selectedLead.utm_source || 'direct'} ({selectedLead.utm_campaign || 'none'})</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-500 bg-gray-50/50">Sản phẩm quan tâm</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{selectedLead.last_product_name || selectedLead.need || 'Báo giá sỉ'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Customer Note */}
              {selectedLead.note && (
                <div className="border border-[#E2E8E4] rounded-md p-3 bg-gray-50">
                  <span className="text-[11px] font-semibold text-gray-600 block mb-1">Nội dung yêu cầu từ khách:</span>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">{selectedLead.note}</p>
                </div>
              )}

              {/* Reason for Lost Lead */}
              {selectedLead.lost_reason && (
                <div className="border border-red-200 rounded-md p-3 bg-red-50 text-red-800">
                  <span className="font-semibold block mb-0.5">Lý do không chuyển đổi:</span>
                  <p>{selectedLead.lost_reason} — {selectedLead.lost_note}</p>
                </div>
              )}

              {/* Add Internal Note */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-600">Thêm ghi chú chăm sóc</label>
                <textarea
                  rows={2}
                  value={newInternalNote}
                  onChange={(e) => setNewInternalNote(e.target.value)}
                  placeholder="Ghi nhận nội dung trao đổi với khách hàng..."
                  className="w-full p-2.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#0F5132]"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddNote}
                    className="px-3 py-1.5 bg-[#0F5132] hover:bg-[#14532D] text-white font-medium rounded-md transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Lưu ghi chú</span>
                  </button>
                </div>
              </div>

              {/* Notes History */}
              {selectedLead.notes_history && selectedLead.notes_history.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-semibold text-gray-600 block">Lịch sử ghi chú</span>
                  <div className="space-y-1.5">
                    {selectedLead.notes_history.map((n, idx) => (
                      <div key={idx} className="p-2 rounded bg-gray-50 border border-gray-200 text-[11px]">
                        <div className="flex items-center justify-between text-gray-400 mb-0.5">
                          <span className="font-medium text-gray-700">{n.author || 'Sales'}</span>
                          <span>{n.time || 'Trước đó'}</span>
                        </div>
                        <p className="text-gray-800">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="px-5 py-3 border-t border-[#E2E8E4] bg-[#F7F8F6] flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedLead.id, selectedLead.full_name)}
                className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa Lead</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. CREATE NEW LEAD MODAL */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fadeIn">
          <div className="bg-white rounded-lg max-w-md w-full p-5 space-y-4 border border-[#E2E8E4] shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h3 className="font-bold text-sm text-gray-900">
                Thêm Lead B2B mới
              </h3>
              <button onClick={() => setIsNewLeadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-gray-700 block mb-1">Tên khách hàng <span className="text-red-500">*</span></label>
                <input
                  required
                  value={newLeadForm.full_name}
                  onChange={e => setNewLeadForm({ ...newLeadForm, full_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0F5132]"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-gray-700 block mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={newLeadForm.phone}
                    onChange={e => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0F5132]"
                    placeholder="0912 345 678"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0F5132]"
                    placeholder="khachhang@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-gray-700 block mb-1">Doanh nghiệp / Cửa hàng</label>
                  <input
                    value={newLeadForm.company}
                    onChange={e => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0F5132]"
                    placeholder="Đại lý Bách Hóa Xanh"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700 block mb-1">Khu vực / Tỉnh thành</label>
                  <input
                    value={newLeadForm.region}
                    onChange={e => setNewLeadForm({ ...newLeadForm, region: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0F5132]"
                    placeholder="Hà Nội / TP.HCM"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-gray-700 block mb-1">Nhu cầu hợp tác</label>
                <textarea
                  rows={2}
                  value={newLeadForm.need}
                  onChange={e => setNewLeadForm({ ...newLeadForm, need: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0F5132]"
                  placeholder="Báo giá sỉ 500 thùng bánh tráng..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0F5132] text-white font-medium rounded-md hover:bg-[#14532D]"
                >
                  Tạo Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL XÁC NHẬN LÝ DO THẤT BẠI */}
      {lostModalLead && (
        <LeadLostModal
          lead={lostModalLead}
          onClose={() => setLostModalLead(null)}
          onConfirm={handleConfirmLost}
        />
      )}

      {/* 8. MODAL CHỐT ĐƠN HÀNG & DOANH THU */}
      {orderModalLead && (
        <OrderCreationModal
          lead={orderModalLead}
          onClose={() => setOrderModalLead(null)}
          onSuccess={() => {
            fetchLeadsData()
            showToast('Chốt đơn và ghi nhận doanh thu thành công')
          }}
        />
      )}

    </div>
  )
}
