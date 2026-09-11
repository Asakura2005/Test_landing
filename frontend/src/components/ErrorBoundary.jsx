import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    try {
      sessionStorage.clear()
      const keysToRemove = [
        'haq_utm_data',
        'haq_current_session_utm',
        'haq_last_viewed_product',
        'haq_product_views_real_v1',
        'haq_analytics_realtime_counters_v1',
      ]
      keysToRemove.forEach((k) => localStorage.removeItem(k))
    } catch (e) {
      console.warn('Lỗi khi xóa storage cache:', e)
    }
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  handleGoHome = () => {
    try {
      sessionStorage.clear()
    } catch (e) {}
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-haq-cream flex flex-col items-center justify-center p-6 text-center text-haq-ink font-sans">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-[#16A34A] shadow-sm">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-haq-ink mb-3 uppercase">
            Đã có sự cố hiển thị nội dung
          </h1>
          <p className="text-sm text-haq-text-secondary max-w-md mb-6 leading-relaxed">
            Hệ thống đang tự động khôi phục dữ liệu sản phẩm chuẩn. Vui lòng tải lại trang hoặc quay lại trang chủ HAQ FOOD.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-[#16A34A] hover:bg-[#13863d] text-white font-heading font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-md text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tải lại trang & Xóa Cache</span>
            </button>
            <button
              onClick={this.handleGoHome}
              className="px-6 py-3 bg-white border border-haq-border hover:border-[#16A34A] text-haq-ink font-heading font-bold rounded-full transition-colors flex items-center gap-2 text-sm cursor-pointer shadow-xs"
            >
              <Home className="w-4 h-4 text-[#16A34A]" />
              <span>Về trang chủ</span>
            </button>
          </div>

          {/* Chi tiết lỗi kỹ thuật hiển thị trực quan */}
          {this.state.error && (
            <div className="mt-4 w-full max-w-xl text-left bg-white p-4 sm:p-5 rounded-2xl border border-red-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-red-600 mb-2">
                <span>Chi tiết lỗi kỹ thuật:</span>
                <span className="text-[11px] font-mono font-normal text-gray-500">
                  {this.state.error.name || 'Error'}
                </span>
              </div>
              <div className="text-xs font-mono text-gray-800 bg-red-50/70 p-3 rounded-xl border border-red-100 break-words whitespace-pre-wrap">
                {this.state.error.message || String(this.state.error)}
              </div>
              {this.state.error.stack && (
                <details className="mt-3">
                  <summary className="text-[11px] text-gray-500 hover:text-gray-800 cursor-pointer select-none">
                    Xem chi tiết stack trace
                  </summary>
                  <pre className="mt-2 text-[10px] font-mono text-gray-600 max-h-36 overflow-y-auto whitespace-pre-wrap bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
