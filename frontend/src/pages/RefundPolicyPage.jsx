import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, ChevronRight, Phone, Mail, FileText, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

export default function RefundPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Chính Sách Đổi Trả & Hoàn Tiền | HAQ FOOD'
  }, [])

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink flex flex-col selection:bg-haq-red selection:text-white font-sans">
      <StickyNav />

      {/* Hero Header */}
      <section className="pt-28 sm:pt-36 pb-12 bg-white border-b border-haq-border relative">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-haq-text-secondary uppercase mb-6">
            <Link to="/" className="hover:text-haq-red transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3 h-3 text-haq-border" />
            <span>Pháp lý & Chính sách</span>
            <ChevronRight className="w-3 h-3 text-haq-border" />
            <span className="text-haq-red font-bold">Đổi trả & Hoàn tiền</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-haq-soft rounded-full text-haq-red text-xs font-mono font-bold tracking-wider uppercase mb-4 border border-haq-border">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>CHÍNH SÁCH CHÍNH THỨC</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-haq-ink uppercase leading-tight">
              CHÍNH SÁCH ĐỔI TRẢ & HOÀN TIỀN | HAQ FOOD
            </h1>
            <p className="mt-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed">
              CÔNG TY CỔ PHẦN HAQ HÀ NỘI cam kết cung cấp các sản phẩm thực phẩm đạt chuẩn an toàn vệ sinh và chất lượng cao nhất. Dưới đây là các nguyên tắc và quy trình tiếp nhận giải quyết đổi trả và hoàn tiền dành cho đối tác, nhà phân phối và khách hàng.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Nav Table of Contents (Sticky on desktop) */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 bg-white rounded-3xl p-6 border border-haq-border shadow-xs space-y-4">
                <div className="text-xs font-mono font-bold text-haq-text-secondary uppercase tracking-widest border-b border-haq-border pb-3">
                  MỤC LỤC CHÍNH SÁCH
                </div>
                <nav className="space-y-2 text-xs font-heading font-bold text-haq-ink/80">
                  <a href="#section-1" className="block py-1 hover:text-haq-red transition-colors">01 — Phạm vi áp dụng</a>
                  <a href="#section-2" className="block py-1 hover:text-haq-red transition-colors">02 — Điều kiện đổi trả</a>
                  <a href="#section-3" className="block py-1 hover:text-haq-red transition-colors">03 — Các trường hợp được đổi trả</a>
                  <a href="#section-4" className="block py-1 hover:text-haq-red transition-colors">04 — Các trường hợp không áp dụng</a>
                  <a href="#section-5" className="block py-1 hover:text-haq-red transition-colors">05 — Quy trình yêu cầu đổi trả</a>
                  <a href="#section-6" className="block py-1 hover:text-haq-red transition-colors">06 — Thời gian xử lý</a>
                  <a href="#section-7" className="block py-1 hover:text-haq-red transition-colors">07 — Phương thức hoàn tiền</a>
                  <a href="#section-8" className="block py-1 hover:text-haq-red transition-colors">08 — Chi phí liên quan</a>
                  <a href="#section-9" className="block py-1 hover:text-haq-red transition-colors">09 — Thông tin liên hệ</a>
                </nav>
                
                <div className="pt-4 border-t border-haq-border">
                  <div className="p-4 bg-haq-cream rounded-2xl border border-haq-border">
                    <span className="text-[11px] font-heading font-bold text-haq-ink block mb-1">Cần hỗ trợ trực tiếp?</span>
                    <p className="text-[11px] text-haq-text-secondary mb-3">Bộ phận Chăm sóc khách hàng & Pháp chế luôn sẵn sàng hỗ trợ bạn.</p>
                    <a href="tel:02423235656" className="inline-flex items-center gap-1.5 text-xs font-bold text-haq-red hover:underline">
                      <Phone className="w-3.5 h-3.5" />
                      <span>024 23 23 56 56</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Main Text Content */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-haq-border shadow-xs space-y-10">
              
              {/* Section 01 */}
              <section id="section-1" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">01.</span>
                  <span>Phạm Vi Áp Dụng</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Chính sách này áp dụng cho toàn bộ các sản phẩm thực phẩm đóng gói do <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> trực tiếp sản xuất, gia công hoặc phân phối thông qua các kênh bán hàng chính thức (kênh phân phối đại lý, chuỗi siêu thị, kênh thương mại điện tử và đơn hàng B2B/OEM).
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 02 */}
              <section id="section-2" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">02.</span>
                  <span>Điều Kiện Đổi Trả</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <p>Sản phẩm được tiếp nhận kiểm tra và giải quyết đổi trả khi đáp ứng các điều kiện sau:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Sản phẩm còn nguyên bao bì niêm phong, tem nhãn của nhà sản xuất (ngoại trừ trường hợp phát hiện lỗi chất lượng bên trong khi bóc dùng theo quy định).</li>
                    <li>Khách hàng cung cấp được chứng từ mua hàng hợp lệ (Hóa đơn GTGT, Phiếu giao hàng, Biên bản bàn giao hoặc Mã đơn hàng đối chiếu).</li>
                    <li>Có hình ảnh/video bằng chứng rõ ràng ghi nhận hiện trạng sản phẩm tại thời điểm nhận hàng hoặc phát hiện lỗi.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 03 */}
              <section id="section-3" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">03.</span>
                  <span>Các Trường Hợp Được Đổi Trả</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Lỗi do nhà sản xuất:</strong> Sản phẩm biến chất, có dị vật, hư hỏng dù bao bì còn nguyên hạn sử dụng và được bảo quản đúng hướng dẫn.</li>
                    <li><strong>Hư hỏng do vận chuyển:</strong> Bao bì rách, móp méo nghiêm trọng làm hở khí hoặc ảnh hưởng đến chất lượng sản phẩm khi giao nhận.</li>
                    <li><strong>Giao sai chủng loại, số lượng:</strong> Sản phẩm thực nhận không khớp với thông tin đơn đặt hàng đã xác nhận giữa hai bên.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 04 */}
              <section id="section-4" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">04.</span>
                  <span>Các Trường Hợp Không Áp Dụng</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Sản phẩm đã quá hạn sử dụng hoặc bị hư hỏng do điều kiện bảo quản không đúng quy định (để nơi ẩm ướt, nhiệt độ cao, tiếp xúc trực tiếp với ánh nắng mặt trời).</li>
                    <li>Sản phẩm đã bị can thiệp, làm rách tem niêm phong hoặc không xác định được nguồn gốc xuất xứ từ HAQ FOOD.</li>
                    <li>Khách hàng thay đổi nhu cầu cá nhân mà không xuất phát từ lỗi sản phẩm hoặc thỏa thuận hợp đồng trước đó.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 05 */}
              <section id="section-5" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">05.</span>
                  <span>Quy Trình Yêu Cầu Đổi Trả</span>
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  <li><strong>Bước 1:</strong> Khách hàng liên hệ hotline <code>024 23 23 56 56</code> hoặc gửi email đến <code>info@haq.com.vn</code> kèm mã đơn hàng và hình ảnh chụp chi tiết lỗi.</li>
                  <li><strong>Bước 2:</strong> Bộ phận Kiểm soát chất lượng (QC) và Chăm sóc khách hàng tiếp nhận, đối chiếu hồ sơ và phản hồi trong thời gian sớm nhất.</li>
                  <li><strong>Bước 3:</strong> Hai bên thống nhất phương án thu hồi hàng lỗi và gửi sản phẩm thay thế hoặc hoàn tiền theo quy định.</li>
                </ol>
              </section>

              <hr className="border-haq-border" />

              {/* Section 06 */}
              <section id="section-6" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">06.</span>
                  <span>Thời Gian Xử Lý</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Ngay sau khi nhận được đầy đủ thông tin khiếu nại và mẫu sản phẩm đối chứng, HAQ FOOD sẽ tiến hành kiểm định và phản hồi kết quả xử lý chính thức cho khách hàng theo đúng quy trình nghiệp vụ đã thỏa thuận trong hợp đồng thương mại.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 07 */}
              <section id="section-7" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">07.</span>
                  <span>Phương Thức Hoàn Tiền</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <p>Trong trường hợp hai bên thống nhất hoàn tiền thay vì đổi sản phẩm mới:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Hoàn tiền thông qua hình thức chuyển khoản ngân hàng trực tiếp vào tài khoản chính chủ của khách hàng/đối tác.</li>
                    <li>Cấn trừ công nợ vào các kỳ thanh toán tiếp theo (áp dụng cho đối tác phân phối B2B và đại lý).</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 08 */}
              <section id="section-8" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">08.</span>
                  <span>Chi Phí Liên Quan</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Trường hợp đổi trả phát sinh do lỗi từ nhà sản xuất hoặc quá trình vận chuyển của HAQ FOOD, toàn bộ chi phí vận chuyển thu hồi và gửi hàng mới sẽ do HAQ FOOD chi trả.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 09 */}
              <section id="section-9" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">09.</span>
                  <span>Thông Tin Liên Hệ Tiếp Nhận</span>
                </h2>
                <div className="p-4 bg-haq-cream rounded-2xl border border-haq-border text-xs sm:text-sm space-y-2">
                  <p><strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong></p>
                  <p><strong>Địa chỉ:</strong> Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam</p>
                  <p><strong>Hotline:</strong> 024 23 23 56 56 | <strong>Zalo:</strong> 0993 308 319</p>
                  <p><strong>Email tiếp nhận:</strong> info@haq.com.vn</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <FloatingContactBar />
      <Footer />
    </div>
  )
}
