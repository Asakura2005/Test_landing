import React, { useState, useEffect } from 'react'
import { X, Phone, MessageCircle, Send, CheckCircle2, ShieldCheck } from 'lucide-react'

export default function QuickRfqModal({ isOpen, onClose, product = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#002117] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#fe932c]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#10b981]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Yêu Cầu Đã Được Gửi</h3>
            <p className="text-sm text-white/80 max-w-sm">
              Đội ngũ B2B của HAQ Food sẽ liên hệ lại với Quý đối tác trong vòng <strong>15 phút</strong> để gửi báo giá chi tiết và chính sách chiết khấu.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="tel:02423235656"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fe932c] to-[#d97706] text-white font-bold text-xs shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Hotline Ngay</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Báo Giá Sỉ & Gia Công OEM / ODM
              </span>
              <h3 className="text-2xl font-black text-white">
                {product ? `Nhận Báo Giá: ${product}` : 'Yêu Cầu Báo Giá Đại Lý & OEM'}
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Nhập thông tin bên dưới để nhận bảng giá sỉ theo số lượng và chính sách chiết khấu cho đối tác.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Họ và tên <span className="text-[#fe932c]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#fe932c] focus:outline-none placeholder-white/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Số điện thoại / Zalo <span className="text-[#fe932c]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#fe932c] focus:outline-none placeholder-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Tên Doanh nghiệp / Cửa hàng
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Công ty / Siêu thị..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#fe932c] focus:outline-none placeholder-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Ghi chú yêu cầu (Quy cách, số lượng dự kiến)
                </label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder={product ? `Yêu cầu báo giá số lượng cho ${product}...` : 'Nhập quy cách hoặc sản phẩm quan tâm...'}
                  className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#fe932c] focus:outline-none placeholder-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#fe932c] to-[#ea580c] hover:from-[#f97316] hover:to-[#c2410c] text-white font-bold text-sm shadow-lg shadow-[#fe932c]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? (
                  <span>Đang gửi thông tin...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi Yêu Cầu Báo Giá</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Contact Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span>Hỗ trợ B2B trực tiếp:</span>
              <div className="flex items-center gap-3">
                <a
                  href="tel:02423235656"
                  className="flex items-center gap-1 text-[#fe932c] hover:underline font-bold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>024 23 23 56 56</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
