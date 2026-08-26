import React, { useEffect } from 'react'
import { X, CheckCircle, Package, Calendar, Truck, ArrowRight } from 'lucide-react'

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
      window.location.href = '/lien-he'
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
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-haq-cream hover:bg-haq-red hover:text-white rounded-full flex items-center justify-center transition-colors text-haq-ink border border-haq-border"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-2/5 lg:w-1/2 bg-white p-8 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-haq-border">
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-20 bg-haq-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-md">
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
        <div className="w-full md:w-3/5 lg:w-1/2 p-6 md:p-8 lg:p-10 overflow-y-auto">
          {/* Category & Title */}
          <div className="mb-6">
            <span className="text-xs font-mono font-bold text-haq-red uppercase tracking-wider block mb-2">{product.category}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-haq-ink uppercase leading-tight">
              {product.name}
            </h2>
            {product.en_name && (
              <p className="text-haq-text-secondary text-sm mt-1">{product.en_name}</p>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm md:prose-base text-haq-text-secondary text-justify mb-8 leading-relaxed">
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p>Món quà tuyệt hảo mang hương vị truyền thống, được chế biến từ những nguyên liệu chọn lọc khắt khe nhất, phù hợp để thưởng thức cùng gia đình hoặc biếu tặng đối tác.</p>
            )}
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && product.highlights[0] !== '' && (
            <div className="mb-8 bg-haq-cream/60 p-5 rounded-xl border border-haq-border">
              <h4 className="font-bold text-haq-ink mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-haq-red" />
                Điểm nổi bật
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {product.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-haq-text-secondary">
                    <span className="text-haq-red mt-1 text-[10px]">●</span> 
                    <span className="flex-1">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variants Table */}
          <div className="mb-8">
            <h4 className="font-bold text-haq-ink mb-4">Quy cách đóng gói</h4>
            <div className="bg-white border border-haq-border rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[400px]">
                  <thead className="bg-haq-cream border-b border-haq-border">
                    <tr>
                      <th className="p-3 font-semibold text-haq-ink whitespace-nowrap">
                        <div className="flex items-center gap-1.5"><Package className="w-4 h-4 text-haq-red"/> Trọng lượng</div>
                      </th>
                      <th className="p-3 font-semibold text-haq-ink whitespace-nowrap">Quy cách</th>
                      <th className="p-3 font-semibold text-haq-ink whitespace-nowrap">
                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-haq-red"/> HSD</div>
                      </th>
                      <th className="p-3 font-semibold text-haq-ink whitespace-nowrap">
                        <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-haq-red"/> MOQ</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-haq-border">
                    {product.variants && product.variants.length > 0 ? (
                      product.variants.map((v, idx) => (
                        <tr key={idx} className="hover:bg-haq-cream/50 transition-colors">
                          <td className="p-3 font-bold text-haq-red whitespace-nowrap">{v.size || '-'}</td>
                          <td className="p-3 text-haq-text-secondary whitespace-nowrap">{v.pack || '-'}</td>
                          <td className="p-3 text-haq-text-secondary whitespace-nowrap">{v.shelf || '-'}</td>
                          <td className="p-3 font-mono text-xs text-haq-text-secondary whitespace-nowrap">{v.moq || 'Liên hệ'}</td>
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
              className="flex-1 bg-haq-red text-white py-3.5 px-6 rounded-lg font-bold hover:bg-haq-dark transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              Nhận báo giá Sỉ / Đại lý
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3.5 rounded-lg font-bold text-haq-ink bg-haq-cream hover:bg-haq-soft transition-colors border border-haq-border"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
