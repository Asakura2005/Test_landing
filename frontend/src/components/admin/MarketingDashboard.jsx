import React, { useState, useEffect, useMemo } from 'react'
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Users, 
  ArrowUpRight, 
  Globe, 
  Tag, 
  Activity, 
  Filter,
  CheckCircle2,
  Layers,
  BarChart2,
  RefreshCw,
  Copy,
  Check,
  Link as LinkIcon,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import { getLeads, getProducts } from '../../services/supabase'
import { getProductViewsMap, getRealtimeAnalyticsCounters } from '../../services/posthog'

const KNOWN_SOURCES = [
  { key: 'direct', name: 'Direct / Truy cập trực tiếp', type: 'Organic' },
  { key: 'google', name: 'Google (Search / Ads)', type: 'Search Traffic' },
  { key: 'facebook', name: 'Facebook / Meta Ads', type: 'Social Traffic' },
  { key: 'zalo', name: 'Zalo OA / Chat', type: 'Direct Messaging' },
  { key: 'tiktok', name: 'TikTok Video', type: 'Social Video' },
  { key: 'referral', name: 'Referral / Giới thiệu', type: 'External Link' }
]

export default function MarketingDashboard() {
  const [leads, setLeads] = useState([])
  const [products, setProducts] = useState([])
  const [timeRange, setTimeRange] = useState('30days') // '7days' | '30days' | 'all'
  const [eventLogs, setEventLogs] = useState([])
  const [counters, setCounters] = useState({ visitors: 0, productViews: 0, ctaStarts: 0, pageViews: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // UTM Generator Tool State
  const [utmUrl, setUtmUrl] = useState(window.location.origin || 'https://haqfood.vn')
  const [utmSource, setUtmSource] = useState('facebook')
  const [utmMedium, setUtmMedium] = useState('cpc')
  const [utmCampaign, setUtmCampaign] = useState('tet_b2b_2026')
  const [copied, setCopied] = useState(false)

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [leadsData, productsData] = await Promise.all([
        getLeads(),
        getProducts()
      ])
      setLeads(leadsData || [])
      setProducts(productsData || [])

      const realCounters = getRealtimeAnalyticsCounters()
      const pViewsMap = getProductViewsMap()
      const totalProductViewsFromMap = Object.values(pViewsMap).reduce((a, b) => a + Number(b || 0), 0)

      setCounters({
        ...realCounters,
        productViews: Math.max(realCounters.productViews || 0, totalProductViewsFromMap),
        visitors: Math.max(realCounters.visitors || 0, 1)
      })
    } catch (err) {
      console.error('Error loading real marketing dashboard data:', err)
    } finally {
      setIsLoading(false)
    }

    // Load real local event stream
    try {
      const rawLogs = localStorage.getItem('haq_analytics_event_logs')
      if (rawLogs) {
        setEventLogs(JSON.parse(rawLogs))
      }
    } catch (e) {}
  }

  useEffect(() => {
    loadData()
  }, [])

  // Filter leads based on selected time range
  const filteredLeads = useMemo(() => {
    if (timeRange === 'all') return leads
    const now = new Date().getTime()
    const days = timeRange === '7days' ? 7 : 30
    const cutoff = now - days * 24 * 60 * 60 * 1000

    return leads.filter(l => {
      if (!l.created_at) return true
      return new Date(l.created_at).getTime() >= cutoff
    })
  }, [leads, timeRange])

  // 1. 100% REAL CHANNEL STATS DYNAMICALLY GROUPED FROM SUPABASE LEADS & ANALYTICS
  const channelStats = useMemo(() => {
    // Collect all unique sources present in actual leads
    const sourceMap = {}

    // Initialize base known channels with 0
    KNOWN_SOURCES.forEach(s => {
      sourceMap[s.key] = {
        key: s.key,
        name: s.name,
        type: s.type,
        leads: 0,
        qualified: 0,
        closed: 0
      }
    })

    // Aggregate real leads into their respective UTM source
    filteredLeads.forEach(lead => {
      let rawSource = (lead.utm_source || 'direct').toLowerCase().trim()
      let matchedKey = 'direct'

      if (rawSource.includes('google') || rawSource.includes('cpc') || rawSource.includes('search')) {
        matchedKey = 'google'
      } else if (rawSource.includes('fb') || rawSource.includes('facebook') || rawSource.includes('meta')) {
        matchedKey = 'facebook'
      } else if (rawSource.includes('zalo')) {
        matchedKey = 'zalo'
      } else if (rawSource.includes('tiktok') || rawSource.includes('tt')) {
        matchedKey = 'tiktok'
      } else if (rawSource === 'referral') {
        matchedKey = 'referral'
      } else if (rawSource && rawSource !== 'direct') {
        matchedKey = rawSource
        if (!sourceMap[matchedKey]) {
          sourceMap[matchedKey] = {
            key: matchedKey,
            name: `Nguồn ${rawSource.toUpperCase()}`,
            type: 'Custom UTM',
            leads: 0,
            qualified: 0,
            closed: 0
          }
        }
      }

      sourceMap[matchedKey].leads += 1
      if (lead.status && lead.status !== 'lost' && lead.status !== 'unreachable') {
        sourceMap[matchedKey].qualified += 1
      }
      if (lead.status === 'closed' || lead.status === 'thành công') {
        sourceMap[matchedKey].closed += 1
      }
    })

    return Object.values(sourceMap)
  }, [filteredLeads])

  // Summary Totals (100% Real)
  const realVisitors = counters.visitors || Math.max(filteredLeads.length, 1)
  const realPageViews = counters.pageViews || realVisitors
  const realProductViews = counters.productViews || 0
  const realCtaClicks = counters.ctaStarts || 0
  const totalLeadsCount = filteredLeads.length

  // Conversion rate: Leads / Visitors
  const overallCvr = realVisitors > 0 ? ((totalLeadsCount / realVisitors) * 100).toFixed(1) : '0.0'

  // 2. Real Funnel Calculation
  const qualifiedLeadsCount = useMemo(() => {
    return filteredLeads.filter(l => l.status && l.status !== 'lost' && l.status !== 'unreachable').length
  }, [filteredLeads])

  const closedLeadsCount = useMemo(() => {
    return filteredLeads.filter(l => l.status === 'closed' || l.status === 'thành công').length
  }, [filteredLeads])

  const funnelStages = useMemo(() => {
    return [
      {
        id: 'visitors',
        name: 'Khách truy cập (Visitors)',
        count: realVisitors,
        rate: '100%',
        subtext: 'Tổng số lượt ghé thăm Landing Page'
      },
      {
        id: 'product_views',
        name: 'Xem chi tiết sản phẩm',
        count: realProductViews,
        rate: realVisitors > 0 ? `${((realProductViews / realVisitors) * 100).toFixed(1)}%` : '0%',
        subtext: 'Lượt mở xem thông số & biến thể'
      },
      {
        id: 'cta',
        name: 'Tương tác Báo giá / CTA',
        count: realCtaClicks,
        rate: realVisitors > 0 ? `${((realCtaClicks / realVisitors) * 100).toFixed(1)}%` : '0%',
        subtext: 'Click nút nhận báo giá, Zalo, Hotline'
      },
      {
        id: 'leads',
        name: 'Gửi form Lead B2B',
        count: totalLeadsCount,
        rate: `${overallCvr}%`,
        subtext: 'Khách đã để lại SĐT và nhu cầu'
      },
      {
        id: 'closed',
        name: 'Chốt đơn thành công',
        count: closedLeadsCount,
        rate: totalLeadsCount > 0 ? `${((closedLeadsCount / totalLeadsCount) * 100).toFixed(1)}%` : '0%',
        subtext: 'Hợp đồng đại lý / đơn hàng sỉ'
      }
    ]
  }, [realVisitors, realProductViews, realCtaClicks, totalLeadsCount, overallCvr, closedLeadsCount])

  // 3. Real Campaigns from Database
  const realCampaigns = useMemo(() => {
    const campaignMap = {}

    filteredLeads.forEach(l => {
      const cName = l.utm_campaign || 'direct_no_campaign'
      if (!campaignMap[cName]) {
        campaignMap[cName] = {
          campaign: cName === 'direct_no_campaign' ? '(Không gắn campaign)' : cName,
          source: l.utm_source || 'direct',
          medium: l.utm_medium || 'organic',
          leads: 0,
          qualified: 0,
          closed: 0,
          latestDate: l.created_at
        }
      }
      campaignMap[cName].leads += 1
      if (l.status && l.status !== 'lost' && l.status !== 'unreachable') {
        campaignMap[cName].qualified += 1
      }
      if (l.status === 'closed' || l.status === 'thành công') {
        campaignMap[cName].closed += 1
      }
    })

    return Object.values(campaignMap)
  }, [filteredLeads])

  // 4. Real Top Products Ranked by actual views & lead inquiries
  const topProducts = useMemo(() => {
    const viewsMap = getProductViewsMap()
    
    return products.map(p => {
      const recordedViews = Number(viewsMap[p.slug || p.id] || viewsMap[p.id] || 0)
      const leadInquiries = filteredLeads.filter(l => 
        l.last_product_name === p.name || 
        l.last_product_id === p.id ||
        (l.interest_product && l.interest_product.includes(p.name))
      ).length

      return {
        id: p.id,
        name: p.name,
        category: p.category || 'Nông sản',
        views: recordedViews,
        leads: leadInquiries
      }
    }).sort((a, b) => (b.views + b.leads * 10) - (a.views + a.leads * 10)).slice(0, 5)
  }, [products, filteredLeads])

  // Generated UTM URL
  const generatedUrl = useMemo(() => {
    const base = utmUrl.trim() || 'https://haqfood.vn'
    const separator = base.includes('?') ? '&' : '?'
    const params = new URLSearchParams()
    if (utmSource) params.append('utm_source', utmSource.trim())
    if (utmMedium) params.append('utm_medium', utmMedium.trim())
    if (utmCampaign) params.append('utm_campaign', utmCampaign.trim())
    return `${base}${separator}${params.toString()}`
  }, [utmUrl, utmSource, utmMedium, utmCampaign])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Best performing source
  const bestSource = useMemo(() => {
    const sorted = [...channelStats].sort((a, b) => b.leads - a.leads)
    return sorted[0]?.leads > 0 ? sorted[0] : null
  }, [channelStats])

  return (
    <div className="space-y-4 pb-12 font-sans text-gray-800 antialiased">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#E2E8E4]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Marketing & UTM Tracking
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-[#0F5132] border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Dữ liệu thực tế
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Báo cáo đo lường nguồn truy cập và phân tích hiệu quả chiến dịch UTM từ Database & PostHog.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Segmented Date Filter */}
          <div className="inline-flex items-center p-0.5 rounded-md bg-gray-100 border border-[#E2E8E4]">
            <button
              onClick={() => setTimeRange('7days')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                timeRange === '7days'
                  ? 'bg-[#0F5132] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              7 ngày
            </button>
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                timeRange === '30days'
                  ? 'bg-[#0F5132] text-white'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              30 ngày
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                timeRange === 'all'
                  ? 'bg-[#0F5132] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tất cả
            </button>
          </div>

          <button 
            onClick={loadData} 
            className="p-2 rounded-md border border-[#E2E8E4] bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
            title="Làm mới dữ liệu"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#0F5132]' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. REAL KPIS (4 Compact Blocks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* KPI 1: KHÁCH TRUY CẬP THẬT */}
        <div className="bg-white p-3.5 rounded-lg border border-[#E2E8E4] flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            KHÁCH TRUY CẬP (VISITORS)
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold font-mono text-gray-900">
              {realVisitors.toLocaleString('vi-VN')}
            </span>
          </div>
          <div className="text-[11px] text-gray-500">
            {realPageViews} lượt xem trang (Pageviews)
          </div>
        </div>

        {/* KPI 2: XEM SẢN PHẨM & CTA */}
        <div className="bg-white p-3.5 rounded-lg border border-[#E2E8E4] flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            XEM SẢN PHẨM & CTA
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold font-mono text-gray-900">
              {realProductViews}
            </span>
          </div>
          <div className="text-[11px] text-gray-500">
            {realCtaClicks} lượt bấm xem báo giá / Zalo
          </div>
        </div>

        {/* KPI 3: TỔNG LEAD B2B */}
        <div className="bg-white p-3.5 rounded-lg border border-[#E2E8E4] flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            LEAD B2B THỰC TẾ
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold font-mono text-[#0F5132]">
              {totalLeadsCount}
            </span>
          </div>
          <div className="text-[11px] text-gray-500">
            Tỷ lệ chuyển đổi: <strong className="text-emerald-700">{overallCvr}%</strong>
          </div>
        </div>

        {/* KPI 4: NGUỒN HIỆU QUẢ NHẤT */}
        <div className="bg-white p-3.5 rounded-lg border border-[#E2E8E4] flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            NGUỒN DẪN ĐẦU
          </div>
          <div className="my-1.5 truncate">
            <span className="text-xl font-bold text-gray-900 truncate block">
              {bestSource ? bestSource.name : 'Đang thu thập dữ liệu'}
            </span>
          </div>
          <div className="text-[11px] text-gray-500">
            {bestSource ? (
              <span>Mang lại <strong className="text-emerald-700">{bestSource.leads}</strong> Lead ({((bestSource.leads / (totalLeadsCount || 1)) * 100).toFixed(0)}%)</span>
            ) : (
              <span>Chưa phát sinh Lead theo nguồn</span>
            )}
          </div>
        </div>

      </div>

      {/* 3. REAL CHANNELS TABLE */}
      <div className="bg-white rounded-lg border border-[#E2E8E4] shadow-xs overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E2E8E4] flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              Phân bổ Lead theo nguồn Marketing (UTM Source)
            </h2>
            <p className="text-[11px] text-gray-500">
              Thống kê lượng khách hàng để lại thông tin theo từng kênh phân phối thực tế trong database.
            </p>
          </div>
          <span className="text-[11px] font-medium text-gray-500">
            Tổng cộng: {totalLeadsCount} Leads
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-[#E2E8E4] text-gray-600 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-2.5 px-4">Nguồn / Kênh Marketing</th>
                <th className="py-2.5 px-3">Loại kênh</th>
                <th className="py-2.5 px-3 text-right">Số Lead B2B</th>
                <th className="py-2.5 px-3 text-right">Lead Hợp Lệ</th>
                <th className="py-2.5 px-3 text-right">Đã chốt đơn</th>
                <th className="py-2.5 px-3 text-right">Tỷ lệ đóng góp</th>
                <th className="py-2.5 px-4 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8E4]">
              {channelStats.map((ch) => {
                const percentage = totalLeadsCount > 0 ? ((ch.leads / totalLeadsCount) * 100).toFixed(1) : '0.0'
                return (
                  <tr 
                    key={ch.key} 
                    className={`hover:bg-gray-50/70 transition-colors ${
                      ch.leads > 0 ? 'bg-emerald-50/20' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 font-medium text-gray-900">
                      <span className="font-semibold">{ch.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 text-[11px]">
                      {ch.type}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0F5132]">
                      {ch.leads}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-gray-700">
                      {ch.qualified}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-700">
                      {ch.closed}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-gray-800">
                      {percentage}%
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {ch.leads > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-[#0F5132] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Đang có Lead
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
                          Chưa có Lead
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. REAL CONVERSION FUNNEL */}
      <div className="bg-white rounded-lg border border-[#E2E8E4] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              Phễu chuyển đổi thực tế (Traffic → Inquiries → Closed)
            </h2>
            <p className="text-[11px] text-gray-500">
              Đo lường tiến trình chuyển đổi từ người truy cập thành hợp đồng cung ứng nông sản.
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
            Tỷ lệ ra Lead: {overallCvr}%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
          {funnelStages.map((stage, idx) => (
            <div 
              key={stage.id}
              className="p-3 rounded border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] text-gray-500 font-semibold uppercase">
                <span>0{idx + 1}. {stage.id}</span>
                <span className="font-mono text-gray-700">{stage.rate}</span>
              </div>

              <div>
                <div className="text-lg font-bold font-mono text-gray-900">
                  {stage.count.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs font-semibold text-gray-800 truncate">
                  {stage.name}
                </div>
              </div>

              <div className="text-[10px] text-gray-500 leading-tight">
                {stage.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. TOP PRODUCTS + REAL CAMPAIGNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* TOP PRODUCTS (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#E2E8E4] shadow-xs overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#E2E8E4] bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-900">
              Top sản phẩm được xem & hỏi giá nhiều nhất
            </h2>
            <p className="text-[11px] text-gray-500">
              Xếp hạng theo lượt tương tác thực tế từ khách hàng.
            </p>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-[#E2E8E4] text-gray-600 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-2">Sản phẩm</th>
                  <th className="py-2 px-2 text-right">Lượt xem</th>
                  <th className="py-2 px-3 text-right">Hỏi giá sỉ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8E4]">
                {topProducts.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-2 px-3 font-mono text-gray-500 font-semibold text-[11px]">
                      0{idx + 1}
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-semibold text-gray-900 truncate max-w-[150px]" title={p.name}>
                        {p.name}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">
                        {p.category}
                      </div>
                    </td>
                    <td className="py-2 px-2 text-right font-mono text-gray-700">
                      {p.views}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-[#0F5132]">
                      {p.leads}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CAMPAIGN PERFORMANCE (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#E2E8E4] shadow-xs overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#E2E8E4] bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-900">
              Chiến dịch phát sinh Lead (UTM Campaign)
            </h2>
            <p className="text-[11px] text-gray-500">
              Các tên chiến dịch thực tế được ghi nhận khi khách hàng điền form.
            </p>
          </div>

          <div className="overflow-x-auto flex-1">
            {realCampaigns.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500">
                Chưa có dữ liệu chiến dịch. Hãy tạo link UTM bên dưới để theo dõi hiệu quả!
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-[#E2E8E4] text-gray-600 uppercase font-semibold text-[10px] tracking-wider">
                    <th className="py-2 px-3">Tên Campaign</th>
                    <th className="py-2 px-2">Source</th>
                    <th className="py-2 px-2">Medium</th>
                    <th className="py-2 px-2 text-right">Lead</th>
                    <th className="py-2 px-3 text-right">Chốt đơn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8E4]">
                  {realCampaigns.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-2 px-3 font-semibold text-gray-900 truncate max-w-[160px]">
                        {c.campaign}
                      </td>
                      <td className="py-2 px-2 font-mono text-gray-600 text-[11px] uppercase">
                        {c.source}
                      </td>
                      <td className="py-2 px-2 font-mono text-gray-500 text-[11px]">
                        {c.medium}
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-[#0F5132]">
                        {c.leads}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-semibold text-emerald-700">
                        {c.closed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* 6. ENTERPRISE UTM BUILDER TOOL (Tạo link gắn thẻ chiến dịch) */}
      <div className="bg-white rounded-lg border border-[#E2E8E4] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-[#0F5132]" />
          <h2 className="text-sm font-bold text-gray-900">
            Công cụ tạo Link gắn thẻ UTM (UTM Link Generator)
          </h2>
        </div>
        <p className="text-xs text-gray-500">
          Tạo đường dẫn có gắn tham số để chạy quảng cáo Facebook, Google, Zalo hoặc gửi khách hàng. Khi khách bấm link và điền form, hệ thống sẽ tự động bắt chính xác nguồn và chiến dịch.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">
              Nguồn (utm_source)
            </label>
            <select
              value={utmSource}
              onChange={e => setUtmSource(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
            >
              <option value="facebook">facebook (Facebook Ads / Fanpage)</option>
              <option value="google">google (Google Search Ads / SEO)</option>
              <option value="zalo">zalo (Zalo OA / Tin nhắn Zalo)</option>
              <option value="tiktok">tiktok (TikTok Ads / Bio link)</option>
              <option value="email">email (Email Marketing)</option>
              <option value="qr_code">qr_code (Mã QR in catalogue / bao bì)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">
              Phương thức (utm_medium)
            </label>
            <input 
              type="text"
              value={utmMedium}
              onChange={e => setUtmMedium(e.target.value)}
              placeholder="cpc, post, message, story..."
              className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">
              Tên chiến dịch (utm_campaign)
            </label>
            <input 
              type="text"
              value={utmCampaign}
              onChange={e => setUtmCampaign(e.target.value)}
              placeholder="tet_2026, dai_ly_mien_bac..."
              className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
            />
          </div>
        </div>

        {/* Generated URL Box with Copy Button */}
        <div className="flex items-center gap-2 p-2.5 rounded bg-gray-50 border border-gray-200">
          <input 
            type="text" 
            readOnly 
            value={generatedUrl}
            className="flex-1 bg-transparent border-0 text-xs font-mono text-gray-800 focus:outline-none select-all"
          />
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 rounded bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 7. REALTIME POSTHOG EVENT STREAM */}
      <div className="bg-white rounded-lg border border-[#E2E8E4] shadow-xs overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E2E8E4] flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider">
              Nhật ký sự kiện tương tác thời gian thực
            </h2>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">
            {eventLogs.length} sự kiện gần nhất
          </span>
        </div>

        <div className="divide-y divide-gray-100 max-h-44 overflow-y-auto font-mono text-xs">
          {eventLogs.length === 0 ? (
            <div className="py-6 text-center text-gray-500 text-xs font-sans">
              Chưa có sự kiện mới. Khi khách hàng thao tác trên Landing Page, các tương tác sẽ hiển thị trực tiếp tại đây.
            </div>
          ) : (
            eventLogs.map((log, i) => (
              <div key={i} className="py-2 px-4 flex items-center justify-between hover:bg-gray-50 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-semibold uppercase border border-gray-200 shrink-0">
                    {log.event}
                  </span>
                  <span className="text-gray-800 font-sans truncate text-xs">
                    {log.product_name || log.search_keyword || log.interest_product || 'Landing Page Session'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-[11px] shrink-0">
                  <span className="text-gray-600 uppercase font-mono">[{log.utm_source || 'direct'}]</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString('vi-VN')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}
