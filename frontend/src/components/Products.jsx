import React, { useEffect, useMemo, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { getProducts } from '../services/supabase'

const STATIC_PRODUCTS = [
  {
    slug: 'banh-trang-tron',
    name: 'Bánh Tráng Trộn',
    en: 'Mixed Rice Paper',
    description:
      'Sản phẩm bán chạy với hương vị cân bằng, phù hợp hệ thống siêu thị, cửa hàng tiện lợi và đại lý phân phối.',
    tag: 'Best Seller',
    variants: [
      { size: '250g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/82b1968aa_generated_a9a0ebfd.png', shelf: '9 tháng', pack: 'Túi zip 250g', moq: '50 thùng' },
      { size: '500g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/82b1968aa_generated_a9a0ebfd.png', shelf: '9 tháng', pack: 'Hũ 500g', moq: '50 thùng' },
    ],
    highlights: ['Vị truyền thống', 'Phù hợp retail', 'OEM/ODM'],
  },
  {
    slug: 'bap-rang-bo',
    name: 'Bắp Rang Bơ',
    en: 'Butter Popcorn',
    description:
      'Dòng snack giòn thơm, dễ trưng bày và dễ bán tại hệ thống cửa hàng tiện lợi, rạp, quầy tạp hóa.',
    tag: null,
    variants: [
      { size: '150g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/ba26c9750_generated_a4d7414b.png', shelf: '8 tháng', pack: 'Túi zip 150g', moq: '50 thùng' },
      { size: '300g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/ba26c9750_generated_a4d7414b.png', shelf: '8 tháng', pack: 'Hũ 300g', moq: '50 thùng' },
    ],
    highlights: ['Giòn lâu', 'Mùi bơ đậm', 'Đóng gói linh hoạt'],
  },
  {
    slug: 'kho-thit-bo',
    name: 'Khô Thịt Bò',
    en: 'Dried Beef',
    description:
      'Dòng sản phẩm cao cấp, phù hợp bán lẻ hiện đại và quà biếu, có thể triển khai nhiều quy cách đóng gói.',
    tag: 'Premium',
    variants: [
      { size: '200g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/474562b05_generated_07fb3b17.png', shelf: '6 tháng', pack: 'Túi zip 200g', moq: '30 thùng' },
      { size: '250g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/474562b05_generated_07fb3b17.png', shelf: '6 tháng', pack: 'Hũ 250g', moq: '30 thùng' },
    ],
    highlights: ['Cao cấp', 'Đậm vị', 'Bán tốt mùa lễ'],
  },
  {
    slug: 'banh-dau-xanh',
    name: 'Bánh Đậu Xanh',
    en: 'Mung Bean Cake',
    description:
      'Sản phẩm truyền thống, dễ dùng làm quà tặng, quà biếu và trưng bày tại các điểm bán đặc sản.',
    tag: null,
    variants: [
      { size: '200g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/c221093ee_generated_d5d96607.png', shelf: '10 tháng', pack: 'Hộp 200g', moq: '60 thùng' },
      { size: '400g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/c221093ee_generated_d5d96607.png', shelf: '10 tháng', pack: 'Hũ 400g', moq: '60 thùng' },
    ],
    highlights: ['Truyền thống', 'Gift-friendly', 'Ổn định'],
  },
  {
    slug: 'banh-hanh-nhan',
    name: 'Bánh Hạnh Nhân',
    en: 'Almond Cookies',
    description:
      'Bánh quy hạnh nhân phục vụ phân khúc quà tặng và bán lẻ hiện đại với bao bì sang hơn.',
    tag: 'Mới',
    variants: [
      { size: '250g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/8689c4d7e_generated_798d999b.png', shelf: '9 tháng', pack: 'Hộp 250g', moq: '40 thùng' },
      { size: '500g', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/8689c4d7e_generated_798d999b.png', shelf: '9 tháng', pack: 'Hũ 500g', moq: '40 thùng' },
    ],
    highlights: ['Quà tặng', 'Bao bì đẹp', 'Retail premium'],
  },
  {
    slug: 'oem-packaging',
    name: 'Đóng Gói Cung Cấp',
    en: 'OEM Packaging',
    description:
      'Giải pháp đóng gói riêng theo thương hiệu đối tác, phù hợp triển khai SKU đặc thù và nhãn riêng.',
    tag: 'OEM',
    variants: [
      { size: 'Theo SKU', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/74b2e78f3_generated_3c6c224f.png', shelf: 'Theo SKU', pack: 'Hũ / Túi zip riêng tem', moq: 'Theo đơn' },
      { size: 'Private Label', img: 'https://media.base44.com/images/public/6a8ba61e224b4f7752aa61af/74b2e78f3_generated_3c6c224f.png', shelf: 'Theo SKU', pack: 'Thiết kế riêng', moq: 'Theo đơn' },
    ],
    highlights: ['Private label', 'Tùy biến', 'Đơn hàng linh hoạt'],
  },
]

function ProductCard({ product, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const current = product.variants?.[0] || { img: '' }

  return (
    <button
      type="button"
      className="group relative bg-white border border-black/10 overflow-hidden flex flex-col text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-haq-orange/30"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-haq-bone">
        <img
          src={current.img}
          alt={`Sản phẩm ${product.name} của HAQ FOOD`}
          className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/f3f2ef/1e1e1e?text=No+Image'
          }}
        />

        {product.tag && (
          <span className="absolute top-4 left-4 bg-haq-red text-white font-mono text-[10px] tracking-widest uppercase px-3 py-1">
            {product.tag}
          </span>
        )}

        <div className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-haq-ink/90 via-haq-ink/50 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="font-mono text-[10px] tracking-widest uppercase text-haq-gold mb-2">
            Xem chi tiết
          </div>
          <p className="text-white/90 text-sm leading-[1.6] line-clamp-3">{product.description}</p>
        </div>
      </div>

      <div className="p-6 flex items-center justify-between gap-4">
        <div>
          <div className="font-heading font-extrabold text-xl text-haq-ink tracking-tight">{product.name}</div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-haq-ink/50 mt-1">{product.en_name || product.en}</div>
        </div>
        <span className="font-mono text-xs text-haq-orange inline-flex items-center gap-2">
          Chi tiết <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </button>
  )
}

function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product.variants?.[0]?.size)
  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.size === selectedSize) || product.variants?.[0] || {},
    [product, selectedSize],
  )
  const [imageKey, setImageKey] = useState(selectedVariant.img)

  useEffect(() => {
    setSelectedSize(product.variants?.[0]?.size)
  }, [product])

  useEffect(() => {
    setImageKey(selectedVariant.img)
  }, [selectedVariant.img])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6">
      <button type="button" className="absolute inset-0 bg-haq-ink/65 backdrop-blur-sm" onClick={onClose} aria-label="Đóng chi tiết sản phẩm" />
      <div className="relative z-[81] w-full max-w-5xl max-h-[92vh] overflow-auto bg-white shadow-2xl border border-black/10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative bg-haq-bone/50 p-6 md:p-8">
            <button type="button" onClick={onClose} className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-haq-ink shadow-sm hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-haq-orange/30" aria-label="Đóng">
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-square overflow-hidden bg-white border border-black/10">
              <img 
                key={imageKey} 
                src={selectedVariant.img} 
                alt={`${product.name} ${selectedVariant.size}`} 
                className="product-fade-image w-full h-full object-cover" 
                onError={(e) => {
                  e.target.src = 'https://placehold.co/800x800/f3f2ef/1e1e1e?text=No+Image'
                }}
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-haq-red text-white font-mono text-[10px] tracking-widest uppercase px-3 py-1">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {product.highlights?.map((item, index) => (
                <span key={index} className="px-4 py-2 bg-white border border-black/10 text-sm text-haq-ink/80">{item}</span>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-haq-orange">Chi tiết sản phẩm</div>
            <h3 className="mt-4 font-heading font-extrabold text-3xl md:text-4xl tracking-[-0.02em] text-haq-ink">{product.name}</h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-haq-ink/50">{product.en_name || product.en}</p>
            <p className="mt-5 text-haq-ink/70 leading-[1.75] whitespace-pre-wrap">{product.description}</p>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-red">Chọn size / quy cách</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.variants.map((variant) => {
                    const active = variant.size === selectedSize
                    return (
                      <button
                        key={variant.size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(variant.size)
                          setImageKey(variant.img)
                        }}
                        className={`min-h-[44px] px-4 py-2 border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-haq-orange/30 ${active ? 'bg-haq-ink text-white border-haq-ink' : 'bg-white text-haq-ink/70 border-black/10 hover:border-haq-ink/30 hover:bg-haq-bone/60'}`}
                      >
                        {variant.size}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-4 border-t border-black/10 pt-6">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-haq-ink/55">Quy cách</span>
                <span className="font-heading font-bold text-haq-ink text-right">{selectedVariant.pack || '-'}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-haq-ink/55">Hạn sử dụng</span>
                <span className="font-heading font-bold text-haq-ink text-right">{selectedVariant.shelf || '-'}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-haq-ink/55">MOQ</span>
                <span className="font-heading font-bold text-haq-orange text-right">{selectedVariant.moq || '-'}</span>
              </div>
            </div>

            <div className="mt-8 border border-black/10 bg-haq-bone/50 p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-ink/50">Ghi chú</div>
              <p className="mt-3 text-sm leading-[1.75] text-haq-ink/70">
                Sản phẩm có thể được gia công tùy chỉnh (OEM/ODM) hoặc thay đổi quy cách đóng gói theo yêu cầu của đối tác. Vui lòng liên hệ để nhận báo giá sỉ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const ref = useReveal()
  const [activeProduct, setActiveProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProducts()
        if (data && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(STATIC_PRODUCTS) // Fallback nếu DB trống
        }
      } catch (err) {
        console.error("Lỗi fetch products:", err)
        setProducts(STATIC_PRODUCTS) // Fallback nếu lỗi kết nối
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <>
      <section id="products" className="bg-haq-bone py-24 md:py-32">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <div ref={ref} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-haq-orange" />
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-orange">Sản Phẩm Trưng Bày</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-[-0.02em] text-haq-ink leading-[1.05]">
                sản phẩm Trưng Bày —
                <br />
                chất lượng trưng bày, không giá lẻ.
              </h2>
            </div>
            <p className="text-base text-haq-ink/60 max-w-sm leading-[1.6]">
              Bấm vào từng sản phẩm hoặc nút xem chi tiết để mở modal giới thiệu, chọn size và xem ảnh theo quy cách.
            </p>
          </div>

          {isLoading ? (
            <div className="h-48 flex items-center justify-center text-haq-ink/50">
              Đang tải danh sách sản phẩm...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.slug || product.name} product={product} onOpen={setActiveProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />}
    </>
  )
}
