import React, { useEffect } from 'react'
import { X, CheckCircle, Package, Calendar, Truck, ArrowRight, MapPin } from 'lucide-react'

export default function ProductDetailModal({ product, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!product) return null

  // Ensure we have at least one variant to display info
  const defaultVariant = product.variants?.[0] || {}

  // Handle CTA click
  const handleCTA = () => {
    onClose()
    // Scroll to lead form section or contact section
    const leadForm = document.getElementById('contact')
    if (leadForm) {
      leadForm.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/lien-he?type=products'
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-full flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-haq-sage/40 hover:bg-[#16A34A] hover:text-white rounded-full flex items-center justify-center transition-colors text-haq-ink border border-haq-border cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-2/5 lg:w-1/2 bg-white p-8 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-haq-border">
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-20 bg-[#16A34A] text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
              {product.tag}
            </div>
          )}

          {defaultVariant.img ? (
            <img 
              src={defaultVariant.img} 
              alt={product.name} 
              className="relative z-10 w-full max-h-[40vh] md:max-h-[60vh] object-contain drop-shadow-xl" 
            />
          ) : (
            <div className="relative z-10 text-haq-text-secondary font-bold border-2 border-dashed border-haq-border p-8 rounded-xl flex items-center justify-center w-full h-48">
              Chưa có hình ảnh
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-3/5 lg:w-1/2 p-6 md:p-8 lg:p-10 overflow-y-auto font-sans">
          {/* Category & Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs font-heading font-bold text-[#16A34A] uppercase tracking-wider block">{product.category}</span>
              {product.provinces && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  <MapPin className="w-3 h-3 text-emerald-600" /> Đặc sản {product.provinces.name}
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-haq-ink uppercase leading-tight">
              {product.name}
            </h2>
            {product.en_name && (
              <p className="text-haq-text-secondary text-sm mt-1">{product.en_name}</p>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm md:prose-base text-haq-text-secondary text-justify mb-8 leading-relaxed font-normal">
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p>Món quà tuyệt hảo mang hương vị truyền thống, được chế biến từ những nguyên liệu chọn lọc khắt khe nhất, phù hợp để thưởng thức cùng gia đình hoặc biếu tặng đối tác.</p>
            )}
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && product.highlights[0] !== '' && (
            <div className="mb-8 bg-haq-sage/20 p-5 rounded-2xl border border-haq-border">
              <h4 className="font-heading font-bold text-haq-ink mb-3 flex items-center gap-2 text-sm uppercase">
                <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                Điểm nổi bật
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {product.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-haq-text-secondary">
                    <span className="text-[#16A34A] mt-1 text-[10px]">●</span> 
                    <span className="flex-1">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variants Table */}
          <div className="mb-8">
            <h4 className="font-heading font-bold text-haq-ink mb-3 text-sm uppercase">Quy cách đóng gói</h4>
            <div className="bg-white border border-haq-border rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm min-w-[400px]">
                  <thead className="bg-haq-sage/30 border-b border-haq-border">
                    <tr>
                      <th className="p-3 font-heading font-bold text-haq-ink whitespace-nowrap">
                        <div className="flex items-center gap-1.5"><Package className="w-4 h-4 text-[#16A34A]"/> Trọng lượng</div>
                      </th>
                      <th className="p-3 font-heading font-bold text-haq-ink whitespace-nowrap">Quy cách</th>
                      <th className="p-3 font-heading font-bold text-haq-ink whitespace-nowrap">
                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#16A34A]"/> HSD</div>
                      </th>
                      <th className="p-3 font-heading font-bold text-haq-ink whitespace-nowrap">
                        <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#16A34A]"/> MOQ</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-haq-border">
                    {product.variants && product.variants.length > 0 ? (
                      product.variants.map((v, idx) => (
                        <tr key={idx} className="hover:bg-haq-sage/10 transition-colors">
                          <td className="p-3 font-bold text-[#16A34A] whitespace-nowrap">{v.size || '-'}</td>
                          <td className="p-3 text-haq-text-secondary whitespace-nowrap">{v.pack || '-'}</td>
                          <td className="p-3 text-haq-text-secondary whitespace-nowrap">{v.shelf || '-'}</td>
                          <td className="p-3 text-xs text-haq-text-secondary whitespace-nowrap">{v.moq || 'Liên hệ'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-4 text-center text-haq-text-secondary italic">Đang cập nhật thông tin</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-auto pt-4 border-t border-haq-border flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleCTA}
              className="flex-1 bg-[#16A34A] text-white py-3.5 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0F5132] transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Nhận báo giá Sỉ / Đại lý</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase text-haq-ink bg-haq-sage/30 hover:bg-haq-sage/60 transition-colors border border-haq-border cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
