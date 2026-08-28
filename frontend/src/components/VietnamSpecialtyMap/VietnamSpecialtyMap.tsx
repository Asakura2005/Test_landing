import React, { useState, useRef, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { provinceCentroids } from "./mapData";
import { InteractiveMap } from "./InteractiveMap/InteractiveMap";
import { ProvinceTooltip } from "./InteractiveMap/ProvinceTooltip";
import { SpecialtyStoryCard } from "./SpecialtyStoryCard/SpecialtyStoryCard";
import { ConnectionLine } from "./ConnectionSystem/ConnectionLine";
import { useMapTransform } from "./InteractiveMap/useMapTransform";
import { worldToContainerPoint } from "./coordinateSystem";
import { useHaqSpecialtyMapData } from "./useHaqSpecialtyMapData";
import { SpecialtyData } from "./types";
import styles from "./styles.module.css";

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
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
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
  const cardRef = useRef<HTMLDivElement>(null);

  // Hook kết nối dữ liệu thật từ Supabase (single fetch at orchestrator)
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
    focusOnRegion(region);
  }, [focusOnRegion]);

  const handleHoverProvince = useCallback(
    (e: React.MouseEvent<SVGElement>, id: string) => {
      if (isDragging) return;
      // Do not show hover tooltip on currently selected province
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
      // Clear hover tooltip immediately upon selecting
      setHoveredProvince(null);

      if (selectedProvinceId === id) {
        // Toggle deselect
        setSelectedProvinceId(null);
        setActiveProductIndex(0);
      } else {
        // Direct transition from old province to new province
        setSelectedProvinceId(id);
        setActiveProductIndex(0);

        // Dynamic bounding box auto-focus
        const info = provinceCentroids[id];
        if (info) {
          focusOnProvince(info);
        }

        // Smooth scroll on mobile if needed
        if (window.innerWidth < 1024) {
          setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }, 320);
        }
      }
    },
    [selectedProvinceId, focusOnProvince]
  );

  const handleReset = useCallback(() => {
    resetTransform();
    setSelectedProvinceId(null);
    setActiveProductIndex(0);
    setHoveredProvince(null);
  }, [resetTransform]);

  const handlePrevProduct = useCallback(() => {
    if (!selectedProvinceId) return;
    const specialty = specialties[selectedProvinceId];
    if (!specialty || !specialty.products || specialty.products.length === 0) return;

    setActiveProductIndex((prev) =>
      prev === 0 ? specialty.products.length - 1 : prev - 1
    );
  }, [selectedProvinceId, specialties]);

  const handleNextProduct = useCallback(() => {
    if (!selectedProvinceId) return;
    const specialty = specialties[selectedProvinceId];
    if (!specialty || !specialty.products || specialty.products.length === 0) return;

    setActiveProductIndex((prev) =>
      prev === specialty.products.length - 1 ? 0 : prev + 1
    );
  }, [selectedProvinceId, specialties]);

  // Province info & specialty checks
  const activeProvinceInfo = selectedProvinceId ? provinceCentroids[selectedProvinceId] || null : null;
  const activeSpecialty = selectedProvinceId ? specialties[selectedProvinceId] || null : null;
  const isSelectedProvinceHasProducts = Boolean(activeSpecialty && activeSpecialty.products && activeSpecialty.products.length > 0);

  // Line Connection is drawn ONLY when the selected province has verified products
  const activeAnchor = isSelectedProvinceHasProducts ? activeProvinceInfo?.anchor || null : null;
  const connectionProvinceId = isSelectedProvinceHasProducts ? selectedProvinceId : null;

  const hoveredProductCount = hoveredProvince
    ? specialties[hoveredProvince.id]?.products?.length || 0
    : 0;

  return (
    <section className={`${styles.container} ${className}`}>
      {/* Editorial Header */}
      <header className={styles.header}>
        <span className={styles.eyebrow}>HAQ FOOD PRESENTS</span>
        <h2 className={styles.title}>HỆ SINH THÁI SẢN PHẨM HAQ FOOD</h2>
        <p className={styles.subtitle}>
          KHÁM PHÁ ĐẶC SẢN VIỆT NAM — Mỗi vùng đất, một câu chuyện hương vị nguyên bản
        </p>

        {/* Compact Interactive Header Toolbar */}
        <div className={styles.headerToolbar}>
          <div className={styles.hint}>
            <span className={styles.hintDot} />
            <span>Cuộn chuột để thu phóng · Kéo để xoay chuyển · Nhấp tỉnh để khám phá</span>
          </div>

          {/* Quick Region Selector Bar */}
          <div className={styles.regionFilterBar} role="tablist" aria-label="Bộ lọc vùng miền">
            {[
              { id: "ALL", label: "TOÀN QUỐC" },
              { id: "Miền Bắc", label: "MIỀN BẮC" },
              { id: "Miền Trung", label: "MIỀN TRUNG" },
              { id: "Miền Nam", label: "MIỀN NAM" },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={selectedRegion === r.id}
                className={`${styles.regionFilterBtn} ${
                  selectedRegion === r.id ? styles.activeRegionBtn : ""
                }`}
                onClick={() => handleSelectRegion(r.id as any)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Experience Grid — Unified Coordinate Reference Frame */}
      <div className={styles.experience} ref={experienceRef}>
        {/* Adaptive Dual-Mode Connection System (Chỉ vẽ khi province có sản phẩm) */}
        <ConnectionLine
          selectedProvinceId={connectionProvinceId}
          provinceAnchor={activeAnchor}
          svgRef={svgRef}
          mapContainerRef={mapContainerRef}
          cardRef={cardRef}
          experienceRef={experienceRef}
          transform={transform}
        />

        {/* Interactive SVG Map Canvas */}
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

        {/* Storytelling Card Area (Hỗ trợ Product Story, Empty State & Loading Skeleton) */}
        <div className={styles.cardArea} data-scrollable-panel="true">
          <AnimatePresence mode="wait">
            {selectedProvinceId && (
              <SpecialtyStoryCard
                key={selectedProvinceId}
                specialty={activeSpecialty}
                provinceInfo={activeProvinceInfo}
                productIndex={activeProductIndex}
                isEmpty={!isSelectedProvinceHasProducts}
                isLoading={isLoading}
                onPrevProduct={handlePrevProduct}
                onNextProduct={handleNextProduct}
                onClose={() => setSelectedProvinceId(null)}
                cardRef={cardRef}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Floating Hover Tooltip (Only for unselected provinces on hover) */}
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
    </section>
  );
};

export default VietnamSpecialtyMap;
