import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug, getProducts } from '../services/supabase'
import { useAnalytics } from '../hooks/useAnalytics'
import { CheckCircle, Package, Calendar, Truck, ArrowRight, Home, ChevronRight, MapPin } from 'lucide-react'
import Footer from '../components/Footer'
import StickyNav from '../components/StickyNav'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedProduct, getLocalizedProvince, getLocalizedCategory } from '../utils/i18nData'
import { PRODUCT_IMAGE_MAP } from '../data/productCategories'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const { trackProductView, trackContactClick } = useAnalytics()
  const [product, setProduct] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState('')
  
  // For zoom effect
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%')
  const [isZooming, setIsZooming] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const data = await getProductBySlug(slug)
        setProduct(data)
        if (data) {
          trackProductView(data)
        }
        
        // Set default active image from images array, variant img or local asset map
        const localFallback = PRODUCT_IMAGE_MAP[data.slug]
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0])
        } else if (data.variants && data.variants.length > 0 && data.variants[0].img) {
          setActiveImage(data.variants[0].img)
        } else if (localFallback) {
          setActiveImage(localFallback)
        }

        // Ưu tiên sản phẩm cùng danh mục; nếu chưa đủ, bổ sung sản phẩm khác
        // để khu "Sản phẩm tương tự" luôn hữu ích ở cuối trang.
        const allProds = await getProducts()
        const otherProducts = allProds.filter(p => p.id !== data.id)
        const sameCategory = otherProducts.filter(p => p.category_id === data.category_id)
        const fallbackProducts = otherProducts.filter(p => p.category_id !== data.category_id)
        setRecommended([...sameCategory, ...fallbackProducts].slice(0, 4))
      } catch (err) {
        console.error("Lỗi fetch chi tiết sản phẩm:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  const handleMouseMove = (e) => {
    if (!imageRef.current) return
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setBackgroundPosition(`${x}% ${y}%`)
  }

  const localizedProduct = useMemo(() => {
    return product ? getLocalizedProduct(product, language) : null
  }, [product, language])

  const localizedCategory = useMemo(() => {
    return localizedProduct?.categories ? getLocalizedCategory(localizedProduct.categories, language) : null
  }, [localizedProduct, language])

  const localizedProvince = useMemo(() => {
    return localizedProduct?.provinces ? getLocalizedProvince(localizedProduct.provinces, language) : null
  }, [localizedProduct, language])

  const localizedRecommended = useMemo(() => {
    return recommended.map(p => getLocalizedProduct(p, language))
  }, [recommended, language])

  if (!product || !localizedProduct) {
    return (
      <main className="min-h-screen bg-haq-cream">
        <StickyNav />
        <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-heading font-extrabold text-haq-green-dark mb-4">
            {t('product_detail.not_found_title', 'Sản phẩm không tồn tại')}
          </h1>
          <p className="mb-8 text-haq-text-secondary">
            {t('product_detail.not_found_desc', 'Có thể sản phẩm đã bị xóa hoặc đường dẫn không chính xác.')}
          </p>
          <Link to="/" className="px-7 py-3.5 bg-[#16A34A] hover:bg-[#13863d] text-white font-heading font-bold rounded-full transition-colors">
            {t('product_detail.back_home', 'Về trang chủ')}
          </Link>
        </div>
      </main>
    )
  }

  // Fallback if the product only has images in variants or local asset map
  const rawGallery = localizedProduct.images?.length > 0 
    ? localizedProduct.images 
    : (localizedProduct.variants?.map(v => v.img).filter(Boolean) || [])
  const galleryImages = rawGallery.length > 0 
    ? rawGallery 
    : (PRODUCT_IMAGE_MAP[localizedProduct.slug] ? [PRODUCT_IMAGE_MAP[localizedProduct.slug]] : [])

  return (
    <div className="min-h-screen bg-haq-cream pt-24 text-haq-ink font-sans selection:bg-haq-green selection:text-white">
      <StickyNav />
      {/* Breadcrumbs */}
      <div className="bg-white/90 border-b border-haq-border">
        <div className="max-w-site mx-auto px-6 md:px-12 py-3.5 flex items-center gap-2 text-xs sm:text-sm text-haq-text-secondary">
          <Link to="/" className="hover:text-haq-green-dark flex items-center gap-1">
            <Home className="w-4 h-4"/> {t('product_detail.breadcrumb_home', 'Trang chủ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-haq-border" />
          <Link to="/san-pham" className="hover:text-haq-green-dark">
            {t('product_detail.breadcrumb_products', 'Sản phẩm')}
          </Link>
          {localizedCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-haq-border" />
              <span className="text-haq-ink font-medium">{localizedCategory.name}</span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-haq-border" />
          <span className="text-haq-green-dark font-bold truncate">{localizedProduct.name}</span>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="bg-white rounded-3xl border border-haq-border shadow-xl overflow-hidden flex flex-col lg:flex-row mb-16">
          
          {/* Cột Trái: Ảnh */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-haq-border">
            {/* Main Image with Zoom */}
            <div 
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-haq-sage/20 border border-haq-border cursor-crosshair shadow-inner"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              ref={imageRef}
            >
              {localizedProduct.tag && (
                <div className="absolute top-4 left-4 z-20 bg-[#C89B3C] text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  {localizedProduct.tag}
                </div>
              )}
              
              {activeImage ? (
                <>
                  {/* Normal Image */}
                  <img 
                    src={activeImage} 
                    alt={localizedProduct.name} 
                    className={`w-full h-full object-contain p-8 transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
                  />
                  {/* Zoom Image Overlay */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isZooming ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: backgroundPosition,
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#fff'
                    }}
                  ></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-haq-text-secondary/40 italic">
                  {language === 'en' ? 'No image available' : language === 'ko' ? '사용 가능한 이미지가 없습니다' : 'Chưa có hình ảnh'}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2 custom-scrollbar">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-colors bg-white cursor-pointer ${
                      activeImage === img ? 'border-[#16A34A] shadow-xs' : 'border-haq-border hover:border-[#16A34A]/50'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cột Phải: Thông tin */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 lg:px-16 py-10 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {localizedCategory && (
                  <span className="text-xs font-heading font-bold text-[#16A34A] uppercase tracking-wider block">{localizedCategory.name}</span>
                )}
                {localizedProvince && (
                  <Link 
                    to="/#vietnam-specialty-map" 
                    className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {language === 'en'
                      ? `Specialty of ${localizedProvince.name} (${localizedProvince.region})`
                      : language === 'ko'
                      ? `${localizedProvince.name} 특산품 (${localizedProvince.region})`
                      : `Đặc sản ${localizedProvince.name} (${localizedProvince.region})`}
                  </Link>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-haq-ink leading-tight mb-2 uppercase">
                {localizedProduct.name}
              </h1>
              {language === 'vi' ? (
                localizedProduct.en_name && (
                  <p className="text-haq-text-secondary text-sm font-heading font-normal">{localizedProduct.en_name}</p>
                )
              ) : (
                product.name && product.name !== localizedProduct.name && (
                  <p className="text-haq-text-secondary text-sm font-heading font-normal italic">{product.name}</p>
                )
              )}
            </div>

            {/* Province Origin Story Box */}
            {localizedProvince && (localizedProvince.short_description || localizedProvince.description) && (
              <div className="mb-6 p-4 rounded-2xl bg-[#F7F5F0] border border-[#E7E3D8] text-xs leading-relaxed">
                <div className="flex items-center justify-between font-bold text-haq-ink uppercase mb-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                    {t('product_detail.origin_title', 'Nguồn gốc vùng nguyên liệu:')} {localizedProvince.name}
                  </span>
                  <Link to="/#vietnam-specialty-map" className="text-[10px] text-[#16A34A] hover:underline font-semibold">
                    {t('product_detail.view_map', 'Xem bản đồ →')}
                  </Link>
                </div>
                <p className="text-haq-text-secondary italic">
                  "{localizedProvince.short_description || localizedProvince.description}"
                </p>
              </div>
            )}

            <div className="prose prose-base text-haq-text-secondary text-justify mb-8 leading-relaxed font-normal">
              {localizedProduct.description ? (
                <p>{localizedProduct.description}</p>
              ) : (
                <p>
                  {language === 'en'
                    ? 'An exquisite gift carrying traditional flavors, crafted from stringently selected ingredients.'
                    : language === 'ko'
                    ? '엄선된 재료로 정성을 다해 만든 전통의 풍미를 담은 최고의 선물입니다.'
                    : 'Món quà tuyệt hảo mang hương vị truyền thống, được chế biến từ những nguyên liệu chọn lọc khắt khe nhất.'}
                </p>
              )}
            </div>

            {localizedProduct.highlights && localizedProduct.highlights.length > 0 && localizedProduct.highlights[0] !== '' && (
              <div className="mb-8 bg-haq-sage p-5 rounded-2xl border border-haq-border">
                <h4 className="font-heading font-bold text-sm uppercase text-haq-ink mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span>{t('product_detail.highlights_title', 'Điểm nổi bật')}</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                  {localizedProduct.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-haq-text-secondary">
                      <span className="text-[#16A34A] mt-0.5 text-xs font-bold">✓</span> 
                      <span className="flex-1 font-medium">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-10">
              <h4 className="font-heading font-bold text-sm uppercase text-haq-ink mb-4">
                {t('product_detail.packaging_title', 'Quy cách đóng gói')}
              </h4>
              <div className="bg-white border border-haq-border rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm min-w-[400px]">
                    <thead className="bg-haq-sage/80 border-b border-haq-border">
                      <tr>
                        <th className="p-3.5 font-bold font-heading text-xs uppercase tracking-wider text-haq-ink whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-[#16A34A]"/>
                            {t('product_detail.weight', 'Trọng lượng')}
                          </div>
                        </th>
                        <th className="p-3.5 font-bold font-heading text-xs uppercase tracking-wider text-haq-ink whitespace-nowrap">
                          {t('product_detail.packaging', 'Quy cách')}
                        </th>
                        <th className="p-3.5 font-bold font-heading text-xs uppercase tracking-wider text-haq-ink whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#16A34A]"/>
                            {t('product_detail.shelf_life', 'HSD')}
                          </div>
                        </th>
                        <th className="p-3.5 font-bold font-heading text-xs uppercase tracking-wider text-haq-ink whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-[#16A34A]"/> MOQ
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-haq-border">
                      {localizedProduct.variants && localizedProduct.variants.length > 0 ? (
                        localizedProduct.variants.map((v, idx) => (
                          <tr key={idx} className="hover:bg-haq-sage/30 transition-colors">
                            <td className="p-3.5 font-bold text-[#16A34A] whitespace-nowrap">{v.size || '-'}</td>
                            <td className="p-3.5 text-haq-text-secondary whitespace-nowrap">{v.pack || '-'}</td>
                            <td className="p-3.5 text-haq-text-secondary whitespace-nowrap">{v.shelf || '-'}</td>
                            <td className="p-3.5 font-heading text-xs text-haq-text-secondary whitespace-nowrap">
                              {v.moq || t('product_detail.contact_moq', 'Liên hệ')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="p-4 text-center text-haq-text-secondary italic">
                            {t('product_detail.updating_info', 'Đang cập nhật thông tin')}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Link 
                to="/lien-he?type=oem"
                className="w-full md:w-auto bg-[#16A34A] hover:bg-[#13863d] text-white py-4 px-10 rounded-full font-heading font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-3 group"
              >
                <span>{t('product_detail.quote_btn', 'Nhận báo giá B2B & Đặt mẫu')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Cùng loại */}
        {localizedRecommended.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink mb-2 uppercase tracking-tight">
                {t('product_detail.similar_products', 'Sản phẩm tương tự')}
              </h3>
              <div className="w-12 h-1 bg-[#16A34A] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {localizedRecommended.map(p => (
                <Link to={`/san-pham/${p.slug || p.id}`} key={p.id} className="bg-white group overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 relative border border-haq-border hover:border-[#16A34A] flex flex-col h-full rounded-2xl">
                  {p.tag && (
                    <div className="absolute top-3 left-3 bg-[#C89B3C] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 z-10 rounded-full shadow-2xs">
                      {p.tag}
                    </div>
                  )}
                  
                  <div className="h-40 sm:h-48 md:h-56 w-full flex items-center justify-center p-4 bg-haq-sage/20 relative overflow-hidden border-b border-haq-border">
                    {(p.images?.[0] || p.variants?.[0]?.img) ? (
                      <img 
                        src={p.images?.[0] || p.variants?.[0]?.img} 
                        alt={p.name} 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="text-haq-text-secondary/30 text-xs text-center border border-dashed border-haq-border p-4 rounded w-full h-full flex items-center justify-center">
                        {language === 'en' ? 'No image' : language === 'ko' ? '이미지 없음' : 'Chưa có ảnh'}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col items-center justify-center flex-1 text-center bg-white">
                    <h3 className="font-heading font-bold text-haq-ink text-sm sm:text-base mb-1 uppercase leading-snug group-hover:text-[#16A34A] transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
