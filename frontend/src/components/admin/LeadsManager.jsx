import React, { useState, useEffect } from 'react'
import { getLeads, updateLeadStatus, deleteLead } from '../../services/supabase'
import { RefreshCw, CheckCircle, Trash2, Users } from 'lucide-react'

export default function LeadsManager() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLeads = async () => {
    try {
      setIsLoading(true)
      const data = await getLeads()
      setLeads(data || [])
    } catch (err) {
      console.error(err)
      alert("Lỗi tải dữ liệu khách hàng: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'contacted' ? 'new' : 'contacted'
    try {
      await updateLeadStatus(id, newStatus)
      await fetchLeads()
    } catch (err) {
      alert("Lỗi cập nhật trạng thái: " + err.message)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa khách hàng "${name}"?`)) return
    try {
      await deleteLead(id)
      await fetchLeads()
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  return (
    <div className="flex flex-col h-full bg-haq-bone">
      <header className="bg-white border-b border-black/10 p-4 md:p-6 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-heading font-bold text-2xl text-haq-ink">Danh sách Khách Hàng (Leads)</h1>
          <p className="text-sm text-haq-ink/60 mt-1">Quản lý những người đã đăng ký nhận báo giá</p>
        </div>
        <button onClick={fetchLeads} className="bg-white border border-black/10 text-haq-ink px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-haq-bone transition-colors shadow-sm">
          <RefreshCw className="w-5 h-5" /> <span className="hidden md:inline">Làm mới</span>
        </button>
      </header>

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-haq-ink/50">
            <RefreshCw className="w-8 h-8 animate-spin mb-4 text-haq-orange" />
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white border border-black/10 rounded-xl p-12 text-center shadow-sm">
            <Users className="w-12 h-12 text-haq-ink/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-haq-ink mb-2">Chưa có khách hàng nào</h3>
            <p className="text-haq-ink/60 mb-6">Danh sách khách hàng đăng ký sẽ hiện ở đây.</p>
          </div>
        ) : (
          <div className="bg-white border border-black/10 rounded shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-haq-bone/50 border-b border-black/10 text-sm">
                  <th className="p-4 font-semibold text-haq-ink/70">Thời gian</th>
                  <th className="p-4 font-semibold text-haq-ink/70">Khách hàng</th>
                  <th className="p-4 font-semibold text-haq-ink/70">Liên hệ</th>
                  <th className="p-4 font-semibold text-haq-ink/70">Nhu cầu</th>
                  <th className="p-4 font-semibold text-haq-ink/70">Trạng thái</th>
                  <th className="p-4 font-semibold text-haq-ink/70 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{new Date(lead.created_at).toLocaleDateString('vi-VN')}</div>
                      <div className="text-xs text-haq-ink/50">{new Date(lead.created_at).toLocaleTimeString('vi-VN')}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-haq-ink">{lead.full_name}</div>
                      {lead.company && <div className="text-sm text-haq-ink/60">{lead.company}</div>}
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-sm">{lead.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-haq-orange">{lead.need}</div>
                      {lead.note && <div className="text-xs text-haq-ink/60 mt-1 max-w-xs truncate" title={lead.note}>Ghi chú: {lead.note}</div>}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        lead.status === 'contacted' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {lead.status === 'contacted' ? 'Đã liên hệ' : 'Mới'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdateStatus(lead.id, lead.status)}
                          title={lead.status === 'contacted' ? 'Đánh dấu Mới' : 'Đánh dấu Đã liên hệ'}
                          className={`p-2 rounded transition-colors ${
                            lead.status === 'contacted' ? 'text-green-600 hover:bg-green-50' : 'text-haq-ink/40 hover:bg-haq-bone hover:text-haq-ink'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id, lead.full_name)}
                          title="Xóa"
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
