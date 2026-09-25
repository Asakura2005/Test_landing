import React, { useState, useEffect, useRef, useCallback } from 'react'
import { PageFlip } from 'page-flip'
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Download,
  ZoomIn,
  ZoomOut,
  X,
  BookOpen,
  Search,
  Move,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react'
import { LEGAL_DOCUMENTS } from '../data/legalDocuments'

// Danh mục nhảy nhanh đến từng tài liệu kiểm định
const QUICK_DOC_SECTIONS = [
  { startPage: 0, label: 'ISO & HACCP (Trang 1-3)' },
  { startPage: 3, label: 'Gà Lá Chanh (Trang 4-8)' },
  { startPage: 8, label: 'Sa Tế Tôm (Trang 9-13)' },
  { startPage: 13, label: 'Khô Mực (Trang 14-15)' },
  { startPage: 15, label: 'Cuộn Phô Mai (Trang 16-21)' },
  { startPage: 24, label: 'Khô Bò (Trang 25-27)' },
]

/**
 * Áp dụng cơ chế HiDPI supersampling lên PageFlip Canvas.
 * Mặc định canvas trong PageFlip chỉ render 1x theo CSS pixel, khiến hiển thị trên
 * màn hình laptop/retina (DPR 1.25, 1.5, 2.0) bị vỡ nét và mờ hạt.
 * Hàm này scale buffer canvas lên 2x-3x và áp dụng imageSmoothingQuality = 'high'.
 * Đồng thời tích hợp idempotency guard để tuyệt đối không bị nhân đôi scale khi gọi lại.
 */
function applyHiDpiToPageFlip(pageFlipInstance) {
  if (!pageFlipInstance) return
  try {
    const render = pageFlipInstance.getRender()
    const ui = pageFlipInstance.getUI()
    if (!render || !ui) return

    const canvas = typeof ui.getCanvas === 'function' ? ui.getCanvas() : null
    if (!canvas) return

    const getDpr = () => {
      if (typeof window === 'undefined') return 2
      return Math.min(Math.max(window.devicePixelRatio || 1, 2), 3)
    }

    // Override ui.resizeCanvas để đảm bảo buffer canvas luôn được nhân theo DPR
    ui.resizeCanvas = function () {
      const dpr = getDpr()
      const cs = getComputedStyle(canvas)
      const width = parseInt(cs.getPropertyValue('width'), 10) || 500
      const height = parseInt(cs.getPropertyValue('height'), 10) || 700
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    ui.resizeCanvas()

    // BẢO VỆ CHỐNG NHÂN ĐÔI SCALE (IDEMPOTENCY GUARD):
    if (!render.__hiDpiPatched) {
      render.__hiDpiPatched = true
      const origDrawFrame = render.drawFrame.bind(render)
      render.drawFrame = function () {
        const ctx = render.getContext()
        if (ctx) {
          const dpr = getDpr()
          ctx.save()
          // Dùng setTransform tuyệt đối thay vì scale tương đối để đảm bảo ma trận chuẩn xác
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          try {
            origDrawFrame()
          } finally {
            ctx.restore()
          }
        } else {
          origDrawFrame()
        }
      }
    }

    if (typeof render.drawFrame === 'function') {
      render.drawFrame()
    }
  } catch (err) {
    console.warn('Could not apply HiDPI scaling to PageFlip:', err)
  }
}

export default function LegalFlipbook() {
  // Chế độ xem inline: 2 trang lật sách sắc nét
  const [viewMode, setViewMode] = useState('double')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(LEGAL_DOCUMENTS[0]?.totalPages || 27)
  const [isLoading, setIsLoading] = useState(true)

  // Zoom & Pan trong chế độ 1 trang inline
  const [singleZoom, setSingleZoom] = useState(1.0)
  const [singlePan, setSinglePan] = useState({ x: 0, y: 0 })
  const [isSingleDragging, setIsSingleDragging] = useState(false)
  const singleDragStartRef = useRef({ x: 0, y: 0 })

  // Fullscreen reader state
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fsViewMode, setFsViewMode] = useState('double') // 'double' | 'single'
  const [isFsLoading, setIsFsLoading] = useState(false)
  const [fsZoomLevel, setFsZoomLevel] = useState(1.0)
  const [fsSingleZoom, setFsSingleZoom] = useState(1.35)
  const [fsPanOffset, setFsPanOffset] = useState({ x: 0, y: 0 })
  const [isFsDragging, setIsFsDragging] = useState(false)
  const fsDragStartRef = useRef({ x: 0, y: 0 })
  const fsTouchStartDistRef = useRef(null)
  const fsTouchStartZoomRef = useRef(1.35)

  // Ultra-HD Document Inspector Lightbox (Pan & Zoom ở độ phân giải 1191x1684 gốc)
  const [inspectPage, setInspectPage] = useState(null) // null hoặc index (0-26)
  const [inspectZoom, setInspectZoom] = useState(1.5) // mặc định 150% để đọc rõ số liệu kiểm nghiệm
  const [inspectPan, setInspectPan] = useState({ x: 0, y: 0 })
  const [isInspectDragging, setIsInspectDragging] = useState(false)
  const inspectDragStartRef = useRef({ x: 0, y: 0 })
  const inspectTouchStartDistRef = useRef(null)
  const inspectTouchStartZoomRef = useRef(1.5)

  const bookContainerRef = useRef(null)
  const pageFlipRef = useRef(null)

  const fullscreenBookContainerRef = useRef(null)
  const fullscreenPageFlipRef = useRef(null)

  const currentPageRef = useRef(0)
  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])

  const currentDoc = LEGAL_DOCUMENTS[0]

  // Kích thước chuẩn HD cho sách 2 trang inline
  const getInlineDimensions = useCallback(() => {
    if (typeof window === 'undefined') return { pageWidth: 500, pageHeight: 707 }
    const width = window.innerWidth

    if (width >= 1400) {
      return { pageWidth: 550, pageHeight: 778 }
    } else if (width >= 1200) {
      return { pageWidth: 500, pageHeight: 707 }
    } else if (width >= 992) {
      return { pageWidth: 440, pageHeight: 622 }
    } else if (width >= 768) {
      return { pageWidth: 360, pageHeight: 509 }
    } else if (width >= 540) {
      return { pageWidth: 250, pageHeight: 353 }
    } else {
      let availW = Math.max(280, width - 24)
      if (availW % 2 !== 0) availW -= 1
      const pageWidth = Math.floor(availW / 2)
      const pageHeight = Math.round(pageWidth * 1.4142)
      return { pageWidth, pageHeight }
    }
  }, [])

  // Kích thước tối ưu cho chế độ toàn màn hình 2 trang
  const getFullscreenDimensions = useCallback(() => {
    if (typeof window === 'undefined') return { pageWidth: 500, pageHeight: 707 }
    const width = window.innerWidth
    const height = window.innerHeight

    const availW = Math.max(300, width - (width < 640 ? 16 : 96))
    const availH = Math.max(260, height - (width < 640 ? 120 : 144))

    let spreadW = Math.round(availH * 1.4142)
    let spreadH = availH

    if (spreadW > availW) {
      spreadW = availW
      spreadH = Math.round(spreadW / 1.4142)
    }

    if (spreadW % 2 !== 0) spreadW -= 1
    const basePageWidth = Math.floor(spreadW / 2)
    const basePageHeight = spreadH

    return { pageWidth: basePageWidth, pageHeight: basePageHeight }
  }, [])

  // Khởi tạo sách lật 2 trang inline với HiDPI supersampling
  const initMainBook = useCallback((targetPage = 0) => {
    if (viewMode !== 'double') return
    if (!bookContainerRef.current) return
    setIsLoading(true)

    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy()
      } catch {
        // ignore
      }
      pageFlipRef.current = null
    }

    bookContainerRef.current.innerHTML = ''

    const wrapperEl = document.createElement('div')
    wrapperEl.className = 'w-full flex items-center justify-center'
    bookContainerRef.current.appendChild(wrapperEl)

    const { pageWidth, pageHeight } = getInlineDimensions()

    try {
      const pageFlipInstance = new PageFlip(wrapperEl, {
        width: pageWidth,
        height: pageHeight,
        size: 'fixed',
        maxShadowOpacity: 0.45,
        showCover: false,
        mobileScrollSupport: true,
        usePortrait: false,
        drawShadow: true,
        flippingTime: 450,
        useMouseEvents: true,
        swipeDistance: 20,
        showPageCorners: true,
        startPage: targetPage,
      })

      const imageUrls = currentDoc.pages.map((p) => p.image)
      pageFlipInstance.loadFromImages(imageUrls)

      // Kích hoạt ngay HiDPI buffer scaling (có idempotency guard)
      applyHiDpiToPageFlip(pageFlipInstance)

      pageFlipInstance.on('flip', (e) => {
        currentPageRef.current = e.data
        setCurrentPage(e.data)
      })

      pageFlipInstance.on('init', () => {
        setIsLoading(false)
        setTotalPages(pageFlipInstance.getPageCount())
        applyHiDpiToPageFlip(pageFlipInstance)
        if (targetPage > 0) {
          pageFlipInstance.turnToPage(targetPage)
        }
      })

      pageFlipRef.current = pageFlipInstance
    } catch (err) {
      console.error('Failed to initialize PageFlip:', err)
      setIsLoading(false)
    }
  }, [viewMode, currentDoc, getInlineDimensions])

  // Khởi tạo sách toàn màn hình với HiDPI supersampling
  const initFullscreenBook = useCallback((targetPage = 0) => {
    if (fsViewMode !== 'double') return
    if (!fullscreenBookContainerRef.current) return
    setIsFsLoading(true)

    if (fullscreenPageFlipRef.current) {
      try {
        fullscreenPageFlipRef.current.destroy()
      } catch {
        // ignore
      }
      fullscreenPageFlipRef.current = null
    }

    fullscreenBookContainerRef.current.innerHTML = ''

    const wrapperEl = document.createElement('div')
    wrapperEl.className = 'flex items-center justify-center'
    fullscreenBookContainerRef.current.appendChild(wrapperEl)

    const { pageWidth, pageHeight } = getFullscreenDimensions()

    try {
      const fsInstance = new PageFlip(wrapperEl, {
        width: pageWidth,
        height: pageHeight,
        size: 'fixed',
        maxShadowOpacity: 0.45,
        showCover: false,
        mobileScrollSupport: false,
        usePortrait: false,
        drawShadow: true,
        flippingTime: 450,
        useMouseEvents: true,
        swipeDistance: 20,
        showPageCorners: true,
        startPage: targetPage,
      })

      const imageUrls = currentDoc.pages.map((p) => p.image)
      fsInstance.loadFromImages(imageUrls)

      applyHiDpiToPageFlip(fsInstance)

      fsInstance.on('flip', (e) => {
        currentPageRef.current = e.data
        setCurrentPage(e.data)
      })

      fsInstance.on('init', () => {
        setIsFsLoading(false)
        applyHiDpiToPageFlip(fsInstance)
        if (targetPage > 0) {
          fsInstance.turnToPage(targetPage)
        }
      })

      fullscreenPageFlipRef.current = fsInstance
    } catch (err) {
      console.error('Failed to initialize Fullscreen PageFlip:', err)
      setIsFsLoading(false)
    }
  }, [fsViewMode, currentDoc, getFullscreenDimensions])


  // Chuyển đổi chế độ xem fullscreen (đồng bộ trang)
  const handleSetFsViewMode = (mode) => {
    if (mode === 'double') {
      const spreadIndex = Math.floor(currentPageRef.current / 2) * 2
      setCurrentPage(spreadIndex)
      setFsZoomLevel(1.0)
    }
    setFsViewMode(mode)
  }

  // Khởi tạo sách khi chuyển chế độ hoặc trang
  useEffect(() => {
    if (viewMode === 'double') {
      const timer = setTimeout(() => {
        const spreadIndex = Math.floor(currentPageRef.current / 2) * 2
        initMainBook(spreadIndex)
      }, 60)

      return () => {
        clearTimeout(timer)
        if (pageFlipRef.current) {
          try {
            pageFlipRef.current.destroy()
          } catch {
            // ignore
          }
          pageFlipRef.current = null
        }
      }
    }
  }, [viewMode, initMainBook])

  // Fullscreen effect
  useEffect(() => {
    if (!isFullscreen) return

    if (fsViewMode === 'double') {
      const timer = setTimeout(() => {
        const spreadIndex = Math.floor(currentPageRef.current / 2) * 2
        initFullscreenBook(spreadIndex)
      }, 50)

      return () => {
        clearTimeout(timer)
        if (fullscreenPageFlipRef.current) {
          try {
            fullscreenPageFlipRef.current.destroy()
          } catch {
            // ignore
          }
          fullscreenPageFlipRef.current = null
        }
      }
    }
  }, [isFullscreen, fsViewMode, initFullscreenBook])

  // Window resize handler
  useEffect(() => {
    let resizeTimer = null
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (isFullscreen && fsViewMode === 'double') {
          const spreadIndex = Math.floor(currentPageRef.current / 2) * 2
          initFullscreenBook(spreadIndex)
        } else if (viewMode === 'double') {
          const spreadIndex = Math.floor(currentPageRef.current / 2) * 2
          initMainBook(spreadIndex)
        }
      }, 200)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [isFullscreen, fsViewMode, viewMode, initMainBook, initFullscreenBook])

  // Điều khiển lật trang
  const handlePrevPage = useCallback(() => {
    if (inspectPage !== null) {
      setInspectPage((prev) => Math.max(0, prev - 1))
      setInspectPan({ x: 0, y: 0 })
      return
    }
    if (isFullscreen && fsViewMode === 'single') {
      setCurrentPage((prev) => Math.max(0, prev - 1))
      setFsPanOffset({ x: 0, y: 0 })
      return
    }
    if (viewMode === 'single') {
      setCurrentPage((prev) => Math.max(0, prev - 1))
      setSinglePan({ x: 0, y: 0 })
      return
    }
    if (isFullscreen && fullscreenPageFlipRef.current) {
      fullscreenPageFlipRef.current.flipPrev()
    } else if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev()
    }
  }, [inspectPage, isFullscreen, fsViewMode, viewMode])

  const handleNextPage = useCallback(() => {
    if (inspectPage !== null) {
      setInspectPage((prev) => Math.min(totalPages - 1, prev + 1))
      setInspectPan({ x: 0, y: 0 })
      return
    }
    if (isFullscreen && fsViewMode === 'single') {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
      setFsPanOffset({ x: 0, y: 0 })
      return
    }
    if (viewMode === 'single') {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
      setSinglePan({ x: 0, y: 0 })
      return
    }
    if (isFullscreen && fullscreenPageFlipRef.current) {
      fullscreenPageFlipRef.current.flipNext()
    } else if (pageFlipRef.current) {
      pageFlipRef.current.flipNext()
    }
  }, [inspectPage, isFullscreen, fsViewMode, viewMode, totalPages])

  const handleJumpToSpread = useCallback((targetIndex) => {
    const validTarget = Math.max(0, Math.min(totalPages - 1, targetIndex))
    setCurrentPage(validTarget)
    if (inspectPage !== null) {
      setInspectPage(validTarget)
      setInspectPan({ x: 0, y: 0 })
      return
    }
    if (viewMode === 'single' || (isFullscreen && fsViewMode === 'single')) {
      setSinglePan({ x: 0, y: 0 })
      setFsPanOffset({ x: 0, y: 0 })
      return
    }
    if (validTarget === currentPageRef.current) return
    if (isFullscreen && fullscreenPageFlipRef.current) {
      try {
        fullscreenPageFlipRef.current.flip(validTarget)
      } catch {
        fullscreenPageFlipRef.current.turnToPage(validTarget)
      }
    } else if (pageFlipRef.current) {
      try {
        pageFlipRef.current.flip(validTarget)
      } catch {
        pageFlipRef.current.turnToPage(validTarget)
      }
    }
  }, [inspectPage, viewMode, isFullscreen, fsViewMode, totalPages])

  // Fullscreen open / close
  const openFullscreen = () => {
    setFsZoomLevel(1.0)
    setFsSingleZoom(1.35)
    setFsPanOffset({ x: 0, y: 0 })
    setIsFullscreen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false)
    setFsZoomLevel(1.0)
    setFsPanOffset({ x: 0, y: 0 })
    document.body.style.overflow = ''
    if (viewMode === 'double' && pageFlipRef.current) {
      try {
        pageFlipRef.current.turnToPage(currentPageRef.current)
      } catch {
        // ignore
      }
    }
  }, [viewMode])

  // Ultra-HD Inspector Lightbox open / close
  const openInspector = useCallback((pageNum) => {
    const target = typeof pageNum === 'number' ? pageNum : currentPageRef.current
    const validTarget = Math.max(0, Math.min(totalPages - 1, target))
    setInspectPage(validTarget)
    setInspectZoom(1.5) // Bắt đầu ở mức 150% nét căng để đọc rõ từng dòng bảng
    setInspectPan({ x: 0, y: 0 })
    document.body.style.overflow = 'hidden'
  }, [totalPages])

  const closeInspector = useCallback(() => {
    setInspectPage(null)
    setInspectPan({ x: 0, y: 0 })
    if (!isFullscreen) {
      document.body.style.overflow = ''
    }
  }, [isFullscreen])

  // Nhấn đúp trên sách 2 trang để mở ngay Kính lúp soi trang tương ứng
  const handleBookDoubleClick = (e) => {
    if (!bookContainerRef.current) return
    const rect = bookContainerRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const isRightSide = clickX > rect.width / 2
    if (isRightSide && currentPage + 1 < totalPages) {
      openInspector(currentPage + 1)
    } else {
      openInspector(currentPage)
    }
  }

  const handleFsBookDoubleClick = (e) => {
    if (!fullscreenBookContainerRef.current) return
    const rect = fullscreenBookContainerRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const isRightSide = clickX > rect.width / 2
    if (isRightSide && currentPage + 1 < totalPages) {
      openInspector(currentPage + 1)
    } else {
      openInspector(currentPage)
    }
  }

  // Zoom handlers trong Inspector
  const handleInspectZoomIn = () => {
    setInspectZoom((z) => Math.min(3.5, Number((z + 0.25).toFixed(2))))
  }

  const handleInspectZoomOut = () => {
    setInspectZoom((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))))
  }

  const handleInspectZoomReset = () => {
    setInspectZoom(1.5)
    setInspectPan({ x: 0, y: 0 })
  }

  const handleInspectFit = () => {
    setInspectZoom(1.0)
    setInspectPan({ x: 0, y: 0 })
  }

  const handleInspectWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.2 : -0.2
    setInspectZoom((z) => Math.min(3.5, Math.max(0.75, Number((z + delta).toFixed(2)))))
  }, [])

  const handleInspectDoubleClick = useCallback(() => {
    setInspectZoom((prev) => {
      if (prev >= 1.4) {
        setInspectPan({ x: 0, y: 0 })
        return 1.0
      }
      return 2.0
    })
  }, [])

  // Mouse Drag cho Inspector Lightbox với window listeners (không bao giờ bị tuột drag)
  const handleInspectMouseDown = (e) => {
    if (e.button !== 0) return
    setIsInspectDragging(true)
    const startX = e.clientX - inspectPan.x
    const startY = e.clientY - inspectPan.y

    const onMove = (moveEvent) => {
      setInspectPan({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      })
    }

    const onUp = () => {
      setIsInspectDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // Touch Gesture cho Inspector: Hỗ trợ cả 1 ngón Pan lẫn 2 ngón Pinch-to-Zoom
  const handleInspectTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsInspectDragging(true)
      const t = e.touches[0]
      inspectDragStartRef.current = {
        x: t.clientX - inspectPan.x,
        y: t.clientY - inspectPan.y,
      }
    } else if (e.touches.length === 2) {
      setIsInspectDragging(false)
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      inspectTouchStartDistRef.current = dist
      inspectTouchStartZoomRef.current = inspectZoom
    }
  }

  const handleInspectTouchMove = (e) => {
    if (e.touches.length === 1 && isInspectDragging) {
      if (e.cancelable) e.preventDefault()
      const t = e.touches[0]
      setInspectPan({
        x: t.clientX - inspectDragStartRef.current.x,
        y: t.clientY - inspectDragStartRef.current.y,
      })
    } else if (e.touches.length === 2 && inspectTouchStartDistRef.current) {
      if (e.cancelable) e.preventDefault()
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const factor = dist / inspectTouchStartDistRef.current
      const newZoom = Math.min(3.5, Math.max(0.75, Number((inspectTouchStartZoomRef.current * factor).toFixed(2))))
      setInspectZoom(newZoom)
    }
  }

  const handleInspectTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsInspectDragging(false)
      inspectTouchStartDistRef.current = null
    } else if (e.touches.length === 1) {
      const t = e.touches[0]
      inspectDragStartRef.current = {
        x: t.clientX - inspectPan.x,
        y: t.clientY - inspectPan.y,
      }
      setIsInspectDragging(true)
      inspectTouchStartDistRef.current = null
    }
  }

  // Mouse Drag / Touch / Wheel cho Fullscreen Single Mode
  const handleFsMouseDown = (e) => {
    if (e.button !== 0) return
    setIsFsDragging(true)
    const startX = e.clientX - fsPanOffset.x
    const startY = e.clientY - fsPanOffset.y

    const onMove = (moveEvent) => {
      setFsPanOffset({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      })
    }

    const onUp = () => {
      setIsFsDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const handleFsTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsFsDragging(true)
      const t = e.touches[0]
      fsDragStartRef.current = {
        x: t.clientX - fsPanOffset.x,
        y: t.clientY - fsPanOffset.y,
      }
    } else if (e.touches.length === 2) {
      setIsFsDragging(false)
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      fsTouchStartDistRef.current = dist
      fsTouchStartZoomRef.current = fsSingleZoom
    }
  }

  const handleFsTouchMove = (e) => {
    if (e.touches.length === 1 && isFsDragging) {
      if (e.cancelable) e.preventDefault()
      const t = e.touches[0]
      setFsPanOffset({
        x: t.clientX - fsDragStartRef.current.x,
        y: t.clientY - fsDragStartRef.current.y,
      })
    } else if (e.touches.length === 2 && fsTouchStartDistRef.current) {
      if (e.cancelable) e.preventDefault()
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const factor = dist / fsTouchStartDistRef.current
      const newZoom = Math.min(3.5, Math.max(0.75, Number((fsTouchStartZoomRef.current * factor).toFixed(2))))
      setFsSingleZoom(newZoom)
    }
  }

  const handleFsTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsFsDragging(false)
      fsTouchStartDistRef.current = null
    } else if (e.touches.length === 1) {
      const t = e.touches[0]
      fsDragStartRef.current = {
        x: t.clientX - fsPanOffset.x,
        y: t.clientY - fsPanOffset.y,
      }
      setIsFsDragging(true)
      fsTouchStartDistRef.current = null
    }
  }

  const handleFsWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.2 : -0.2
    setFsSingleZoom((z) => Math.min(3.0, Math.max(0.8, Number((z + delta).toFixed(2)))))
  }, [])

  // Mouse Drag cho Single Mode Inline
  const handleSingleMouseDown = (e) => {
    if (e.button !== 0 || singleZoom <= 1.0) return
    setIsSingleDragging(true)
    const startX = e.clientX - singlePan.x
    const startY = e.clientY - singlePan.y

    const onMove = (moveEvent) => {
      setSinglePan({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      })
    }

    const onUp = () => {
      setIsSingleDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (inspectPage !== null) {
        if (e.key === 'Escape') closeInspector()
        else if (e.key === 'ArrowRight') handleNextPage()
        else if (e.key === 'ArrowLeft') handlePrevPage()
        else if (e.key === '+' || e.key === '=') handleInspectZoomIn()
        else if (e.key === '-' || e.key === '_') handleInspectZoomOut()
        else if (e.key === '0') handleInspectZoomReset()
        return
      }

      if (isFullscreen) {
        if (e.key === 'Escape') closeFullscreen()
        else if (e.key === 'ArrowRight') handleNextPage()
        else if (e.key === 'ArrowLeft') handlePrevPage()
        else if (e.key === '+' || e.key === '=') {
          if (fsViewMode === 'single') setFsSingleZoom((z) => Math.min(3.0, Number((z + 0.25).toFixed(2))))
          else setFsZoomLevel((z) => Math.min(2.0, Number((z + 0.25).toFixed(2))))
        } else if (e.key === '-' || e.key === '_') {
          if (fsViewMode === 'single') setFsSingleZoom((z) => Math.max(0.8, Number((z - 0.25).toFixed(2))))
          else setFsZoomLevel((z) => Math.max(1.0, Number((z - 0.25).toFixed(2))))
        } else if (e.key === '0') {
          setFsZoomLevel(1.0)
          setFsSingleZoom(1.0)
          setFsPanOffset({ x: 0, y: 0 })
        }
      } else {
        if (e.key === 'ArrowRight') handleNextPage()
        else if (e.key === 'ArrowLeft') handlePrevPage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inspectPage, isFullscreen, fsViewMode, closeInspector, closeFullscreen, handleNextPage, handlePrevPage])

  // Clean up body overflow
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Page numbering and titles
  const leftPageNum = currentPage + 1
  const rightPageNum = Math.min(currentPage + 2, totalPages)
  const pageLabel = viewMode === 'single'
    ? `Trang ${currentPage + 1} / ${totalPages}`
    : leftPageNum === rightPageNum
    ? `Trang ${leftPageNum} / ${totalPages}`
    : `Trang ${leftPageNum} - ${rightPageNum} / ${totalPages}`

  const currentPageData = currentDoc.pages[currentPage] || {}
  const leftPageMeta = currentDoc.pages[currentPage]
  const rightPageMeta = currentDoc.pages[currentPage + 1]
  const spreadTitle = viewMode === 'single'
    ? `${currentPageData.title || ''} • ${currentPageData.subtitle || ''}`
    : leftPageMeta
    ? rightPageMeta
      ? `${leftPageMeta.title} • ${rightPageMeta.title}`
      : leftPageMeta.title
    : ''

  const spreadIndices = Array.from(
    { length: Math.ceil(totalPages / (viewMode === 'single' ? 1 : 2)) },
    (_, i) => i * (viewMode === 'single' ? 1 : 2)
  )
  const isFirstPage = currentPage === 0
  const isLastPage = viewMode === 'single'
    ? currentPage >= totalPages - 1
    : currentPage >= totalPages - (totalPages % 2 === 0 ? 2 : 1)

  // Active section finder cho Inspector
  const activeInspectSection = inspectPage !== null
    ? (QUICK_DOC_SECTIONS.slice().reverse().find((s) => inspectPage >= s.startPage) || QUICK_DOC_SECTIONS[0])
    : null

  return (
    <div className="w-full flex flex-col items-center">
      {/* PageFlip Global Drop-Shadow & High-DPI Centering Styles */}
      <style>{`
        .stf__parent {
          margin: 0 auto !important;
          max-width: 100% !important;
        }
        .stf__wrapper {
          margin: 0 auto !important;
          max-width: 100% !important;
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(0, 0, 0, 0.06);
          border-radius: 6px;
        }
        .stf__parent canvas,
        .stf__parent img {
          image-rendering: auto;
          image-rendering: high-quality;
        }
      `}</style>



      {/* ── STAGE 1: CHẾ ĐỘ 2 TRANG LẬT SÁCH (ĐÃ ÁP DỤNG HIDPI 2X SUPERSAMPLING) ── */}
      {viewMode === 'double' && (
        <div className="relative w-full max-w-6xl flex items-center justify-center my-2 sm:my-3 select-none">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100/90 backdrop-blur-xs z-30 rounded-xl min-h-[360px]">
              <div className="w-8 h-8 border-3 border-[#0F5132] border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-xs font-medium text-stone-600">Đang chuẩn bị hồ sơ 2 trang sắc nét (HiDPI)...</span>
            </div>
          )}

          {/* Floating Left Turn Chevron */}
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={isFirstPage}
            className={`hidden md:flex absolute md:-left-12 lg:-left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-[#0F5132] shadow-md hover:shadow-xl border border-stone-200/80 items-center justify-center transition-all ${
              isFirstPage
                ? 'opacity-0 pointer-events-none'
                : 'opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            title="Trang trước (←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Book Mount Container with Double Click to Inspect */}
          <div
            ref={bookContainerRef}
            onDoubleClick={handleBookDoubleClick}
            className="flex items-center justify-center cursor-grab active:cursor-grabbing max-w-full"
            title="Nhấp hoặc kéo mép giấy để lật trang • Nhấn đúp để phóng to soi chi tiết"
          />

          {/* Floating Right Turn Chevron */}
          <button
            type="button"
            onClick={handleNextPage}
            disabled={isLastPage}
            className={`hidden md:flex absolute md:-right-12 lg:-right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-[#0F5132] shadow-md hover:shadow-xl border border-stone-200/80 items-center justify-center transition-all ${
              isLastPage
                ? 'opacity-0 pointer-events-none'
                : 'opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            title="Trang sau (→)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ── BOTTOM CONTROL BAR: Thanh điều khiển hợp nhất ── */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-1.5 mt-2 px-2 overflow-hidden">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 bg-white/95 backdrop-blur-sm rounded-full border border-stone-200/90 shadow-sm max-w-full">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={isFirstPage}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              isFirstPage
                ? 'opacity-35 cursor-not-allowed text-stone-400'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 active:scale-95 cursor-pointer'
            }`}
            title="Trang trước"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trước</span>
          </button>

          <span className="text-xs font-bold text-stone-900 font-heading px-2.5 sm:px-3 py-1 sm:py-1.5 bg-stone-100 rounded-full select-none whitespace-nowrap">
            {pageLabel}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={isLastPage}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              isLastPage
                ? 'opacity-35 cursor-not-allowed text-stone-400'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 active:scale-95 cursor-pointer'
            }`}
            title="Trang sau"
          >
            <span className="hidden sm:inline">Sau</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          {/* Nút mở kính lúp soi chi tiết */}
          <button
            type="button"
            onClick={() => openInspector(currentPage)}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold bg-[#E8F5EE] hover:bg-[#D5EADB] text-[#0F5132] border border-[#BDE0C9] transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            title="Mở chế độ Kính lúp HD soi từng số liệu kiểm nghiệm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Soi chi tiết</span>
          </button>

          {/* Nút mở toàn màn hình */}
          <button
            type="button"
            onClick={openFullscreen}
            className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-bold bg-[#0F5132] hover:bg-[#16A34A] text-white shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            title="Mở toàn màn hình"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Toàn màn hình</span>
          </button>

          <a
            href={currentDoc.pdfUrl}
            download="ho-so-kiem-nghiem-attp-co-ut.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-all border border-transparent hover:border-stone-200 whitespace-nowrap"
            title="Tải trọn bộ hồ sơ pháp lý PDF gốc (5.3 MB)"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden md:inline">Tải PDF</span>
            <span className="inline md:hidden">PDF</span>
          </a>
        </div>

        {/* Spread Quick Indicators */}
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap justify-center max-w-full">
          {spreadIndices.map((spreadStart) => {
            const isCurrentSpread = viewMode === 'single'
              ? currentPage === spreadStart
              : Math.floor(currentPage / 2) * 2 === spreadStart
            const sLeft = spreadStart + 1
            const sRight = viewMode === 'single' ? sLeft : Math.min(spreadStart + 2, totalPages)
            const dotTitle = sLeft === sRight ? `Xem Trang ${sLeft}` : `Xem Trang ${sLeft} - ${sRight}`
            return (
              <button
                key={spreadStart}
                type="button"
                onClick={() => handleJumpToSpread(spreadStart)}
                className={`transition-all cursor-pointer ${
                  isCurrentSpread
                    ? 'w-7 h-2 bg-[#0F5132] rounded-full'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400 rounded-full'
                }`}
                title={dotTitle}
                aria-label={dotTitle}
              />
            )
          })}
        </div>

        {/* Chú thích tiêu đề tài liệu */}
        {spreadTitle && (
          <div className="w-full max-w-xl text-[11px] sm:text-xs text-stone-600 text-center font-medium leading-relaxed px-2">
            <span className="text-[#0F5132] font-bold mr-1">●</span>
            <span>{spreadTitle}</span>
          </div>
        )}

        {/* Hướng dẫn thao tác */}
        <p className="w-full max-w-lg text-[11px] sm:text-xs text-stone-500 text-center px-2 leading-relaxed flex items-center justify-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
          <span>
            {viewMode === 'double'
              ? 'Nhấn đúp trang để phóng to soi chi tiết • Vuốt mép giấy để lật trang'
              : 'Dùng mũi tên để chuyển trang • Bấm "Kính lúp HD" để soi từng số liệu kiểm nghiệm'}
          </span>
        </p>
      </div>

      {/* ── ULTRA-HD DOCUMENT INSPECTOR LIGHTBOX (SOI CHI TIẾT SẮC NÉT Ở ĐỘ PHÂN GIẢI 1191x1684) ── */}
      {inspectPage !== null && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200">
          {/* Header Lightbox */}
          <div className="h-14 px-3 sm:px-6 bg-stone-900/95 border-b border-stone-800 flex items-center justify-between text-white shrink-0">
            {/* Left: Info */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-lg sm:text-xl shrink-0">{currentDoc.icon}</span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold truncate flex items-center gap-1.5">
                  <span className="text-emerald-400 font-mono">Trang {inspectPage + 1}/{totalPages}:</span>
                  <span className="truncate">{currentDoc.pages[inspectPage]?.title || `Trang ${inspectPage + 1}`}</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-400 truncate hidden xs:block">
                  {currentDoc.pages[inspectPage]?.subtitle || `${currentDoc.name} • Bản quét HD gốc`}
                </div>
              </div>
            </div>

            {/* Center: Zoom controls */}
            <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
              <button
                type="button"
                onClick={handleInspectZoomOut}
                disabled={inspectZoom <= 0.75}
                className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                  inspectZoom <= 0.75
                    ? 'text-stone-600 cursor-not-allowed'
                    : 'hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer'
                }`}
                title="Thu nhỏ (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleInspectZoomReset}
                className="text-[10px] sm:text-[11px] font-mono px-2 text-stone-200 hover:text-white cursor-pointer min-w-[42px] text-center"
                title="Khôi phục mức đọc chuẩn 150% (Phím 0)"
              >
                {Math.round(inspectZoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleInspectZoomIn}
                disabled={inspectZoom >= 3.5}
                className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                  inspectZoom >= 3.5
                    ? 'text-stone-600 cursor-not-allowed'
                    : 'hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer'
                }`}
                title="Phóng to (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-stone-700 mx-1 hidden sm:block" />

              <button
                type="button"
                onClick={handleInspectFit}
                className="hidden sm:inline-flex px-2 py-1 text-[10px] font-semibold text-stone-300 hover:text-white hover:bg-stone-700 rounded cursor-pointer"
                title="Vừa màn hình"
              >
                Vừa khung
              </button>

              <button
                type="button"
                onClick={handleInspectZoomReset}
                className="hidden sm:inline-flex px-2 py-1 text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-stone-700 rounded cursor-pointer"
                title="Phóng 150% để đọc rõ số liệu"
              >
                Chuẩn đọc nét
              </button>
            </div>

            {/* Right: PDF & Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={currentDoc.pdfUrl}
                download="ho-so-kiem-nghiem-attp-co-ut.pdf"
                className="px-2.5 sm:px-3 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                title="Tải văn bản PDF gốc"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tải PDF</span>
              </a>

              <button
                type="button"
                onClick={closeInspector}
                className="h-8 px-2 sm:px-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center gap-1 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                title="Đóng (ESC)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Đóng</span>
              </button>
            </div>
          </div>

          {/* Body Lightbox: Pan & Zoom Viewport (Hỗ trợ chuột kéo mượt mà, pinch-to-zoom 2 ngón và cuộn chuột) */}
          <div
            className="flex-1 relative overflow-hidden flex items-center justify-center p-2 sm:p-6 cursor-grab active:cursor-grabbing bg-stone-950"
            style={{ touchAction: 'none' }}
            onMouseDown={handleInspectMouseDown}
            onTouchStart={handleInspectTouchStart}
            onTouchMove={handleInspectTouchMove}
            onTouchEnd={handleInspectTouchEnd}
            onWheel={handleInspectWheel}
            onDoubleClick={handleInspectDoubleClick}
            title="Kéo chuột để di chuyển • Cuộn chuột để phóng to/thu nhỏ • Nhấn đúp để chuyển đổi tỷ lệ"
          >
            {/* Left page switcher */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={inspectPage === 0}
              className={`fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-900/90 hover:bg-[#0F5132] text-white border border-stone-700 shadow-2xl flex items-center justify-center transition-all ${
                inspectPage === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer'
              }`}
              title="Trang trước (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Native High-Resolution Image with Pan & Zoom transform */}
            <div
              className="relative transition-transform select-none"
              style={{
                transform: `translate(${inspectPan.x}px, ${inspectPan.y}px) scale(${inspectZoom})`,
                transformOrigin: 'center center',
                transition: isInspectDragging ? 'none' : 'transform 0.12s ease-out',
              }}
            >
              <img
                src={currentDoc.pages[inspectPage]?.image}
                alt={currentDoc.pages[inspectPage]?.title || `Trang ${inspectPage + 1}`}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-2xl border border-stone-800 pointer-events-none"
                style={{ imageRendering: 'high-quality' }}
                draggable={false}
              />
            </div>

            {/* Right page switcher */}
            <button
              type="button"
              onClick={handleNextPage}
              disabled={inspectPage >= totalPages - 1}
              className={`fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-900/90 hover:bg-[#0F5132] text-white border border-stone-700 shadow-2xl flex items-center justify-center transition-all ${
                inspectPage >= totalPages - 1
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer'
              }`}
              title="Trang sau (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Lightbox: Quick Section Jump & Instructions (Đã sửa triệt để lỗi section active) */}
          <div className="h-14 px-3 sm:px-6 bg-stone-900/95 border-t border-stone-800 flex items-center justify-between text-white shrink-0 text-xs">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={inspectPage === 0}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 bg-stone-800 transition-all ${
                inspectPage === 0
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'hover:bg-stone-700 text-stone-200 hover:text-white cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang trước</span>
            </button>

            {/* Quick sections jump: Chỉ sáng chính xác 1 mục hồ sơ tương ứng */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 max-w-[55vw] scrollbar-none">
              {QUICK_DOC_SECTIONS.map((sec) => {
                const isSecActive = activeInspectSection?.startPage === sec.startPage
                return (
                  <button
                    key={sec.startPage}
                    type="button"
                    onClick={() => {
                      setInspectPage(sec.startPage)
                      setInspectPan({ x: 0, y: 0 })
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isSecActive
                        ? 'bg-[#0F5132] text-white shadow-xs'
                        : 'bg-stone-800/80 text-stone-400 hover:text-white hover:bg-stone-700'
                    }`}
                  >
                    {sec.label}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={inspectPage >= totalPages - 1}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 bg-stone-800 transition-all ${
                inspectPage >= totalPages - 1
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'hover:bg-stone-700 text-stone-200 hover:text-white cursor-pointer'
              }`}
            >
              <span className="hidden sm:inline">Trang sau</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── FULLSCREEN MODAL (CHUYỂN ĐỔI 2 TRANG 3D HOẶC 1 TRANG THU PHÓNG TỰ DO) ── */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200">
          {/* Header Modal */}
          <div className="h-14 px-3 sm:px-6 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-lg sm:text-xl shrink-0">{currentDoc.icon}</span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold truncate">
                  {currentDoc.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-400 truncate hidden xs:block">
                  {currentDoc.badge} • Đóng mộc đỏ pháp lý &amp; kiểm nghiệm
                </div>
              </div>
            </div>

            {/* Mode Switcher in Fullscreen */}
            <div className="hidden sm:inline-flex p-0.5 bg-stone-800 rounded-lg border border-stone-700">
              <button
                type="button"
                onClick={() => handleSetFsViewMode('double')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  fsViewMode === 'double'
                    ? 'bg-[#0F5132] text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                📖 2 Trang (Lật 3D)
              </button>
              <button
                type="button"
                onClick={() => handleSetFsViewMode('single')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  fsViewMode === 'single'
                    ? 'bg-[#0F5132] text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                🔍 1 Trang (Đọc chi tiết)
              </button>
            </div>

            {/* Right: Zoom controls, PDF Download, Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {fsViewMode === 'single' ? (
                <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
                  <button
                    type="button"
                    onClick={() => setFsSingleZoom((z) => Math.max(0.8, Number((z - 0.25).toFixed(2))))}
                    disabled={fsSingleZoom <= 0.8}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
                    title="Thu nhỏ"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFsSingleZoom(1.0)
                      setFsPanOffset({ x: 0, y: 0 })
                    }}
                    className="text-[10px] sm:text-[11px] font-mono px-1.5 text-stone-300 min-w-[38px] text-center hover:text-white cursor-pointer"
                    title="Đặt lại 100%"
                  >
                    {Math.round(fsSingleZoom * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setFsSingleZoom((z) => Math.min(3.0, Number((z + 0.25).toFixed(2))))}
                    disabled={fsSingleZoom >= 3.0}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
                    title="Phóng to"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
                  <button
                    type="button"
                    onClick={() => setFsZoomLevel((z) => Math.max(1.0, Number((z - 0.25).toFixed(2))))}
                    disabled={fsZoomLevel <= 1.0}
                    className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                      fsZoomLevel <= 1.0
                        ? 'text-stone-600 cursor-not-allowed'
                        : 'hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer'
                    }`}
                    title="Thu nhỏ (-)"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFsZoomLevel(1.0)}
                    className="text-[10px] sm:text-[11px] font-mono px-1.5 sm:px-2 text-stone-300 min-w-[38px] sm:min-w-[42px] text-center hover:text-white cursor-pointer"
                    title="Đặt lại 100% (Phím 0)"
                  >
                    {Math.round(fsZoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setFsZoomLevel((z) => Math.min(2.0, Number((z + 0.25).toFixed(2))))}
                    disabled={fsZoomLevel >= 2.0}
                    className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                      fsZoomLevel >= 2.0
                        ? 'text-stone-600 cursor-not-allowed'
                        : 'hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer'
                    }`}
                    title="Phóng to (+)"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Nút soi chi tiết ngay trong toàn màn hình */}
              <button
                type="button"
                onClick={() => openInspector(currentPage)}
                className="px-2.5 sm:px-3 py-1.5 bg-[#0F5132] hover:bg-[#16A34A] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Mở Kính lúp soi chi tiết 150%"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Soi HD</span>
              </button>

              <a
                href={currentDoc.pdfUrl}
                download="ho-so-kiem-nghiem-attp-co-ut.pdf"
                className="px-2.5 sm:px-3 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                title="Tải văn bản PDF gốc"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tải PDF</span>
              </a>

              <button
                type="button"
                onClick={closeFullscreen}
                className="h-8 px-2 sm:px-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center gap-1 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                title="Đóng (ESC)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Đóng</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Stage */}
          <div className="flex-1 relative flex overflow-hidden p-2 sm:p-6 select-none bg-stone-950">
            {isFsLoading && fsViewMode === 'double' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/75 z-40">
                <div className="w-10 h-10 border-3 border-[#0F5132] border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-xs text-stone-300">Đang tải chế độ 2 trang sắc nét (HiDPI)...</span>
              </div>
            )}

            {/* Left Chevron */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-stone-900/90 hover:bg-[#0F5132] text-white border border-stone-700/80 shadow-2xl items-center justify-center transition-all ${
                currentPage === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer'
              }`}
              title="Trang trước (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* 2-Page 3D Flip View inside Fullscreen with smooth CSS scale */}
            {fsViewMode === 'double' && (
              <div
                className="m-auto flex items-center justify-center transition-transform duration-150"
                style={{
                  transform: `scale(${fsZoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                <div
                  ref={fullscreenBookContainerRef}
                  onDoubleClick={handleFsBookDoubleClick}
                  className="flex items-center justify-center cursor-grab active:cursor-grabbing"
                  title="Nhấp hoặc kéo mép giấy để lật trang • Nhấn đúp để soi chi tiết"
                />
              </div>
            )}

            {/* 1-Page Detailed Pan & Zoom inside Fullscreen with touch and wheel support */}
            {fsViewMode === 'single' && (
              <div
                className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
                onMouseDown={handleFsMouseDown}
                onTouchStart={handleFsTouchStart}
                onTouchMove={handleFsTouchMove}
                onTouchEnd={handleFsTouchEnd}
                onWheel={handleFsWheel}
                onDoubleClick={() => {
                  setFsSingleZoom((z) => (z >= 1.5 ? 1.0 : 2.0))
                  setFsPanOffset({ x: 0, y: 0 })
                }}
                title="Kéo chuột để di chuyển • Cuộn chuột để phóng to • Nhấn đúp để chuyển đổi zoom"
              >
                <div
                  style={{
                    transform: `translate(${fsPanOffset.x}px, ${fsPanOffset.y}px) scale(${fsSingleZoom})`,
                    transformOrigin: 'center center',
                    transition: isFsDragging ? 'none' : 'transform 0.12s ease-out',
                  }}
                  className="relative select-none"
                >
                  <img
                    src={currentDoc.pages[currentPage]?.image}
                    alt={currentDoc.pages[currentPage]?.title || `Trang ${currentPage + 1}`}
                    className="max-h-[82vh] max-w-[85vw] object-contain rounded shadow-2xl border border-stone-800 pointer-events-none"
                    style={{ imageRendering: 'high-quality' }}
                    draggable={false}
                  />
                </div>
              </div>
            )}

            {/* Right Chevron */}
            <button
              type="button"
              onClick={handleNextPage}
              disabled={isLastPage}
              className={`hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-stone-900/90 hover:bg-[#0F5132] text-white border border-stone-700/80 shadow-2xl items-center justify-center transition-all ${
                isLastPage
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer'
              }`}
              title="Trang sau (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Fullscreen Bottom Bar */}
          <div className="h-14 px-3 sm:px-6 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between text-white shrink-0">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 bg-stone-800 transition-all ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'hover:bg-stone-700 text-stone-200 hover:text-white cursor-pointer active:scale-95'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang trước</span>
            </button>

            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 max-w-[60vw] scrollbar-none">
              {spreadIndices.map((spreadStart) => {
                const isCurrentSpread = fsViewMode === 'single'
                  ? currentPage === spreadStart
                  : Math.floor(currentPage / 2) * 2 === spreadStart
                const fsLeft = spreadStart + 1
                const fsRight = fsViewMode === 'single' ? fsLeft : Math.min(spreadStart + 2, totalPages)
                const label = fsLeft === fsRight ? `Trang ${fsLeft}` : `${fsLeft}-${fsRight}`
                return (
                  <button
                    key={spreadStart}
                    type="button"
                    onClick={() => handleJumpToSpread(spreadStart)}
                    className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isCurrentSpread
                        ? 'bg-[#0F5132] text-white shadow-sm'
                        : 'bg-stone-800/90 text-stone-400 hover:text-white hover:bg-stone-700'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={isLastPage}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 bg-stone-800 transition-all ${
                isLastPage
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'hover:bg-stone-700 text-stone-200 hover:text-white cursor-pointer active:scale-95'
              }`}
            >
              <span className="hidden sm:inline">Trang sau</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
