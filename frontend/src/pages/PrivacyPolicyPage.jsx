import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Lock, ChevronRight, Phone, Mail, ShieldCheck, UserCheck, Eye, Database } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Chính Sách Bảo Mật | HAQ FOOD'
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
            <span className="text-haq-red font-bold">Chính sách bảo mật</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-haq-soft rounded-full text-haq-red text-xs font-mono font-bold tracking-wider uppercase mb-4 border border-haq-border">
              <Lock className="w-3.5 h-3.5" />
              <span>BẢO MẬT & QUYỀN RIÊNG TƯ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-haq-ink uppercase leading-tight">
              CHÍNH SÁCH BẢO MẬT | HAQ FOOD
            </h1>
            <p className="mt-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed">
              CÔNG TY CỔ PHẦN HAQ HÀ NỘI cam kết bảo vệ tuyệt đối sự riêng tư và an toàn thông tin của khách hàng, đối tác và người truy cập website haq.com.vn theo quy định của pháp luật Việt Nam.
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
                  MỤC LỤC BẢO MẬT
                </div>
                <nav className="space-y-2 text-xs font-heading font-bold text-haq-ink/80">
                  <a href="#section-1" className="block py-1 hover:text-haq-red transition-colors">01 — Phạm vi áp dụng</a>
                  <a href="#section-2" className="block py-1 hover:text-haq-red transition-colors">02 — Thông tin được thu thập</a>
                  <a href="#section-3" className="block py-1 hover:text-haq-red transition-colors">03 — Mục đích sử dụng thông tin</a>
                  <a href="#section-4" className="block py-1 hover:text-haq-red transition-colors">04 — Bảo vệ thông tin cá nhân</a>
                  <a href="#section-5" className="block py-1 hover:text-haq-red transition-colors">05 — Chia sẻ thông tin</a>
                  <a href="#section-6" className="block py-1 hover:text-haq-red transition-colors">06 — Cookie & Công nghệ theo dõi</a>
                  <a href="#section-7" className="block py-1 hover:text-haq-red transition-colors">07 — Quyền của người dùng</a>
                  <a href="#section-8" className="block py-1 hover:text-haq-red transition-colors">08 — Thời gian lưu trữ</a>
                  <a href="#section-9" className="block py-1 hover:text-haq-red transition-colors">09 — Liên hệ về quyền riêng tư</a>
                </nav>
                
                <div className="pt-4 border-t border-haq-border">
                  <div className="p-4 bg-haq-cream rounded-2xl border border-haq-border">
                    <span className="text-[11px] font-heading font-bold text-haq-ink block mb-1">Ban Pháp chế & Bảo mật</span>
                    <p className="text-[11px] text-haq-text-secondary mb-3">Mọi yêu cầu truy xuất hoặc xóa thông tin vui lòng gửi về email chính thức.</p>
                    <a href="mailto:info@haq.com.vn" className="inline-flex items-center gap-1.5 text-xs font-bold text-haq-red hover:underline">
                      <Mail className="w-3.5 h-3.5" />
                      <span>info@haq.com.vn</span>
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
                  Chính sách bảo mật này mô tả cách <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> (sau đây gọi là "HAQ FOOD") thu thập, lưu trữ, xử lý và bảo vệ thông tin cá nhân và dữ liệu doanh nghiệp phát sinh khi người dùng truy cập website, liên hệ hợp tác B2B hoặc gửi biểu mẫu báo giá.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 02 */}
              <section id="section-2" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">02.</span>
                  <span>Thông Tin Được Thu Thập</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <p>Chúng tôi chỉ thu thập các thông tin cần thiết phục vụ cho việc liên hệ và giao dịch thương mại:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Thông tin liên hệ:</strong> Họ tên người đại diện, chức vụ, tên công ty/đại lý, số điện thoại, địa chỉ email, địa chỉ doanh nghiệp.</li>
                    <li><strong>Thông tin nhu cầu B2B:</strong> Nhóm sản phẩm quan tâm, số lượng dự kiến, thị trường phân phối mục tiêu, yêu cầu OEM/ODM riêng biệt.</li>
                    <li><strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, thời gian truy cập nhằm phục vụ tối ưu hóa trải nghiệm website.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 03 */}
              <section id="section-3" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">03.</span>
                  <span>Mục Đích Sử Dụng Thông Tin</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Liên hệ tư vấn bảng giá, cung cấp catalog sản phẩm và điều phối phòng ban phụ trách xử lý yêu cầu hợp tác.</li>
                    <li>Giao nhận hợp đồng, hóa đơn và điều phối logistic đơn hàng.</li>
                    <li>Gửi thông báo về các chương trình ưu đãi, chính sách đại lý mới (chỉ gửi khi có sự đồng ý của khách hàng).</li>
                    <li>Nâng cao chất lượng bảo mật và chống các hành vi gian lận trực tuyến.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 04 */}
              <section id="section-4" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">04.</span>
                  <span>Bảo Vệ Thông Tin Cá Nhân</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  HAQ FOOD áp dụng các biện pháp kỹ thuật số và quy trình an ninh nghiêm ngặt nhằm bảo vệ dữ liệu người dùng khỏi sự truy cập trái phép, mất mát hoặc tiết lộ bất hợp pháp. Dữ liệu được mã hóa đường truyền bằng chứng chỉ SSL/TLS tiêu chuẩn cao.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 05 */}
              <section id="section-5" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">05.</span>
                  <span>Chia Sẻ Thông Tin Với Bên Thứ Ba</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  HAQ FOOD <strong>cam kết không bán, trao đổi hoặc thương mại hóa</strong> thông tin của khách hàng cho bất kỳ bên thứ ba nào. Thông tin chỉ được chia sẻ trong phạm vi cần thiết cho đối tác vận chuyển giao hàng hoặc theo yêu cầu bằng văn bản của cơ quan pháp luật có thẩm quyền.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 06 */}
              <section id="section-6" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">06.</span>
                  <span>Cookie & Công Nghệ Theo Dõi</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Website sử dụng cookie tiêu chuẩn nhằm ghi nhớ tùy chọn hiển thị và phân tích lưu lượng truy cập ẩn danh. Người dùng có toàn quyền tắt hoặc xóa cookie trong phần cài đặt trình duyệt web của mình.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 07 */}
              <section id="section-7" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">07.</span>
                  <span>Quyền Của Người Dùng Đối Với Dữ Liệu</span>
                </h2>
                <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                  <p>Người dùng có các quyền hợp pháp sau đối với dữ liệu của mình:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Yêu cầu kiểm tra, cập nhật hoặc điều chỉnh thông tin liên hệ đã cung cấp.</li>
                    <li>Yêu cầu ngừng tiếp nhận thông tin tiếp thị hoặc xóa bỏ hoàn toàn dữ liệu cá nhân khỏi hệ thống.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-haq-border" />

              {/* Section 08 */}
              <section id="section-8" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">08.</span>
                  <span>Thời Gian Lưu Trữ Thông Tin</span>
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  Thông tin thu thập sẽ được lưu trữ an toàn trong suốt thời gian thực hiện giao dịch hoặc duy trì quan hệ đối tác kinh doanh với HAQ FOOD, hoặc cho đến khi khách hàng có yêu cầu hủy bỏ theo quy định.
                </p>
              </section>

              <hr className="border-haq-border" />

              {/* Section 09 */}
              <section id="section-9" className="space-y-3">
                <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase flex items-center gap-2">
                  <span className="text-haq-red font-mono">09.</span>
                  <span>Liên Hệ Về Quyền Riêng Tư</span>
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
