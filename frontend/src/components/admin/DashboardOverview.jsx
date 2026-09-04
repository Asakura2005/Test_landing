import React, { useState, useMemo } from 'react'
import { 
  Users, 
  Package, 
  MapPin, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  TrendingUp
} from 'lucide-react'
import * as XLSX from 'xlsx'
import { getTopViewedProducts } from '../../services/posthog'

export default function DashboardOverview({ products = [], leads = [], onNavigateTab, isSales = false }) {
  const [exportNotice, setExportNotice] = useState('')

  // 1. KPI Metric Computations
  const totalLeadsCount = leads.length
  const newLeadsPending = leads.filter(l => (l.status || '').toUpperCase() === 'NEW' || !l.status).length
  const convertedLeadsCount = leads.filter(l => ['CONVERTED', 'ORDERED'].includes((l.status || '').toUpperCase())).length
  const winRate = totalLeadsCount > 0 ? ((convertedLeadsCount / totalLeadsCount) * 100).toFixed(1) : '0.0'
  const activeProductsCount = products.filter(p => p.is_active !== false).length
  const totalSkus = products.reduce((sum, p) => sum + (p.variants?.length || 1), 0)
  const pinnedCount = products.filter(p => p.is_pinned).length
  const provinceCount = new Set(products.map(p => p.province_id).filter(Boolean)).size

  // 2. Recent Leads List for Data Table
  const recentLeadsList = useMemo(() => {
    return (leads || []).slice(0, 5).map((l, idx) => {
      const rawStatus = (l.status || 'NEW').toUpperCase()
      
      let statusText = 'Chờ xử lý'
      let statusClass = 'bg-red-50 text-red-700 border border-red-200'

      if (['CONVERTED', 'ORDERED'].includes(rawStatus)) {
        statusText = 'Đã chốt'
        statusClass = 'bg-emerald-50 text-[#0F5132] border border-emerald-200'
      } else if (rawStatus === 'QUOTED') {
        statusText = 'Đã báo giá'
        statusClass = 'bg-blue-50 text-blue-700 border border-blue-200'
      } else if (['CONSULTING', 'QUALIFIED', 'CONTACTED'].includes(rawStatus)) {
        statusText = 'Đang tư vấn'
        statusClass = 'bg-amber-50 text-amber-700 border border-amber-200'
      } else if (['LOST', 'NOT_CONVERTED'].includes(rawStatus)) {
        statusText = 'Thất bại'
        statusClass = 'bg-gray-100 text-gray-700 border border-gray-200'
      }

      let timeFormatted = '—'
      if (l.created_at) {
        const d = new Date(l.created_at)
        const hours = d.getHours().toString().padStart(2, '0')
        const mins = d.getMinutes().toString().padStart(2, '0')
        const day = d.getDate().toString().padStart(2, '0')
        const month = (d.getMonth() + 1).toString().padStart(2, '0')
        timeFormatted = `${hours}:${mins} ${day}/${month}`
      }

      return {
        id: l.id || `lead-${idx}`,
        name: l.full_name || l.name || 'Khách liên hệ',
        company: l.company || '',
        phone: l.phone || '—',
        need: l.need || l.last_product_name || 'Báo giá sỉ B2B',
        region: l.region || l.province_id || 'Toàn quốc',
        statusText,
        statusClass,
        timeFormatted,
        assignee: l.sales_rep?.full_name || l.assigned_sales_name || 'Chưa phân công'
      }
    })
  }, [leads])

  // 3. Lead Funnel Breakdown
  const funnelStages = useMemo(() => {
    const contactedCount = leads.filter(l => l.status === 'CONTACTED').length
    const consultingCount = leads.filter(l => ['CONSULTING', 'QUALIFIED'].includes((l.status || '').toUpperCase())).length
    const quotedCount = leads.filter(l => (l.status || '').toUpperCase() === 'QUOTED').length
    const lostCount = leads.filter(l => ['LOST', 'NOT_CONVERTED'].includes((l.status || '').toUpperCase())).length

    return [
      { label: 'Chờ tiếp nhận (Mới)', count: newLeadsPending, barColor: 'bg-red-500' },
      { label: 'Đang liên hệ & tư vấn', count: contactedCount + consultingCount, barColor: 'bg-amber-500' },
      { label: 'Đã gửi báo giá', count: quotedCount, barColor: 'bg-blue-600' },
      { label: 'Đã chốt đơn thành công', count: convertedLeadsCount, barColor: 'bg-[#0F5132]' },
      { label: 'Không chuyển đổi (Lost)', count: lostCount, barColor: 'bg-gray-400' }
    ]
  }, [leads, newLeadsPending, convertedLeadsCount])

  // 4. Top Products Metrics
  const topProductsMetrics = useMemo(() => {
    const topViews = getTopViewedProducts(products, 5)
    const totalViews = topViews.reduce((sum, p) => sum + (Number(p.view_count) || 0), 0) || 1

    return topViews.map(p => {
      const views = Number(p.view_count) || 0
      const pNameLower = (p.name || '').toLowerCase()
      const leadCount = leads.filter(l => {
        const text = `${l.need || ''} ${l.note || ''} ${l.last_product_name || ''}`.toLowerCase()
        return text.includes(pNameLower)
      }).length

      return {
        id: p.id,
        name: p.name,
        category: p.category || p.categories?.name || 'Nông sản',
        views,
        leadInquiries: leadCount,
        share: Math.round((views / totalViews) * 100),
        slug: p.slug
      }
    })
  }, [products, leads])

  // 5. Direct Real Excel Export
  const handleExportExcel = () => {
    try {
      const now = new Date()
      const dateStr = now.toLocaleDateString('vi-VN').replace(/\//g, '-')
      const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')

      // Sheet 1: Danh sách Leads
      const leadsRows = (leads || []).map((lead, idx) => ({
        'STT': idx + 1,
        'Họ & Tên': lead.full_name || lead.name || '',
        'Công ty / Đại lý': lead.company || '',
        'Số điện thoại': lead.phone || '',
        'Email': lead.email || '',
        'Tỉnh / Vùng': lead.region || '',
        'Nhu cầu': lead.need || '',
        'Ghi chú': lead.note || '',
        'Trạng thái': lead.status || 'NEW',
        'Sales phụ trách': lead.sales_rep?.full_name || lead.assigned_sales_name || 'Chưa phân công',
        'Giá trị ước tính (đ)': lead.estimated_value ? Number(lead.estimated_value).toLocaleString('vi-VN') : '',
        'UTM Source': lead.utm_source || '',
        'UTM Campaign': lead.utm_campaign || '',
        'Ngày gửi': lead.created_at ? new Date(lead.created_at).toLocaleString('vi-VN') : '',
        'Cập nhật lần cuối': lead.updated_at ? new Date(lead.updated_at).toLocaleString('vi-VN') : '',
      }))

      // Sheet 2: Thống kê tổng hợp
      const summaryRows = [
        { 'Chỉ số': 'Tổng Lead B2B', 'Giá trị': (leads || []).length },
        { 'Chỉ số': 'Leads mới (NEW)', 'Giá trị': (leads || []).filter(l => l.status === 'NEW').length },
        { 'Chỉ số': 'Đang xử lý (CONTACTED/QUOTED)', 'Giá trị': (leads || []).filter(l => ['CONTACTED', 'QUOTED'].includes(l.status)).length },
        { 'Chỉ số': 'Đã chốt (CONVERTED)', 'Giá trị': (leads || []).filter(l => l.status === 'CONVERTED').length },
        { 'Chỉ số': 'Thất bại (LOST)', 'Giá trị': (leads || []).filter(l => l.status === 'LOST').length },
        { 'Chỉ số': 'Tỷ lệ chuyển đổi (%)', 'Giá trị': (leads || []).length > 0 ? (((leads || []).filter(l => l.status === 'CONVERTED').length / (leads || []).length) * 100).toFixed(1) + '%' : '0%' },
        { 'Chỉ số': 'Tổng giá trị ước tính (đ)', 'Giá trị': (leads || []).reduce((sum, l) => sum + (Number(l.estimated_value) || 0), 0).toLocaleString('vi-VN') },
        { 'Chỉ số': '', 'Giá trị': '' },
        { 'Chỉ số': 'Ngày xuất báo cáo', 'Giá trị': now.toLocaleString('vi-VN') },
        { 'Chỉ số': 'Xuất bởi', 'Giá trị': 'HAQ FOOD Admin Portal' },
      ]

      const wb = XLSX.utils.book_new()

      // Sheet 1
      const ws1 = XLSX.utils.json_to_sheet(leadsRows)
      ws1['!cols'] = [
        { wch: 5 }, { wch: 25 }, { wch: 25 }, { wch: 16 }, { wch: 30 },
        { wch: 20 }, { wch: 30 }, { wch: 40 }, { wch: 16 }, { wch: 25 },
        { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 22 }, { wch: 22 },
      ]
      XLSX.utils.book_append_sheet(wb, ws1, 'Danh Sách Leads B2B')

      // Sheet 2
      const ws2 = XLSX.utils.json_to_sheet(summaryRows)
      ws2['!cols'] = [{ wch: 40 }, { wch: 25 }]
      XLSX.utils.book_append_sheet(wb, ws2, 'Thống Kê Tổng Hợp')

      // Tải file
      const fileName = `HAQ_FOOD_Leads_${dateStr}_${timeStr}.xlsx`
      XLSX.writeFile(wb, fileName)

      setExportNotice(`Đã xuất thành công: ${fileName} (${(leads || []).length} leads)`)
      setTimeout(() => setExportNotice(''), 5000)
    } catch (err) {
      console.error('Export Excel failed:', err)
      setExportNotice('Lỗi xuất Excel: ' + err.message)
      setTimeout(() => setExportNotice(''), 4000)
    }
  }

  return (
    <div className="space-y-6 font-sans text-gray-900 pb-10">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Tổng quan
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Cập nhật tình hình kinh doanh B2B và hoạt động Lead.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="h-9 px-3.5 rounded-lg bg-[#0F5132] hover:bg-[#14532D] text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            title="Tải về file Excel danh sách Leads B2B và Thống kê"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Export notification alert */}
      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice('')} className="text-gray-400 hover:text-gray-600 text-xs font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* 2. KPI SECTION (4 Columns - Clean, dense, identical cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: TỔNG LEAD */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            TỔNG LEAD
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {totalLeadsCount}
            </div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="font-semibold text-emerald-700">+{newLeadsPending} mới</span>
            <span>•</span>
            <span>Chờ tiếp nhận</span>
          </div>
        </div>

        {/* KPI 2: TỶ LỆ CHUYỂN ĐỔI */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            TỶ LỆ CHUYỂN ĐỔI
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {winRate}%
            </div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="font-semibold text-gray-900">{convertedLeadsCount}</span>
            <span>/</span>
            <span>{totalLeadsCount} leads</span>
          </div>
        </div>

        {/* KPI 3: SẢN PHẨM */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            SẢN PHẨM
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {activeProductsCount}
            </div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="font-semibold text-gray-900">{pinnedCount}</span>
            <span>sản phẩm nổi bật</span>
            <span className="text-gray-400">({totalSkus} SKUs)</span>
          </div>
        </div>

        {/* KPI 4: TỈNH THÀNH */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            TỈNH THÀNH
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {provinceCount} / 34
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Đã triển khai vùng đặc sản
          </div>
        </div>
      </div>

      {/* 3. MAIN DATA AREA - HOẠT ĐỘNG LEAD GẦN ĐÂY */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              Hoạt động Lead gần đây
            </h2>
            <p className="text-xs text-gray-500">
              Danh sách yêu cầu báo giá và đại lý gửi thông tin mới nhất qua hệ thống.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab && onNavigateTab('leads')}
            className="text-xs font-semibold text-[#0F5132] hover:text-[#14532D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Quản lý phễu Lead (CRM)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-4 py-2.5">Khách hàng</th>
                <th className="px-4 py-2.5">Nhu cầu</th>
                <th className="px-4 py-2.5">Khu vực</th>
                <th className="px-4 py-2.5">Trạng thái</th>
                <th className="px-4 py-2.5">Thời gian</th>
                <th className="px-4 py-2.5">Người phụ trách</th>
                <th className="px-4 py-2.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {recentLeadsList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    Chưa có hoạt động Lead nào gần đây.
                  </td>
                </tr>
              ) : (
                recentLeadsList.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                      {lead.company && (
                        <div className="text-[11px] text-gray-500">{lead.company}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="line-clamp-1">{lead.need}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.region}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${lead.statusClass}`}>
                        {lead.statusText}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap font-mono text-[11px]">
                      {lead.timeFormatted}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {lead.assignee}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onNavigateTab && onNavigateTab('leads')}
                        className="px-2.5 py-1 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs transition-colors cursor-pointer"
                      >
                        Xử lý
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. BUSINESS OVERVIEW (2 Practical Panels) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Panel 1: Hiệu suất Lead */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Hiệu suất Lead
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Phân bố trạng thái và tỷ lệ chuyển đổi trong phễu B2B
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                Tổng: {totalLeadsCount}
              </span>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              {funnelStages.map((stage, idx) => {
                const percent = totalLeadsCount > 0 ? ((stage.count / totalLeadsCount) * 100).toFixed(0) : 0
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700 font-medium">{stage.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{stage.count}</span>
                        <span className="text-gray-400 text-[11px] w-8 text-right">({percent}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stage.barColor}`}
                        style={{ width: `${Math.max(stage.count > 0 ? 3 : 0, percent)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
            <span className="text-gray-500">Tỷ lệ chuyển đổi chốt đơn</span>
            <span className="font-bold text-[#0F5132]">{winRate}%</span>
          </div>
        </div>

        {/* Panel 2: Top sản phẩm được quan tâm */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Top sản phẩm được quan tâm
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Thống kê lượt xem và tần suất hỏi giá sỉ từ khách hàng
                </p>
              </div>
              <button
                onClick={() => onNavigateTab && onNavigateTab('products')}
                className="text-xs font-semibold text-[#0F5132] hover:underline cursor-pointer"
              >
                Xem tất cả
              </button>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    <th className="pb-2">Sản phẩm</th>
                    <th className="pb-2 text-right">Lượt xem</th>
                    <th className="pb-2 text-right">Leads</th>
                    <th className="pb-2 text-right">Tỷ trọng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topProductsMetrics.slice(0, 5).map((prod, idx) => (
                    <tr key={prod.id || idx} className="hover:bg-gray-50/70">
                      <td className="py-2 pr-2">
                        <div className="font-medium text-gray-900 truncate max-w-[180px]" title={prod.name}>
                          {prod.name}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate">{prod.category}</div>
                      </td>
                      <td className="py-2 text-right font-mono font-medium text-gray-900">
                        {prod.views.toLocaleString()}
                      </td>
                      <td className="py-2 text-right font-mono font-medium text-emerald-800">
                        {prod.leadInquiries}
                      </td>
                      <td className="py-2 text-right text-gray-500">
                        {prod.share}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
            <span className="text-gray-500">Tổng sản phẩm đang mở bán</span>
            <span className="font-bold text-gray-900">{activeProductsCount} SP</span>
          </div>
        </div>

      </div>

      {/* 5. QUICK ACCESS - Clean enterprise navigation cards */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          Truy cập nhanh báo cáo chuyên sâu
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigateTab && onNavigateTab('dashboard_marketing')}
            className="p-3.5 bg-white rounded-lg border border-gray-200 text-left hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gray-500" />
                <span>Marketing & UTM</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Nguồn truy cập, chiến dịch UTM và sản phẩm quan tâm.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors shrink-0" />
          </button>

          <button
            onClick={() => onNavigateTab && onNavigateTab('dashboard_sales')}
            className="p-3.5 bg-white rounded-lg border border-gray-200 text-left hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-gray-500" />
                <span>Hiệu suất Sales</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Bảng xếp hạng nhân viên, tỷ lệ chốt đơn và đơn hàng.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors shrink-0" />
          </button>

          <button
            onClick={() => onNavigateTab && onNavigateTab('dashboard_management')}
            className="p-3.5 bg-white rounded-lg border border-gray-200 text-left hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span>Funnel & Chuyển đổi</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Phễu kinh doanh 6 tầng và phân tích nguyên nhân mất đơn.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors shrink-0" />
          </button>
        </div>
      </div>

    </div>
  )
}

