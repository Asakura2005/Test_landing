import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ChevronRight, Phone, Mail, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Điều Khoản Sử Dụng | HAQ FOOD'
  }, [])

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink flex flex-col selection:bg-haq-red selection:text-white font-sans">
      <StickyNav />

      {/* Hero Header */}
      <section className="pt-24 sm:pt-28 pb-10 bg-white border-b border-haq-border relative">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-haq-text-secondary uppercase mb-6">
            <Link to="/" className="hover:text-haq-red transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3 h-3 text-haq-border" />
            <span>Pháp lý & Chính sách</span>
            <ChevronRight className="w-3 h-3 text-haq-border" />
            <span className="text-haq-red font-bold">Điều khoản sử dụng</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-haq-soft rounded-full text-haq-red text-xs font-mono font-bold tracking-wider uppercase mb-4 border border-haq-border">
              <Scale className="w-3.5 h-3.5" />
              <span>ĐIỀU KHOẢN PHÁP LÝ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-haq-ink uppercase leading-tight">
              ĐIỀU KHOẢN SỬ DỤNG | HAQ FOOD
            </h1>
            <p className="mt-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed">
              Các điều khoản và quy định điều chỉnh quyền và nghĩa vụ của người dùng khi truy cập và sử dụng dịch vụ thông tin trên website chính thức của CÔNG TY CỔ PHẦN HAQ HÀ NỘI.
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
                  MỤC LỤC ĐIỀU KHOẢN
                </div>
                <nav className="space-y-2 text-xs font-heading font-bold text-haq-ink/80">
                  <a href="#section-1" className="block py-1 hover:text-haq-red transition-colors">01 — Phạm vi và chấp thuận</a>
                  <a href="#section-2" className="block py-1 hover:text-haq-red transition-colors">02 — Quyền sử dụng website</a>
                  <a href="#section-3" className="block py-1 hover:text-haq-red transition-colors">03 — Nội dung website</a>
                  <a href="#section-4" className="block py-1 hover:text-haq-red transition-colors">04 — Thông tin sản phẩm</a>
                  <a href="#section-5" className="block py-1 hover:text-haq-red transition-colors">05 — Quyền sở hữu trí tuệ</a>
                  <a href="#section-6" className="block py-1 hover:text-haq-red transition-colors">06 — Liên kết bên thứ ba</a>
                  <a href="#section-7" className="block py-1 hover:text-haq-red transition-colors">07 — Giới hạn trách nhiệm</a>
                  <a href="#section-8" className="block py-1 hover:text-haq-red transition-colors">08 — Thay đổi điều khoản</a>
                  <a href="#section-9" className="block py-1 hover:text-haq-red transition-colors">09 — Thông tin liên hệ</a>
                </nav>
                
                <div className="pt-4 border-t border-haq-border">
                  <div className="p-4 bg-haq-cream rounded-2xl border border-haq-border">
                    <span className="text-[11px] font-heading font-bold text-haq-ink block mb-1">Cần tư vấn hợp đồng?</span>
                    <p className="text-[11px] text-haq-text-secondary mb-3">Liên hệ ngay ban Thư ký & Hợp tác doanh nghiệp.</p>
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
                  <span>Phạm Vi Và Chấp Thuận</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Bằng việc truy cập, tham khảo tài liệu, duyệt xem sản phẩm hoặc gửi yêu cầu liên hệ qua website haq.com.vn, bạn xác nhận rằng mình đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng website.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 02 */}
              <section id="section-2" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">02.</span>
                  <span>Quyền Sử Dụng Website</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <p>Người dùng được phép truy cập và sử dụng website cho các mục đích thương mại hợp pháp. Nghiêm cấm mọi hành vi:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Can thiệp, phá hoại hệ thống mã nguồn hoặc cơ sở dữ liệu của website.</li>
                    <li>Sử dụng các công cụ tự động (bot, crawler) để thu thập dữ liệu bất hợp pháp nhằm mục đích cạnh tranh không lành mạnh.</li>
                    <li>Mạo danh pháp nhân HAQ FOOD hoặc các đại diện kinh doanh để thực hiện hành vi lừa đảo.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 03 */}
              <section id="section-3" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">03.</span>
                  <span>Nội Dung Website</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Toàn bộ nội dung, hình ảnh bao bì, thông tin năng lực nhà máy và bài viết trên website được HAQ FOOD biên soạn và cập nhật liên tục. Chúng tôi nỗ lực tối đa để đảm bảo tính chuẩn xác và cập nhật của thông tin, tuy nhiên một số thông số kỹ thuật hoặc bao bì có thể được điều chỉnh theo cải tiến quy cách đóng gói thực tế.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 04 */}
              <section id="section-4" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">04.</span>
                  <span>Thông Tin Sản Phẩm & Báo Giá</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Hình ảnh và thông số hiển thị trên website mang tính chất giới thiệu danh mục sản phẩm chính thức của HAQ FOOD. Đơn giá, chính sách chiết khấu đại lý và số lượng tối thiểu cho đơn hàng OEM/ODM sẽ được xác nhận thông qua báo giá chính thức có dấu đỏ và hợp đồng kinh tế giữa hai bên.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 05 */}
              <section id="section-5" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">05.</span>
                  <span>Quyền Sở Hữu Trí Tuệ</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Thương hiệu <strong>HAQ FOOD</strong>, nhãn hiệu bao bì sản phẩm <strong>HOKI</strong>, logo, biểu tượng, hình ảnh chụp thực tế nhà máy và toàn bộ mã nguồn website đều thuộc quyền sở hữu trí tuệ độc quyền của <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> và được bảo hộ bởi Luật Sở hữu trí tuệ Việt Nam. Nghiêm cấm mọi hành vi sao chép, phân phối lại mà không có văn bản chấp thuận trước.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 06 */}
              <section id="section-6" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">06.</span>
                  <span>Liên Kết Bên Thứ Ba</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Website có thể chứa các đường link dẫn tới cổng thông tin của bên thứ ba (như Cổng tra cứu thông tin doanh nghiệp VNTax, kênh mạng xã hội, các chuỗi siêu thị đối tác). HAQ FOOD không chịu trách nhiệm về nội dung hoặc chính sách bảo mật của các trang web bên thứ ba này.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 07 */}
              <section id="section-7" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">07.</span>
                  <span>Giới Hạn Trách Nhiệm</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Trong phạm vi pháp luật cho phép, HAQ FOOD không chịu trách nhiệm đối với các thiệt hại gián tiếp, bất khả kháng do sự cố đường truyền internet hoặc các yếu tố nằm ngoài tầm kiểm soát kỹ thuật của chúng tôi.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 08 */}
              <section id="section-8" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">08.</span>
                  <span>Thay Đổi Điều Khoản</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  HAQ FOOD bảo lưu quyền sửa đổi, bổ sung các điều khoản sử dụng này tại bất kỳ thời điểm nào nhằm phù hợp với quy định pháp luật và định hướng vận hành doanh nghiệp. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải công khai trên website.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 09 */}
              <section id="section-9" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">09.</span>
                  <span>Thông Tin Liên Hệ Pháp Lý</span>
                </h2>
                <div className="p-4 bg-haq-cream rounded-2xl border border-haq-border text-xs sm:text-sm space-y-2">
                  <p><strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong></p>
                  <p><strong>Địa chỉ:</strong> Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam</p>
                  <p><strong>Hotline:</strong> 024 23 23 56 56 | <strong>Zalo OA:</strong> <a href="https://zalo.me/1361851474644984696" target="_blank" rel="noopener noreferrer" className="text-[#0068FF] hover:underline font-semibold">HAQ Hà Nội</a> (0993 308 319)</p>
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
