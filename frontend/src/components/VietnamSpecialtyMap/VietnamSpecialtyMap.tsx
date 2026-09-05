import React, { useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, ArrowRight, X, Sparkles, Navigation, Pin } from "lucide-react";
import { provinceCentroids } from "./mapData";
import { InteractiveMap } from "./InteractiveMap/InteractiveMap";
import { ProvinceTooltip } from "./InteractiveMap/ProvinceTooltip";
import { useMapTransform } from "./InteractiveMap/useMapTransform";
import { worldToContainerPoint } from "./coordinateSystem";
import { useHaqSpecialtyMapData } from "./useHaqSpecialtyMapData";
import { SpecialtyData, RegionName, Product, ProvinceSpecialty } from "./types";
import { useLanguage } from "../../context/LanguageContext";
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
  const { t } = useLanguage();
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
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

  // Hook connect real data from Supabase / data layer
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

  const [selectedRegion, setSelectedRegion] = useState<"ALL" | "Miền Bắc" | "Miền Trung" | "Miền Nam">("ALL");

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

  const handleSelectRegion = useCallback((region: "ALL" | "Miền Bắc" | "Miền Trung" | "Miền Nam") => {
    setSelectedRegion(region);
    setSelectedProvinceId(null);
    focusOnRegion(region);
  }, [focusOnRegion]);

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
      if (!screenPt) return;

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
        // Synchronize active region tab with this province's region
        const provRegion = specialties[id]?.region || info?.region;
        if (provRegion && (provRegion === "Miền Bắc" || provRegion === "Miền Trung" || provRegion === "Miền Nam")) {
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

  // Helper to extract view count
  const getProductViews = useCallback((p: Product | null | undefined, map: Record<string, number>) => {
    if (!p) return 0;
    const slug = p.slug || '';
    const id = p.productId || '';
    return Number(map[slug] || (id ? map[id] : 0) || p.views || 0);
  }, []);

  // Real-time product views map from posthog analytics
  const viewsMap = useMemo(() => getProductViewsMap(), [selectedProvinceId, selectedRegion, specialties]);

  // Active province data
  const activeProvinceInfo = selectedProvinceId ? provinceCentroids[selectedProvinceId] || null : null;
  const activeSpecialty = selectedProvinceId ? specialties[selectedProvinceId] || null : null;
  const rawProvinceProducts = activeSpecialty?.products || [];

  // Pinned products prioritized first for selected province, followed by view count descending
  const provinceProducts = useMemo(() => {
    if (!rawProvinceProducts.length) return [];
    return [...rawProvinceProducts].sort((a, b) => {
      // 1. Pinned product in this province comes first!
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      // 2. Then sort by view count descending
      return getProductViews(b, viewsMap) - getProductViews(a, viewsMap);
    });
  }, [rawProvinceProducts, viewsMap, getProductViews]);

  const hoveredProductCount = hoveredProvince
    ? specialties[hoveredProvince.id]?.products?.length || 0
    : 0;

  // Clear province selection to return to region/nationwide overview
  const handleClearProvince = useCallback(() => {
    setSelectedProvinceId(null);
  }, []);

  // Curated products when no province is selected:
  // Filtered by selected region and sorted strictly by view count descending!
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

    // Sort strictly by view count descending!
    return list.sort((a, b) => {
      const vA = getProductViews(a, viewsMap);
      const vB = getProductViews(b, viewsMap);
      if (vB !== vA) {
        return vB - vA;
      }
      // If view count is equal, prioritize pinned products
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return 0;
    });
  }, [specialties, selectedRegion, viewsMap, getProductViews]);

  // Showcase list:
  // - When province selected: ONLY products of that specific province!
  // - When no province selected: top 3 products of the active region / nationwide (sorted by view count)
  const showcaseProducts = useMemo(() => {
    if (selectedProvinceId) {
      return provinceProducts.slice(0, 3);
    }
    return regionFeaturedProducts.slice(0, 3);
  }, [selectedProvinceId, provinceProducts, regionFeaturedProducts]);

  const featuredProduct = showcaseProducts[0] || null;
  const supportingProducts = showcaseProducts.slice(1, 3);

  const provinceTitle = selectedProvinceId
    ? activeProvinceInfo?.name || activeSpecialty?.provinceLabel || "Tỉnh thành"
    : "SẢN PHẨM NỔI BẬT";

  const regionBadge = selectedProvinceId
    ? activeSpecialty?.region || activeProvinceInfo?.region || selectedRegion
    : null;

  const provinceDesc = selectedProvinceId
    ? activeSpecialty?.shortDescription ||
      activeSpecialty?.description ||
      "Vùng nông sản nguyên bản liên kết chế biến chuẩn quốc tế của HAQ FOOD."
    : selectedRegion === "ALL"
    ? "Sản phẩm được quan tâm nhiều nhất toàn quốc trên hệ sinh thái HAQ FOOD."
    : `Sản phẩm được quan tâm nhiều nhất tại ${selectedRegion} trên hệ sinh thái HAQ FOOD.`;

  return (
    <section
      ref={experienceRef}
      className={`w-full h-full lg:h-[calc(100vh-72px)] flex flex-col lg:flex-row overflow-hidden bg-[#FAF9F5]/40 select-none ${className}`}
    >
      {/* =========================================================================
          LEFT SIDE: 55–58% Width — LARGE VIETNAM INTERACTIVE MAP (Primary Visual)
          ========================================================================= */}
      <div className="w-full lg:w-[57%] h-[440px] sm:h-[500px] lg:h-full relative flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#FAF9F6] border-b lg:border-b-0 lg:border-r border-haq-border/70 overflow-hidden shrink-0">
        {/* Subtle Map Atlas Watermark Hint */}
        <div className="absolute top-3 left-3 z-10 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-haq-border/60 text-[10px] font-heading font-medium text-haq-text-secondary shadow-2xs pointer-events-none">
          <Navigation className="w-3 h-3 text-[#0F5132]" />
          <span>Cuộn chuột để thu phóng · Kéo để xoay bản đồ</span>
        </div>

        {/* Large Prominent SVG Map Container */}
        <div className="w-full h-full flex items-center justify-center relative">
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
        </div>

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

      {/* =========================================================================
          RIGHT SIDE: 42–45% Width — CONTENT PANEL (Curated Editorial Showcase)
          ========================================================================= */}
      <div className="w-full lg:w-[43%] h-auto lg:h-full p-4 sm:p-5 lg:p-6 flex flex-col justify-between overflow-visible lg:overflow-hidden bg-white shrink-0">
        <div className="flex flex-col flex-1 min-h-0">
          {/* 1. MAIN HEADING ONLY */}
          <h2 className="font-heading font-bold text-lg sm:text-xl lg:text-[21px] text-haq-ink uppercase tracking-tight leading-tight mb-2.5 shrink-0">
            {t('home.specialty_map.title', 'HỆ SINH THÁI SẢN PHẨM HAQ FOOD')}
          </h2>

          {/* 2. REGION NAVIGATION (Minimal Editorial Tab Navigation) */}
          <div
            className="flex items-center gap-6 sm:gap-7 border-b border-haq-border/60 pb-2 mb-3 shrink-0"
            role="tablist"
            aria-label="Khu vực"
          >
            {[
              { id: "ALL", label: t('home.specialty_map.regions.all', 'TOÀN QUỐC') },
              { id: "Miền Bắc", label: t('home.specialty_map.regions.north', 'MIỀN BẮC') },
              { id: "Miền Trung", label: t('home.specialty_map.regions.central', 'MIỀN TRUNG') },
              { id: "Miền Nam", label: t('home.specialty_map.regions.south', 'MIỀN NAM') },
            ].map((r) => {
              const isActive = selectedRegion === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectRegion(r.id as any)}
                  className={`relative text-[11px] sm:text-xs tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#0F5132] font-semibold"
                      : "text-haq-text-secondary hover:text-haq-ink font-normal"
                  }`}
                >
                  {r.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-[#0F5132]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 3. SELECTED REGION / PROVINCE */}
          <div className="mb-3 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-heading font-bold uppercase tracking-tight text-haq-ink">
                  {provinceTitle}
                </h3>
                {selectedProvinceId && regionBadge && (
                  <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm bg-[#0F5132]/8 text-[#0F5132] font-medium border border-[#0F5132]/15">
                    {regionBadge}
                  </span>
                )}
              </div>

              {selectedProvinceId && (
                <button
                  type="button"
                  onClick={handleClearProvince}
                  className="text-haq-text-secondary hover:text-haq-ink p-1 -mr-1 rounded transition-colors cursor-pointer"
                  title="Trở lại toàn quốc"
                  aria-label="Bỏ chọn tỉnh"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs text-haq-text-secondary mt-0.5 line-clamp-2 leading-relaxed font-light">
              {provinceDesc}
            </p>
          </div>

          {/* 4. PRODUCT SHOWCASE (Curated Editorial 1 Featured + Supporting) */}
          <div className="flex-1 min-h-0 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {featuredProduct ? (
                <motion.div
                  key={selectedProvinceId || selectedRegion}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-12 gap-3 sm:gap-3.5 flex-1 min-h-0"
                >
                  {/* LEFT: FEATURED PRODUCT */}
                  <Link
                    to={featuredProduct.href || `/san-pham/${featuredProduct.slug || featuredProduct.productId || ''}`}
                    className={`${
                      supportingProducts.length === 2
                        ? "col-span-7"
                        : supportingProducts.length === 1
                        ? "col-span-6"
                        : "col-span-12"
                    } flex flex-col justify-between bg-white rounded-lg border border-haq-border/70 hover:border-[#0F5132]/40 p-2.5 sm:p-3 transition-all duration-200 shadow-2xs group overflow-hidden min-h-0`}
                  >
                    {/* Large Featured Product Image */}
                    <div className="w-full flex-1 min-h-0 bg-[#FAF9F6] rounded-md border border-haq-border/40 p-2 sm:p-3 flex items-center justify-center overflow-hidden relative">
                      {featuredProduct.is_pinned && (
                        <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-[#0F5132] text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                          <Pin className="w-2.5 h-2.5 fill-[#C89B3C] text-[#C89B3C]" />
                          Chủ lực
                        </span>
                      )}
                      {featuredProduct.image ? (
                        <img
                          src={featuredProduct.image}
                          alt={featuredProduct.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-3xl opacity-60">🌾</span>
                      )}
                    </div>

                    {/* Featured Info */}
                    <div className="pt-2 flex flex-col shrink-0">
                      <span className="text-[10px] tracking-wider uppercase text-[#0F5132] font-semibold">
                        {featuredProduct.category || "Sản phẩm chủ lực"}
                      </span>
                      <span className="font-heading font-bold text-xs sm:text-sm text-haq-ink group-hover:text-[#0F5132] transition-colors line-clamp-1 mt-0.5">
                        {featuredProduct.name}
                      </span>
                      <p className="text-[11px] text-haq-text-secondary line-clamp-1 font-light mt-0.5">
                        {featuredProduct.description || "Hương vị nguyên bản tuyển chọn từ nguồn nông sản địa phương."}
                      </p>
                    </div>
                  </Link>

                  {/* RIGHT: SUPPORTING PRODUCTS */}
                  {supportingProducts.length === 2 ? (
                    <div className="col-span-5 flex flex-col gap-2.5 sm:gap-3 flex-1 min-h-0 justify-between">
                      {supportingProducts.map((prod, idx) => (
                        <Link
                          key={prod.productId || prod.slug || `${prod.name}-${idx}`}
                          to={prod.href || `/san-pham/${prod.slug || prod.productId || ''}`}
                          className="flex-1 flex flex-col justify-between bg-white rounded-lg border border-haq-border/70 hover:border-[#0F5132]/40 p-2 sm:p-2.5 transition-all duration-200 shadow-2xs group overflow-hidden min-h-0"
                        >
                          <div className="w-full flex-1 min-h-0 bg-[#FAF9F6] rounded-md border border-haq-border/40 p-1.5 flex items-center justify-center overflow-hidden relative">
                            {prod.is_pinned && (
                              <span className="absolute top-1 left-1 z-10 inline-flex items-center gap-0.5 bg-[#0F5132] text-white text-[8px] font-semibold px-1.5 py-0.2 rounded">
                                <Pin className="w-2 h-2 fill-[#C89B3C] text-[#C89B3C]" />
                              </span>
                            )}
                            {prod.image ? (
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-xl opacity-60">🌿</span>
                            )}
                          </div>

                          <div className="pt-1.5 flex flex-col shrink-0">
                            <span className="font-heading font-semibold text-xs text-haq-ink group-hover:text-[#0F5132] transition-colors line-clamp-1 leading-snug">
                              {prod.name}
                            </span>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="text-[10px] text-haq-text-secondary truncate font-light">
                                {prod.category || "Sản phẩm"}
                              </span>
                              <span className="text-[10px] text-[#0F5132] font-semibold ml-1 shrink-0 group-hover:translate-x-0.5 transition-transform">
                                →
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : supportingProducts.length === 1 ? (
                    <Link
                      to={supportingProducts[0].href || `/san-pham/${supportingProducts[0].slug || supportingProducts[0].productId || ''}`}
                      className="col-span-6 flex flex-col justify-between bg-white rounded-lg border border-haq-border/70 hover:border-[#0F5132]/40 p-2.5 sm:p-3 transition-all duration-200 shadow-2xs group overflow-hidden min-h-0"
                    >
                      <div className="w-full flex-1 min-h-0 bg-[#FAF9F6] rounded-md border border-haq-border/40 p-2 sm:p-3 flex items-center justify-center overflow-hidden relative">
                        {supportingProducts[0].is_pinned && (
                          <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-[#0F5132] text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                            <Pin className="w-2.5 h-2.5 fill-[#C89B3C] text-[#C89B3C]" />
                            Chủ lực
                          </span>
                        )}
                        {supportingProducts[0].image ? (
                          <img
                            src={supportingProducts[0].image}
                            alt={supportingProducts[0].name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-3xl opacity-60">🌾</span>
                        )}
                      </div>

                      <div className="pt-2 flex flex-col shrink-0">
                        <span className="text-[10px] tracking-wider uppercase text-[#0F5132] font-semibold">
                          {supportingProducts[0].category || "Sản phẩm"}
                        </span>
                        <span className="font-heading font-bold text-xs sm:text-sm text-haq-ink group-hover:text-[#0F5132] transition-colors line-clamp-1 mt-0.5">
                          {supportingProducts[0].name}
                        </span>
                        <p className="text-[11px] text-haq-text-secondary line-clamp-1 font-light mt-0.5">
                          {supportingProducts[0].description || "Hương vị nguyên bản tuyển chọn từ nguồn nông sản địa phương."}
                        </p>
                      </div>
                    </Link>
                  ) : null}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-6 bg-[#FAF9F6] border border-haq-border/60 rounded-lg text-center"
                >
                  <span className="text-2xl mb-2">🌱</span>
                  <p className="font-heading font-bold text-sm text-haq-ink mb-1">
                    Chưa có sản phẩm tại {activeProvinceInfo?.name || activeSpecialty?.provinceLabel || "địa phương này"}
                  </p>
                  <p className="text-xs text-haq-text-secondary max-w-xs leading-relaxed font-light">
                    HAQ FOOD đang trong quá trình khảo sát và phát triển các dòng sản phẩm liên kết tại địa phương này.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 5. ONLY ONE CTA AT BOTTOM */}
        <div className="pt-2.5 mt-2 border-t border-haq-border/60 flex items-center justify-end shrink-0">
          <Link
            to={selectedProvinceId ? `/san-pham?province=${selectedProvinceId}` : "/san-pham"}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#0F5132] hover:text-[#16A34A] uppercase tracking-wider transition-colors group"
          >
            <span>{t('home.specialty_map.cta', 'XEM TẤT CẢ SẢN PHẨM')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VietnamSpecialtyMap;
