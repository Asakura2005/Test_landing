import React, { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'

const LOST_REASONS = [
  { code: 'PRICE_HIGH', title: 'Giá sỉ cao hơn kỳ vọng / Yêu cầu chiết khấu thêm', desc: 'Khách so sánh với chợ sỉ hoặc nhà cung cấp khác' },
  { code: 'NO_CONTACT', title: 'Không liên hệ được (Thuê bao / Sai số / Không nghe máy)', desc: 'Đã thử gọi 3 lần qua các khung giờ nhưng không phản hồi' },
  { code: 'PRODUCT_MISMATCH', title: 'Sản phẩm không phù hợp quy cách / mẫu mã mong muốn', desc: 'Khách tìm kiếm loại sản phẩm chưa có trong danh mục' },
  { code: 'NO_CERT', title: 'Yêu cầu chứng nhận riêng chưa đáp ứng kịp (FDA / Halal / Xuất khẩu)', desc: 'Yêu cầu giấy tờ chứng chỉ chưa hoàn thiện' },
  { code: 'COMPETITOR', title: 'Đã chọn đối thủ cạnh tranh khác', desc: 'Đã ký hợp đồng với đơn vị cung ứng khác' },
  { code: 'SLOW_RESPONSE', title: 'Thời gian phản hồi chậm hơn đơn vị khác', desc: 'Thời gian tiếp cận quá trễ so với nhu cầu tức thời' },
  { code: 'SURVEY_ONLY', title: 'Chỉ tham khảo giá, chưa có kế hoạch mở đại lý / bán hàng', desc: 'Khách hàng cá nhân hoặc chỉ khảo sát thị trường' },
  { code: 'OTHER', title: 'Lý do khác', desc: 'Ghi chú lý do cụ thể bên dưới' },
]

export default function LeadLostModal({ lead, onClose, onConfirm }) {
  const [selectedReason, setSelectedReason] = useState('PRICE_HIGH')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!lead) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedReason) return
    setIsSubmitting(true)
    try {
      await onConfirm(selectedReason, note)
      onClose()
    } catch (err) {
      alert('Lỗi lưu lý do: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden border border-[#E2E8E4] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-gray-50 border-b border-[#E2E8E4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-gray-900">Xác nhận Lead không chuyển đổi</h3>
              <p className="text-xs text-gray-500">Khách hàng: <strong className="text-gray-800">{lead.full_name}</strong> {lead.company ? `(${lead.company})` : ''}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          <p className="font-semibold text-gray-700">
            Vui lòng chọn lý do chính khiến Lead không thể chốt đơn <span className="text-red-500">*</span>:
          </p>

          <div className="space-y-1.5">
            {LOST_REASONS.map((r) => {
              const isSelected = selectedReason === r.code
              return (
                <label 
                  key={r.code}
                  className={`flex items-start gap-2.5 p-2.5 rounded-md border cursor-pointer transition-colors ${
                    isSelected 
                      ? 'border-red-400 bg-red-50/40' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="lost_reason"
                    value={r.code}
                    checked={isSelected}
                    onChange={() => setSelectedReason(r.code)}
                    className="mt-0.5 accent-red-600"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">{r.title}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{r.desc}</div>
                  </div>
                </label>
              )
            })}
          </div>

          <div className="pt-2">
            <label className="block font-semibold text-gray-700 mb-1">
              Ghi chú thêm của Sales (Chi tiết cuộc gọi / phản hồi):
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="VD: Khách cần mức chiết khấu cao hơn cho đơn lớn..."
              className="w-full border border-gray-300 rounded-md p-2.5 text-xs focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu lý do thất bại'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
