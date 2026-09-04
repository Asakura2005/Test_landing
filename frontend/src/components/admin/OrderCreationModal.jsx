import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, Package, Plus, Trash2, Edit3, Save } from 'lucide-react'
import { createOrder, updateOrder, getProducts } from '../../services/supabase'

export default function OrderCreationModal({ lead, order, onClose, onSuccess }) {
  const isEditMode = Boolean(order && order.id)

  const [products, setProducts] = useState([])
  const [items, setItems] = useState([
    { product_id: '', product_name: '', variant_name: 'Thùng tiêu chuẩn', quantity: 10, unit_price: 250000 }
  ])
  const [customerName, setCustomerName] = useState(order?.customer_name || lead?.full_name || '')
  const [companyName, setCompanyName] = useState(order?.company_name || lead?.company || '')
  const [phone, setPhone] = useState(order?.customer_phone || lead?.phone || '')
  const [salesName, setSalesName] = useState(order?.sales_name || lead?.sales_name || 'Admin')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prevent background scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const fetchProds = async () => {
      try {
        const data = await getProducts()
        setProducts(data || [])

        // If in Edit Mode with existing order items
        if (isEditMode && order?.items && order.items.length > 0) {
          setItems(order.items.map(it => ({
            product_id: it.product_id || (data?.find(p => p.name === it.product_name)?.id || ''),
            product_name: it.product_name || '',
            variant_name: it.variant_name || 'Thùng sỉ tiêu chuẩn',
            quantity: Number(it.quantity) || 1,
            unit_price: Number(it.unit_price) || 0
          })))
        } else if (!isEditMode && lead?.last_product_name && data?.length > 0) {
          // If in Create Mode with lead's interested product
          const match = data.find(p => p.name === lead.last_product_name || p.id === lead.last_product_id)
          if (match) {
            setItems([{
              product_id: match.id,
              product_name: match.name,
              variant_name: match.variants?.[0]?.name || 'Thùng sỉ tiêu chuẩn',
              quantity: 20,
              unit_price: Number(match.variants?.[0]?.price || match.price_wholesale || 150000)
            }])
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchProds()
  }, [lead, order, isEditMode])

  const handleAddItem = () => {
    const defaultProd = products[0]
    setItems([
      ...items,
      {
        product_id: defaultProd?.id || '',
        product_name: defaultProd?.name || '',
        variant_name: defaultProd?.variants?.[0]?.name || 'Thùng sỉ tiêu chuẩn',
        quantity: 10,
        unit_price: Number(defaultProd?.variants?.[0]?.price || defaultProd?.price_wholesale || 150000)
      }
    ])
  }

  const handleItemChange = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = value

    // Khi chọn sản phẩm từ dropdown: cập nhật ID, Tên, Quy cách và Giá mặc định
    if (field === 'product_id') {
      const selected = products.find(p => String(p.id) === String(value))
      if (selected) {
        updated[index].product_name = selected.name
        updated[index].variant_name = selected.variants?.[0]?.name || 'Thùng tiêu chuẩn'
        updated[index].unit_price = Number(selected.variants?.[0]?.price || selected.price_wholesale || 150000)
      } else {
        updated[index].product_name = ''
      }
    }

    // Khi chọn biến thể quy cách từ danh sách biến thể
    if (field === 'variant_name') {
      const curProd = products.find(p => String(p.id) === String(updated[index].product_id))
      if (curProd && curProd.variants) {
        const vMatch = curProd.variants.find(v => v.name === value)
        if (vMatch && vMatch.price) {
          updated[index].unit_price = Number(vMatch.price)
        }
      }
    }

    setItems(updated)
  }

  const handleRemoveItem = (index) => {
    if (items.length <= 1) {
      setItems([{
        product_id: '',
        product_name: '',
        variant_name: 'Thùng tiêu chuẩn',
        quantity: 1,
        unit_price: 0
      }])
      return
    }
    setItems(items.filter((_, i) => i !== index))
  }

  const totalAmount = items.reduce(
    (acc, curr) => acc + (Number(curr.quantity) || 0) * (Number(curr.unit_price) || 0),
    0
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validItems = items.filter(it => it.product_name && Number(it.quantity) > 0)
    if (validItems.length === 0) {
      return alert('Vui lòng chọn ít nhất 1 sản phẩm hợp lệ và số lượng > 0')
    }

    if (!customerName.trim()) {
      return alert('Vui lòng nhập tên khách hàng')
    }

    setIsSubmitting(true)

    const orderData = {
      lead_id: order?.lead_id || lead?.id || null,
      customer_name: customerName.trim(),
      company_name: companyName.trim(),
      customer_phone: phone.trim(),
      sales_name: salesName.trim() || 'Admin',
      total_amount: totalAmount,
      utm_source: order?.utm_source || lead?.utm_source || 'direct',
      utm_campaign: order?.utm_campaign || lead?.utm_campaign || '',
    }

    try {
      if (isEditMode) {
        const updated = await updateOrder(order.id, orderData, validItems)
        alert(`Cập nhật đơn hàng ${order.order_code || ''} thành công!`)
        if (onSuccess) onSuccess(updated)
      } else {
        const newOrder = await createOrder(orderData, validItems)
        alert(`Tạo đơn hàng thành công! Mã đơn: ${newOrder.order_code || 'HAQ-SUCCESS'}`)
        if (onSuccess) onSuccess(newOrder)
      }
      onClose()
    } catch (err) {
      alert(`Lỗi ${isEditMode ? 'cập nhật' : 'tạo'} đơn hàng: ` + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs antialiased animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-5xl max-h-[calc(100vh-32px)] flex flex-col overflow-hidden text-gray-800 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. MODAL HEADER */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0F5132] shrink-0">
              {isEditMode ? <Edit3 className="w-4 h-4" /> : <Package className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  {isEditMode ? 'Chỉnh sửa đơn hàng' : 'Tạo đơn hàng B2B'}
                </h2>
                {isEditMode && order?.order_code && (
                  <span className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-xs font-mono font-bold text-gray-700">
                    {order.order_code}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {isEditMode 
                  ? 'Điều chỉnh danh mục sản phẩm, quy cách, số lượng và đơn giá.' 
                  : `Khởi tạo đơn hàng B2B chính thức cho ${lead?.full_name || 'khách hàng'}.`}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            title="Đóng cửa sổ (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. SCROLLABLE FORM BODY */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* SECTION 1: CUSTOMER INFO (4-column balanced grid) */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                Thông tin khách hàng & phụ trách
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Tên khách hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full h-10 px-3 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Doanh nghiệp / Đại lý
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="VD: NPP Bánh Kẹo Toàn Quốc"
                    className="w-full h-10 px-3 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0912345678"
                    className="w-full h-10 px-3 text-sm font-mono rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Sales phụ trách
                  </label>
                  <input
                    type="text"
                    value={salesName}
                    onChange={(e) => setSalesName(e.target.value)}
                    placeholder="VD: Nguyễn Văn Sales"
                    className="w-full h-10 px-3 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: PRODUCTS TABLE (ERP Data Grid) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900">
                    Danh sách sản phẩm trong đơn hàng
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chọn lại sản phẩm từ danh mục nếu thêm nhầm, điều chỉnh quy cách đóng gói, số lượng và đơn giá sỉ.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="h-8 px-3 text-xs font-semibold text-white bg-[#0F5132] hover:bg-[#14532D] rounded-md transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm sản phẩm</span>
                </button>
              </div>

              <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-2.5 px-3 w-[34%]">Sản phẩm</th>
                        <th className="py-2.5 px-3 w-[26%]">Quy cách / Biến thể</th>
                        <th className="py-2.5 px-3 w-[12%] text-center">Số lượng</th>
                        <th className="py-2.5 px-3 w-[15%] text-right">Đơn giá (VNĐ)</th>
                        <th className="py-2.5 px-3 w-[15%] text-right">Thành tiền</th>
                        <th className="py-2.5 px-3 w-[6%] text-center">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      {items.map((item, idx) => {
                        const selectedProd = products.find(p => String(p.id) === String(item.product_id))
                        const hasVariants = selectedProd?.variants && selectedProd.variants.length > 0
                        const lineTotal = (Number(item.quantity) || 0) * (Number(item.unit_price) || 0)

                        return (
                          <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                            {/* Product Selector */}
                            <td className="py-2.5 px-3 align-middle">
                              <select
                                value={item.product_id}
                                onChange={(e) => handleItemChange(idx, 'product_id', e.target.value)}
                                className="w-full h-9 px-2.5 text-xs rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                                required
                              >
                                <option value="">-- Chọn sản phẩm --</option>
                                {products.map(p => (
                                  <option key={p.id} value={p.id}>
                                    {p.name} {p.category ? `(${p.category})` : ''}
                                  </option>
                                ))}
                              </select>
                              {!item.product_id && (
                                <input
                                  type="text"
                                  placeholder="Hoặc gõ tên SP tùy chỉnh"
                                  value={item.product_name}
                                  onChange={(e) => handleItemChange(idx, 'product_name', e.target.value)}
                                  className="mt-1.5 w-full h-8 px-2 text-xs rounded border border-gray-200 bg-white placeholder-gray-400 focus:outline-none focus:border-[#0F5132]"
                                />
                              )}
                            </td>

                            {/* Variant / Packaging */}
                            <td className="py-2.5 px-3 align-middle">
                              {hasVariants ? (
                                <select
                                  value={item.variant_name}
                                  onChange={(e) => handleItemChange(idx, 'variant_name', e.target.value)}
                                  className="w-full h-9 px-2.5 text-xs rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                                >
                                  {selectedProd.variants.map((v, vIdx) => (
                                    <option key={vIdx} value={v.name}>
                                      {v.name} {v.price ? `(${Number(v.price).toLocaleString('vi-VN')} đ)` : ''}
                                    </option>
                                  ))}
                                  <option value="custom">Quy cách tùy chỉnh...</option>
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  placeholder="Quy cách (VD: Thùng 24 hộp)"
                                  value={item.variant_name}
                                  onChange={(e) => handleItemChange(idx, 'variant_name', e.target.value)}
                                  className="w-full h-9 px-2.5 text-xs rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                                />
                              )}
                              {item.variant_name === 'custom' && (
                                <input
                                  type="text"
                                  placeholder="Nhập quy cách tùy chỉnh..."
                                  onChange={(e) => handleItemChange(idx, 'variant_name', e.target.value)}
                                  className="mt-1.5 w-full h-8 px-2 text-xs rounded border border-gray-200 bg-white placeholder-gray-400 focus:outline-none focus:border-[#0F5132]"
                                />
                              )}
                            </td>

                            {/* Quantity */}
                            <td className="py-2.5 px-3 align-middle">
                              <input
                                type="number"
                                min="1"
                                placeholder="SL"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                                className="w-full h-9 px-2 text-xs text-center font-bold font-mono rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                                required
                              />
                            </td>

                            {/* Unit Price */}
                            <td className="py-2.5 px-3 align-middle">
                              <input
                                type="number"
                                min="0"
                                step="1000"
                                placeholder="Đơn giá"
                                value={item.unit_price}
                                onChange={(e) => handleItemChange(idx, 'unit_price', e.target.value)}
                                className="w-full h-9 px-2.5 text-xs text-right font-semibold font-mono rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                                required
                              />
                            </td>

                            {/* Subtotal */}
                            <td className="py-2.5 px-3 align-middle text-right">
                              <span className="font-mono font-bold text-gray-800 text-xs">
                                {lineTotal.toLocaleString('vi-VN')} đ
                              </span>
                            </td>

                            {/* Delete Action */}
                            <td className="py-2.5 px-3 align-middle text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(idx)}
                                className="h-8 w-8 inline-flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                title="Xóa dòng sản phẩm này"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SECTION 3: SUMMARY BAR */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-700 block">
                  Tổng giá trị đơn hàng
                </span>
                <span className="text-xs text-gray-500">
                  {items.filter(i => i.product_name).length} loại sản phẩm đã chọn
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-[#0F5132]">
                  {totalAmount.toLocaleString('vi-VN')}
                </span>
                <span className="text-xs font-semibold text-gray-700 ml-1.5">VNĐ</span>
              </div>
            </div>

          </div>

          {/* 3. MODAL FOOTER */}
          <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-6 text-sm font-semibold text-white bg-[#0F5132] hover:bg-[#14532D] rounded-md transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Đang xử lý...</span>
              ) : isEditMode ? (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu thay đổi đơn hàng</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Xác nhận tạo đơn hàng</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return modalContent
}
