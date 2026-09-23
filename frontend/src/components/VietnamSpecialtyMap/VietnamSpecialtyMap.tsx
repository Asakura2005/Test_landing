import React, { useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, Navigation, Pin, Globe, MapPin } from "lucide-react";
import { provinceCentroids } from "./mapData";
import { InteractiveMap } from "./InteractiveMap/InteractiveMap";
import { ProvinceTooltip } from "./InteractiveMap/ProvinceTooltip";
import { useMapTransform } from "./InteractiveMap/useMapTransform";
import { worldToContainerPoint } from "./coordinateSystem";
import { useHaqSpecialtyMapData } from "./useHaqSpecialtyMapData";
import { SpecialtyData, RegionName, Product, ProvinceSpecialty } from "./types";
import { useLanguage } from "../../context/LanguageContext";
import { useAnalytics } from "../../hooks/useAnalytics";
import { getProductViewsMap } from "../../services/posthog";

interface VietnamSpecialtyMapProps {
  products?: any[];
  specialtyDataOverride?: SpecialtyData;
  className?: string;
}

export const VietnamSpecialtyMap: React.FC<VietnamSpecialtyMapProps> = ({
  products,
  specialtyDataOverride,
  className = "",
}) => {
  const { t, language } = useLanguage();
  const { trackProductClick } = useAnalytics();
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);

  const resolveProductLink = (p: Product) => {
    if (p.href) return p.href;
    const s = p.slug || p.productId || "";
    if (language === "en") return `/en/products/${s}`;
    if (language === "ko") return `/ko/products/${s}`;
    if (language === "zh") return `/zh/products/${s}`;
    return `/san-pham/${s}`;
  };

  const handleProductClick = (p: Product) => {
    trackProductClick(
      {
        id: p.productId || p.slug,
        slug: p.slug || p.productId,
        name: p.name,
        canonical_name: p.canonical_name,
        category: p.category,
        href: resolveProductLink(p),
      },
      "specialty_map"
    );
  };

  const [hoveredProvince, setHoveredProvince] = useState<{
    id: string;
    name: string;
    region?: string;
    x: number;
    y: number;
  } | null>(null);

  const experienceRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Hook connect real data from Supabase
  const {
    specialties: fetchedSpecialties,
    hasSpecialtiesMap: fetchedHasMap,
    isLoading,
  } = useHaqSpecialtyMapData(products);

  const specialties = specialtyDataOverride || fetchedSpecialties;
  const hasSpecialtiesMap = useMemo(() => {
    if (specialtyDataOverride) {
      const map: Record<string, boolean> = {};
      Object.keys(specialtyDataOverride).forEach((id) => {
        map[id] = true;
      });
      return map;
    }
    return fetchedHasMap;
  }, [specialtyDataOverride, fetchedHasMap]);

  const [selectedRegion, setSelectedRegion] = useState<
    "ALL" | "Miền Bắc" | "Miền Trung" | "Miền Nam"
  >("ALL");

  // Pointer-invariant Mouse Zoom & Gesture Hook
  const {
    transform,
    isDragging,
    isAnimated,
    handleWheel,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    zoomIn,
    zoomOut,
    resetTransform,
    focusOnProvince,
    focusOnRegion,
  } = useMapTransform({ svgRef, containerRef: mapContainerRef });

  const handleSelectRegion = useCallback(
    (region: "ALL" | "Miền Bắc" | "Miền Trung" | "Miền Nam") => {
      setSelectedRegion(region);
      setSelectedProvinceId(null);
      focusOnRegion(region);
    },
    [focusOnRegion]
  );

  const handleHoverProvince = useCallback(
    (e: React.MouseEvent<SVGElement>, id: string) => {
      if (isDragging) return;
      if (selectedProvinceId === id) {
        setHoveredProvince(null);
        return;
      }
      const info = provinceCentroids[id];
      if (!info || !experienceRef.current || !svgRef.current) return;

      const screenPt = worldToContainerPoint(
        info.anchor,
        transform,
        svgRef.current,
        experienceRef.current
      );

      setHoveredProvince({
        id,
        name: info.name,
        region: info.region,
        x: screenPt.x,
        y: screenPt.y,
      });
    },
    [isDragging, transform, selectedProvinceId]
  );

  const handleLeaveProvince = useCallback(() => {
    setHoveredProvince(null);
  }, []);

  const handleSelectProvince = useCallback(
    (id: string) => {
      setHoveredProvince(null);

      if (selectedProvinceId === id) {
        setSelectedProvinceId(null);
      } else {
        setSelectedProvinceId(id);
        const info = provinceCentroids[id];
        if (info) {
          focusOnProvince(info);
        }
        const provRegion = specialties[id]?.region || info?.region;
        if (
          provRegion &&
          (provRegion === "Miền Bắc" ||
            provRegion === "Miền Trung" ||
            provRegion === "Miền Nam")
        ) {
          setSelectedRegion(provRegion as any);
        }
      }
    },
    [selectedProvinceId, focusOnProvince, specialties]
  );

  const handleReset = useCallback(() => {
    resetTransform();
    setSelectedProvinceId(null);
    setSelectedRegion("ALL");
    setHoveredProvince(null);
  }, [resetTransform]);

  const handleClearProvince = useCallback(() => {
    setSelectedProvinceId(null);
    setHoveredProvince(null);
    resetTransform();
  }, [resetTransform]);

  // Helper to extract view count
  const getProductViews = useCallback(
    (p: Product | null | undefined, map: Record<string, number>) => {
      if (!p) return 0;
      const slug = p.slug || "";
      const id = p.productId || "";
      return Number(map[slug] || (id ? map[id] : 0) || p.views || 0);
    },
    []
  );

  // Real-time product views map from posthog analytics
  const viewsMap = useMemo(() => getProductViewsMap(), []);

  // Active province data
  const activeProvinceInfo = selectedProvinceId
    ? provinceCentroids[selectedProvinceId] || null
    : null;
  const activeSpecialty = selectedProvinceId
    ? specialties[selectedProvinceId] || null
    : null;

  // Products belonging to the selected province
  const provinceProducts = useMemo(() => {
    const raw = activeSpecialty?.products;
    if (!raw || !raw.length) return [];
    return [...raw].sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return getProductViews(b, viewsMap) - getProductViews(a, viewsMap);
    });
  }, [activeSpecialty, viewsMap, getProductViews]);

  const hoveredProductCount = hoveredProvince
    ? specialties[hoveredProvince.id]?.products?.length || 0
    : 0;

  // Products when no province is selected (sorted by views)
  const regionFeaturedProducts = useMemo(() => {
    const list: Product[] = [];
    const seen = new Set<string>();

    Object.values(specialties).forEach((spec: ProvinceSpecialty) => {
      if (selectedRegion === "ALL" || spec.region === selectedRegion) {
        if (spec.products && Array.isArray(spec.products)) {
          spec.products.forEach((p: Product) => {
            const key = p.productId || p.slug || p.href || p.name;
            if (!seen.has(key)) {
              seen.add(key);
              list.push(p);
            }
          });
        }
      }
    });

    return list.sort((a, b) => {
      const vA = getProductViews(a, viewsMap);
      const vB = getProductViews(b, viewsMap);
      if (vB !== vA) return vB - vA;
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return 0;
    });
  }, [specialties, selectedRegion, viewsMap, getProductViews]);

  // Guaranteed up to 3 showcase products:
  // - Khi chọn tỉnh cụ thể: CHỈ hiển thị sản phẩm của đúng tỉnh đó (tối đa 3 sản phẩm)
  // - Khi không chọn tỉnh (Toàn quốc/Toàn vùng): hiển thị sản phẩm đặc trưng hàng đầu của vùng
  const displayProducts = useMemo(() => {
    if (selectedProvinceId) {
      return provinceProducts.slice(0, 3);
    }
    return regionFeaturedProducts.slice(0, 3);
  }, [selectedProvinceId, provinceProducts, regionFeaturedProducts]);

  const provinceDesc = selectedProvinceId
    ? activeSpecialty?.shortDescription ||
      activeSpecialty?.description ||
      "Vùng nông sản nguyên bản liên kết chế biến chuẩn quốc tế của HAQ FOOD."
    : "Mỗi sản phẩm HAQ Food mang trong mình căn cước địa lý rõ ràng: từ thổ nhưỡng trù phú Tây Ninh, cao nguyên Đồng Nai đến thủ phủ nghiên cứu Hà Nội.";

  // Terroir Story details (faithful to Stitch Screen 1)
  const terroirData = useMemo(() => {
    if (
      selectedProvinceId === "tayninh" ||
      (!selectedProvinceId && selectedRegion === "ALL")
    ) {
      return {
        code: "VN-TN-72",
        title: "ĐẶC SẢN TÂY NINH - NGUỒN GỐC & VÙNG NGUYÊN LIỆU",
        desc: "Tây Ninh được mệnh danh là thánh địa ẩm thực của bánh tráng phơi sương Trảng Bàng và muối tôm trứ danh. HAQ Food đã chuẩn hóa công nghệ sấy giòn khép kín vô trùng hiện đại, giữ vẹn nguyên hương vị đậm đà thơm cay đặc trưng của nông sản bản địa kết hợp độ giòn xốp ròn rã đạt tiêu chuẩn xuất khẩu chính ngạch sang Hàn Quốc, Đài Loan và toàn cầu.",
      };
    }
    if (selectedProvinceId === "dongnai") {
      return {
        code: "VN-DN-39",
        title: "ĐẶC SẢN ĐỒNG NAI - VÙNG BẮP HẠT SẠCH NON-GMO",
        desc: "Đồng Nai là vùng đất đỏ bazan màu mỡ nổi tiếng với vùng trồng bắp hạt sạch Non-GMO đạt chuẩn VietGAP. HAQ Food ứng dụng dây chuyền sấy nổ công nghệ cao vô trùng, mang đến dòng bắp rang bơ bung tròn tơi xốp hảo hạng phủ caramel và phô mai béo ngậy.",
      };
    }
    if (selectedProvinceId === "hanoi") {
      return {
        code: "VN-HN-01",
        title: "HÀ NỘI - THỦ PHỦ R&D & TINH HOA BÁNH ĐẬU XANH TƯƠI",
        desc: "Hà Nội là trung tâm nghiên cứu công thức độc quyền và điều phối chuỗi cung ứng của HAQ Food. Nơi đây gìn giữ tinh hoa ẩm thực truyền thống như bánh đậu xanh tươi, kết hợp dây chuyền tiệt trùng khép kín hiện đại đạt chuẩn quốc tế ISO 22000 & HACCP.",
      };
    }

    const provName =
      activeSpecialty?.provinceLabel || activeProvinceInfo?.name || selectedRegion;
    const provCode = selectedProvinceId
      ? `VN-${selectedProvinceId.slice(0, 2).toUpperCase()}-99`
      : "VN-NAT-00";
    return {
      code: provCode,
      title: `ĐẶC SẢN ${provName.toUpperCase()} - NGUỒN GỐC & VÙNG NGUYÊN LIỆU`,
      desc:
        activeSpecialty?.description ||
        activeSpecialty?.shortDescription ||
        provinceDesc,
    };
  }, [
    selectedProvinceId,
    selectedRegion,
    activeSpecialty,
    activeProvinceInfo,
    provinceDesc,
  ]);

  const currentSelectedLabel =
    activeProvinceInfo?.name ||
    (selectedRegion === "ALL"
      ? "Tây Ninh (Vùng Chủ Lực Quốc Gia)"
      : `${selectedRegion} (Toàn Vùng)`);

  return (
    <section
      ref={experienceRef}
      id="he-sinh-thai-dac-san"
      aria-label="Hệ Sinh Thái Đặc Sản & Bản Đồ Vùng Nguyên Liệu"
      className={`py-16 sm:py-24 bg-[#011e16] text-white relative overflow-hidden select-none ${className}`}
    >
      {/* Background Ambient Glow & Grid lines chuẩn Stitch */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#064e3b]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#fe932c]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        {/* ==================== SECTION HEADER (NỀN XANH CHUẨN STITCH) ==================== */}
        <div className="pb-6 border-b border-white/10">
          <div className="max-w-2xl lg:max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#fe932c] text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
              <Globe className="w-4 h-4 text-[#fe932c]" />
              <span>Bản Đồ Nguồn Gốc &amp; Hệ Sinh Thái Nông Sản Quốc Gia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              HỆ SINH THÁI ĐẶC SẢN &amp;{' '}
              <span className="bg-gradient-to-r from-[#ffdcc3] via-[#fe932c] to-[#ffd7a0] bg-clip-text text-transparent block sm:inline">
                BẢN ĐỒ VÙNG NGUYÊN LIỆU
              </span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base mt-2.5 sm:mt-3 leading-relaxed font-light">
              Mỗi sản phẩm HAQ Food mang trong mình căn cước địa lý rõ ràng: từ thổ nhưỡng trù phú Tây Ninh, cao nguyên Đồng Nai đến thủ phủ nghiên cứu Hà Nội. Chọn từng vùng để khám phá chuỗi giá trị và quy cách xuất khẩu.
            </p>
          </div>

          {/* Region Filter Tabs Toolbar */}
          <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#fe932c] animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-wider text-white/70">
                Lọc theo vùng nông sản:
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none overscroll-x-contain">
              {[
                { id: "ALL", label: "TOÀN QUỐC" },
                { id: "Miền Bắc", label: "MIỀN BẮC" },
                { id: "Miền Trung", label: "MIỀN TRUNG" },
                { id: "Miền Nam", label: "MIỀN NAM - TÂY NAM BỘ" },
              ].map((r) => {
                const isActive = selectedRegion === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelectRegion(r.id as any)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer select-none ${
                      isActive
                        ? "bg-gradient-to-r from-[#fe932c] to-[#e07b1a] text-white shadow-lg shadow-[#fe932c]/20"
                        : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== 2 COLUMNS EXHIBITION LAYOUT ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 sm:pt-10 items-stretch">
          {/* CỘT TRÁI (5 CỘT): KHUNG BẢN ĐỒ KÍNH NGỌC BÍCH CAO CẤP ĐỒNG BỘ CHUẨN STITCH (DỊU MẮT, KHÔNG CHÓI) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden group min-h-[460px] sm:min-h-[580px]">
            {/* Map Tools Bar */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 relative z-20">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#95d3ba] bg-[#064e3b]/50 border border-[#10b981]/30 px-2.5 sm:px-3 py-1.5 rounded-lg shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                <span className="font-semibold">Chạm điểm sáng để đổi vùng</span>
              </div>
              {selectedProvinceId && (
                <button
                  type="button"
                  onClick={handleClearProvince}
                  className="text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Xem toàn quốc"
                >
                  ↺ Toàn quốc
                </button>
              )}
            </div>

            {/* BẢN ĐỒ TƯƠNG TÁC SVG CỦA USER */}
            <div className="relative w-full h-[380px] sm:h-[500px] flex items-center justify-center my-2 rounded-2xl overflow-hidden">
              <InteractiveMap
                selectedProvinceId={selectedProvinceId}
                hoveredProvinceId={hoveredProvince?.id ?? null}
                hasSpecialtiesMap={hasSpecialtiesMap}
                specialties={specialties}
                onHoverProvince={handleHoverProvince}
                onLeaveProvince={handleLeaveProvince}
                onSelectProvince={handleSelectProvince}
                svgRef={svgRef}
                mapContainerRef={mapContainerRef}
                transform={transform}
                isDragging={isDragging}
                isAnimated={isAnimated}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onReset={handleReset}
              />

              {/* Floating Hover Tooltip */}
              <ProvinceTooltip
                name={hoveredProvince?.name || ""}
                region={hoveredProvince?.region}
                productCount={hoveredProductCount}
                x={hoveredProvince?.x || 0}
                y={hoveredProvince?.y || 0}
                visible={
                  hoveredProvince !== null &&
                  !isDragging &&
                  hoveredProvince.id !== selectedProvinceId
                }
              />
            </div>

            {/* Map Footnote */}
            <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c] animate-ping" />
                <span className="truncate max-w-[210px] sm:max-w-none">
                  Vùng đang chọn:{" "}
                  <strong className="text-white font-bold">{currentSelectedLabel}</strong>
                </span>
              </span>
              {selectedProvinceId && (
                <button
                  type="button"
                  onClick={handleClearProvince}
                  className="text-xs text-[#fe932c] hover:underline cursor-pointer font-semibold shrink-0"
                >
                  Xem toàn quốc
                </button>
              )}
            </div>
          </div>

          {/* CỘT PHẢI (7 CỘT): TERROIR STORY BOX + 3 THẺ SẢN PHẨM ĐẶC SẢN CHUẨN STITCH */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* 1. TERROIR STORY BOX */}
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl">
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-snug">
                {terroirData.title}
              </h3>
              <p className="text-xs sm:text-base text-white/80 leading-relaxed mt-2 sm:mt-2.5 font-light">
                {terroirData.desc}
              </p>
            </div>

            {/* 2. 3 FEATURED PRODUCTS: TOUCH-SWIPE ROW ON MOBILE, 3-COL GRID ON SM+ */}
            <div className="relative">
              {displayProducts.length > 0 ? (
                <div className="flex sm:grid sm:grid-cols-3 gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory scrollbar-none overscroll-x-contain -mx-1 px-1 sm:mx-0 sm:px-0">
                  {displayProducts.map((prod, idx) => {
                    const prodImg =
                      prod.image || "/assets/stitch/product_showcase_1.png";
                    const prodProvName =
                      prod.provinceName || activeProvinceInfo?.name || "";
                    const catName = prod.category || "HAQ FOOD";
                    const weightBadge = prod.weight ? String(prod.weight) : "";

                    return (
                      <Link
                        key={prod.productId || prod.slug || idx}
                        to={resolveProductLink(prod)}
                        onClick={() => handleProductClick(prod)}
                        className="group flex flex-col bg-[#011e16] rounded-2xl overflow-hidden border border-white/15 hover:border-[#fe932c]/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-white focus:outline-none w-[78vw] max-w-[280px] sm:w-auto sm:max-w-none shrink-0 sm:shrink snap-center"
                      >
                        {/* Image Box 1:1 Aspect Ratio (Square) */}
                        <div className="relative w-full aspect-square bg-white/[0.04] overflow-hidden flex items-center justify-center">
                          <img
                            alt={prod.name}
                            src={prodImg}
                            width="300"
                            height="300"
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/assets/stitch/product_showcase_1.png";
                            }}
                          />
                          {weightBadge && (
                            <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 z-10 pointer-events-none">
                              <span className="inline-flex items-center bg-black/60 backdrop-blur-sm text-white font-heading text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                                {weightBadge}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content Details */}
                        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-[#011e16]">
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span className="text-[10px] sm:text-[11px] font-heading font-bold text-[#fe932c] uppercase tracking-wider truncate">
                                {catName}
                              </span>
                              {prodProvName && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-white/80 font-medium bg-white/10 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 border border-white/10">
                                  <MapPin className="w-2.5 h-2.5 shrink-0 text-[#fe932c]" />
                                  <span className="truncate max-w-[70px] sm:max-w-none">
                                    {prodProvName}
                                  </span>
                                </span>
                              )}
                            </div>
                            <h4 className="font-heading font-bold text-xs sm:text-sm text-white group-hover:text-[#fe932c] transition-colors leading-snug line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem]">
                              {prod.name}
                            </h4>
                          </div>

                          {/* Footer Link */}
                          <div className="mt-3 pt-3 flex items-center justify-between border-t border-white/10">
                            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-heading font-bold text-[#fe932c] group-hover:gap-2 transition-all">
                              <span>
                                {language === "en"
                                  ? "View details"
                                  : language === "ko"
                                  ? "상세 보기"
                                  : language === "zh"
                                  ? "查看详情"
                                  : "Xem chi tiết"}
                              </span>
                              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-md">
                  <p className="text-sm sm:text-base text-white/80 font-medium">
                    {language === "en"
                      ? `HAQ Food is currently surveying local specialties in ${currentSelectedLabel}. Contact us for OEM/ODM cooperation.`
                      : language === "ko"
                      ? `HAQ Food는 현재 ${currentSelectedLabel}의 특산품을 발굴 및 기획 중입니다.`
                      : language === "zh"
                      ? `HAQ Food 正在对 ${currentSelectedLabel} 特色产区进行深度调研开发，敬请期待。`
                      : `HAQ Food đang tiếp tục khảo sát và liên kết phát triển vùng nguyên liệu đặc sản tại ${currentSelectedLabel}.`}
                  </p>
                  <Link
                    to={language === "en" ? "/en/contact" : "/lien-he"}
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-[#fe932c] hover:bg-[#e07f20] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>{language === "en" ? "OEM/ODM Cooperation" : "Liên hệ hợp tác vùng nguyên liệu"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Mobile Swipe Indicators Cue */}
              {displayProducts.length > 0 && (
                <div className="sm:hidden flex items-center justify-between text-[11px] text-white/50 px-1 pt-1.5">
                  <span className="flex items-center gap-1">
                    <span>👈 Vuốt ngang xem {displayProducts.length} sản phẩm 👉</span>
                  </span>
                  <span className="font-mono text-white/40">{displayProducts.length} đặc sản</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VietnamSpecialtyMap;
