import React, { useEffect } from "react";
import { mainlandPaths, islandPaths } from "../mapPaths";
import { provinceCentroids } from "../mapData";
import { Province } from "./Province";
import { ProvinceMarker } from "./ProvinceMarker";
import { ProvinceLabel } from "./ProvinceLabel";
import { MapControls } from "./MapControls";
import { MapTransform, SpecialtyData } from "../types";
import styles from "../styles.module.css";

interface InteractiveMapProps {
  selectedProvinceId: string | null;
  hoveredProvinceId?: string | null;
  hasSpecialtiesMap: Record<string, boolean>;
  specialties?: SpecialtyData;
  onHoverProvince: (e: React.MouseEvent<SVGElement>, id: string) => void;
  onLeaveProvince: () => void;
  onSelectProvince: (id: string) => void;
  svgRef: React.RefObject<SVGSVGElement>;
  mapContainerRef?: React.RefObject<HTMLDivElement>;
  transform: MapTransform;
  isDragging: boolean;
  isAnimated: boolean;
  onWheel?: (e: React.WheelEvent<SVGSVGElement> | WheelEvent) => void;
  onMouseDown: (e: React.MouseEvent<SVGSVGElement>) => void;
  onTouchStart: (e: React.TouchEvent<SVGSVGElement>) => void;
  onTouchMove: (e: React.TouchEvent<SVGSVGElement>) => void;
  onTouchEnd: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedProvinceId,
  hoveredProvinceId,
  hasSpecialtiesMap,
  specialties,
  onHoverProvince,
  onLeaveProvince,
  onSelectProvince,
  svgRef,
  mapContainerRef,
  transform,
  isDragging,
  isAnimated,
  onWheel,
  onMouseDown,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  // Direct non-passive wheel interception on map container element
  useEffect(() => {
    const container = mapContainerRef?.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onWheel) {
        onWheel(e);
      }
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
    };
  }, [mapContainerRef, onWheel]);
  return (
    <div
      className={styles.mapContainer}
      ref={mapContainerRef}
      data-map-viewport="true"
      data-consume-wheel="true"
    >
      <svg
        ref={svgRef}
        className={`${styles.mapSvg} ${isDragging ? styles.isGrabbing : styles.canGrab}`}
        viewBox="0 0 703 900"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bản đồ tương tác đặc sản Việt Nam"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Transform Group for smooth 60 FPS Zoom & Pan */}
        <g
          id="zoom-pan-layer"
          transform={`matrix(${transform.scale}, 0, 0, ${transform.scale}, ${transform.translateX ?? transform.x}, ${transform.translateY ?? transform.y})`}
        >
          {/* MAINLAND LAYER (34 Tỉnh/Thành Đất Liền - Tính toán bounds / auto-fit / zoom) */}
          <g id="mainland-polygons">
            {mainlandPaths.map((item) => {
              const hasProducts = !!hasSpecialtiesMap[item.id];
              const isActive = selectedProvinceId === item.id;
              const isDimmed =
                selectedProvinceId !== null &&
                selectedProvinceId !== item.id &&
                !hasProducts;

              return (
                <Province
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  d={item.d}
                  hasProducts={hasProducts}
                  isActive={isActive}
                  isDimmed={isDimmed}
                  onHover={onHoverProvince}
                  onLeave={onLeaveProvince}
                  onClick={onSelectProvince}
                />
              );
            })}
          </g>

          {/* ISLANDS DECORATIVE LAYER (Hoàng Sa & Trường Sa - Lớp phụ, không tham gia calculate bounds) */}
          <g id="islands-decorative-layer" className={styles.islandsLayer}>
            {islandPaths.map((item) => (
              <path
                key={item.id}
                id={`island-${item.id}`}
                d={item.d}
                className={styles.islandPath}
              />
            ))}

            {/* Quần đảo Hoàng Sa & Trường Sa Subtle Watermark Typography */}
            <g className={styles.territorialLabelGroup}>
              <text
                x={574}
                y={410}
                textAnchor="middle"
                className={styles.territorialLabel}
              >
                QUẦN ĐẢO HOÀNG SA
              </text>
              <text
                x={596}
                y={758}
                textAnchor="middle"
                className={styles.territorialLabel}
              >
                QUẦN ĐẢO TRƯỜNG SA
              </text>
            </g>
          </g>

          {/* Markers for Provinces with Verified Specialties */}
          <g id="province-anchors">
            {Object.entries(hasSpecialtiesMap).map(([id, has]) => {
              if (!has) return null;
              const provinceInfo = provinceCentroids[id];
              if (!provinceInfo) return null;
              const isActive = selectedProvinceId === id;

              return (
                <ProvinceMarker
                  key={`marker-${id}`}
                  id={id}
                  cx={provinceInfo.anchor.x}
                  cy={provinceInfo.anchor.y}
                  isActive={isActive}
                  hasSpecialties={has}
                  onSelect={onSelectProvince}
                />
              );
            })}
          </g>

          {/* Permanent Editorial Labels for Provinces with Specialties */}
          <g id="province-labels">
            {Object.entries(hasSpecialtiesMap).map(([id, has]) => {
              if (!has) return null;
              const provinceInfo = provinceCentroids[id];
              if (!provinceInfo) return null;
              const isActive = selectedProvinceId === id;
              const isHovered = hoveredProvinceId === id;
              const displayName =
                specialties?.[id]?.provinceLabel || provinceInfo.name;

              return (
                <ProvinceLabel
                  key={`label-${id}`}
                  id={id}
                  name={displayName}
                  cx={provinceInfo.anchor.x}
                  cy={provinceInfo.anchor.y}
                  isActive={isActive}
                  isHovered={isHovered}
                  hasSpecialties={has}
                  offset={provinceInfo.labelOffset}
                  anchorAlign={provinceInfo.labelAnchor}
                  onSelect={onSelectProvince}
                  onHover={onHoverProvince}
                  onLeave={onLeaveProvince}
                />
              );
            })}
          </g>
        </g>
      </svg>

      {/* Editorial Zoom / Pan / Reset Controls */}
      <MapControls
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
        scale={transform.scale}
      />
    </div>
  );
};
