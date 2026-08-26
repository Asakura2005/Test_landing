import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, LogOut, Package, RefreshCw, Pin, Users, Newspaper } from 'lucide-react'
import { getProducts, deleteProduct, createProduct, updateProduct } from '../services/supabase'
import ProductModal from '../components/admin/ProductModal'
import LeadsManager from '../components/admin/LeadsManager'
import CategoryManager from '../components/admin/CategoryManager'
import NewsManager from '../components/admin/NewsManager'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  
  const [activeTab, setActiveTab] = useState('products') // 'products' | 'leads'

  const currentPinnedCount = products.filter(p => p.is_pinned).length

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'haqfood2024') {
      setIsAuthenticated(true)
      localStorage.setItem('haq_admin_auth', 'true')
    } else {
      alert('Mật khẩu không đúng!')
    }
  }

  // Check auth on mount
  useEffect(() => {
    if (localStorage.getItem('haq_admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await getProducts()
      setProducts(data || [])
    } catch (err) {
      console.error(err)
      alert("Lỗi tải dữ liệu: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  // Handlers
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) return
    try {
      await deleteProduct(id)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  const handleSave = async (productData, variantsData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData, variantsData)
      } else {
        await createProduct(productData, variantsData)
      }
      setIsModalOpen(false)
      await fetchData()
    } catch (err) {
      throw err // Let modal handle the error alert
    }
  }

  const openNewModal = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('haq_admin_auth')
    setIsAuthenticated(false)
  }

  const togglePin = async (product) => {
    if (!product.is_pinned && currentPinnedCount >= 6) {
      alert("Đã đạt tối đa 6 sản phẩm ghim. Vui lòng bỏ ghim sản phẩm khác trước.")
      return
    }
    try {
      // Just updating the product's is_pinned status, we don't need to touch variants
      await updateProduct(product.id, { is_pinned: !product.is_pinned }, product.variants)
      await fetchData()
    } catch(err) {
      alert("Lỗi khi đổi trạng thái ghim: " + err.message)
    }
  }

  // --- Render Login ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-haq-bone flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 border border-black/10 rounded-xl shadow-xl w-full max-w-sm text-center">
          <h1 className="font-heading font-bold text-2xl mb-6 text-haq-ink">Đăng nhập Quản trị</h1>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-black/20 p-3 mb-4 rounded focus:outline-none focus:border-haq-orange"
            autoFocus
          />
          <button type="submit" className="w-full bg-haq-red text-white p-3 font-bold rounded hover:bg-red-700 transition-colors">
            Vào trang quản lý
          </button>
        </form>
      </div>
    )
  }

  // --- Render Dashboard ---
  return (
    <div className="min-h-screen bg-haq-bone flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-black/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-black/10 flex items-center gap-3">
          <span className="w-8 h-8 bg-haq-red text-white flex items-center justify-center font-bold text-lg rounded">
            H
          </span>
          <span className="font-heading font-bold text-lg tracking-tight">Admin Portal</span>
        </div>
        <div className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-3 w-full p-3 font-semibold rounded text-sm transition-colors ${
              activeTab === 'products' ? 'bg-haq-bone text-haq-ink' : 'text-haq-ink/60 hover:bg-black/5 hover:text-haq-ink'
            }`}
          >
            <Package className="w-5 h-5" /> Quản lý sản phẩm
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-3 w-full p-3 font-semibold rounded text-sm transition-colors ${
              activeTab === 'categories' ? 'bg-haq-bone text-haq-ink' : 'text-haq-ink/60 hover:bg-black/5 hover:text-haq-ink'
            }`}
          >
            <Pin className="w-5 h-5" /> Quản lý danh mục
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-3 w-full p-3 font-semibold rounded text-sm transition-colors ${
              activeTab === 'news' ? 'bg-haq-bone text-haq-ink' : 'text-haq-ink/60 hover:bg-black/5 hover:text-haq-ink'
            }`}
          >
            <Newspaper className="w-5 h-5" /> Quản lý tin tức
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-3 w-full p-3 font-semibold rounded text-sm transition-colors ${
              activeTab === 'leads' ? 'bg-haq-bone text-haq-ink' : 'text-haq-ink/60 hover:bg-black/5 hover:text-haq-ink'
            }`}
          >
            <Users className="w-5 h-5" /> Quản lý khách hàng
          </button>
        </div>
        <div className="p-4 border-t border-black/10">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 font-semibold rounded text-sm transition-colors">
            <LogOut className="w-5 h-5" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {activeTab === 'leads' ? (
          <LeadsManager />
        ) : activeTab === 'categories' ? (
          <CategoryManager products={products} />
        ) : activeTab === 'news' ? (
          <NewsManager />
        ) : (
          <>
            {/* Header */}
            <header className="bg-white border-b border-black/10 p-4 md:p-6 flex items-center justify-between sticky top-0 z-10">
              <div>
                <h1 className="font-heading font-bold text-2xl text-haq-ink">Danh sách Sản phẩm</h1>
                <p className="text-sm text-haq-ink/60 mt-1">Đã ghim: <strong className="text-haq-red">{currentPinnedCount}/6</strong> sản phẩm (Hiển thị đầu trang chủ)</p>
              </div>
              <button onClick={openNewModal} className="bg-haq-orange text-white px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm">
                <Plus className="w-5 h-5" /> <span className="hidden md:inline">Thêm sản phẩm</span>
              </button>
            </header>

            {/* Content */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-haq-ink/50">
                  <RefreshCw className="w-8 h-8 animate-spin mb-4 text-haq-orange" />
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white border border-black/10 rounded-xl p-12 text-center shadow-sm">
                  <Package className="w-12 h-12 text-haq-ink/20 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-haq-ink mb-2">Chưa có sản phẩm nào</h3>
                  <p className="text-haq-ink/60 mb-6">Hãy thêm sản phẩm đầu tiên của bạn vào hệ thống.</p>
                  <button onClick={openNewModal} className="text-haq-orange font-semibold hover:underline">
                    + Thêm sản phẩm ngay
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-haq-bone border-b border-black/10 text-xs uppercase tracking-wider text-haq-ink/60">
                          <th className="p-4 font-mono w-[5%] text-center">Ghim</th>
                          <th className="p-4 font-mono w-[30%]">Sản phẩm</th>
                          <th className="p-4 font-mono w-[15%]">Danh mục</th>
                          <th className="p-4 font-mono w-[30%]">Mô tả ngắn</th>
                          <th className="p-4 font-mono w-[10%] text-center">Variants</th>
                          <th className="p-4 font-mono w-[10%] text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p.id} className={`border-b border-black/5 hover:bg-black/[0.02] transition-colors group ${p.is_pinned ? 'bg-orange-50/50' : ''}`}>
                            <td className="p-4 text-center">
                              <button 
                                onClick={() => togglePin(p)} 
                                className={`p-2 rounded-full transition-colors ${p.is_pinned ? 'text-haq-red hover:bg-red-100' : 'text-black/20 hover:bg-black/5 hover:text-black/50'}`}
                                title={p.is_pinned ? "Bỏ ghim" : "Ghim lên đầu"}
                              >
                                <Pin className={`w-5 h-5 ${p.is_pinned ? 'fill-haq-red' : ''}`} />
                              </button>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-haq-ink">{p.name}</div>
                              <div className="text-xs text-haq-ink/50 mt-1">{p.slug}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-haq-ink/80">{p.category || 'Chưa phân loại'}</div>
                              {p.tag && (
                                <span className="inline-block bg-haq-red/10 text-haq-red text-[10px] px-2 py-0.5 rounded font-semibold whitespace-nowrap mt-1">
                                  {p.tag}
                               </span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-haq-ink/70 line-clamp-2" title={p.description}>
                                {p.description || '-'}
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <span className="inline-block bg-black/5 text-xs px-2 py-1 rounded font-mono font-bold">
                                {p.variants?.length || 0}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditModal(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Sửa">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(p.id, p.name)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </main>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal 
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          currentPinnedCount={currentPinnedCount}
        />
      )}
    </div>
  )
}
