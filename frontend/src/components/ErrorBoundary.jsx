import React from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
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
          <p className="text-sm text-haq-text-secondary max-w-md mb-8 leading-relaxed">
            Hệ thống đang tự động khôi phục dữ liệu sản phẩm chuẩn. Vui lòng tải lại trang hoặc quay lại trang chủ HAQ FOOD.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-[#16A34A] hover:bg-[#13863d] text-white font-heading font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-md text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tải lại trang</span>
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-white border border-haq-border hover:border-[#16A34A] text-haq-ink font-heading font-bold rounded-full transition-colors flex items-center gap-2 text-sm"
            >
              <Home className="w-4 h-4 text-[#16A34A]" />
              <span>Về trang chủ</span>
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
