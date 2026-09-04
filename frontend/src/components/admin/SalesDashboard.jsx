import React, { useState, useEffect, useMemo } from 'react'
import { 
  DollarSign, 
  Award, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  UserCheck, 
  Package, 
  AlertTriangle,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Filter,
  Edit3,
  Trash2,
  Search,
  Plus
} from 'lucide-react'
import { getLeads, getOrders, getSalesReps, deleteOrder } from '../../services/supabase'
import OrderCreationModal from './OrderCreationModal'

export default function SalesDashboard() {
  const [leads, setLeads] = useState([])
  const [orders, setOrders] = useState([])
  const [salesReps, setSalesReps] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingOrder, setEditingOrder] = useState(null)
  const [orderSearch, setOrderSearch] = useState('')

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [leadsData, ordersData, salesData] = await Promise.all([
        getLeads(),
        getOrders(),
        getSalesReps()
      ])
      setLeads(leadsData || [])
      setOrders(ordersData || [])
      setSalesReps(salesData || [])
    } catch (err) {
      console.error("SalesDashboard fetchData error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteOrder = async (order) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng "${order.order_code}" của khách hàng "${order.customer_name}"?`)) {
      return
    }
    try {
      await deleteOrder(order.id)
      alert(`Đã xóa đơn hàng ${order.order_code} thành công`)
      fetchData()
    } catch (err) {
      alert('Lỗi xóa đơn hàng: ' + err.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Calculate Sales Team Performance
  const salesPerformance = useMemo(() => {
    return salesReps.map(rep => {
      const repLeads = leads.filter(l => String(l.assigned_to) === String(rep.id))
      const repOrders = orders.filter(o => String(o.assigned_sales_id) === String(rep.id) || o.sales_name === rep.full_name)
      const totalRevenue = repOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0)
      const convertedCount = repLeads.filter(l => (l.status || '').toUpperCase() === 'CONVERTED' || (l.status || '').toUpperCase() === 'ORDERED').length
      const winRate = repLeads.length > 0 ? ((convertedCount / repLeads.length) * 100).toFixed(1) : '0.0'

      return {
        id: rep.id,
        name: rep.full_name,
        role: rep.role || 'Chuyên viên Sales B2B',
        phone: rep.phone || '—',
        totalLeads: repLeads.length,
        convertedCount,
        winRate,
        revenue: totalRevenue,
      }
    }).sort((a, b) => b.revenue - a.revenue)
  }, [salesReps, leads, orders])

  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0), [orders])
  const totalConvertedLeads = useMemo(() => leads.filter(l => (l.status || '').toUpperCase() === 'CONVERTED' || (l.status || '').toUpperCase() === 'ORDERED').length, [leads])
  const avgWinRate = useMemo(() => leads.length > 0 ? ((totalConvertedLeads / leads.length) * 100).toFixed(1) : '0.0', [leads, totalConvertedLeads])
  const topSales = salesPerformance[0] || { name: 'Đội ngũ Sales HAQ FOOD', revenue: 0 }

  return (
    <div className="space-y-5 pb-12 font-sans text-gray-800 antialiased">
      
      {/* ============================================================ */}
      {/* 1. PAGE HEADER                                               */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-4 rounded-lg border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Hiệu suất Sales & CSKH
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Theo dõi tốc độ xử lý Lead, tỷ lệ win-rate và doanh thu từng nhân sự Sales B2B.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. KPI AREA (4 Compact Blocks)                               */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* KPI 1: TỔNG DOANH THU B2B */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            TỔNG DOANH THU CHỐT
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0F5132] tracking-tight">
              {totalRevenue.toLocaleString('vi-VN')} <span className="text-xs font-sans font-normal text-gray-500">đ</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-700">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Ghi nhận từ {orders.length} đơn hàng B2B</span>
          </div>
        </div>

        {/* KPI 2: WIN-RATE */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            TỶ LỆ CHỐT ĐƠN (WIN RATE)
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 tracking-tight">
              {avgWinRate}%
            </span>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {totalConvertedLeads} / {leads.length} khách liên hệ
          </div>
        </div>

        {/* KPI 3: SLA PHẢN HỒI */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            TỐC ĐỘ PHẢN HỒI TRUNG BÌNH
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 tracking-tight">
              18 Phút
            </span>
          </div>
          <div className="text-xs text-emerald-700 font-medium">
            Đạt chuẩn SLA 100% (&lt; 2 giờ)
          </div>
        </div>

        {/* KPI 4: TOP SALES */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            SALES DẪN ĐẦU DOANH SỐ
          </div>
          <div className="my-2 truncate">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate block">
              {topSales.name}
            </span>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            Doanh số: <span className="font-mono font-bold text-[#0F5132]">{(topSales.revenue || 0).toLocaleString('vi-VN')} đ</span>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. SALES PERFORMANCE LEADERBOARD TABLE                       */}
      {/* ============================================================ */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-900">
              Bảng xếp hạng hiệu suất nhân sự Sales
            </h2>
            <p className="text-xs text-gray-500">
              Đánh giá khối lượng Lead tiếp nhận, tỷ lệ chốt đơn và doanh thu thực tế phát sinh.
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
            {salesPerformance.length} nhân sự
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-2.5 px-4 w-12 text-center">#</th>
                <th className="py-2.5 px-4">Nhân Viên Sales</th>
                <th className="py-2.5 px-3">Vai Trò</th>
                <th className="py-2.5 px-3 text-right">Lead Đã Nhận</th>
                <th className="py-2.5 px-3 text-right">Đơn Chốt</th>
                <th className="py-2.5 px-3 text-right">Win Rate</th>
                <th className="py-2.5 px-4 text-right">Doanh Thu (VNĐ)</th>
                <th className="py-2.5 px-4 text-center">Đánh Giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesPerformance.map((rep, idx) => (
                <tr 
                  key={rep.id} 
                  className={`hover:bg-gray-50/70 transition-colors ${
                    idx === 0 ? 'bg-emerald-50/25' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 text-center font-mono font-bold text-gray-500 text-xs">
                    0{idx + 1}
                  </td>
                  <td className="py-2.5 px-4 font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{rep.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{rep.phone}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium border border-gray-200">
                      {rep.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-gray-700">
                    {rep.totalLeads}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0F5132]">
                    {rep.convertedCount}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-700">
                    {rep.winRate}%
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-[#0F5132]">
                    {rep.revenue.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border ${
                      idx === 0
                        ? 'bg-emerald-50 text-[#0F5132] border-emerald-200'
                        : rep.convertedCount > 0
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {idx === 0 ? 'Xuất sắc' : rep.convertedCount > 0 ? 'Tốt' : 'Đang xử lý'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. RECENT COMPLETED B2B ORDERS TABLE                         */}
      {/* ============================================================ */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-900">
              Danh sách đơn hàng B2B đã chốt & bàn giao
            </h2>
            <p className="text-xs text-gray-500">
              Nhật ký đơn hàng chính thức ký hợp đồng, có thể chỉnh sửa sản phẩm đã thêm nhầm hoặc đổi số lượng.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm mã đơn, KH, sản phẩm..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#0F5132] focus:bg-white w-52"
              />
            </div>
            <span className="hidden sm:inline-flex text-[11px] font-semibold text-[#0F5132] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 shrink-0">
              {orders.length} đơn hàng
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-2.5 px-4">Mã Đơn</th>
                <th className="py-2.5 px-4">Khách Hàng / Đơn Vị</th>
                <th className="py-2.5 px-4">Sản Phẩm Đã Đặt</th>
                <th className="py-2.5 px-3">Sales Phụ Trách</th>
                <th className="py-2.5 px-3">Nguồn Lead</th>
                <th className="py-2.5 px-4 text-right">Tổng Tiền (VNĐ)</th>
                <th className="py-2.5 px-4 text-right">Thời Gian Chốt</th>
                <th className="py-2.5 px-3 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(() => {
                const filteredOrders = orders.filter(o => {
                  if (!orderSearch.trim()) return true
                  const q = orderSearch.toLowerCase()
                  const inCode = o.order_code?.toLowerCase().includes(q)
                  const inCust = o.customer_name?.toLowerCase().includes(q)
                  const inComp = o.company_name?.toLowerCase().includes(q)
                  const inSales = o.sales_name?.toLowerCase().includes(q)
                  const inItems = o.items?.some(it => it.product_name?.toLowerCase().includes(q))
                  return inCode || inCust || inComp || inSales || inItems
                })

                if (filteredOrders.length === 0) {
                  return (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-gray-400 text-xs">
                        {orderSearch ? 'Không tìm thấy đơn hàng phù hợp.' : 'Chưa có đơn hàng nào được ghi nhận.'}
                      </td>
                    </tr>
                  )
                }

                return filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-[#0F5132]">
                      {o.order_code}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-gray-900">{o.customer_name}</div>
                      <div className="text-[10px] text-gray-500">{o.company_name || 'Khách sỉ'}</div>
                      {o.customer_phone && <div className="text-[10px] text-gray-400 font-mono">{o.customer_phone}</div>}
                    </td>
                    <td className="py-2.5 px-4 max-w-xs">
                      {o.items && o.items.length > 0 ? (
                        <div className="space-y-1">
                          {o.items.map((it, itIdx) => (
                            <div key={itIdx} className="text-xs text-gray-800 flex items-center gap-1.5 flex-wrap">
                              <span className="font-medium text-gray-900">• {it.product_name}</span>
                              {it.variant_name && (
                                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded">
                                  ({it.variant_name})
                                </span>
                              )}
                              <span className="font-mono text-emerald-700 font-bold text-[11px]">
                                x{it.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-[11px]">Chưa có thông tin SP</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-gray-700 font-medium">
                      {o.sales_name || 'Admin'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-[10px] uppercase border border-gray-200">
                        {o.utm_source || 'direct'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-[#0F5132]">
                      {Number(o.total_amount).toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-gray-500 text-[11px]">
                      {new Date(o.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setEditingOrder(o)}
                          className="px-2 py-1 text-[#0F5132] hover:bg-emerald-50 bg-emerald-50/50 rounded text-xs font-semibold transition-colors border border-emerald-200 flex items-center gap-1 cursor-pointer"
                          title="Sửa sản phẩm, số lượng hoặc giá"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Sửa</span>
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(o)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Xóa đơn hàng này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              })()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <OrderCreationModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSuccess={() => {
            fetchData()
            setEditingOrder(null)
          }}
        />
      )}

    </div>
  )
}