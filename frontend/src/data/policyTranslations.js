/**
 * HAQ FOOD — Legal & Policy Multilingual Data (VI / EN / KO)
 * Dữ liệu đa ngôn ngữ chuẩn mực pháp lý cho các trang:
 * 1. Đổi trả & Hoàn tiền (/chinh-sach-doi-tra-hoan-tien, /en/refund-policy, /ko/refund-policy)
 * 2. Chính sách Bảo mật (/chinh-sach-bao-mat, /en/privacy-policy, /ko/privacy-policy)
 * 3. Điều khoản Sử dụng (/dieu-khoan-su-dung, /en/terms-of-service, /ko/terms-of-service)
 */

export const POLICY_TRANSLATIONS = {
  // =========================================================================
  // 1. CHÍNH SÁCH ĐỔI TRẢ & HOÀN TIỀN
  // =========================================================================
  refund: {
    vi: {
      docTitle: 'Chính Sách Đổi Trả & Hoàn Tiền | HAQ FOOD',
      breadcrumbs: {
        home: 'Trang chủ',
        category: 'Pháp lý & Chính sách',
        current: 'Đổi trả & Hoàn tiền',
      },
      badge: 'CHÍNH SÁCH CHÍNH THỨC',
      title: 'CHÍNH SÁCH ĐỔI TRẢ & HOÀN TIỀN | HAQ FOOD',
      intro:
        'CÔNG TY CỔ PHẦN HAQ HÀ NỘI cam kết cung cấp các sản phẩm thực phẩm đạt chuẩn an toàn vệ sinh và chất lượng cao nhất. Dưới đây là các nguyên tắc và quy trình tiếp nhận giải quyết đổi trả và hoàn tiền dành cho đối tác, nhà phân phối và khách hàng.',
      tocTitle: 'MỤC LỤC CHÍNH SÁCH',
      supportBox: {
        title: 'Cần hỗ trợ trực tiếp?',
        desc: 'Bộ phận Chăm sóc khách hàng & Pháp chế luôn sẵn sàng hỗ trợ bạn.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
        addressLabel: 'Địa chỉ:',
        address: 'Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam',
        hotlineLabel: 'Hotline:',
        zaloLabel: 'Zalo OA:',
        zaloName: 'HAQ Hà Nội',
        zaloNote: '(0993 308 319)',
        emailLabel: 'Email tiếp nhận:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: 'Phạm Vi Áp Dụng',
          content: [
            {
              type: 'p',
              text: 'Chính sách này áp dụng cho toàn bộ các sản phẩm thực phẩm đóng gói do CÔNG TY CỔ PHẦN HAQ HÀ NỘI trực tiếp sản xuất, gia công hoặc phân phối thông qua các kênh bán hàng chính thức (kênh phân phối đại lý, chuỗi siêu thị, kênh thương mại điện tử và đơn hàng B2B/OEM).',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: 'Điều Kiện Đổi Trả',
          content: [
            {
              type: 'p',
              text: 'Sản phẩm được tiếp nhận kiểm tra và giải quyết đổi trả khi đáp ứng các điều kiện sau:',
            },
            {
              type: 'ul',
              items: [
                'Sản phẩm còn nguyên bao bì niêm phong, tem nhãn của nhà sản xuất (ngoại trừ trường hợp phát hiện lỗi chất lượng bên trong khi bóc dùng theo quy định).',
                'Khách hàng cung cấp được chứng từ mua hàng hợp lệ (Hóa đơn GTGT, Phiếu giao hàng, Biên bản bàn giao hoặc Mã đơn hàng đối chiếu).',
                'Có hình ảnh/video bằng chứng rõ ràng ghi nhận hiện trạng sản phẩm tại thời điểm nhận hàng hoặc phát hiện lỗi.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: 'Các Trường Hợp Được Đổi Trả',
          content: [
            {
              type: 'ul',
              items: [
                'Lỗi do nhà sản xuất: Sản phẩm biến chất, có dị vật, hư hỏng dù bao bì còn nguyên hạn sử dụng và được bảo quản đúng hướng dẫn.',
                'Hư hỏng do vận chuyển: Bao bì rách, móp méo nghiêm trọng làm hở khí hoặc ảnh hưởng đến chất lượng sản phẩm khi giao nhận.',
                'Giao sai chủng loại, số lượng: Sản phẩm thực nhận không khớp với thông tin đơn đặt hàng đã xác nhận giữa hai bên.',
              ],
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: 'Các Trường Hợp Không Áp Dụng',
          content: [
            {
              type: 'ul',
              items: [
                'Sản phẩm đã quá hạn sử dụng hoặc bị hư hỏng do điều kiện bảo quản không đúng quy định (để nơi ẩm ướt, nhiệt độ cao, tiếp xúc trực tiếp với ánh nắng mặt trời).',
                'Sản phẩm đã bị can thiệp, làm rách tem niêm phong hoặc không xác định được nguồn gốc xuất xứ từ HAQ FOOD.',
                'Khách hàng thay đổi nhu cầu cá nhân mà không xuất phát từ lỗi sản phẩm hoặc thỏa thuận hợp đồng trước đó.',
              ],
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: 'Quy Trình Yêu Cầu Đổi Trả',
          content: [
            {
              type: 'ol',
              items: [
                'Bước 1: Khách hàng liên hệ hotline 024 23 23 56 56 hoặc gửi email đến info@haq.com.vn kèm mã đơn hàng và hình ảnh chụp chi tiết lỗi.',
                'Bước 2: Bộ phận Kiểm soát chất lượng (QC) và Chăm sóc khách hàng tiếp nhận, đối chiếu hồ sơ và phản hồi trong thời gian sớm nhất.',
                'Bước 3: Hai bên thống nhất phương án thu hồi hàng lỗi và gửi sản phẩm thay thế hoặc hoàn tiền theo quy định.',
              ],
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: 'Thời Gian Xử Lý',
          content: [
            {
              type: 'p',
              text: 'Ngay sau khi nhận được đầy đủ thông tin khiếu nại và mẫu sản phẩm đối chứng, HAQ FOOD sẽ tiến hành kiểm định và phản hồi kết quả xử lý chính thức cho khách hàng theo đúng quy trình nghiệp vụ đã thỏa thuận trong hợp đồng thương mại.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: 'Phương Thức Hoàn Tiền',
          content: [
            {
              type: 'p',
              text: 'Trong trường hợp hai bên thống nhất hoàn tiền thay vì đổi sản phẩm mới:',
            },
            {
              type: 'ul',
              items: [
                'Hoàn tiền thông qua hình thức chuyển khoản ngân hàng trực tiếp vào tài khoản chính chủ của khách hàng/đối tác.',
                'Cấn trừ công nợ vào các kỳ thanh toán tiếp theo (áp dụng cho đối tác phân phối B2B và đại lý).',
              ],
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: 'Chi Phí Liên Quan',
          content: [
            {
              type: 'p',
              text: 'Trường hợp đổi trả phát sinh do lỗi từ nhà sản xuất hoặc quá trình vận chuyển của HAQ FOOD, toàn bộ chi phí vận chuyển thu hồi và gửi hàng mới sẽ do HAQ FOOD chi trả.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: 'Thông Tin Liên Hệ Tiếp Nhận',
          isContact: true,
        },
      ],
    },

    en: {
      docTitle: 'Return & Refund Policy | HAQ FOOD',
      breadcrumbs: {
        home: 'Home',
        category: 'Legal & Policy',
        current: 'Return & Refund Policy',
      },
      badge: 'OFFICIAL POLICY',
      title: 'RETURN & REFUND POLICY | HAQ FOOD',
      intro:
        'HAQ FOOD HANOI JSC is committed to providing packaged food products adhering to the highest food safety, hygiene, and quality standards. Below are the principles and standard operating procedures for return, replacement, and refund requests for partners, distributors, and customers.',
      tocTitle: 'POLICY DIRECTORY',
      supportBox: {
        title: 'Need direct support?',
        desc: 'Our Customer Care & Legal Compliance team is ready to assist you.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'HAQ FOOD HANOI JOINT STOCK COMPANY',
        addressLabel: 'Address:',
        address: 'Group 6, Cau Giay Ward, Hanoi City, Vietnam',
        hotlineLabel: 'Hotline:',
        zaloLabel: 'Official Zalo:',
        zaloName: 'HAQ Hanoi',
        zaloNote: '(+84 993 308 319)',
        emailLabel: 'Inquiry Email:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: 'Scope of Application',
          content: [
            {
              type: 'p',
              text: 'This policy governs all packaged food items directly manufactured, processed, or distributed by HAQ FOOD HANOI JSC through official commercial channels (wholesale distributor networks, modern supermarket chains, e-commerce, and B2B/OEM contracts).',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: 'Eligibility for Returns',
          content: [
            {
              type: 'p',
              text: 'Items are eligible for inspection and return processing when fulfilling the following criteria:',
            },
            {
              type: 'ul',
              items: [
                'Products remain in original sealed manufacturer packaging with intact labels (except for internal quality defects uncovered upon opening in accordance with regulations).',
                'Valid proof of purchase is provided (VAT invoice, delivery note, handover report, or verified purchase order number).',
                'Clear photographic or video evidence documenting product condition upon receipt or defect discovery is submitted.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: 'Covered Scenarios',
          content: [
            {
              type: 'ul',
              items: [
                'Manufacturing Defect: Spoilage, foreign substance, or quality degradation occurring within stated shelf life under prescribed storage guidelines.',
                'Transit Damage: Severe package tearing, rupture, or seal failure affecting food safety upon handover.',
                'Specification or Quantity Discrepancy: Received consignment does not match approved commercial order specifications.',
              ],
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: 'Exclusions from Policy',
          content: [
            {
              type: 'ul',
              items: [
                'Products exceeding expiration dates or damaged due to improper storage (humid environment, excessive heat, direct sunlight).',
                'Products showing unauthorized tampering, broken verification seals, or unverifiable HAQ FOOD origin.',
                'Discretionary customer preference changes unrelated to manufacturing defects or contractual warranties.',
              ],
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: 'Return Procedure',
          content: [
            {
              type: 'ol',
              items: [
                'Step 1: Contact hotline (+84) 024 23 23 56 56 or email info@haq.com.vn with order ID, proof of purchase, and detailed photos of the issue.',
                'Step 2: QC (Quality Control) and Customer Relations verify consignment details and respond promptly.',
                'Step 3: Both parties confirm product recall arrangements, followed by shipment of replacement stock or issuance of refund.',
              ],
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: 'Processing Timeline',
          content: [
            {
              type: 'p',
              text: 'Upon receiving complete defect documentation and comparative reference samples, HAQ FOOD conducts lab testing and issues an official resolution report within contractual service-level agreements.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: 'Refund Methods',
          content: [
            {
              type: 'p',
              text: 'Where replacement is unavailable or mutual agreement favors reimbursement:',
            },
            {
              type: 'ul',
              items: [
                'Direct bank transfer to the registered corporate or personal bank account of the purchaser.',
                'Credit note offset against upcoming payment cycles (for B2B distributors and wholesale partners).',
              ],
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: 'Associated Shipping Costs',
          content: [
            {
              type: 'p',
              text: 'When return claims arise from manufacturer error or verified logistical mishandling under HAQ FOOD responsibility, 100% of freight costs for recall and redelivery are borne by HAQ FOOD.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: 'Official Contact for Claims',
          isContact: true,
        },
      ],
    },

    ko: {
      docTitle: '반품 및 환불 정책 | HAQ FOOD',
      breadcrumbs: {
        home: '홈',
        category: '법률 및 정책',
        current: '반품 및 환불 정책',
      },
      badge: '공식 정책 규정',
      title: '반품 및 환불 정책 | HAQ FOOD',
      intro:
        'HAQ 하노이 주식회사는 최고 수준의 식품 위생 안전 및 품질 기준을 준수하는 포장 식품을 공급할 것을 약속드립니다. 본 규정은 파트너사, 유통업체 및 고객 여러분을 위한 반품, 교환 및 환불 처리 기준과 절차를 명시합니다.',
      tocTitle: '정책 목차',
      supportBox: {
        title: '직접 상담이 필요하신가요?',
        desc: '고객지원팀 및 법무 컴플라이언스 부서가 친절히 안내해 드립니다.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'HAQ 하노이 주식회사 (HAQ FOOD HANOI JSC)',
        addressLabel: '주소:',
        address: '베트남 하노이시 꺼우저이구 6구역',
        hotlineLabel: '대표 핫라인:',
        zaloLabel: '공식 Zalo:',
        zaloName: 'HAQ Hà Nội',
        zaloNote: '(0993 308 319)',
        emailLabel: '접수 이메일:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: '적용 범위',
          content: [
            {
              type: 'p',
              text: '본 정책은 HAQ 하노이 주식회사가 직접 제조, 가공 및 공식 유통 채널(전국 대리점, 대형 마트 체인, 전자상거래 및 B2B/OEM 계약 건)을 통해 공급하는 모든 포장 식품에 적용됩니다.',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: '반품 및 교환 조건',
          content: [
            {
              type: 'p',
              text: '다음 조건을 충족할 경우 정식 반품 및 교환 접수 및 검수가 진행됩니다:',
            },
            {
              type: 'ul',
              items: [
                '제조사 오리지널 밀봉 포장 및 라벨이 온전한 상태여야 합니다 (단, 개봉 후 내부 품질 결함이 발견된 규정 사례는 예외 인정).',
                '유효한 구매 증빙 서류(세금계산서, 납품 확인서, 인수증 또는 발주 번호)를 제시해야 합니다.',
                '상품 수령 시점 또는 결함 발견 당시의 상태를 명확히 입증할 수 있는 사진 또는 동영상 증빙이 제출되어야 합니다.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: '반품·교환 승인 대상',
          content: [
            {
              type: 'ul',
              items: [
                '제조사 과실: 유통기한 내 권장 보관 수칙을 준수하였음에도 발생한 제품 변질, 이물질 혼입 또는 품질 이상.',
                '운송 중 파손: 운송 과정에서 발생한 심각한 포장 파손, 팽창 또는 밀봉 손상으로 인한 품질 훼손.',
                '오배송 및 수량 불일치: 계약 및 발주서 상의 품목, 규격, 수량과 실제 수령 제품이 상이한 경우.',
              ],
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: '반품·교환 불가 대상',
          content: [
            {
              type: 'ul',
              items: [
                '소비기한(유통기한)이 경과하였거나 규정에 맞지 않는 보관(고온 다습, 직사광선 노출 등)으로 인해 변질된 경우.',
                '임의 개봉, 라벨 훼손 또는 HAQ FOOD 정품 출처가 확인되지 않는 경우.',
                '제품 하자나 사전 계약 합의가 없는 단순 고객 변심에 의한 경우.',
              ],
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: '반품 및 클레임 접수 절차',
          content: [
            {
              type: 'ol',
              items: [
                '1단계: 핫라인(+84 24 23 23 56 56) 또는 공식 이메일(info@haq.com.vn)로 주문 번호 및 결함 사진을 첨부하여 접수합니다.',
                '2단계: 품질관리부(QC) 및 고객상담팀에서 서류 및 사유를 대조 검토 후 신속히 처리 방향을 회신합니다.',
                '3단계: 결함 제품 수거 일정 협의 후 대체 신품 발송 또는 환불 절차를 진행합니다.',
              ],
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: '처리 소요 기간',
          content: [
            {
              type: 'p',
              text: '필요 서류 및 대조 샘플이 접수된 즉시 정밀 검사를 착수하며, 상거래 계약에 명시된 기한 내에 공식 처리 결과를 서면으로 통보해 드립니다.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: '환불 방식',
          content: [
            {
              type: 'p',
              text: '교환 대신 환불로 상호 합의된 경우 다음과 같이 처리됩니다:',
            },
            {
              type: 'ul',
              items: [
                '고객 또는 파트너사 명의의 지정 은행 계좌로 직접 현금 계좌 이체.',
                '차기 발주 대금에서 정산 차감 (B2B 유통사 및 정기 대리점 파트너십 적용).',
              ],
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: '제반 운송 비용 부담',
          content: [
            {
              type: 'p',
              text: '제조상 결함 또는 HAQ FOOD 책임 하의 운송 사고로 인한 반품의 경우, 회수 및 대체품 재발송에 소요되는 제반 왕복 운송비 전액은 HAQ FOOD가 부담합니다.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: '공식 클레임 접수처',
          isContact: true,
        },
      ],
    },
  },

  // =========================================================================
  // 2. CHÍNH SÁCH BẢO MẬT
  // =========================================================================
  privacy: {
    vi: {
      docTitle: 'Chính Sách Bảo Mật | HAQ FOOD',
      breadcrumbs: {
        home: 'Trang chủ',
        category: 'Pháp lý & Chính sách',
        current: 'Chính sách bảo mật',
      },
      badge: 'BẢO MẬT & QUYỀN RIÊNG TƯ',
      title: 'CHÍNH SÁCH BẢO MẬT | HAQ FOOD',
      intro:
        'CÔNG TY CỔ PHẦN HAQ HÀ NỘI cam kết bảo vệ tuyệt đối sự riêng tư và an toàn thông tin của khách hàng, đối tác và người truy cập website haq.com.vn theo quy định của pháp luật Việt Nam.',
      tocTitle: 'MỤC LỤC BẢO MẬT',
      supportBox: {
        title: 'Ban Pháp chế & Bảo mật',
        desc: 'Mọi yêu cầu truy xuất hoặc xóa thông tin vui lòng gửi về email chính thức.',
        email: 'info@haq.com.vn',
      },
      contactBox: {
        company: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
        addressLabel: 'Địa chỉ:',
        address: 'Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam',
        hotlineLabel: 'Hotline:',
        zaloLabel: 'Zalo OA:',
        zaloName: 'HAQ Hà Nội',
        zaloNote: '(0993 308 319)',
        emailLabel: 'Email tiếp nhận:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: 'Phạm Vi Áp Dụng',
          content: [
            {
              type: 'p',
              text: 'Chính sách bảo mật này mô tả cách CÔNG TY CỔ PHẦN HAQ HÀ NỘI (sau đây gọi là "HAQ FOOD") thu thập, lưu trữ, xử lý và bảo vệ thông tin cá nhân và dữ liệu doanh nghiệp phát sinh khi người dùng truy cập website, liên hệ hợp tác B2B hoặc gửi biểu mẫu báo giá.',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: 'Thông Tin Được Thu Thập',
          content: [
            {
              type: 'p',
              text: 'Chúng tôi chỉ thu thập các thông tin cần thiết phục vụ cho việc liên hệ và giao dịch thương mại:',
            },
            {
              type: 'ul',
              items: [
                'Thông tin liên hệ: Họ tên người đại diện, chức vụ, tên công ty/đại lý, số điện thoại, địa chỉ email, địa chỉ doanh nghiệp.',
                'Thông tin nhu cầu B2B: Nhóm sản phẩm quan tâm, số lượng dự kiến, thị trường phân phối mục tiêu, yêu cầu OEM/ODM riêng biệt.',
                'Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, thời gian truy cập nhằm phục vụ tối ưu hóa trải nghiệm website.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: 'Mục Đích Sử Dụng Thông Tin',
          content: [
            {
              type: 'ul',
              items: [
                'Liên hệ tư vấn bảng giá, cung cấp catalog sản phẩm và điều phối phòng ban phụ trách xử lý yêu cầu hợp tác.',
                'Giao nhận hợp đồng, hóa đơn và điều phối logistic đơn hàng.',
                'Gửi thông báo về các chương trình ưu đãi, chính sách đại lý mới (chỉ gửi khi có sự đồng ý của khách hàng).',
                'Nâng cao chất lượng bảo mật và chống các hành vi gian lận trực tuyến.',
              ],
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: 'Bảo Vệ Thông Tin Cá Nhân',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD áp dụng các biện pháp kỹ thuật số và quy trình an ninh nghiêm ngặt nhằm bảo vệ dữ liệu người dùng khỏi sự truy cập trái phép, mất mát hoặc tiết lộ bất hợp pháp. Dữ liệu được mã hóa đường truyền bằng chứng chỉ SSL/TLS tiêu chuẩn cao.',
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: 'Chia Sẻ Thông Tin Với Bên Thứ Ba',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD cam kết không bán, trao đổi hoặc thương mại hóa thông tin của khách hàng cho bất kỳ bên thứ ba nào. Thông tin chỉ được chia sẻ trong phạm vi cần thiết cho đối tác vận chuyển giao hàng hoặc theo yêu cầu bằng văn bản của cơ quan pháp luật có thẩm quyền.',
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: 'Cookie & Công Nghệ Theo Dõi',
          content: [
            {
              type: 'p',
              text: 'Website sử dụng cookie tiêu chuẩn nhằm ghi nhớ tùy chọn hiển thị và phân tích lưu lượng truy cập ẩn danh. Người dùng có toàn quyền tắt hoặc xóa cookie trong phần cài đặt trình duyệt web của mình.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: 'Quyền Của Người Dùng Đối Với Dữ Liệu',
          content: [
            {
              type: 'p',
              text: 'Người dùng có các quyền hợp pháp sau đối với dữ liệu của mình:',
            },
            {
              type: 'ul',
              items: [
                'Yêu cầu kiểm tra, cập nhật hoặc điều chỉnh thông tin liên hệ đã cung cấp.',
                'Yêu cầu ngừng tiếp nhận thông tin tiếp thị hoặc xóa bỏ hoàn toàn dữ liệu cá nhân khỏi hệ thống.',
              ],
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: 'Thời Gian Lưu Trữ Thông Tin',
          content: [
            {
              type: 'p',
              text: 'Thông tin thu thập sẽ được lưu trữ an toàn trong suốt thời gian thực hiện giao dịch hoặc duy trì quan hệ đối tác kinh doanh với HAQ FOOD, hoặc cho đến khi khách hàng có yêu cầu hủy bỏ theo quy định.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: 'Liên Hệ Về Quyền Riêng Tư',
          isContact: true,
        },
      ],
    },

    en: {
      docTitle: 'Privacy Policy | HAQ FOOD',
      breadcrumbs: {
        home: 'Home',
        category: 'Legal & Policy',
        current: 'Privacy Policy',
      },
      badge: 'SECURITY & DATA PRIVACY',
      title: 'PRIVACY POLICY | HAQ FOOD',
      intro:
        'HAQ FOOD HANOI JSC is committed to safeguarding the personal and corporate data privacy of our partners, clients, and website visitors in accordance with Vietnamese law and international cybersecurity standards.',
      tocTitle: 'PRIVACY DIRECTORY',
      supportBox: {
        title: 'Legal & Compliance Bureau',
        desc: 'For data access, rectification, or deletion requests, please contact our official email.',
        email: 'info@haq.com.vn',
      },
      contactBox: {
        company: 'HAQ FOOD HANOI JOINT STOCK COMPANY',
        addressLabel: 'Address:',
        address: 'Group 6, Cau Giay Ward, Hanoi City, Vietnam',
        hotlineLabel: 'Hotline:',
        zaloLabel: 'Official Zalo:',
        zaloName: 'HAQ Hanoi',
        zaloNote: '(+84 993 308 319)',
        emailLabel: 'Inquiry Email:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: 'Scope of Policy',
          content: [
            {
              type: 'p',
              text: 'This Privacy Policy sets out how HAQ FOOD HANOI JSC ("HAQ FOOD") collects, stores, processes, and protects corporate and personal data submitted through haq.com.vn, quotation inquiries, or B2B communications.',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: 'Information Collected',
          content: [
            {
              type: 'p',
              text: 'We collect strictly necessary operational details to facilitate commercial engagement:',
            },
            {
              type: 'ul',
              items: [
                'Representative Information: Full name, executive title, enterprise/agency name, phone number, email address, corporate office address.',
                'B2B Project Requirements: Target product categories, estimated procurement volume, target distribution markets, custom OEM/ODM packaging requests.',
                'Technical Telemetry: IP address, browser type, operating system, and session access metrics to optimize browsing performance.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: 'Purpose of Data Usage',
          content: [
            {
              type: 'ul',
              items: [
                'Providing wholesale price quotes, sending technical catalogs, and coordinating designated business development teams.',
                'Fulfilling commercial contracts, logistics handling, and invoicing requirements.',
                'Distributing notices regarding promotional terms or updated distributor schemes (only upon voluntary opt-in).',
                'Upholding system security standards and preventing unauthorized digital misuse.',
              ],
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: 'Data Protection & Security',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD deploys strict physical, procedural, and technological safeguards, including end-to-end SSL/TLS cryptographic encryption, to protect user records against unauthorized access, leakage, or alteration.',
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: 'Third-Party Disclosure',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD strictly pledges never to sell, trade, or monetize client data. Data is shared exclusively with certified freight and logistics partners for shipment completion or upon mandatory legal order by authorized Vietnamese statutory authorities.',
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: 'Cookies & Analytical Tracking',
          content: [
            {
              type: 'p',
              text: 'Our website uses industry-standard cookies to remember language/display preferences and compile aggregated anonymous metrics. Visitors retain full rights to restrict or disable cookies via browser settings.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: 'Data Subject Rights',
          content: [
            {
              type: 'p',
              text: 'Users retain legal entitlement to:',
            },
            {
              type: 'ul',
              items: [
                'Request inspection, rectification, or updates to their registered contact records.',
                'Opt out of marketing transmissions or request permanent erasure of personal data from active servers.',
              ],
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: 'Data Retention Periods',
          content: [
            {
              type: 'p',
              text: 'Commercial records are retained throughout the active duration of the business relationship, tax statutory limitation periods, or until verified customer deletion is requested.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: 'Privacy Compliance Contacts',
          isContact: true,
        },
      ],
    },

    ko: {
      docTitle: '개인정보 처리방침 | HAQ FOOD',
      breadcrumbs: {
        home: '홈',
        category: '법률 및 정책',
        current: '개인정보 처리방침',
      },
      badge: '보안 및 개인정보 보호',
      title: '개인정보 처리방침 | HAQ FOOD',
      intro:
        'HAQ 하노이 주식회사는 베트남 관련 법령 및 국제 데이터 보호 표준에 따라 고객, 비즈니스 파트너 및 웹사이트 방문자의 개인정보와 기업 데이터를 철저히 보호할 것을 서약합니다.',
      tocTitle: '개인정보 보호 목차',
      supportBox: {
        title: '법무 및 개인정보 보호팀',
        desc: '정보 열람, 정정 또는 영구 삭제 요청은 공식 이메일로 접수해 주시기 바랍니다.',
        email: 'info@haq.com.vn',
      },
      contactBox: {
        company: 'HAQ 하노이 주식회사 (HAQ FOOD HANOI JSC)',
        addressLabel: '주소:',
        address: '베트남 하노이시 꺼우저이구 6구역',
        hotlineLabel: '대표 핫라인:',
        zaloLabel: '공식 Zalo:',
        zaloName: 'HAQ Hà Nội',
        zaloNote: '(0993 308 319)',
        emailLabel: '접수 이메일:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: '적용 범위',
          content: [
            {
              type: 'p',
              text: '본 방침은 HAQ 하노이 주식회사("HAQ FOOD")가 공식 웹사이트(haq.com.vn) 방문, B2B 제휴 문의 및 견적 요청 과정에서 수집·처리·보관하는 개인정보 및 기업 데이터에 적용됩니다.',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: '수집하는 정보 항목',
          content: [
            {
              type: 'p',
              text: '원활한 상거래 상담 및 제휴를 위해 최소한의 필수 정보를 수집합니다:',
            },
            {
              type: 'ul',
              items: [
                '담당자 연락 정보: 성명, 직책, 회사/대리점명, 전화번호, 이메일 주소, 사업장 주소지.',
                'B2B 수요 정보: 관심 제품군, 예상 주문 수량, 유통 목표 시장, 맞춤형 OEM/ODM 요구 사양.',
                '기술 접속 로그: 웹 경험 최적화를 위한 접속 IP 주소, 브라우저 종류, 방문 일시 등.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: '개인정보의 이용 목적',
          content: [
            {
              type: 'ul',
              items: [
                '도매 단가 안내, 제품 카탈로그 발송 및 담당 영업 부서 매칭.',
                '상거래 계약 체결, 세금계산서 발행 및 물류 배송 업무 조율.',
                '신규 대리점 정책 및 프로모션 안내 발송 (사전 동의 고객에 한함).',
                '웹사이트 보안 강화 및 부정 이용 방지.',
              ],
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: '개인정보의 안전성 확보 조치',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD는 최신 SSL/TLS 통신 암호화 및 엄격한 사내 접근 제어 절차를 적용하여 데이터의 유출, 위변조 및 무단 접근을 원천 차단하고 있습니다.',
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: '제3자 제공 제한',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD는 고객 정보를 제3자에게 판매, 양도 또는 상업적으로 거래하지 않습니다. 물류 배송 처리를 위한 위탁 운송 파트너사 제공 또는 법률에 따른 관계 당국의 공식 서면 요청이 있는 경우에 한하여 제한적으로 제공됩니다.',
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: '쿠키(Cookie) 운용',
          content: [
            {
              type: 'p',
              text: '이용자의 언어 환경 저장 및 익명 트래픽 분석을 위해 쿠키를 운용합니다. 이용자는 브라우저 설정을 통해 쿠키 허용 여부를 자유롭게 설정할 수 있습니다.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: '이용자의 권리와 행사 방법',
          content: [
            {
              type: 'p',
              text: '이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:',
            },
            {
              type: 'ul',
              items: [
                '기등록된 본인의 연락처 및 기업 정보에 대한 열람 및 정정 요구.',
                '마케팅 수신 거부 및 당사 데이터베이스에서의 정보 영구 삭제 요구.',
              ],
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: '정보의 보유 및 파기 기한',
          content: [
            {
              type: 'p',
              text: '상거래 관계 유지 기간 또는 관련 법령(상법 및 세무 회계 법령)에 따른 의무 보존 기간 동안 안전하게 보관된 후 재생 불가능한 방법으로 파기됩니다.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: '개인정보 보호 문의처',
          isContact: true,
        },
      ],
    },
  },

  // =========================================================================
  // 3. ĐIỀU KHOẢN SỬ DỤNG
  // =========================================================================
  terms: {
    vi: {
      docTitle: 'Điều Khoản Sử Dụng | HAQ FOOD',
      breadcrumbs: {
        home: 'Trang chủ',
        category: 'Pháp lý & Chính sách',
        current: 'Điều khoản sử dụng',
      },
      badge: 'ĐIỀU KHOẢN PHÁP LÝ',
      title: 'ĐIỀU KHOẢN SỬ DỤNG | HAQ FOOD',
      intro:
        'Các điều khoản và quy định điều chỉnh quyền và nghĩa vụ của người dùng khi truy cập và sử dụng dịch vụ thông tin trên website chính thức của CÔNG TY CỔ PHẦN HAQ HÀ NỘI.',
      tocTitle: 'MỤC LỤC ĐIỀU KHOẢN',
      supportBox: {
        title: 'Cần tư vấn hợp đồng?',
        desc: 'Liên hệ ngay ban Thư ký & Hợp tác doanh nghiệp.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
        addressLabel: 'Địa chỉ:',
        address: 'Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam',
        hotlineLabel: 'Hotline:',
        zaloLabel: 'Zalo OA:',
        zaloName: 'HAQ Hà Nội',
        zaloNote: '(0993 308 319)',
        emailLabel: 'Email tiếp nhận:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: 'Phạm Vi Và Chấp Thuận',
          content: [
            {
              type: 'p',
              text: 'Bằng việc truy cập, tham khảo tài liệu, duyệt xem sản phẩm hoặc gửi yêu cầu liên hệ qua website haq.com.vn, bạn xác nhận rằng mình đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng website.',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: 'Quyền Sử Dụng Website',
          content: [
            {
              type: 'p',
              text: 'Người dùng được phép truy cập và sử dụng website cho các mục đích thương mại hợp pháp. Nghiêm cấm mọi hành vi:',
            },
            {
              type: 'ul',
              items: [
                'Can thiệp, phá hoại hệ thống mã nguồn hoặc cơ sở dữ liệu của website.',
                'Sử dụng các công cụ tự động (bot, crawler) để thu thập dữ liệu bất hợp pháp nhằm mục đích cạnh tranh không lành mạnh.',
                'Mạo danh pháp nhân HAQ FOOD hoặc các đại diện kinh doanh để thực hiện hành vi lừa đảo.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: 'Nội Dung Website',
          content: [
            {
              type: 'p',
              text: 'Toàn bộ nội dung, hình ảnh bao bì, thông tin năng lực nhà máy và bài viết trên website được HAQ FOOD biên soạn và cập nhật liên tục. Chúng tôi nỗ lực tối đa để đảm bảo tính chuẩn xác và cập nhật của thông tin, tuy nhiên một số thông số kỹ thuật hoặc bao bì có thể được điều chỉnh theo cải tiến quy cách đóng gói thực tế.',
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: 'Thông Tin Sản Phẩm & Báo Giá',
          content: [
            {
              type: 'p',
              text: 'Hình ảnh và thông số hiển thị trên website mang tính chất giới thiệu danh mục sản phẩm chính thức của HAQ FOOD. Đơn giá, chính sách chiết khấu đại lý và số lượng tối thiểu cho đơn hàng OEM/ODM sẽ được xác nhận thông qua báo giá chính thức có dấu đỏ và hợp đồng kinh tế giữa hai bên.',
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: 'Quyền Sở Hữu Trí Tuệ',
          content: [
            {
              type: 'p',
              text: 'Thương hiệu HAQ FOOD, nhãn hiệu bao bì sản phẩm HOKI, logo, biểu tượng, hình ảnh chụp thực tế nhà máy và toàn bộ mã nguồn website đều thuộc quyền sở hữu trí tuệ độc quyền của CÔNG TY CỔ PHẦN HAQ HÀ NỘI và được bảo hộ bởi Luật Sở hữu trí tuệ Việt Nam. Nghiêm cấm mọi hành vi sao chép, phân phối lại mà không có văn bản chấp thuận trước.',
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: 'Liên Kết Bên Thứ Ba',
          content: [
            {
              type: 'p',
              text: 'Website có thể chứa các đường link dẫn tới cổng thông tin của bên thứ ba (như Cổng tra cứu thông tin doanh nghiệp VNTax, kênh mạng xã hội, các chuỗi siêu thị đối tác). HAQ FOOD không chịu trách nhiệm về nội dung hoặc chính sách bảo mật của các trang web bên thứ ba này.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: 'Giới Hạn Trách Nhiệm',
          content: [
            {
              type: 'p',
              text: 'Trong phạm vi pháp luật cho phép, HAQ FOOD không chịu trách nhiệm đối với các thiệt hại gián tiếp, bất khả kháng do sự cố đường truyền internet hoặc các yếu tố nằm ngoài tầm kiểm soát kỹ thuật của chúng tôi.',
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: 'Thay Đổi Điều Khoản',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD bảo lưu quyền sửa đổi, bổ sung các điều khoản sử dụng này tại bất kỳ thời điểm nào nhằm phù hợp với quy định pháp luật và định hướng vận hành doanh nghiệp. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải công khai trên website.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: 'Thông Tin Liên Hệ Pháp Lý',
          isContact: true,
        },
      ],
    },

    en: {
      docTitle: 'Terms of Service | HAQ FOOD',
      breadcrumbs: {
        home: 'Home',
        category: 'Legal & Policy',
        current: 'Terms of Service',
      },
      badge: 'LEGAL TERMS & CONDITIONS',
      title: 'TERMS OF SERVICE | HAQ FOOD',
      intro:
        'These terms and regulations govern user rights, obligations, and restrictions when browsing or utilizing commercial services on the official portal of HAQ FOOD HANOI JSC.',
      tocTitle: 'TERMS DIRECTORY',
      supportBox: {
        title: 'Need contract advice?',
        desc: 'Contact our Corporate Legal & Partnership Secretariat directly.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'HAQ FOOD HANOI JOINT STOCK COMPANY',
        addressLabel: 'Address:',
        address: 'Group 6, Cau Giay Ward, Hanoi City, Vietnam',
        hotlineLabel: 'Hotline:',
        zaloLabel: 'Official Zalo:',
        zaloName: 'HAQ Hanoi',
        zaloNote: '(+84 993 308 319)',
        emailLabel: 'Inquiry Email:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: 'Scope and Acceptance',
          content: [
            {
              type: 'p',
              text: 'By accessing, referencing documents, viewing products, or dispatching inquiries via haq.com.vn, you acknowledge that you have read, understood, and agreed to adhere unconditionally to these terms. If you disagree with any provision, please immediately cease site access.',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: 'Permitted Website Usage',
          content: [
            {
              type: 'p',
              text: 'Users are licensed to access the portal strictly for legitimate trade and inquiry purposes. The following actions are strictly prohibited:',
            },
            {
              type: 'ul',
              items: [
                'Disrupting or tampering with source code, server infrastructure, or databases.',
                'Deploying scraping bots, crawlers, or automated harvesting scripts for unfair competition.',
                'Impersonating HAQ FOOD or our accredited commercial representatives to perpetrate fraud.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: 'Website Content Accuracy',
          content: [
            {
              type: 'p',
              text: 'All graphic assets, packaging imagery, factory technical specifications, and publications are curated by HAQ FOOD. While we endeavor to preserve up-to-date accuracy, packaging visuals and minor technical specs may undergo ongoing production enhancements.',
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: 'Product Information & Pricing',
          content: [
            {
              type: 'p',
              text: 'Products exhibited online form an official catalog overview. Wholesale unit pricing, distributor discount structures, and MOQ specifications for OEM/ODM orders are finalized exclusively via stamped commercial quotes and signed bilateral contracts.',
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: 'Intellectual Property Rights',
          content: [
            {
              type: 'p',
              text: 'The HAQ FOOD brand, HOKI packaging trademarks, trade secrets, facility photography, and software codebase remain the exclusive intellectual property of HAQ FOOD HANOI JSC protected under the Intellectual Property Law of Vietnam. Unauthorized reproduction is strictly actionable.',
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: 'Third-Party External Links',
          content: [
            {
              type: 'p',
              text: 'This website may link to third-party domains (such as the VNTax corporate registry portal, social media channels, or partner retailers). HAQ FOOD accepts no liability for third-party privacy practices or external website content.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: 'Limitation of Liability',
          content: [
            {
              type: 'p',
              text: 'To the fullest extent sanctioned by applicable law, HAQ FOOD shall not be liable for incidental, indirect, or force majeure damages arising from internet infrastructure disruptions beyond our reasonable engineering control.',
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: 'Amendments to Terms',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD reserves unilateral discretion to revise or update these terms at any time to reflect legal amendments or operational evolutions. Modifications become effective immediately upon publication on this portal.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: 'Legal Contact Information',
          isContact: true,
        },
      ],
    },

    ko: {
      docTitle: '이용약관 | HAQ FOOD',
      breadcrumbs: {
        home: '홈',
        category: '법률 및 정책',
        current: '이용약관',
      },
      badge: '공식 법률 약관',
      title: '이용약관 | HAQ FOOD',
      intro:
        'HAQ 하노이 주식회사 공식 웹사이트(haq.com.vn) 방문 및 정보 서비스 이용 시 준수해야 할 이용자의 권리, 의무 및 제반 책임 사항을 규정합니다.',
      tocTitle: '약관 목차',
      supportBox: {
        title: '계약 관련 상담이 필요하신가요?',
        desc: '당사 기업제휴 및 법무 비서실로 직접 문의해 주시기 바랍니다.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'HAQ 하노이 주식회사 (HAQ FOOD HANOI JSC)',
        addressLabel: '주소:',
        address: '베트남 하노이시 꺼우저이구 6구역',
        hotlineLabel: '대표 핫라인:',
        zaloLabel: '공식 Zalo:',
        zaloName: 'HAQ Hà Nội',
        zaloNote: '(0993 308 319)',
        emailLabel: '접수 이메일:',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: '적용 범위 및 동의',
          content: [
            {
              type: 'p',
              text: '본 웹사이트에 접속하여 자료를 열람하거나 제품을 확인하고 문의를 전송하는 것은 본 이용약관에 기재된 모든 조건에 동의한 것으로 간주됩니다. 동의하지 않으실 경우 웹사이트 이용을 즉시 중단해 주시기 바랍니다.',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: '웹사이트 이용 권한',
          content: [
            {
              type: 'p',
              text: '이용자는 합법적인 상업적 목적에 한하여 사이트를 이용할 수 있으며, 다음 각 호의 행위는 엄격히 금지됩니다:',
            },
            {
              type: 'ul',
              items: [
                '서버 및 데이터베이스 시스템을 공격, 무단 침입하거나 방해하는 행위.',
                '부정 경쟁 목적으로 크롤러, 봇 등 자동화 수단을 동원해 무단 데이터 스크래핑을 행하는 행위.',
                'HAQ FOOD 및 영업 대리인을 사칭하여 사기 또는 기망 행위를 시도하는 행위.',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: '웹사이트 콘텐츠의 정확성',
          content: [
            {
              type: 'p',
              text: '게시된 포장 이미지, 공장 생산 역량 및 사양 정보는 HAQ FOOD에 의해 검수 및 유지 관리됩니다. 당사는 정보의 정확성을 위해 최선을 다하나, 실제 패키징 개선 및 공정에 따라 일부 규격이 예고 없이 변경될 수 있습니다.',
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: '제품 정보 및 견적 안내',
          content: [
            {
              type: 'p',
              text: '웹사이트에 노출된 제품 정보는 공식 포트폴리오 소개 목적이며, 도매 납품가, 대리점 할인율 및 OEM/ODM 최소 발주 수량(MOQ)은 양사 간 직인이 날인된 공식 견적서 및 상거래 계약서에 의거하여 최종 확정됩니다.',
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: '지식재산권 보호',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD 상표, HOKI 브랜드 패키지, 로고, 공장 실사 사진 및 웹사이트 소스코드를 포함한 모든 저작물은 HAQ 하노이 주식회사의 독점 지식재산이며 베트남 지식재산권법의 보호를 받습니다. 사전 서면 승인 없는 무단 복제 및 재배포를 금합니다.',
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: '제3자 사이트 링크',
          content: [
            {
              type: 'p',
              text: '본 사이트는 외부 포털(베트남 기업세무조회 포털 VNTax, SNS 채널, 협력 유통사 등) 링크를 포함할 수 있습니다. 당사는 외부 제3자 사이트의 콘텐츠나 개인정보 정책에 대해 법적 책임을 지지 않습니다.',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: '책임의 한계',
          content: [
            {
              type: 'p',
              text: '법률이 허용하는 최대 범위 내에서, HAQ FOOD는 당사의 합리적 통제 범위를 벗어난 인터넷 통신망 장애 또는 불가항력적 사유로 인한 간접 손해에 대해 책임을 면합니다.',
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: '약관의 개정',
          content: [
            {
              type: 'p',
              text: 'HAQ FOOD는 관계 법령 및 사업 운영 방침의 변화에 따라 사전 고지 없이 본 약관을 개정할 수 있습니다. 변경된 약관은 웹사이트에 게시되는 즉시 효력이 발생합니다.',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: '법무 문의처',
          isContact: true,
        },
      ],
    },
  },
}
