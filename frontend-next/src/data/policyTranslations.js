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
      badge: '',
      title: 'CHÍNH SÁCH ĐỔI TRẢ & HOÀN TIỀN | HAQ FOOD',
      intro:
        '',
      tocTitle: 'MỤC LỤC CHÍNH SÁCH',
      supportBox: {
        title: 'Cần hỗ trợ trực tiếp?',
        desc: 'Bộ phận Chăm sóc khách hàng & Pháp chế luôn sẵn sàng hỗ trợ bạn.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
        taxCodeLabel: 'Mã số thuế:',
        taxCode: '0109547016 (Sở KH&ĐT TP. Hà Nội cấp ngày 11/03/2021)',
        addressLabel: 'Địa chỉ:',
        address: 'Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam',
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
      badge: '',
      title: 'RETURN & REFUND POLICY | HAQ FOOD',
      intro:
        '',
      tocTitle: 'POLICY DIRECTORY',
      supportBox: {
        title: 'Need direct support?',
        desc: 'Our Customer Care & Legal Compliance team is ready to assist you.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'HAQ HANOI JOINT STOCK COMPANY',
        taxCodeLabel: 'Tax Identification Number:',
        taxCode: '0109547016 (Issued by Hanoi Dept. of Planning & Investment on Mar 11, 2021)',
        addressLabel: 'Address:',
        address: 'No. 30, Alley 1 Pham Tuan Tai, Nghia Do Ward, Cau Giay District, Hanoi City, Vietnam',
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
      badge: '',
      title: '반품 및 환불 정책 | HAQ FOOD',
      intro:
        '',
      tocTitle: '정책 목차',
      supportBox: {
        title: '직접 상담이 필요하신가요?',
        desc: '고객지원팀 및 법무 컴플라이언스 부서가 친절히 안내해 드립니다.',
        phone: '024 23 23 56 56',
      },
      contactBox: {
        company: 'HAQ 하노이 주식회사 (HAQ HANOI JOINT STOCK COMPANY)',
        taxCodeLabel: '사업자등록번호(MST):',
        taxCode: '0109547016 (2021년 3월 11일 하노이시 기획투자국 발급)',
        addressLabel: '주소:',
        address: '베트남 하노이시 까우저이군 응이어도동 팜뚜언따이 1골목 30호',
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
    zh: {
      docTitle: '退换货及退款政策 | HAQ FOOD',
      breadcrumbs: {
        home: '首页',
        category: '法律合规与政策',
        current: '退换货及退款政策',
      },
      badge: '',
      title: '退换货及退款政策 | HAQ FOOD',
      intro:
        '',
      tocTitle: '政策目录',
      supportBox: {
        title: '需要直接协助？',
        desc: '客户关怀中心与法律合规部随时竭诚为您服务。',
        phone: '+84 24 23 23 56 56',
      },
      contactBox: {
        company: '河内 HAQ 股份公司 (HAQ HANOI JOINT STOCK COMPANY)',
        taxCodeLabel: '企业税号 (MST):',
        taxCode: '0109547016（河内市计划投资局于2021年3月11日核发）',
        addressLabel: '地址：',
        address: '越南河内市纸桥郡义都坊范俊才街1巷30号',
        hotlineLabel: '热线电话：',
        zaloLabel: '官方 Zalo OA：',
        zaloName: 'HAQ Hà Nội',
        zaloNote: '(+84 993 308 319)',
        emailLabel: '处理邮箱：',
        email: 'info@haq.com.vn',
      },
      sections: [
        {
          id: 'section-1',
          num: '01',
          title: '适用范围',
          content: [
            {
              type: 'p',
              text: '本政策适用于河内 HAQ 股份公司直接生产、加工或通过正规商业渠道（批发分销网络、连锁商超、电商平台及 B2B/OEM 订单）销售的所有包装食品。',
            },
          ],
        },
        {
          id: 'section-2',
          num: '02',
          title: '退换货条件',
          content: [
            {
              type: 'p',
              text: '产品在符合以下条件时将被受理检验并办理退换货：',
            },
            {
              type: 'ul',
              items: [
                '产品保持原始完整包装及生产商标贴封口（依规开箱使用后发现内部批次质量问题的情况除外）。',
                '客户能提供有效采购凭证（增值税发票、交接单、出库单或对账订单号）。',
                '提供收货时或发现质量缺陷时清晰的照片或视频佐证。',
              ],
            },
          ],
        },
        {
          id: 'section-3',
          num: '03',
          title: '支持退换货的情况',
          content: [
            {
              type: 'ul',
              items: [
                '制造缺陷：在规定储存条件下，在保质期内发生变质、异物或理化指标异常。',
                '运输受损：交付验收时发现严重破袋、漏气或密封失效，影响食品安全。',
                '品规或数量不符：所交付商品与商业合同约定的品种、数量或包装规格不符。',
              ],
            },
          ],
        },
        {
          id: 'section-4',
          num: '04',
          title: '不予受理的情况',
          content: [
            {
              type: 'ul',
              items: [
                '产品已超过保质期限，或因不当保存（高温高湿、阳光直射等）导致变质。',
                '擅自拆装、防伪标签损毁或无法核实为 HAQ FOOD 正品来源。',
                '非产品质量问题或未在合同中约定的个人偏好退货。',
              ],
            },
          ],
        },
        {
          id: 'section-5',
          num: '05',
          title: '退换货处理流程',
          content: [
            {
              type: 'ol',
              items: [
                '步骤 1：拨打热线 (+84 24 23 23 56 56) 或发送邮件至 info@haq.com.vn，附带订单号与异常照片。',
                '步骤 2：质检部门 (QC) 与客服团队核实凭证与原因，并在规定时限内回复处理方案。',
                '步骤 3：协调缺陷产品召回并补发合格新批次商品或办理退款手续。',
              ],
            },
          ],
        },
        {
          id: 'section-6',
          num: '06',
          title: '处理时限',
          content: [
            {
              type: 'p',
              text: '收到完整单据与对照留样后即刻启动核验，并依商业合同规定的法定时限内正式书面答复处理结果。',
            },
          ],
        },
        {
          id: 'section-7',
          num: '07',
          title: '退款方式',
          content: [
            {
              type: 'p',
              text: '经双方协商一致办理退款的，款项将按以下方式退回：',
            },
            {
              type: 'ul',
              items: [
                '原路转账至客户或合作单位指定的银行账户。',
                '直接冲抵下一批次货款（适用于 B2B 分销商与长期代理商合作伙伴）。',
              ],
            },
          ],
        },
        {
          id: 'section-8',
          num: '08',
          title: '运输物流费用',
          content: [
            {
              type: 'p',
              text: '凡因生产制造缺陷或 HAQ FOOD 方运输责任引发的退换货，相关来回物流费用全部由 HAQ FOOD 承担。',
            },
          ],
        },
        {
          id: 'section-9',
          num: '09',
          title: '官方售后联系方式',
          isContact: true,
        },
      ],
    },
  },

  // =========================================================================
  // 2. CHÍNH SÁCH BẢO MẬT
  // =========================================================================
        privacy: {
    "vi": {
      "docTitle": "Chính Sách Bảo Mật & Dữ Liệu Cá Nhân | HAQ FOOD",
      "breadcrumbs": {
        "home": "Trang chủ",
        "category": "Pháp lý & Chính sách",
        "current": "Chính sách bảo mật"
      },
      "badge": "",
      "title": "CHÍNH SÁCH BẢO MẬT THÔNG TIN VÀ BẢO VỆ DỮ LIỆU CÁ NHÂN | HAQ FOOD",
      "intro": "",
      "tocTitle": "MỤC LỤC BẢO MẬT",
      "supportBox": {
        "title": "Ban Pháp chế & Bảo vệ Dữ liệu",
        "desc": "Mọi yêu cầu tra cứu, trích xuất, cập nhật hoặc xóa dữ liệu cá nhân vui lòng gửi về email chính thức của Ban Pháp chế.",
        "email": "info@haq.com.vn"
      },
      "contactBox": {
        "company": "CÔNG TY CỔ PHẦN HAQ HÀ NỘI",
        "addressLabel": "Trụ sở chính:",
        "address": "Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam",
        "hotlineLabel": "Tổng đài:",
        "zaloLabel": "Zalo OA:",
        "zaloName": "HAQ Hà Nội",
        "zaloNote": "(0993 308 319)",
        "emailLabel": "Email tiếp nhận:",
        "email": "info@haq.com.vn",
        "taxCodeLabel": "Mã số thuế:",
        "taxCode": "0109547016 (Sở KH&ĐT TP. Hà Nội cấp ngày 11/03/2021)"
      },
      "sections": [
        {
          "id": "section-1",
          "num": "01",
          "title": "Vai Trò & Tư Cách Pháp Lý Của HAQ FOOD",
          "content": [
            {
              "type": "p",
              "text": "Căn cứ Nghị định số 13/2023/NĐ-CP của Chính phủ về bảo vệ dữ liệu cá nhân, trong mọi hoạt động vận hành website haq.com.vn và thực hiện các giao dịch thương mại, CÔNG TY CỔ PHẦN HAQ HÀ NỘI đồng thời đảm nhiệm hai tư cách pháp lý:"
            },
            {
              "type": "ul",
              "items": [
                "Bên Kiểm soát dữ liệu cá nhân (Data Controller): Trực tiếp quyết định mục đích và phương tiện xử lý dữ liệu cá nhân phát sinh từ người dùng và đối tác.",
                "Bên Xử lý dữ liệu cá nhân (Data Processor): Thực hiện các nghiệp vụ kỹ thuật gồm thu thập, ghi nhận, phân tích, lưu trữ, chỉnh sửa và bảo vệ dữ liệu trên hệ thống của Công ty."
              ]
            }
          ]
        },
        {
          "id": "section-2",
          "num": "02",
          "title": "Phân Loại & Danh Mục Dữ Liệu Thu Thập",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD chỉ thu thập các trường dữ liệu cần thiết phục vụ cho việc liên hệ, báo giá sỉ, giao kết hợp đồng và chăm sóc khách hàng:"
            },
            {
              "type": "ul",
              "items": [
                "Dữ liệu định danh & liên hệ: Họ và tên người đại diện, chức vụ, tên đơn vị/đại lý/siêu thị, số điện thoại, email, địa chỉ giao nhận hàng và trụ sở doanh nghiệp.",
                "Thông tin thương mại B2B: Nhóm sản phẩm đồ ăn vặt quan tâm (Bánh tráng HOKI, Bánh đậu xanh tươi, Bắp rang bơ nổ công nghệ cao, Bò khô cay...), sản lượng dự kiến, thị trường phân phối và yêu cầu gia công OEM/ODM.",
                "Thông tin tài chính & thanh toán: Số tài khoản ngân hàng, chi nhánh mở tài khoản phục vụ đối soát công nợ, giao dịch thương mại hoặc hoàn tiền đổi trả theo quy định.",
                "Dữ liệu kỹ thuật số tự động: Địa chỉ IP, loại trình duyệt, hệ điều hành thiết bị, thời gian truy cập và nhật ký tương tác ẩn danh nhằm tối ưu hóa hiệu năng website."
              ]
            },
            {
              "type": "p",
              "text": "HAQ FOOD tuyệt đối không chủ đích thu thập các dữ liệu cá nhân nhạy cảm (quan điểm chính trị, tôn giáo, thông tin sinh trắc học, hồ sơ y tế sức khỏe hoặc lý lịch tư pháp cá nhân)."
            }
          ]
        },
        {
          "id": "section-3",
          "num": "03",
          "title": "Mục Đích Xử Lý Dữ Liệu Hợp Pháp",
          "content": [
            {
              "type": "p",
              "text": "Mọi dữ liệu được thu thập chỉ được xử lý cho các mục đích thương mại và hỗ trợ khách hàng minh bạch:"
            },
            {
              "type": "ul",
              "items": [
                "Cung cấp bảng báo giá sỉ B2B, gửi catalog hồ sơ năng lực sản phẩm và điều phối chuyên viên kinh doanh phụ trách hỗ trợ trực tiếp.",
                "Xác nhận đơn hàng, đàm phán hợp đồng thương mại/gia công OEM, xuất hóa đơn tài chính và quản lý giao nhận kho vận thực phẩm an toàn.",
                "Tiếp nhận phản hồi chất lượng sản phẩm thực phẩm đạt chuẩn ISO 22000 & HACCP, giải quyết bảo hành, đổi trả và hoàn tiền theo quy chế.",
                "Gửi thông báo về chính sách chiết khấu nhà phân phối hoặc sản phẩm mới (chỉ gửi khi có sự chấp thuận đăng ký tự nguyện của khách hàng).",
                "Đảm bảo an toàn an ninh mạng, chống gian lận thương mại điện tử và ngăn chặn các hành vi tấn công hệ thống."
              ]
            }
          ]
        },
        {
          "id": "section-4",
          "num": "04",
          "title": "Cơ Chế Đồng Ý (Consent) & Rút Lại Đồng Ý",
          "content": [
            {
              "type": "p",
              "text": "Sự đồng ý của khách hàng được thể hiện thông qua hành động chủ động gửi biểu mẫu liên hệ hoặc xác nhận đồng ý trên website (không sử dụng ô chọn mặc định). Khách hàng có toàn quyền rút lại sự đồng ý bất kỳ lúc nào bằng văn bản hoặc email gửi về info@haq.com.vn. Việc rút lại không ảnh hưởng đến tính hợp pháp của các hoạt động xử lý dữ liệu đã thực hiện trước đó."
            }
          ]
        },
        {
          "id": "section-5",
          "num": "05",
          "title": "Phạm Vi Chia Sẻ Dữ Liệu Cho Bên Thứ Ba",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD cam kết tuyệt đối không bán, cho thuê hoặc chuyển nhượng thương mại thông tin người dùng cho bất kỳ bên thứ ba nào. Thông tin chỉ được chia sẻ trong phạm vi tối thiểu cần thiết cho:"
            },
            {
              "type": "ul",
              "items": [
                "Đối tác vận chuyển & logistics: Chỉ cung cấp họ tên người nhận, SĐT và địa chỉ giao nhận để phục vụ giao hàng an toàn, đúng hẹn.",
                "Đối tác cung cấp hạ tầng máy chủ: Dữ liệu được lưu trữ trên hệ thống máy chủ đám mây mã hóa bảo mật đạt chuẩn quốc tế.",
                "Cơ quan nhà nước có thẩm quyền: Cung cấp thông tin theo đúng trình tự pháp luật khi có yêu cầu bằng văn bản chính thức từ Cơ quan Công an, Tòa án hoặc Cơ quan Thuế."
              ]
            }
          ]
        },
        {
          "id": "section-6",
          "num": "06",
          "title": "Thời Gian Lưu Trữ & Tiêu Hủy Dữ Liệu",
          "content": [
            {
              "type": "p",
              "text": "Dữ liệu cá nhân được lưu trữ an toàn trong suốt thời gian thực hiện giao dịch hoặc duy trì quan hệ đối tác kinh doanh với HAQ FOOD, hoặc cho đến khi khách hàng có yêu cầu xóa hợp lệ. Riêng các chứng từ kế toán, hợp đồng thương mại và hóa đơn GTGT sẽ được lưu trữ tối thiểu 10 năm theo quy định bắt buộc của Luật Kế toán Việt Nam. Khi hết thời hạn, dữ liệu sẽ được tiêu hủy an toàn, không thể phục hồi."
            }
          ]
        },
        {
          "id": "section-7",
          "num": "07",
          "title": "Toàn Bộ 11 Quyền Hợp Pháp Của Chủ Thể Dữ Liệu",
          "content": [
            {
              "type": "p",
              "text": "Tuân thủ Điều 9 Nghị định 13/2023/NĐ-CP, Quý khách hàng với tư cách Chủ thể dữ liệu sở hữu trọn vẹn 11 quyền hợp pháp:"
            },
            {
              "type": "ol",
              "items": [
                "Quyền được biết: Được thông báo đầy đủ về các hoạt động xử lý dữ liệu cá nhân của mình.",
                "Quyền đồng ý: Quyết định đồng ý hoặc không đồng ý cho phép HAQ FOOD xử lý dữ liệu.",
                "Quyền truy cập: Được xem, kiểm tra, yêu cầu chỉnh sửa thông tin cá nhân đã cung cấp.",
                "Quyền rút lại sự đồng ý: Rút lại văn bản chấp thuận xử lý dữ liệu bất cứ lúc nào.",
                "Quyền xóa dữ liệu: Yêu cầu xóa vĩnh viễn dữ liệu của mình khỏi hệ thống của Chúng tôi.",
                "Quyền hạn chế xử lý: Yêu cầu giới hạn phạm vi hoặc hạn chế cách thức sử dụng dữ liệu.",
                "Quyền cung cấp dữ liệu: Yêu cầu HAQ FOOD cung cấp lại bản sao dữ liệu cá nhân ở định dạng chuẩn.",
                "Quyền phản đối xử lý: Phản đối việc xử lý dữ liệu cho các mục đích tiếp thị, quảng cáo.",
                "Quyền khiếu nại, tố cáo, khởi kiện: Thực hiện khiếu nại theo pháp luật khi phát hiện vi phạm.",
                "Quyền yêu cầu bồi thường thiệt hại: Yêu cầu bồi thường theo luật khi có thiệt hại thực tế do vi phạm bảo mật.",
                "Quyền tự bảo vệ: Tự bảo vệ dữ liệu hoặc yêu cầu cơ quan có thẩm quyền bảo vệ theo luật định."
              ]
            }
          ]
        },
        {
          "id": "section-8",
          "num": "08",
          "title": "04 Nghĩa Vụ Của Chủ Thể Dữ Liệu (Điều 10 NĐ 13)",
          "content": [
            {
              "type": "p",
              "text": "Căn cứ Điều 10 Nghị định 13/2023/NĐ-CP, để đảm bảo an toàn thông tin chung, Quý khách có các nghĩa vụ:"
            },
            {
              "type": "ul",
              "items": [
                "Tự bảo vệ dữ liệu cá nhân của mình; chủ động áp dụng các biện pháp an toàn khi sử dụng mạng internet.",
                "Tôn trọng và bảo vệ dữ liệu cá nhân của người khác, tuyệt đối không mạo danh hoặc cung cấp thông tin sai lệch.",
                "Cung cấp thông tin đầy đủ, chính xác khi đồng ý cho phép xử lý dữ liệu và chịu trách nhiệm về thông tin đã cung cấp.",
                "Nghiêm túc tuân thủ các quy định của pháp luật Việt Nam về bảo vệ dữ liệu cá nhân và an ninh mạng."
              ]
            }
          ]
        },
        {
          "id": "section-9",
          "num": "09",
          "title": "Chính Sách Bảo Vệ Dữ Liệu Cá Nhân Của Trẻ Em",
          "content": [
            {
              "type": "p",
              "text": "Sản phẩm của HAQ FOOD phục vụ cộng đồng, tuy nhiên website haq.com.vn không chủ đích thu thập dữ liệu cá nhân của trẻ em (người dưới 16 tuổi). Việc cung cấp thông tin của người dưới 16 tuổi phải có sự đồng ý của cha mẹ hoặc người giám hộ hợp pháp theo Điều 19 và Điều 20 Nghị định 13/2023/NĐ-CP. Nếu phát hiện dữ liệu trẻ em chưa có sự đồng ý hợp lệ, HAQ FOOD sẽ xóa dữ liệu ngay lập tức khỏi hệ thống."
            }
          ]
        },
        {
          "id": "section-10",
          "num": "10",
          "title": "Chính Sách Cookie & Công Nghệ Theo Dõi Kỹ Thuật Số",
          "content": [
            {
              "type": "p",
              "text": "Website sử dụng Cookie thiết yếu (để duy trì bảo mật phiên và tùy chọn ngôn ngữ hiển thị) và Cookie phân tích ẩn danh (đo lường lưu lượng để tối ưu tốc độ và chất lượng hiển thị). Quý khách có toàn quyền chấp nhận, từ chối hoặc xóa cookie trong phần cài đặt trình duyệt web bất cứ lúc nào."
            }
          ]
        },
        {
          "id": "section-11",
          "num": "11",
          "title": "Biện Pháp Bảo Mật An Ninh & Ứng Phó Sự Cố (A05)",
          "content": [
            {
              "type": "p",
              "text": "Hệ thống website áp dụng mã hóa đường truyền SSL/TLS 256-bit, tường lửa bảo vệ máy chủ và phân quyền nội bộ nghiêm ngặt. Trong tình huống phát sinh sự cố lộ lọt dữ liệu do tấn công mạng bất khả kháng:"
            },
            {
              "type": "ul",
              "items": [
                "HAQ FOOD lập tức kích hoạt quy trình kỹ thuật cô lập sự cố trong vòng 01 giờ.",
                "Gửi văn bản thông báo sự cố cho Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (A05) - Bộ Công an trong thời hạn chậm nhất 72 giờ theo Điều 23 Nghị định 13/2023/NĐ-CP.",
                "Thông báo công khai trên website và gửi cảnh báo trực tiếp đến các khách hàng chịu ảnh hưởng kèm hướng dẫn tự bảo vệ an toàn."
              ]
            }
          ]
        },
        {
          "id": "section-12",
          "num": "12",
          "title": "Quy Trình Tiếp Nhận, Khiếu Nại & Cam Kết SLA",
          "content": [
            {
              "type": "p",
              "text": "Quý khách hàng có thể thực hiện quyền dữ liệu hoặc gửi khiếu nại qua email info@haq.com.vn hoặc tổng đài 024 23 23 56 56. HAQ FOOD cam kết lộ trình xử lý (SLA) minh bạch:"
            },
            {
              "type": "ul",
              "items": [
                "Thời hạn phản hồi tiếp nhận ban đầu: Trong vòng 72 giờ làm việc kể từ thời điểm nhận được yêu cầu.",
                "Thời hạn hoàn tất xử lý (trích xuất, hiệu chỉnh hoặc xóa dữ liệu): Tối đa không quá 14 ngày làm việc.",
                "Trường hợp không thỏa đáng, Quý khách có quyền khiếu nại tới Cục An toàn thông tin, Cục A05 - Bộ Công an hoặc khởi kiện tại Tòa án nhân dân có thẩm quyền."
              ]
            }
          ]
        },
        {
          "id": "section-13",
          "num": "13",
          "title": "Thông Tin Đơn Vị Thu Thập & Quản Lý Dữ Liệu",
          "isContact": true
        }
      ]
    },
    "en": {
      "docTitle": "Privacy & Personal Data Protection Policy | HAQ FOOD",
      "breadcrumbs": {
        "home": "Home",
        "category": "Legal & Policy",
        "current": "Privacy Policy"
      },
      "badge": "",
      "title": "PRIVACY POLICY & PERSONAL DATA PROTECTION | HAQ FOOD",
      "intro": "",
      "tocTitle": "PRIVACY DIRECTORY",
      "supportBox": {
        "title": "Legal & Data Protection Bureau",
        "desc": "For official data inquiries, subject access, rectification, or erasure requests, please contact our Compliance Bureau.",
        "email": "info@haq.com.vn"
      },
      "contactBox": {
        "company": "HAQ FOOD HANOI JOINT STOCK COMPANY",
        "addressLabel": "Headquarters:",
        "address": "No. 30, Lane 1 Pham Tuan Tai Street, Nghia Do Ward, Hanoi City, Vietnam",
        "hotlineLabel": "Hotline:",
        "zaloLabel": "Official Zalo:",
        "zaloName": "HAQ Hanoi",
        "zaloNote": "(+84 993 308 319)",
        "emailLabel": "Inquiry Email:",
        "email": "info@haq.com.vn",
        "taxCodeLabel": "Enterprise Code / Tax ID:",
        "taxCode": "0109547016 (Issued by Hanoi DPI on March 11, 2021)"
      },
      "sections": [
        {
          "id": "section-1",
          "num": "01",
          "title": "Legal Roles & Regulatory Capacity of HAQ FOOD",
          "content": [
            {
              "type": "p",
              "text": "Under Vietnam Decree No. 13/2023/ND-CP on Personal Data Protection, HAQ FOOD HANOI JSC operates under two concurrent statutory capacities regarding all website operations and commercial engagements:"
            },
            {
              "type": "ul",
              "items": [
                "Data Controller: Determining the lawful purposes and technical means of personal data processing.",
                "Data Processor: Directly conducting data collection, recording, structuring, storage, adaptation, and technical safeguards."
              ]
            }
          ]
        },
        {
          "id": "section-2",
          "num": "02",
          "title": "Classification & Categories of Data Collected",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD collects strictly necessary, minimal data required for commercial correspondence, wholesale inquiries, and service delivery:"
            },
            {
              "type": "ul",
              "items": [
                "Identity & Contact Details: Full name of representative, job title, company/distributor/supermarket name, phone number, email address, corporate registered address, delivery location.",
                "B2B Commercial Requirements: Target packaged snack product lines (HOKI rice paper, fresh mung bean cake, gourmet popcorn, beef jerky...), estimated order volume, target market, custom OEM/ODM packaging requests.",
                "Financial & Settlement Details: Corporate bank account numbers, branch details for billing reconciliation, electronic contract settlement, or verified refunds.",
                "Automated Telemetry: IP address, browser type, operating system, timestamped session metrics, and aggregated navigational logs to optimize platform responsiveness."
              ]
            },
            {
              "type": "p",
              "text": "HAQ FOOD strictly refrains from collecting sensitive personal data (such as political affiliations, religious beliefs, biometrics, health records, or criminal histories)."
            }
          ]
        },
        {
          "id": "section-3",
          "num": "03",
          "title": "Lawful Purposes of Data Processing",
          "content": [
            {
              "type": "p",
              "text": "All collected records are processed transparently for the following legitimate commercial and operational purposes:"
            },
            {
              "type": "ul",
              "items": [
                "Furnishing wholesale pricing quotations, transmitting corporate capacity profiles, and assigning designated B2B sales representatives.",
                "Validating orders, drafting commercial and OEM/ODM manufacturing contracts, issuing statutory VAT e-invoices, and executing food logistics.",
                "Upholding ISO 22000 & HACCP food quality assurance, handling warranty claims, product returns, and refund verifications.",
                "Distributing notifications regarding revised distributor incentives or newly developed product lines (only upon voluntary opt-in consent).",
                "Safeguarding digital infrastructure against fraud, cyber intrusions, and unauthorized platform exploitation."
              ]
            }
          ]
        },
        {
          "id": "section-4",
          "num": "04",
          "title": "Consent Mechanism & Right to Withdraw Consent",
          "content": [
            {
              "type": "p",
              "text": "Consent is obtained through affirmative, explicit actions when users voluntarily submit quotation forms or opt-in checkboxes on the website. Users reserve full rights to withdraw consent at any time via written notice to info@haq.com.vn without compromising the legality of prior processing."
            }
          ]
        },
        {
          "id": "section-5",
          "num": "05",
          "title": "Third-Party Disclosure & Data Transfer",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD maintains a strict policy never to sell, rent, or trade client data for commercial gain. Data is shared exclusively on a minimal need-to-know basis with:"
            },
            {
              "type": "ul",
              "items": [
                "Logistics & Freight Partners: Providing strictly recipient name, telephone number, and delivery destination for order fulfillment.",
                "Cloud Infrastructure Providers: Storing records on enterprise-grade, encrypted servers adhering to international security standards.",
                "State Statutory Authorities: Disclosing data solely upon mandatory, formal written warrants by Vietnamese judicial or police agencies."
              ]
            }
          ]
        },
        {
          "id": "section-6",
          "num": "06",
          "title": "Retention Periods & Safe Disposal of Data",
          "content": [
            {
              "type": "p",
              "text": "Personal records are maintained throughout the active duration of commercial cooperation or until a verified deletion request is received. Accounting documentation, tax invoices, and sales contracts are retained for a statutory minimum of 10 years pursuant to the Vietnam Accounting Law. Expired records are irreversibly and permanently deleted."
            }
          ]
        },
        {
          "id": "section-7",
          "num": "07",
          "title": "Complete 11 Legal Rights of Data Subjects",
          "content": [
            {
              "type": "p",
              "text": "In full accordance with Article 9 of Decree No. 13/2023/ND-CP, clients possess 11 fundamental statutory rights:"
            },
            {
              "type": "ol",
              "items": [
                "Right to be informed: Comprehensive knowledge of processing operations.",
                "Right to give consent: Voluntary decision to permit data processing.",
                "Right of access: Reviewing, inspecting, or requesting rectification of personal records.",
                "Right to withdraw consent: Revoking previously granted processing approvals.",
                "Right to erasure: Demanding permanent removal of data from active systems.",
                "Right to restriction of processing: Limiting scope or manner of data usage.",
                "Right to data portability: Receiving personal copies in standard formats.",
                "Right to object: Prohibiting processing for direct marketing or profiling.",
                "Right to lodge complaints & take legal action: Initiating grievances against violations.",
                "Right to claim damages: Seeking compensation for demonstrated unlawful losses.",
                "Right to self-defense: Exercising self-protection or requesting statutory enforcement."
              ]
            }
          ]
        },
        {
          "id": "section-8",
          "num": "08",
          "title": "04 Mandatory Obligations of Data Subjects",
          "content": [
            {
              "type": "p",
              "text": "Pursuant to Article 10 of Decree No. 13/2023/ND-CP, users bear reciprocal legal obligations:"
            },
            {
              "type": "ul",
              "items": [
                "Proactively safeguarding personal credentials and exercising reasonable cybersecurity precautions.",
                "Respecting others data privacy, refraining from submitting fraudulent or third-party details without consent.",
                "Providing accurate, verifiable data and assuming full legal responsibility for submitted information.",
                "Strictly adhering to Vietnamese cybersecurity and data protection legislation."
              ]
            }
          ]
        },
        {
          "id": "section-9",
          "num": "09",
          "title": "Protection of Children's Personal Data",
          "content": [
            {
              "type": "p",
              "text": "While HAQ FOOD products are widely enjoyed, haq.com.vn does not deliberately collect personal data from individuals under 16 years of age. Any submission by a minor requires prior verification and consent from parents or legal guardians pursuant to Articles 19 and 20 of Decree 13/2023/ND-CP. Unverified minor data is erased immediately upon discovery."
            }
          ]
        },
        {
          "id": "section-10",
          "num": "10",
          "title": "Cookie Policy & Digital Tracking Technologies",
          "content": [
            {
              "type": "p",
              "text": "Our website utilizes essential cookies (to ensure secure sessions and remember language preferences) and anonymous analytical cookies (to evaluate performance and enhance page speeds). Visitors retain complete autonomy to accept, block, or delete cookies via their browser preferences."
            }
          ]
        },
        {
          "id": "section-11",
          "num": "11",
          "title": "Cybersecurity Safeguards & Data Breach Protocol (A05)",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD employs SSL/TLS 256-bit encryption, cloud firewalls, and role-based access controls. In the event of an unforeseen security breach:"
            },
            {
              "type": "ul",
              "items": [
                "Technical containment measures are initiated within 01 hour of breach identification.",
                "Formal incident reports are submitted to the Cybersecurity and High-Tech Crime Prevention Department (A05) - Ministry of Public Security within 72 hours under Article 23 of Decree 13/2023/ND-CP.",
                "Direct alerts and public disclosures are issued to affected parties alongside recommended countermeasures."
              ]
            }
          ]
        },
        {
          "id": "section-12",
          "num": "12",
          "title": "Grievance Redressal Mechanism & SLA Commitment",
          "content": [
            {
              "type": "p",
              "text": "Clients may assert statutory rights or lodge privacy complaints via info@haq.com.vn or hotline (+84) 24 23 23 56 56 under the following Service Level Agreement (SLA):"
            },
            {
              "type": "ul",
              "items": [
                "Initial response confirmation: Within 72 business hours upon receipt of valid requests.",
                "Complete resolution timeline (rectification, extraction, erasure): Not exceeding 14 working days.",
                "Unresolved grievances may be escalated to the Department of Information Security, Ministry of Public Security (A05), or competent Vietnamese courts."
              ]
            }
          ]
        },
        {
          "id": "section-13",
          "num": "13",
          "title": "Data Controller Identification & Contact",
          "isContact": true
        }
      ]
    },
    "ko": {
      "docTitle": "개인정보 처리방침 | HAQ FOOD",
      "breadcrumbs": {
        "home": "홈",
        "category": "법률 및 정책",
        "current": "개인정보 처리방침"
      },
      "badge": "",
      "title": "개인정보 처리방침 및 데이터 보호 정책 | HAQ FOOD",
      "intro": "",
      "tocTitle": "개인정보 보호 목차",
      "supportBox": {
        "title": "법무 및 개인정보 보호팀",
        "desc": "개인정보 열람, 정정, 처리 정지 또는 영구 삭제 요청은 공식 이메일로 접수해 주시기 바랍니다.",
        "email": "info@haq.com.vn"
      },
      "contactBox": {
        "company": "HAQ 하노이 주식회사 (HAQ FOOD HANOI JSC)",
        "addressLabel": "본사 주소:",
        "address": "베트남 하노이시 꺼우저이구 응이어도방 팜뚜언따이 1골목 30호",
        "hotlineLabel": "대표 핫라인:",
        "zaloLabel": "공식 Zalo:",
        "zaloName": "HAQ Hà Nội",
        "zaloNote": "(+84 993 308 319)",
        "emailLabel": "접수 이메일:",
        "email": "info@haq.com.vn",
        "taxCodeLabel": "사업자 등록번호:",
        "taxCode": "0109547016 (2021.03.11 하노이시 기획투자국 발급)"
      },
      "sections": [
        {
          "id": "section-1",
          "num": "01",
          "title": "HAQ FOOD의 법적 지위 및 역할",
          "content": [
            {
              "type": "p",
              "text": "베트남 개인정보보호 시행령 제13/2023/ND-CP호에 따라 HAQ FOOD는 웹사이트 운영 및 B2B 상거래와 관련하여 다음 두 가지 법적 지위를 동시에 보유합니다:"
            },
            {
              "type": "ul",
              "items": [
                "개인정보 통제자 (Data Controller): 개인정보의 수집 및 처리 목적과 수단을 독자적으로 결정합니다.",
                "개인정보 처리자 (Data Processor): 안전한 내부 전산 시스템을 통해 수집, 저장, 가공, 보호 업무를 직접 수행합니다."
              ]
            }
          ]
        },
        {
          "id": "section-2",
          "num": "02",
          "title": "수집하는 정보 항목 및 분류",
          "content": [
            {
              "type": "p",
              "text": "원활한 도매 상담, OEM/ODM 계약 및 고객 응대를 위해 필요한 최소한의 정보만을 수집합니다:"
            },
            {
              "type": "ul",
              "items": [
                "신원 및 연락처 정보: 담당자 성명, 직책, 회사/대리점/유통사명, 전화번호, 이메일, 사업장 및 납품 배송지 주소.",
                "B2B 상거래 정보: 관심 스낵 식품군(HOKI 라이스페이퍼, 즉석 녹두 케이크, 하이테크 팝콘, 매콤 건조 소고기 등), 예상 발주량, 유통 국가, 맞춤형 라벨 OEM 요구 사양.",
                "금융 및 정산 정보: 대금 정산, 거래 대조 및 반품 환불을 위한 은행명, 계좌번호 및 예금주 정보.",
                "자동 수집 기술 로그: 웹 브라우징 최적화 및 보안 강화를 위한 접속 IP 주소, 브라우저 유형, 접속 시간 및 방문 경로 통계."
              ]
            },
            {
              "type": "p",
              "text": "HAQ FOOD는 종교, 정치 성향, 생체 인식, 의료 건강 기록 등 민감한 개인정보를 일체 수집하지 않습니다."
            }
          ]
        },
        {
          "id": "section-3",
          "num": "03",
          "title": "개인정보의 적법한 이용 목적",
          "content": [
            {
              "type": "ul",
              "items": [
                "B2B 도매 단가표 제공, 공식 제품 카탈로그 발송 및 전담 해외영업/국내영업 부서 배정.",
                "발주 확인, 상거래 및 OEM 계약 체결, 공식 세금계산서 발행 및 물류 배송 업무 조율.",
                "ISO 22000 및 HACCP 기준에 따른 품질 피드백 수렴, 반품 접수 및 환불 절차 이행.",
                "신규 프로모션 및 신제품 출시 안내 (사전 동의 고객에 한함).",
                "웹사이트 보안 위협 차단, 사이버 부정 행위 방지 및 전산 인프라 안정성 유지."
              ]
            }
          ]
        },
        {
          "id": "section-4",
          "num": "04",
          "title": "동의 메커니즘 및 동의 철회권",
          "content": [
            {
              "type": "p",
              "text": "이용자의 동의는 견적 문의 폼 제출 또는 웹사이트 체크박스 선택 등 능동적이고 명시적인 방식을 통해서만 수집됩니다. 이용자는 언제든지 info@haq.com.vn으로 서면 또는 이메일을 발송하여 동의를 철회할 수 있습니다."
            }
          ]
        },
        {
          "id": "section-5",
          "num": "05",
          "title": "개인정보의 제3자 제공 제한",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD는 고객 정보를 제3자에게 판매, 양도 또는 상업적으로 거래하지 않습니다. 다음 필수 업무 범위 내에서만 제한적으로 공유됩니다:"
            },
            {
              "type": "ul",
              "items": [
                "운송 및 물류 제휴사: 안전한 상품 인도를 위해 수취인 성명, 연락처, 배송지 주소에 한정하여 제공.",
                "클라우드 인프라 제공업체: 국제 보안 표준을 충족하는 암호화된 서버에 안전하게 저장.",
                "사법 및 세무 관할 당국: 베트남 법령에 따른 관계 당국의 정식 서면 요청이 있는 경우에 한함."
              ]
            }
          ]
        },
        {
          "id": "section-6",
          "num": "06",
          "title": "개인정보의 보유 및 안전한 파기 기한",
          "content": [
            {
              "type": "p",
              "text": "개인정보는 비즈니스 관계 유지 기간 동안 안전하게 보존되며 이용자의 삭제 요청 시 지체 없이 파기됩니다. 단, 세금계산서 및 무역 계약 증빙은 베트남 회계법에 따라 10년간 의무 보존 후 복구 불가능한 방식으로 영구 파기됩니다."
            }
          ]
        },
        {
          "id": "section-7",
          "num": "07",
          "title": "정보주체의 11가지 법적 권리 (시행령 제13호)",
          "content": [
            {
              "type": "ol",
              "items": [
                "알 권리: 본인의 개인정보 처리 활동에 대해 명확히 안내받을 권리.",
                "동의할 권리: 정보 처리에 대한 동의 여부를 자유롭게 결정할 권리.",
                "접근 및 열람권: 기등록된 본인의 정보를 열람하고 정정을 요구할 권리.",
                "동의 철회권: 기부여한 정보 처리 동의를 언제든지 철회할 권리.",
                "삭제 요구권: 당사 시스템에서 개인정보의 영구 삭제를 요구할 권리.",
                "처리 제한권: 특정 목적 또는 범위에 한하여 처리를 제한하도록 요구할 권리.",
                "정보 제공 요구권: 본인의 데이터를 표준 전자 형식으로 교부받을 권리.",
                "처리 거부권: 마케팅 또는 광고 목적의 정보 처리를 거부할 권리.",
                "이의 신청 및 고소·제소권: 법령 위반 행위에 대해 당국에 고소 또는 제소할 권리.",
                "손해배상 청구권: 위법한 개인정보 침해로 발생한 실질적 손해의 배상을 청구할 권리.",
                "자기 방어권: 법률이 정하는 바에 따라 자신의 개인정보를 스스로 보호할 권리."
              ]
            }
          ]
        },
        {
          "id": "section-8",
          "num": "08",
          "title": "정보주체의 4가지 법적 의무",
          "content": [
            {
              "type": "ul",
              "items": [
                "인터넷 이용 시 본인의 개인정보를 스스로 주의하여 보호할 의무.",
                "타인의 개인정보를 존중하며, 타인의 명의를 도용하거나 허위 정보를 제공하지 않을 의무.",
                "견적 요청 및 계약 체결 시 진실되고 정확한 정보를 제공할 의무.",
                "베트남 개인정보 보호 및 사이버 보안 관련 법령을 성실히 준수할 의무."
              ]
            }
          ]
        },
        {
          "id": "section-9",
          "num": "09",
          "title": "만 16세 미만 아동의 개인정보 보호",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD 공식 웹사이트는 만 16세 미만 아동의 개인정보를 고의로 수집하지 않습니다. 미성년자의 정보 제공은 법정대리인의 명시적 동의가 요구되며, 무단 등록 확인 시 즉시 영구 파기 조치합니다."
            }
          ]
        },
        {
          "id": "section-10",
          "num": "10",
          "title": "쿠키(Cookie) 및 추적 기술 운용",
          "content": [
            {
              "type": "p",
              "text": "웹사이트는 필수 보안 세션 유지 및 다국어 환경 설정을 위한 필수 쿠키와 성능 최적화용 익명 분석 쿠키를 운용합니다. 이용자는 브라우저 설정을 통해 쿠키 허용 여부를 자유롭게 설정할 수 있습니다."
            }
          ]
        },
        {
          "id": "section-11",
          "num": "11",
          "title": "보안 대책 및 유출 사고 대응 (베트남 공안부 A05 보고)",
          "content": [
            {
              "type": "p",
              "text": "SSL/TLS 256-bit 통신 암호화 및 엄격한 방화벽을 운용합니다. 사이버 공격 등으로 인한 유출 사고 발생 시:"
            },
            {
              "type": "ul",
              "items": [
                "사고 인지 후 1시간 이내에 기술적 격리 및 비상 복구 조치를 즉시 가동합니다.",
                "베트남 시행령 제13호 제23조에 의거, 최장 72시간 이내에 베트남 공안부 사이버보안국(A05)에 공식 서면 보고합니다.",
                "영향을 받는 이용자에게 신속히 개별 통지하고 피해 예방 가이드를 제공합니다."
              ]
            }
          ]
        },
        {
          "id": "section-12",
          "num": "12",
          "title": "민원 접수 및 처리 기한 (SLA)",
          "content": [
            {
              "type": "ul",
              "items": [
                "접수 확인 회신: 정식 접수 후 영업일 기준 72시간 이내 1차 확인 통지.",
                "완료 처리 기한: 정정, 열람 또는 삭제 요구 접수 후 영업일 기준 최대 14일 이내 처리 완료.",
                "원만한 해결이 어려운 경우 관할 당국이나 법원에 구제 절차를 신청할 수 있습니다."
              ]
            }
          ]
        },
        {
          "id": "section-13",
          "num": "13",
          "title": "개인정보 보호 문의처",
          "isContact": true
        }
      ]
    },
    "zh": {
      "docTitle": "隐私与个人信息保护政策 | HAQ FOOD",
      "breadcrumbs": {
        "home": "首页",
        "category": "法律合规与政策",
        "current": "隐私保护政策"
      },
      "badge": "",
      "title": "信息安全与个人数据保护政策 | HAQ FOOD",
      "intro": "",
      "tocTitle": "政策目录",
      "supportBox": {
        "title": "合规法务与数据保护组",
        "desc": "查询、提取、更正或申请永久删除个人商业信息，请直接联系官方合规邮箱。",
        "email": "info@haq.com.vn"
      },
      "contactBox": {
        "company": "CÔNG TY CỔ PHẦN HAQ HÀ NỘI (河内 HAQ 股份公司)",
        "addressLabel": "公司总部地址：",
        "address": "越南河内市义都坊范俊才路1巷30号",
        "hotlineLabel": "热线电话：",
        "zaloLabel": "官方 Zalo OA：",
        "zaloName": "HAQ Hà Nội",
        "zaloNote": "(+84 993 308 319)",
        "emailLabel": "处理邮箱：",
        "email": "info@haq.com.vn",
        "taxCodeLabel": "统一企业税号：",
        "taxCode": "0109547016（河内市计划与投资局于 2021年03月11日 核发）"
      },
      "sections": [
        {
          "id": "section-1",
          "num": "01",
          "title": "HAQ FOOD 的法律地位与法定角色",
          "content": [
            {
              "type": "p",
              "text": "依据越南第 13/2023/ND-CP 号议定，在官网运营和开展 B2B 商贸合作中，河内 HAQ 股份公司同时承担两项法定义务与角色："
            },
            {
              "type": "ul",
              "items": [
                "数据控制者 (Data Controller)：依法自主决定个人信息处理的目的与技术实施方案。",
                "数据处理者 (Data Processor)：依托内部严格规范的信息系统，实施数据采集、录入、分类、存储、更正与安全防护。"
              ]
            }
          ]
        },
        {
          "id": "section-2",
          "num": "02",
          "title": "收集的数据类别与分类明细",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD 仅出于正当商业沟通与履约所需，收集最必要的基础数据："
            },
            {
              "type": "ul",
              "items": [
                "身份与联系方式：业务负责人姓名、职务、企业/分销商名称、联系电话、电子邮箱、企业地址及货物交收地址。",
                "B2B 商业合作需求：所关注的包装休闲食品系列（HOKI 拌米纸、鲜绿豆糕、高新膨化爆米花、风味辣牛肉干等）、预计采购量、目标销售区域、专属 OEM/ODM 贴牌定制要求。",
                "财务与结算信息：对公银行账户信息，用于对账结算、开具增值税专用发票或办理退换货退款。",
                "网络自动化技术日志：为提升网页加载速度与防范黑客攻击所记录的访问 IP 地址、浏览器版本、操作系统及匿名访问行为数据。"
              ]
            },
            {
              "type": "p",
              "text": "HAQ FOOD 绝不主动采集任何敏感个人信息（如政治见解、宗教信仰、生物识别、医疗健康或犯罪历史记录）。"
            }
          ]
        },
        {
          "id": "section-3",
          "num": "03",
          "title": "合法的数据处理目的",
          "content": [
            {
              "type": "ul",
              "items": [
                "提供批发梯级报价单、发送工厂生产资质与产品图册，并协调专属大客户经理对接。",
                "确认大宗采购订单、签订商贸与代工合同、开具法定财务发票并调度食品物流配送。",
                "跟进 ISO 22000 与 HACCP 国际食品标准品控反馈，依规受理退换货与退款审核。",
                "向自愿订阅的客户发送重大展会动态、新品推介及经销商优惠政策。",
                "加强网络安全基础设施，防范数字欺诈与黑客恶意攻击。"
              ]
            }
          ]
        },
        {
          "id": "section-4",
          "num": "04",
          "title": "知情同意机制与撤回同意方式",
          "content": [
            {
              "type": "p",
              "text": "用户通过主动填写并提交咨询表单表达明确知情同意。用户享有随时通过发送邮件至 info@haq.com.vn 撤回同意的权利，撤回前已依法开展的处理行为依然有效。"
            }
          ]
        },
        {
          "id": "section-5",
          "num": "05",
          "title": "向第三方提供与共享数据的范围",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD 严正声明绝不向任何第三方出售、出租或交易客户信息。仅在以下必要范围内最小限度提供："
            },
            {
              "type": "ul",
              "items": [
                "仓储物流合作方：仅提供收件人姓名、联系电话与收货地址以完成安全准时交付。",
                "云端技术提供商：由国际高标准云服务器对数据进行加密存储。",
                "国家法定主管机关：仅在越南公安、检察院、法院或税务等部门出具正式法律文书时配合提供。"
              ]
            }
          ]
        },
        {
          "id": "section-6",
          "num": "06",
          "title": "数据存储期限与安全销毁机制",
          "content": [
            {
              "type": "p",
              "text": "个人商业数据将在维持合作关系期间或接到有效注销通知前安全留存。商业合同与税务发票等凭据将依照越南《会计法》规定法定保存至少 10 年，期满后进行不可逆彻底销毁。"
            }
          ]
        },
        {
          "id": "section-7",
          "num": "07",
          "title": "数据主体的 11 项法定权利（依据第 13 号议定）",
          "content": [
            {
              "type": "ol",
              "items": [
                "知情权：全面获知个人信息处理的方式与范围。",
                "同意权：自主决定是否允许处理相关数据。",
                "查阅与访问权：查阅、核对或要求更正已提交的信息。",
                "撤回同意权：随时撤回原先作出的授权许可。",
                "删除权：要求彻底删除本人的数据信息。",
                "限制处理权：要求限制特定处理场景或范围。",
                "数据获取权：要求以标准通用电子格式获取副本。",
                "反对处理权：拒绝用于直接商业营销与推广。",
                "投诉控告与诉讼权：发现侵权事实依法向有关部门投诉或起诉。",
                "损害赔偿请求权：因违法侵权造成实质损失时主张赔偿。",
                "自我保护权：依法实施自卫或请求司法行政机关予以保护。"
              ]
            }
          ]
        },
        {
          "id": "section-8",
          "num": "08",
          "title": "数据主体的 4 项法定义务",
          "content": [
            {
              "type": "ul",
              "items": [
                "在网络环境中自觉采取必要措施保管和保护自身数据。",
                "尊重他人隐私权利，严禁假冒或冒用他人信息进行登记。",
                "确保填报的信息真实、准确，并自担对应法律后果。",
                "严格遵守越南关于网络安全与个人数据保护的各项法律法规。"
              ]
            }
          ]
        },
        {
          "id": "section-9",
          "num": "09",
          "title": "未成年人个人信息专项保护政策",
          "content": [
            {
              "type": "p",
              "text": "HAQ FOOD 官网不以未满 16 周岁的未成年人为目标采集对象。若有未成年人提供信息，必须经得其父母或法定监护人的明确同意。一经核实未获得授权，将在 24 小时内彻底清除。"
            }
          ]
        },
        {
          "id": "section-10",
          "num": "10",
          "title": "Cookie 及数字化追踪技术说明",
          "content": [
            {
              "type": "p",
              "text": "官网部署必要型 Cookie（用于会话安全及保存中英越韩语言偏好）与匿名性能分析 Cookie。用户可通过所使用的浏览器设置随时自主管理、拦截或清除。"
            }
          ]
        },
        {
          "id": "section-11",
          "num": "11",
          "title": "网络安全防护措施与泄露应急处置（A05 报备）",
          "content": [
            {
              "type": "p",
              "text": "部署国际标准 SSL/TLS 256 位加密通道与高防防火墙。若发生不可抗力网络攻击引发的数据风险："
            },
            {
              "type": "ul",
              "items": [
                "在发现异常后 01 小时内迅速启动技术隔离与阻断方案。",
                "依据第 13 号议定第 23 条，在最长 72 小时内向越南公安部网络安全与高科技犯罪防治局（A05）报备。",
                "通过官方网站公告或直接邮件向受影响客户发布风险预警与防护指导。"
              ]
            }
          ]
        },
        {
          "id": "section-12",
          "num": "12",
          "title": "异议受理、投诉渠道与时效承诺 (SLA)",
          "content": [
            {
              "type": "ul",
              "items": [
                "首次受理反馈：在收到合法申请后 72 个工作小时内给予确认回复。",
                "最终办结时限：信息查阅、更正或注销处理最长不超过 14 个工作日。",
                "如处理结果未达预期，用户可依法向越南通信与传媒部、公安部或法院提起复核。"
              ]
            }
          ]
        },
        {
          "id": "section-13",
          "num": "13",
          "title": "数据控制单位基本信息与联系方式",
          "isContact": true
        }
      ]
    }
  },

  // =========================================================================
  // 3. ĐIỀU KHOẢN SỬ DỤNG
  // =========================================================================
  terms: {
  "vi": {
    "docTitle": "Điều Khoản Sử Dụng | HAQ FOOD",
    "breadcrumbs": {
      "home": "Trang chủ",
      "category": "Pháp lý & Chính sách",
      "current": "Điều khoản sử dụng"
    },
    "badge": "",
    "title": "ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ & THƯƠNG MẠI | HAQ FOOD",
    "intro": "",
    "tocTitle": "MỤC LỤC ĐIỀU KHOẢN",
    "supportBox": {
      "title": "Tư vấn pháp lý & B2B?",
      "desc": "Ban Pháp chế & Hợp tác doanh nghiệp HAQ FOOD sẵn sàng hỗ trợ bạn.",
      "phone": "024 23 23 56 56"
    },
    "contactBox": {
      "company": "CÔNG TY CỔ PHẦN HAQ HÀ NỘI",
      "taxCodeLabel": "Mã số thuế:",
      "taxCode": "0109547016 (Sở KH&ĐT TP. Hà Nội cấp ngày 11/03/2021)",
      "addressLabel": "Địa chỉ trụ sở:",
      "address": "Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam",
      "hotlineLabel": "Hotline:",
      "zaloLabel": "Zalo OA:",
      "zaloName": "HAQ Hà Nội",
      "zaloNote": "(0993 308 319)",
      "emailLabel": "Email pháp chế:",
      "email": "info@haq.com.vn"
    },
    "sections": [
      {
        "id": "section-1",
        "num": "01",
        "title": "Phạm Vi Áp Dụng & Hiệu Lực Ràng Buộc",
        "content": [
          {
            "type": "p",
            "text": "Điều khoản Sử dụng này (\"Điều khoản\") cấu thành thỏa thuận pháp lý có hiệu lực ràng buộc giữa cá nhân, tổ chức truy cập, khai thác thông tin (\"Người dùng\" hoặc \"Khách hàng\") và CÔNG TY CỔ PHẦN HAQ HÀ NỘI (\"HAQ FOOD\") liên quan đến việc sử dụng website chính thức tại địa chỉ haq.com.vn, bao gồm toàn bộ các tên miền phụ, trang sản phẩm, dịch vụ tương tác trực tuyến và các cổng thông tin liên kết."
          },
          {
            "type": "p",
            "text": "Bằng việc tiếp tục điều hướng, gửi yêu cầu báo giá, đăng ký nhận tài liệu sản phẩm hoặc xác lập giao dịch trên hệ thống, Người dùng xác nhận đã đọc kỹ, thấu hiểu và cam kết tuân thủ vô điều kiện toàn bộ quy định tại Điều khoản này. Trường hợp không đồng thuận với bất kỳ nội dung nào, Người dùng vui lòng chấm dứt ngay lập tức hành vi truy cập và khai thác website."
          }
        ]
      },
      {
        "id": "section-2",
        "num": "02",
        "title": "Tư Cách Doanh Nghiệp & Sở Hữu Website",
        "content": [
          {
            "type": "p",
            "text": "Website haq.com.vn là tài sản truyền thông, thương mại điện tử và xúc tiến thương mại chính thức, độc quyền thuộc quyền sở hữu, quản lý và vận hành của CÔNG TY CỔ PHẦN HAQ HÀ NỘI:"
          },
          {
            "type": "ul",
            "items": [
              "Tên pháp nhân: CÔNG TY CỔ PHẦN HAQ HÀ NỘI (Tên quốc tế: HAQ HANOI JOINT STOCK COMPANY; Tên viết tắt: HAQ FOOD).",
              "Mã số doanh nghiệp (MST): 0109547016 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp đăng ký lần đầu ngày 11/03/2021.",
              "Trụ sở chính: Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam.",
              "Lĩnh vực hoạt động cốt lõi: Sản xuất chế biến thực phẩm ăn liền chất lượng cao (bánh tráng HOKI, bắp rang bơ, bánh đậu xanh, bò khô), bán buôn B2B, gia công OEM/ODM và xuất khẩu thực phẩm."
            ]
          }
        ]
      },
      {
        "id": "section-3",
        "num": "03",
        "title": "Quyền Sở Hữu Trí Tuệ & Thương Hiệu",
        "content": [
          {
            "type": "p",
            "text": "Toàn bộ nội dung hiển thị trên website bao gồm nhưng không giới hạn ở: nhãn hiệu chữ, biểu trưng đồ họa HAQ FOOD, nhãn hiệu sản phẩm HOKI, slogan thương hiệu, hình ảnh chụp thực tế sản phẩm, video quy trình nhà máy, bao bì đóng gói thương phẩm, thiết kế giao diện đồ họa, mã nguồn và hệ thống cơ sở dữ liệu đều là tài sản trí tuệ độc quyền của HAQ FOOD hoặc bên cấp phép hợp pháp, được bảo hộ nghiêm ngặt theo Luật Sở hữu trí tuệ Việt Nam và các điều ước quốc tế về bản quyền."
          },
          {
            "type": "ul",
            "items": [
              "Quy định khai thác nội dung: Nghiêm cấm mọi hành vi sao chép, tải về, tái phân phối, chuyển nhượng, trích xuất dữ liệu tự động (data scraping), dịch ngược mã nguồn hoặc sử dụng hình ảnh sản phẩm của HAQ FOOD cho mục đích thương mại khi chưa có văn bản ủy quyền chính thức.",
              "Quyền của đại lý và đối tác phân phối: Các nhà phân phối, đại lý chính thức chỉ được quyền sử dụng các ấn phẩm truyền thông, catalogue và hình ảnh sản phẩm trong phạm vi cho phép đã quy định tại Hợp đồng phân phối hoặc Thư chấp thuận sử dụng thương hiệu bằng văn bản do HAQ FOOD cấp."
            ]
          }
        ]
      },
      {
        "id": "section-4",
        "num": "04",
        "title": "Quy Chuẩn Sử Dụng & Hành Vi Nghiêm Cấm",
        "content": [
          {
            "type": "p",
            "text": "Khi truy cập và sử dụng dịch vụ thông tin trên website haq.com.vn, Người dùng cam kết thực hiện đúng chuẩn mực văn hóa ứng xử trực tuyến và tuyệt đối không thực hiện các hành vi sau:"
          },
          {
            "type": "ul",
            "items": [
              "Gian lận danh tính: Cung cấp thông tin doanh nghiệp giả mạo, mạo danh đại diện pháp luật của cá nhân/tổ chức khác khi đăng ký trở thành đại lý hoặc yêu cầu báo giá B2B.",
              "Xâm phạm an ninh mạng: Phát tán mã độc, virus, phần mềm độc hại, thực hiện các cuộc tấn công từ chối dịch vụ (DoS/DDoS) hoặc xâm nhập trái phép hạ tầng máy chủ website.",
              "Trích xuất tự động trái phép: Sử dụng robot, bot mạng, công cụ quét tự động để thu thập dữ liệu giá sỉ, thông tin sản phẩm hoặc cấu trúc cơ sở dữ liệu của HAQ FOOD.",
              "Hành vi làm phương hại uy tín: Đăng tải hoặc lan truyền các thông tin xuyên tạc, bôi nhọ, cạnh tranh không lành mạnh gây ảnh hưởng tiêu cực đến danh dự, thương hiệu HAQ FOOD và các dòng sản phẩm bánh tráng HOKI."
            ]
          }
        ]
      },
      {
        "id": "section-5",
        "num": "05",
        "title": "Thông Tin Sản Phẩm, Báo Giá & Tính Minh Bạch B2B",
        "content": [
          {
            "type": "p",
            "text": "HAQ FOOD luôn nỗ lực cao nhất nhằm đảm bảo tính chuẩn xác tuyệt đối của mọi mô tả sản phẩm, thành phần dinh dưỡng, tiêu chuẩn đóng gói và hình ảnh bao bì công bố trên website."
          },
          {
            "type": "ul",
            "items": [
              "Tính chất thông tin tham khảo: Bảng giá bán buôn, chiết khấu đại lý, định lượng đóng gói và tiến độ sản xuất OEM công bố hoặc cung cấp trên website mang tính chất báo giá định hướng ban đầu, không thay thế cho Báo giá chính thức có đóng dấu hoặc Hợp đồng nguyên tắc được ký kết giữa hai bên.",
              "Thay đổi bao bì & quy cách: Do yêu cầu cải tiến liên tục về công nghệ và bảo quản, HAQ FOOD có quyền điều chỉnh bao bì, tem nhãn phụ hoặc định lượng nhỏ theo đúng tiêu chuẩn công bố chất lượng tại cơ quan quản lý nhà nước mà không cần thông báo trước trên từng trang web."
            ]
          }
        ]
      },
      {
        "id": "section-6",
        "num": "06",
        "title": "Xác Lập Đơn Hàng & Giao Kết Hợp Đồng Điện Tử",
        "content": [
          {
            "type": "p",
            "text": "Quy trình tiếp nhận đề nghị giao dịch trực tuyến trên hệ thống được thực hiện theo quy định của Luật Giao dịch điện tử 2023 và Nghị định số 52/2013/NĐ-CP (được sửa đổi bởi Nghị định số 85/2021/NĐ-CP) về thương mại điện tử:"
          },
          {
            "type": "ol",
            "items": [
              "Bước 1 - Tiếp nhận nhu cầu: Khách hàng gửi yêu cầu tư vấn sản phẩm, số lượng đặt hàng B2B, gia công OEM hoặc xuất khẩu thông qua biểu mẫu trực tuyến hoặc Hotline/Zalo chính thức.",
              "Bước 2 - Thẩm định & phản hồi: Chuyên viên kinh doanh của HAQ FOOD tiến hành xác minh thông tin, tư vấn chính sách giá sỉ, điều kiện vận chuyển và gửi Báo giá chính thức qua email/văn bản.",
              "Bước 3 - Ký kết hợp đồng: Đối với các đơn hàng thương mại, đại lý định kỳ hoặc đơn gia công số lượng lớn, giao dịch chỉ chính thức có hiệu lực ràng buộc khi hai bên ký kết Hợp đồng mua bán/Hợp đồng kinh tế bằng văn bản hoặc hợp đồng điện tử có chữ ký số hợp lệ theo quy định pháp luật."
            ]
          }
        ]
      },
      {
        "id": "section-7",
        "num": "07",
        "title": "Tiêu Chuẩn Chất Lượng, An Toàn Thực Phẩm & Nguồn Gốc",
        "content": [
          {
            "type": "p",
            "text": "Là doanh nghiệp sản xuất thực phẩm có trách nhiệm xã hội cao, HAQ FOOD cam kết toàn bộ sản phẩm xuất xưởng đều tuân thủ các quy chuẩn khắt khe:"
          },
          {
            "type": "ul",
            "items": [
              "Hệ thống quản lý quốc tế: Cơ sở sản xuất của HAQ FOOD vận hành theo hệ thống kiểm soát chất lượng chuẩn ISO 22000 và nguyên tắc an toàn thực phẩm HACCP Codex.",
              "Nguồn gốc minh bạch: 100% nguyên liệu đầu vào (gạo, bắp, gia vị, màng bọc thực phẩm) đều có hồ sơ kiểm nghiệm an toàn, chứng nhận xuất xứ (C/O) rõ ràng và kiểm định dư lượng nghiêm ngặt.",
              "Truy xuất nguồn gốc: Mỗi lô hàng xuất xưởng đều có mã định danh lô, ngày sản xuất (NSX), hạn sử dụng (HSD) và mã vạch chuẩn GS1 phục vụ tra cứu thông tin nhanh chóng trên cổng quốc gia."
            ]
          }
        ]
      },
      {
        "id": "section-8",
        "num": "08",
        "title": "Giao Nhận Hàng Hóa & Rủi Ro Vận Chuyển",
        "content": [
          {
            "type": "p",
            "text": "Việc giao nhận hàng hóa B2B, phân phối đại lý và bán buôn được quy định chi tiết trong hợp đồng hoặc thỏa thuận đặt hàng, tuân theo các nguyên tắc cơ bản:"
          },
          {
            "type": "ul",
            "items": [
              "Địa điểm bàn giao: Hàng hóa được bàn giao tại kho xuất của HAQ FOOD (theo điều kiện Ex-Works/FOB) hoặc giao tận kho khách hàng (theo thỏa thuận vận chuyển riêng trong hợp đồng).",
              "Chuyển giao rủi ro: Rủi ro mất mát hoặc hư hỏng hàng hóa được chuyển giao sang Khách hàng kể từ thời điểm đại diện Khách hàng hoặc đơn vị vận chuyển được ủy quyền ký vào Biên bản bàn giao kiêm Phiếu xuất kho.",
              "Kiểm tra tại chỗ: Bên nhận hàng có trách nhiệm đồng kiểm số lượng thùng, tình trạng niêm phong thùng carton, kiểm tra cảm quan bên ngoài và ghi nhận bằng văn bản/hình ảnh ngay tại thời điểm giao hàng nếu phát hiện sai lệch."
            ]
          }
        ]
      },
      {
        "id": "section-9",
        "num": "09",
        "title": "Liên Kết Nền Tảng Bên Thứ Ba",
        "content": [
          {
            "type": "p",
            "text": "Website của chúng tôi có thể dẫn nguồn hoặc tích hợp đường dẫn tới các nền tảng số của bên thứ ba, bao gồm: cổng thông tin Tổng cục Thuế Việt Nam, tài khoản Zalo Doanh nghiệp (Zalo OA), trang mạng xã hội chính thức và dịch vụ thanh toán/vận chuyển liên kết."
          },
          {
            "type": "p",
            "text": "Các liên kết này chỉ nhằm mục đích tối ưu hóa trải nghiệm tiện ích cho Người dùng. HAQ FOOD không nắm quyền kiểm soát nội dung, chính sách quyền riêng tư hay độ ổn định kỹ thuật của các bên thứ ba độc lập này và không chịu trách nhiệm liên đới đối với các tranh chấp phát sinh từ phía họ."
          }
        ]
      },
      {
        "id": "section-10",
        "num": "10",
        "title": "Miễn Trừ Trách Nhiệm & Giới Hạn Bồi Thường",
        "content": [
          {
            "type": "p",
            "text": "Trong phạm vi tối đa được pháp luật Việt Nam cho phép, HAQ FOOD được miễn trừ trách nhiệm dân sự trong các trường hợp sau:"
          },
          {
            "type": "ul",
            "items": [
              "Gián đoạn kỹ thuật bất khả kháng: Sự cố mất kết nối mạng viễn thông diện rộng, lỗi đường truyền internet quốc tế, tấn công mạng quy mô lớn hoặc hoạt động bảo trì định kỳ hạ tầng máy chủ của bên thứ ba.",
              "Bảo quản sản phẩm sai chỉ dẫn: Mọi suy giảm chất lượng, ẩm mốc, hư hỏng sản phẩm do đại lý, nhà phân phối hoặc người tiêu dùng bảo quản không đúng quy chuẩn in trên bao bì (tiếp xúc trực tiếp ánh nắng gay gắt, nơi ẩm ướt hoặc gần hóa chất gây mùi).",
              "Thiệt hại gián tiếp: HAQ FOOD không chịu trách nhiệm bồi thường cho bất kỳ khoản mất mát lợi nhuận kinh doanh, cơ hội thương mại hoặc thiệt hại gián tiếp nào phát sinh từ việc sử dụng hoặc không thể sử dụng website."
            ]
          }
        ]
      },
      {
        "id": "section-11",
        "num": "11",
        "title": "Sự Kiện Bất Khả Kháng",
        "content": [
          {
            "type": "p",
            "text": "Không bên nào bị coi là vi phạm nghĩa vụ giao hàng hoặc cung ứng dịch vụ nếu việc chậm trễ xuất phát trực tiếp từ Sự kiện Bất khả kháng theo quy định tại Bộ luật Dân sự Việt Nam (như thiên tai, bão lũ, hỏa hoạn, dịch bệnh, phong tỏa giao thông, cấm vận chính sách xuất nhập khẩu đột xuất hoặc yêu cầu khẩn cấp của cơ quan có thẩm quyền)."
          },
          {
            "type": "p",
            "text": "Bên chịu ảnh hưởng bởi Sự kiện Bất khả kháng có nghĩa vụ thông báo bằng văn bản hoặc phương tiện điện tử cho bên kia trong vòng 48 giờ kể từ khi sự kiện phát sinh và nỗ lực tối đa để hạn chế tối thiểu các thiệt hại phát sinh."
          }
        ]
      },
      {
        "id": "section-12",
        "num": "12",
        "title": "Luật Điều Chỉnh, Giải Quyết Tranh Chấp & Trọng Tài",
        "content": [
          {
            "type": "p",
            "text": "Điều khoản này và toàn bộ các quan hệ pháp lý, giao dịch thương mại phát sinh từ việc sử dụng website haq.com.vn được điều chỉnh, diễn giải và thi hành hoàn toàn theo pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam."
          },
          {
            "type": "ul",
            "items": [
              "Cơ chế thương lượng: Mọi tranh chấp, khiếu nại phát sinh trước hết phải được giải quyết thông qua đàm phán, hòa giải trên tinh thần tôn trọng quyền lợi của nhau.",
              "Thẩm quyền tài phán: Trong trường hợp các bên không đạt được thỏa thuận giải quyết hòa giải trong vòng 30 (ba mươi) ngày kể từ ngày phát sinh tranh chấp, một trong hai bên có quyền đưa vụ việc ra giải quyết tại Tòa án nhân dân có thẩm quyền tại Thành phố Hà Nội hoặc Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) theo quy định pháp luật."
            ]
          }
        ]
      },
      {
        "id": "section-13",
        "num": "13",
        "title": "Hiệu Lực, Sửa Đổi & Thông Tin Ban Pháp Chế",
        "isContact": true
      }
    ]
  },
  "en": {
    "docTitle": "Terms of Service | HAQ FOOD",
    "breadcrumbs": {
      "home": "Home",
      "category": "Legal & Policies",
      "current": "Terms of Service"
    },
    "badge": "",
    "title": "TERMS OF SERVICE & COMMERCIAL CONDITIONS | HAQ FOOD",
    "intro": "",
    "tocTitle": "TERMS OF SERVICE CONTENTS",
    "supportBox": {
      "title": "Need Legal or B2B Support?",
      "desc": "Our Legal Affairs & Corporate Partnership Department is at your disposal.",
      "phone": "+84 24 23 23 56 56"
    },
    "contactBox": {
      "company": "HAQ HANOI JOINT STOCK COMPANY",
      "taxCodeLabel": "Tax Identification Number:",
      "taxCode": "0109547016 (Issued by Hanoi Dept. of Planning & Investment on Mar 11, 2021)",
      "addressLabel": "Headquarters Address:",
      "address": "No. 30, Alley 1 Pham Tuan Tai, Nghia Do Ward, Cau Giay District, Hanoi City, Vietnam",
      "hotlineLabel": "Hotline:",
      "zaloLabel": "Zalo OA:",
      "zaloName": "HAQ Hanoi",
      "zaloNote": "(+84 993 308 319)",
      "emailLabel": "Legal Affairs Email:",
      "email": "info@haq.com.vn"
    },
    "sections": [
      {
        "id": "section-1",
        "num": "01",
        "title": "Scope of Application & Binding Effect",
        "content": [
          {
            "type": "p",
            "text": "These Terms of Service (\"Terms\") constitute a legally binding agreement between any individual or organization accessing and utilizing information on this website (\"User\" or \"Client\") and HAQ HANOI JOINT STOCK COMPANY (\"HAQ FOOD\") with respect to the official portal haq.com.vn, including all subdomains, product showcases, interactive web modules, and affiliated communications."
          },
          {
            "type": "p",
            "text": "By continuing navigation, submitting price requests, requesting product dossiers, or engaging in commercial inquiries, the User confirms that they have thoroughly read, understood, and agreed to adhere unconditionally to these Terms. If you do not agree with any part of these Terms, please immediately cease access and use of this website."
          }
        ]
      },
      {
        "id": "section-2",
        "num": "02",
        "title": "Corporate Identity & Ownership",
        "content": [
          {
            "type": "p",
            "text": "The website haq.com.vn is the official, exclusive digital property, e-commerce, and commercial promotion channel owned, managed, and operated by HAQ HANOI JOINT STOCK COMPANY:"
          },
          {
            "type": "ul",
            "items": [
              "Legal Name: HAQ HANOI JOINT STOCK COMPANY (Trading Name: HAQ FOOD).",
              "Enterprise Registration / Tax ID: 0109547016, first issued on March 11, 2021, by the Hanoi Department of Planning and Investment.",
              "Head Office: No. 30, Alley 1 Pham Tuan Tai, Nghia Do Ward, Cau Giay District, Hanoi City, Vietnam.",
              "Core Business: Industrial manufacturing of high-quality snack foods (HOKI rice paper rolls, popcorn, green bean cakes, beef jerky), B2B wholesale distribution, OEM/ODM contract manufacturing, and international food export."
            ]
          }
        ]
      },
      {
        "id": "section-3",
        "num": "03",
        "title": "Intellectual Property & Trademarks",
        "content": [
          {
            "type": "p",
            "text": "All visual and informational content published on this website—including brand names, HAQ FOOD graphic logos, HOKI trademarks, brand slogans, product photography, factory production footage, commercial packaging designs, graphical layouts, source code, and databases—is the exclusive intellectual property of HAQ FOOD or licensed partners, rigorously protected under the Law on Intellectual Property of Vietnam and international copyright treaties."
          },
          {
            "type": "ul",
            "items": [
              "Prohibition of Unauthorized Copying: Any replication, digital reproduction, redistribution, data scraping, decompilation, or commercial exploitation of HAQ FOOD brand assets without prior express written consent is strictly prohibited.",
              "Distributor and Partner Guidelines: Authorized wholesale distributors and retail partners are only granted permission to use marketing collaterals, product images, and catalogues strictly within the scope explicitly authorized in distribution agreements or official brand authorization letters issued by HAQ FOOD."
            ]
          }
        ]
      },
      {
        "id": "section-4",
        "num": "04",
        "title": "Permitted Use & Prohibited Conduct",
        "content": [
          {
            "type": "p",
            "text": "When browsing or communicating through haq.com.vn, Users agree to uphold standard digital ethics and refrain from engaging in any of the following prohibited activities:"
          },
          {
            "type": "ul",
            "items": [
              "Identity Fraud: Providing deceptive corporate credentials or misrepresenting legal authorization when inquiring about wholesale distributor status or OEM production quotes.",
              "Cybersecurity Violations: Distributing malware, trojans, executing Denial of Service (DoS/DDoS) attacks, or attempting unauthorized intrusion into server infrastructure.",
              "Automated Scraping: Deploying automated spiders, bots, or data harvesting scripts to mine pricing indices, technical specifications, or corporate databases.",
              "Defamatory Conduct: Disseminating fabricated, misleading, or unfair statements that disparage HAQ FOOD reputation or the HOKI product line."
            ]
          }
        ]
      },
      {
        "id": "section-5",
        "num": "05",
        "title": "Product Catalog, Quotations & B2B Transparency",
        "content": [
          {
            "type": "p",
            "text": "HAQ FOOD exercises rigorous care to ensure that product specifications, nutritional information, shelf-life indicators, packaging configurations, and visual assets are accurate and up to date."
          },
          {
            "type": "ul",
            "items": [
              "Informational Quotations: Wholesale rate sheets, volume discount brackets, packaging formats, and OEM turnaround times published on the website are indicative and preliminary. They do not constitute a definitive binding contract until formalized through a signed Purchase Order or Principal Commercial Agreement.",
              "Continuous Improvement: Due to ongoing manufacturing and barrier-packaging advancements, HAQ FOOD reserves the right to modify packaging visual details, secondary labels, or net weights in compliance with registered food safety declarations without prior individual public notice."
            ]
          }
        ]
      },
      {
        "id": "section-6",
        "num": "06",
        "title": "Order Placement & Electronic Contracting",
        "content": [
          {
            "type": "p",
            "text": "Receipt and processing of electronic transaction requests adhere strictly to the 2023 Law on Electronic Transactions and Decree No. 52/2013/ND-CP (amended by Decree No. 85/2021/ND-CP):"
          },
          {
            "type": "ol",
            "items": [
              "Step 1 - Inquiry Submission: The Client submits product inquiries, wholesale volume requests, export specs, or OEM parameters through the website form, official email, or Hotline/Zalo channels.",
              "Step 2 - Verification & Formal Quotation: Dedicated HAQ FOOD sales executives verify the specifications, confirm logistics arrangements, and issue an official formal quotation or proforma invoice.",
              "Step 3 - Contract Execution: For B2B wholesale transactions, ongoing distributor supply, or OEM batch production, legal obligations become binding only upon mutual execution of a formal Commercial Contract, signed physically or electronically via verified digital signatures."
            ]
          }
        ]
      },
      {
        "id": "section-7",
        "num": "07",
        "title": "Quality Standards, Food Safety & Traceability",
        "content": [
          {
            "type": "p",
            "text": "As a conscientious food manufacturer, HAQ FOOD ensures that every manufacturing run meets stringent hygiene and regulatory requirements:"
          },
          {
            "type": "ul",
            "items": [
              "International Management Standards: Manufacturing facilities operate under audited ISO 22000 management protocols and HACCP Codex food hygiene principles.",
              "Raw Material Assurance: 100% of raw ingredients (rice flour, popcorn kernels, seasoning mixes, food-contact grade packaging) carry valid Certificates of Origin (C/O), health certificates, and passed pesticide/microbiological residue lab tests.",
              "Lot Traceability: Every commercial batch is serialized with specific lot numbers, manufacturing date (MFG), expiration date (EXP), and GS1 standard barcodes for verification."
            ]
          }
        ]
      },
      {
        "id": "section-8",
        "num": "08",
        "title": "Delivery, Logistics & Risk of Loss",
        "content": [
          {
            "type": "p",
            "text": "Delivery terms, shipping timetables, and transfer of custody for commercial orders are governed by mutually agreed contracts according to foundational principles:"
          },
          {
            "type": "ul",
            "items": [
              "Delivery Point: Goods are delivered Ex-Works / FOB from HAQ FOOD central manufacturing warehouses or transported to designated Client warehouses pursuant to shipping terms.",
              "Transfer of Risk: Risk of loss or damage transfers to the Client once goods are accepted by the Client representative or authorized carrier upon signing the Delivery Note / Dispatch Slip.",
              "Inspection Protocol: The recipient must verify outer carton condition, tamper-evident seals, and gross carton quantities immediately upon arrival and document any discrepancies on the bill of lading with photo evidence."
            ]
          }
        ]
      },
      {
        "id": "section-9",
        "num": "09",
        "title": "Third-Party Platform Links",
        "content": [
          {
            "type": "p",
            "text": "The website may provide hyperlinks to third-party services, such as the General Department of Taxation portal, official Zalo Official Account, authorized logistics tracking APIs, and social media channels."
          },
          {
            "type": "p",
            "text": "These links are provided solely for client convenience. HAQ FOOD does not control, supervise, or assume liability for the privacy policies, availability, or operational accuracy of independent third-party portals."
          }
        ]
      },
      {
        "id": "section-10",
        "num": "10",
        "title": "Disclaimer of Warranties & Limitation of Liability",
        "content": [
          {
            "type": "p",
            "text": "To the fullest extent permitted by applicable laws of Vietnam, HAQ FOOD disclaims liability in the following events:"
          },
          {
            "type": "ul",
            "items": [
              "Uncontrollable Technical Disruptions: Disruptions caused by telecommunication failures, national grid outages, malicious DDoS attacks, or scheduled hosting maintenance.",
              "Improper Storage and Handling: Product degradation, moisture spoilage, or texture deterioration resulting from customer failure to observe printed storage instructions (exposure to high heat, direct sunlight, dampness, or pungent chemical odors).",
              "Consequential Losses: HAQ FOOD shall not be liable for any indirect, incidental, punitive, or consequential damages, including loss of business profit or missed enterprise opportunities."
            ]
          }
        ]
      },
      {
        "id": "section-11",
        "num": "11",
        "title": "Force Majeure",
        "content": [
          {
            "type": "p",
            "text": "Neither party shall be held liable for failure or delay in fulfilling contractual obligations if such failure arises from a Force Majeure event as recognized by the Civil Code of Vietnam (such as earthquakes, severe storms, flooding, pandemics, armed conflicts, major supply-chain embargoes, or emergency regulatory directives)."
          },
          {
            "type": "p",
            "text": "The affected party must notify the other party in writing or via electronic communications within 48 hours of occurrence and implement all reasonable mitigation measures."
          }
        ]
      },
      {
        "id": "section-12",
        "num": "12",
        "title": "Governing Law, Dispute Resolution & Arbitration",
        "content": [
          {
            "type": "p",
            "text": "These Terms of Service and any commercial transactions or disputes arising out of the website haq.com.vn are governed by, construed, and enforced in accordance with the laws of the Socialist Republic of Vietnam."
          },
          {
            "type": "ul",
            "items": [
              "Good-Faith Negotiation: Any disputes or controversies shall first be addressed through amicable, good-faith negotiation and conciliation between the parties.",
              "Competent Jurisdiction: If an agreement cannot be reached within 30 (thirty) days from formal notification of dispute, either party may refer the matter to the competent People Court in Hanoi City or the Vietnam International Arbitration Centre (VIAC) in accordance with statutory procedures."
            ]
          }
        ]
      },
      {
        "id": "section-13",
        "num": "13",
        "title": "Validity, Amendments & Legal Contact",
        "isContact": true
      }
    ]
  },
  "ko": {
    "docTitle": "이용약관 | HAQ FOOD",
    "breadcrumbs": {
      "home": "홈",
      "category": "법률 및 정책",
      "current": "이용약관"
    },
    "badge": "",
    "title": "서비스 이용약관 및 상거래 조건 | HAQ FOOD",
    "intro": "",
    "tocTitle": "이용약관 목차",
    "supportBox": {
      "title": "법무 및 B2B 상담이 필요하신가요?",
      "desc": "HAQ FOOD 법무팀 및 기업협력팀이 친절히 안내해 드립니다.",
      "phone": "+84 24 23 23 56 56"
    },
    "contactBox": {
      "company": "HAQ 하노이 주식회사 (HAQ HANOI JOINT STOCK COMPANY)",
      "taxCodeLabel": "사업자등록번호(MST):",
      "taxCode": "0109547016 (2021년 3월 11일 하노이시 기획투자국 발급)",
      "addressLabel": "본사 주소:",
      "address": "베트남 하노이시 까우저이군 응이어도동 팜뚜언따이 1골목 30호",
      "hotlineLabel": "대표전화:",
      "zaloLabel": "Zalo 공식채널:",
      "zaloName": "HAQ Hà Nội",
      "zaloNote": "(+84 993 308 319)",
      "emailLabel": "법무 문의 이메일:",
      "email": "info@haq.com.vn"
    },
    "sections": [
      {
        "id": "section-1",
        "num": "01",
        "title": "적용 범위 및 구속력",
        "content": [
          {
            "type": "p",
            "text": "본 이용약관(\"약관\")은 HAQ 하노이 주식회사(\"HAQ FOOD\")가 소유 및 운영하는 공식 웹사이트(haq.com.vn) 및 모든 하위 도메인, 제품 정보, 온라인 문의 창구를 이용하는 개인 및 기업(\"이용자\" 또는 \"고객\") 간의 권리, 의무 및 법적 책임을 규정합니다."
          },
          {
            "type": "p",
            "text": "웹사이트를 열람하거나 견적 요청, 제품 카탈로그 신청, 거래 상담을 진행함으로써 귀하는 본 약관의 모든 조항을 읽고 이해하였으며 이에 구속되는 데 동의한 것으로 간주됩니다. 본 약관에 동의하지 않으실 경우 웹사이트 이용을 즉시 중단해 주시기 바랍니다."
          }
        ]
      },
      {
        "id": "section-2",
        "num": "02",
        "title": "기업 자격 및 웹사이트 소유권",
        "content": [
          {
            "type": "p",
            "text": "웹사이트 haq.com.vn은 HAQ 하노이 주식회사의 독점적인 공식 상업, e커머스 및 브랜드 홍보 자산입니다:"
          },
          {
            "type": "ul",
            "items": [
              "법인명: HAQ 하노이 주식회사 (HAQ HANOI JOINT STOCK COMPANY; 약칭: HAQ FOOD).",
              "사업자등록번호: 0109547016 (2021년 3월 11일 하노이시 기획투자국 최초 등록).",
              "본사 주소: 베트남 하노이시 까우저이군 응이어도동 팜뚜언따이 1골목 30호.",
              "주요 사업 영역: 프리미엄 식품 제조 및 유통(HOKI 라이스페이퍼 롤, 팝콘, 녹두 케이크, 소고기 육포), B2B 도매 공급, OEM/ODM 위탁 제조 및 글로벌 수출."
            ]
          }
        ]
      },
      {
        "id": "section-3",
        "num": "03",
        "title": "지적 재산권 및 상표권 보호",
        "content": [
          {
            "type": "p",
            "text": "본 웹사이트에 게재된 상표, HAQ FOOD 로고, HOKI 브랜드 명칭, 슬로건, 제품 실물 사진, 생산 공정 영상, 포장 디자인, 그래픽 인터페이스, 소스 코드 및 데이터베이스는 베트남 지적재산권법 및 국제 저작권 협약에 따라 보호되는 HAQ FOOD의 독점적 지적재산입니다."
          },
          {
            "type": "ul",
            "items": [
              "무단 복제 금지: 사전 서면 승인 없이 HAQ FOOD의 이미지, 텍스트, 브랜드 디자인을 상업적 목적으로 무단 복제, 배포, 데이터 스크래핑(Scraping) 또는 역설계하는 행위는 엄격히 금지됩니다.",
              "파트너 및 대리점 사용 규정: 공식 파트너사 및 유통 대리점은 유통 계약서 또는 정식 서면 승인서에 명시된 범위 내에서만 제품 이미지 및 홍보물을 사용할 수 있습니다."
            ]
          }
        ]
      },
      {
        "id": "section-4",
        "num": "04",
        "title": "웹사이트 이용 준칙 및 금지 행위",
        "content": [
          {
            "type": "p",
            "text": "이용자는 웹사이트 이용 시 건전한 디지털 규범을 준수해야 하며, 다음과 같은 행위를 수행할 수 없습니다:"
          },
          {
            "type": "ul",
            "items": [
              "정보 허위 기재: 대리점 신청 또는 OEM 견적 요청 시 허위 사업자 정보나 타인의 명의를 도용하는 행위.",
              "사이버 보안 침해: 악성 코드, 바이러스 유포, 서비스 거부(DoS/DDoS) 공격 및 서버 인프라에 대한 무단 침투 시도.",
              "자동화된 데이터 추출: 봇, 크롤러 등을 이용하여 도매 가격, 기술 사양 및 고객 데이터베이스를 무단 수집하는 행위.",
              "명예 훼손 및 부정경쟁: HAQ FOOD 및 HOKI 브랜드에 대한 허위 사실 유포, 비방 및 공정한 거래 질서를 해치는 행위."
            ]
          }
        ]
      },
      {
        "id": "section-5",
        "num": "05",
        "title": "제품 정보, 견적 및 B2B 투명성",
        "content": [
          {
            "type": "p",
            "text": "HAQ FOOD는 웹사이트에 게시되는 영양 성분, 포장 규격, 제품 설명의 정확성을 유지하기 위해 최선을 다합니다."
          },
          {
            "type": "ul",
            "items": [
              "참고용 견적: 웹사이트상의 가격표, 대리점 할인율, 생산 리드타임은 예비 참고 자료이며, 정식 서명 날인된 견적서 또는 기본 공급 계약서를 대체하지 않습니다.",
              "제품 규격 변경: 포장 기술 및 보존성 개선을 위해 HAQ FOOD는 등록된 안전 기준을 준수하는 한도 내에서 포장 디자인 및 세부 규격을 사전 공지 없이 변경할 권리를 보유합니다."
            ]
          }
        ]
      },
      {
        "id": "section-6",
        "num": "06",
        "title": "주문 체결 및 전자계약 체결",
        "content": [
          {
            "type": "p",
            "text": "온라인 상담 및 거래 절차는 베트남 2023년 전자거래법 및 전자상거래 시행령 제52/2013/ND-CP(제85/2021/ND-CP 개정)에 따라 투명하게 진행됩니다:"
          },
          {
            "type": "ol",
            "items": [
              "1단계 - 문의 접수: 고객이 온라인 폼, 공식 이메일 또는 대표번호/Zalo를 통해 B2B 주문, 수출 또는 OEM 생산 요청을 접수합니다.",
              "2단계 - 견적 확정: 영업 담당자가 세부 요건을 검토한 후 정식 견적서 및 납기 일정을 서면 또는 전자메일로 회신합니다.",
              "3단계 - 계약 체결: 대량 B2B 거래 및 정기 공급은 양 당사자가 정식 인감 날인 또는 공인 전자서명을 통해 계약서를 체결함으로써 법적 구속력을 갖습니다."
            ]
          }
        ]
      },
      {
        "id": "section-7",
        "num": "07",
        "title": "품질 기준, 식품 안전 및 추적성",
        "content": [
          {
            "type": "p",
            "text": "식품의 안전을 최우선 가치로 여기는 HAQ FOOD는 전 제품에 대해 엄격한 품질 관리 체계를 적용합니다:"
          },
          {
            "type": "ul",
            "items": [
              "국제 인증 관리: 생산 시설은 국제 표준인 ISO 22000 식품안전경영시스템 및 HACCP Codex 지침을 엄격히 준수합니다.",
              "원료 안전성 보장: 모든 원재료(쌀가루, 옥수수, 조미료, 식품용 포장재)는 공인된 원산지증명서(C/O)와 안전 검사 성적서를 보유합니다.",
              "로트 추적 시스템: 전 출하 제품에는 생산 로트 번호, 제조일자(NSX), 유통기한(HSD) 및 GS1 표준 바코드가 인쇄되어 신속한 이력 추적이 가능합니다."
            ]
          }
        ]
      },
      {
        "id": "section-8",
        "num": "08",
        "title": "물품 인도, 물류 및 운송 위험 부담",
        "content": [
          {
            "type": "p",
            "text": "B2B 상업 화물의 인도 및 물류 배송은 개별 계약 조건에 따라 다음과 같은 기본 원칙으로 수행됩니다:"
          },
          {
            "type": "ul",
            "items": [
              "인도 장소: HAQ FOOD 공장 출하 창고(Ex-Works 기준) 또는 계약상 지정된 고객 물류 창고에서 인도됩니다.",
              "위험의 이전: 물품에 대한 멸실 및 훼손의 위험은 고객 대리인 또는 지정 운송업체가 출하 인수증에 서명하는 시점에 고객에게 이전됩니다.",
              "검수 절차: 수령인은 물품 수령 즉시 외부 포장 상태, 봉인 라벨 및 수량을 검수해야 하며, 이상 발견 시 현장에서 사진 및 서면으로 기록해야 합니다."
            ]
          }
        ]
      },
      {
        "id": "section-9",
        "num": "09",
        "title": "제3자 플랫폼 링크 및 통합 서비스",
        "content": [
          {
            "type": "p",
            "text": "웹사이트에는 베트남 국세청 포털, Zalo 공식 비즈니스 채널, 외부 물류 시스템 등 제3자 웹사이트로 연결되는 링크가 포함될 수 있습니다."
          },
          {
            "type": "p",
            "text": "이러한 링크는 이용자의 편의를 돕기 위해 제공되며, HAQ FOOD는 제3자 웹사이트의 콘텐츠, 개인정보 보호 정책 또는 기술적 안정성에 대해 보증하거나 통제 책임을 지지 않습니다."
          }
        ]
      },
      {
        "id": "section-10",
        "num": "10",
        "title": "면책 조항 및 손해배상 책임 제한",
        "content": [
          {
            "type": "p",
            "text": "베트남 관계 법령이 허용하는 최대 한도 내에서 HAQ FOOD는 다음 사유로 인한 손해에 대해 책임을 지지 않습니다:"
          },
          {
            "type": "ul",
            "items": [
              "통제 불가능한 기술 장애: 기간 통신망 장애, 국가적 정전, 악의적 디도스 공격 또는 정기 서버 유지보수로 인한 일시적 서비스 중단.",
              "보관 수칙 미준수: 포장에 명시된 보관 수칙(직사광선 노출, 고온다습한 환경 방치, 냄새가 강한 화학물질 인근 보관 등)을 위반하여 발생한 변질 및 부패.",
              "간접 손해 배상 배제: 웹사이트 이용 또는 이용 불가로 인해 발생한 영업 이익 손실, 비즈니스 기회 상실 등 간접적 손해에 대해 책임을 부담하지 않습니다."
            ]
          }
        ]
      },
      {
        "id": "section-11",
        "num": "11",
        "title": "불가항력 사유 (Force Majeure)",
        "content": [
          {
            "type": "p",
            "text": "베트남 민법이 인정하는 불가항력 사유(천재지변, 태풍, 화재, 전염병, 정부의 통행 제한 및 수출입 규제 정책 등)로 인해 계약 이행이 지연되거나 불가능해진 경우 어느 일방도 상대방에게 책임을 묻지 않습니다."
          },
          {
            "type": "p",
            "text": "불가항력 사유의 영향을 받은 당사자는 사유 발생 후 48시간 이내에 서면 또는 전자 통신으로 상대방에게 통보하고 손실을 최소화하기 위한 합리적인 노력을 기울여야 합니다."
          }
        ]
      },
      {
        "id": "section-12",
        "num": "12",
        "title": "준거법, 관할 및 분쟁 해결",
        "content": [
          {
            "type": "p",
            "text": "본 이용약관 및 웹사이트 이용과 관련된 모든 상업 거래 관계는 베트남 사회주의 공화국 법률에 따라 해석되고 규율됩니다."
          },
          {
            "type": "ul",
            "items": [
              "상호 협의 원칙: 분쟁이 발생할 경우 양 당사자는 신의성실의 원칙에 따라 우호적인 대화와 협상을 통해 원만히 해결하도록 최선을 다합니다.",
              "관할 법원: 분쟁 통지 후 30일 이내에 원만한 합의에 도달하지 못할 경우, 하노이시 관할 법원 또는 베트남 국제중재센터(VIAC)에 소를 제기하여 최종 해결합니다."
            ]
          }
        ]
      },
      {
        "id": "section-13",
        "num": "13",
        "title": "시행 효력, 개정 및 법무 연락처",
        "isContact": true
      }
    ]
  },
  "zh": {
    "docTitle": "使用条款 | HAQ FOOD",
    "breadcrumbs": {
      "home": "首页",
      "category": "法律与政策",
      "current": "使用条款"
    },
    "badge": "",
    "title": "服务使用条款与商业规则 | HAQ FOOD",
    "intro": "",
    "tocTitle": "条款目录导航",
    "supportBox": {
      "title": "法务或B2B业务咨询？",
      "desc": "HAQ FOOD 法务部与企业战略合作部随时为您提供专业支持。",
      "phone": "+84 24 23 23 56 56"
    },
    "contactBox": {
      "company": "河内 HAQ 股份公司 (HAQ HANOI JOINT STOCK COMPANY)",
      "taxCodeLabel": "企业税号 (MST):",
      "taxCode": "0109547016（河内市计划投资局于2021年3月11日核发）",
      "addressLabel": "总部注册地址:",
      "address": "越南河内市纸桥郡义都坊范俊才街1巷30号",
      "hotlineLabel": "官方热线:",
      "zaloLabel": "Zalo 官方企业号:",
      "zaloName": "HAQ Hà Nội",
      "zaloNote": "(+84 993 308 319)",
      "emailLabel": "法务联络邮箱:",
      "email": "info@haq.com.vn"
    },
    "sections": [
      {
        "id": "section-1",
        "num": "01",
        "title": "适用范围与法律效力",
        "content": [
          {
            "type": "p",
            "text": "本使用条款（以下简称“本条款”）构成访问、浏览或使用本网站信息的任何个人、企业机构（以下简称“用户”或“客户”）与河内 HAQ 股份公司（以下简称“HAQ FOOD”）之间具有法律约束力的正式协议，适用于官方主域名 haq.com.vn 及其所有二级域名、产品展示与在线互动业务系统。"
          },
          {
            "type": "p",
            "text": "用户继续浏览本网站、提交询价表单、索取产品技术档案或进行商务洽谈，即表示已详阅、完全理解并无条件承诺遵守本条款全部内容。若不同意本条款的任何部分，请立即停止访问并退出本网站。"
          }
        ]
      },
      {
        "id": "section-2",
        "num": "02",
        "title": "企业主体资质与网站所有权",
        "content": [
          {
            "type": "p",
            "text": "官方网站 haq.com.vn 系河内 HAQ 股份公司独家拥有、管理与运营的官方数字化媒介与商贸推广平台："
          },
          {
            "type": "ul",
            "items": [
              "法人名称：河内 HAQ 股份公司（英文名称：HAQ HANOI JOINT STOCK COMPANY；商业品牌简称：HAQ FOOD）。",
              "统一社会信用税号：0109547016，于2021年3月11日由越南河内市计划投资局依法核准设立。",
              "法定总部地址：越南河内市纸桥郡义都坊范俊才街1巷30号。",
              "核心经营范围：高品质休闲预包装食品研发与生产（HOKI 春卷皮/米纸卷、爆米花、绿豆糕、牛肉干）、大宗 B2B 批发分销、OEM/ODM 代工制造及国际食品进出口贸易。"
            ]
          }
        ]
      },
      {
        "id": "section-3",
        "num": "03",
        "title": "知识产权与商标保护",
        "content": [
          {
            "type": "p",
            "text": "本网站发布的所有文字内容、图形标志、HAQ FOOD 注册商标、HOKI 产品商标、宣传标语、实拍商品影像、工厂标准化车间视频、商业包装装潢、网页界面设计、软件源代码及底层数据库，均属 HAQ FOOD 或合法授权合作方所有的排他性知识产权，受《越南知识产权法》及国际版权公约严格保护。"
          },
          {
            "type": "ul",
            "items": [
              "严禁非授权盗用：未经本公司明确书面授权，任何组织或个人严禁擅自复制、抓取（Web Scraping）、分发、转让、反编译代码或将 HAQ FOOD 产品图文资料用于任何商业营利目的。",
              "合作伙伴使用权限：合法签约的分销代理商与合作伙伴仅可在分销合同或品牌授权许可书明确界定的范围与期限内规范使用官方宣传素材。"
            ]
          }
        ]
      },
      {
        "id": "section-4",
        "num": "04",
        "title": "网站使用规范与禁止行为",
        "content": [
          {
            "type": "p",
            "text": "用户在使用本网站及提交联络信息时，须严格遵守法律法规并杜绝以下禁止行为："
          },
          {
            "type": "ul",
            "items": [
              "身份信息欺诈：在申请代理资质或索取 B2B 批量报价时故意提交虚假企业资质或冒充他人法定代表人身份。",
              "网络攻击破坏：蓄意传播计算机病毒、木马程序，发起拒绝服务攻击（DoS/DDoS）或非法探测渗透服务器主机系统。",
              "恶意爬取数据：利用网络机器人、自动化爬虫脚本抓取批发定价阶梯、核心产品配方描述或商业客户数据库。",
              "商业诋毁与不正当竞争：编造、散布虚假或误导性商业言论，损害 HAQ FOOD 企业商誉及 HOKI 系列产品的市场声誉。"
            ]
          }
        ]
      },
      {
        "id": "section-5",
        "num": "05",
        "title": "产品信息、报价与B2B商务透明度",
        "content": [
          {
            "type": "p",
            "text": "HAQ FOOD 恪尽专业审慎职责，力求确保网站公布的产品配料、营养参考值、装箱规格及包装视觉呈现的准确性。"
          },
          {
            "type": "ul",
            "items": [
              "指导性报价性质：网站展示的批发价格区间、阶梯折扣比例、订货周期等仅作前期意向性商贸参考，不构成具有不可撤销约束力的终局要约，最终条款以正式盖章确认的采购合同或形式发票（Proforma Invoice）为准。",
              "包装工艺持续升级：为提升食品阻隔防潮性能与货架期表现，HAQ FOOD 有权在符合已备案食品安全标准的前提下对包材细节与副标进行合理微调，无需在网站逐项预先公告。"
            ]
          }
        ]
      },
      {
        "id": "section-6",
        "num": "06",
        "title": "订单确认与电子合同订立",
        "content": [
          {
            "type": "p",
            "text": "在线商务接洽与交易流程遵循越南 2023 年《电子交易法》及关于电子商务的第 52/2013/ND-CP 号议定（经第 85/2021/ND-CP 号议定修订）："
          },
          {
            "type": "ol",
            "items": [
              "第一步 - 需求提交：客户通过在线表单、官方电子邮箱或热线/Zalo提交产品订购规格、B2B起订量、出口商检或OEM代工要求。",
              "第二步 - 商务审核与正式报价：HAQ FOOD 销售专员核实需求，确认交期与仓储物流方案，出具正式盖章报价单。",
              "第三步 - 合同生效：大宗批发或长期分销合作，自双方合法签署书面经济合同或通过权威合规数字签名签署电子合同之日起正式产生法律约束力。"
            ]
          }
        ]
      },
      {
        "id": "section-7",
        "num": "07",
        "title": "质量标准、食品安全与可溯源性",
        "content": [
          {
            "type": "p",
            "text": "作为具备高度企业社会责任感的食品制造龙头企业，HAQ FOOD 恪守严密质量防线："
          },
          {
            "type": "ul",
            "items": [
              "国际质量管理体系：制造工厂严格依据 ISO 22000 食品安全管理体系标准与国际食品法典委员会 HACCP Codex 规范常态化受控运行。",
              "原料全链条合规：所采用的优质大米原料、非转基因玉米、调味辅料及食品级复合膜包材均具备合规产地证明（C/O）与第三方理化农残检测合格报告。",
              "批次可追溯机制：出厂商品均喷印独立生产批号、生产日期（NSX）、保质期限（HSD）并配备 GS1 国际标准条形码，支持追溯查询。"
            ]
          }
        ]
      },
      {
        "id": "section-8",
        "num": "08",
        "title": "货物交付、物流配送与运输风险承担",
        "content": [
          {
            "type": "p",
            "text": "B2B 大宗商业货物交接与物流配送依双方合同约定执行，并遵循以下通行商事准则："
          },
          {
            "type": "ul",
            "items": [
              "交货地点：货物于 HAQ FOOD 工厂出厂仓库（Ex-Works条款）交付，或按专项承运协议送达买方指定物流集散仓库。",
              "风险转移节点：自买方指定代表或授权承运人签署交接单据/出库凭证并提取货物之时刻起，货物的灭失或损毁风险转移至买方承担。",
              "现场验收义务：收货方须在收货现场核对箱体封条完整性、外箱破损状况并清点外箱件数，如发现异常须于送货凭证上当场书面批注并拍照留证。"
            ]
          }
        ]
      },
      {
        "id": "section-9",
        "num": "09",
        "title": "第三方平台链接与外部服务",
        "content": [
          {
            "type": "p",
            "text": "本网站可能设置指向第三方数字化服务的外部链接，例如越南税务总局数据查询平台、官方 Zalo 认证企业号、第三方物流追踪服务及社交媒体公共主页。"
          },
          {
            "type": "p",
            "text": "此类链接仅为方便用户查阅与沟通之目的提供。HAQ FOOD 对任何独立第三方站点的隐私合规、内容准确性或服务持续性不承担担保责任与连带法律责任。"
          }
        ]
      },
      {
        "id": "section-10",
        "num": "10",
        "title": "免责声明与赔偿责任限制",
        "content": [
          {
            "type": "p",
            "text": "在越南现行法律法规许可的最大限度内，出现下列情形时，HAQ FOOD 免于承担民事赔偿责任："
          },
          {
            "type": "ul",
            "items": [
              "不可归责的技术中断：公共电信主干网突发瘫痪、跨国光缆故障、重大黑客网络攻击或托管机房常规停机维护导致的短暂访问受阻。",
              "仓储保管违规所致变质：买方或终端消费者未遵照产品包装所载明之保管指引（例如暴晒、受潮、高温存放或与有异味的挥发性化学品混放）导致的品质劣变。",
              "间接损失免责：对于因使用或无法使用本网站而引致的任何利润损失、商业机会丧失等间接或附带损失，HAQ FOOD 不承担赔偿责任。"
            ]
          }
        ]
      },
      {
        "id": "section-11",
        "num": "11",
        "title": "不可抗力事件",
        "content": [
          {
            "type": "p",
            "text": "因发生越南《民法典》所界定之不可抗力事件（包括但不限于破坏性地震、台风暴雨、重大火灾、流行疫情暴发、武装冲突、交通瘫痪禁行、进出口贸易管制紧急法令）直接导致任何一方迟延或未能履行合同义务的，该方不承担违约责任。"
          },
          {
            "type": "p",
            "text": "遭受不可抗力影响的一方须在事件发生后 48 小时内书面或以可靠电子方式告知对方，并采取一切合理可能的技术与物流措施减轻损失。"
          }
        ]
      },
      {
        "id": "section-12",
        "num": "12",
        "title": "适用法律、争议解决与管辖权",
        "content": [
          {
            "type": "p",
            "text": "本条款之订立、生效、解释、履行及因使用本网站引发的一切商事争议，均受越南社会主义共和国现行有效法律管辖并依其解释。"
          },
          {
            "type": "ul",
            "items": [
              "友好协商机制：若发生任何争议，双方应本着诚实信用与合作共赢原则首先通过友好协商与调解妥善解决。",
              "诉讼管辖权：若自争议发生书面通知送达之日起 30（三十）日内协商调解未果，任何一方均有权向越南河内市有管辖权的人民法院提起诉讼，或依法提交越南国际仲裁中心（VIAC）进行终局裁决。"
            ]
          }
        ]
      },
      {
        "id": "section-13",
        "num": "13",
        "title": "条款生效、修订与法务联系方式",
        "isContact": true
      }
    ]
  }
}
}
