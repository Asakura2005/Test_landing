import { useState, useCallback, useRef, useEffect } from "react";
import { MapTransform, Point, ProvinceInfo, BoundingBox } from "../types";
import { MAP_VIEWBOX_WIDTH, MAP_VIEWBOX_HEIGHT } from "../coordinateSystem";

export const MIN_SCALE = 1.0;
export const MAX_SCALE = 3.8;
export const MAP_WIDTH = MAP_VIEWBOX_WIDTH;
export const MAP_HEIGHT = MAP_VIEWBOX_HEIGHT;

// Dynamic Province Auto-Focus Configuration
export const MIN_PROVINCE_SCALE = 1.8; // Guaranteed clear zoom into province
export const MAX_PROVINCE_SCALE = 3.0; // For small provinces (Đà Nẵng, Tây Ninh, Hà Nội)
export const PROVINCE_PADDING_RATIO = 0.25; // 25% comfortable viewport padding

interface UseMapTransformOptions {
  svgRef: React.RefObject<SVGSVGElement>;
  containerRef?: React.RefObject<HTMLElement>;
}

interface UseMapTransformReturn {
  transform: MapTransform;
  isDragging: boolean;
  isAnimated: boolean;
  handleWheel: (e: React.WheelEvent<SVGSVGElement> | WheelEvent) => void;
  handleMouseDown: (e: React.MouseEvent<SVGSVGElement>) => void;
  handleTouchStart: (e: React.TouchEvent<SVGSVGElement>) => void;
  handleTouchMove: (e: React.TouchEvent<SVGSVGElement>) => void;
  handleTouchEnd: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
  focusOnProvince: (province: ProvinceInfo) => void;
  focusOnRegion: (region: "ALL" | "Miền Bắc" | "Miền Trung" | "Miền Nam") => void;
}

export function useMapTransform({
  svgRef,
  containerRef,
}: UseMapTransformOptions): UseMapTransformReturn {
  const [transform, setTransform] = useState<MapTransform>({
    scale: 1,
    translateX: 0,
    translateY: 0,
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const isAnimated = false; // Synchronous RAF driven transforms ensure 0ms latency

  const transformRef = useRef<MapTransform>(transform);
  transformRef.current = transform;

  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    startTx: number;
    startTy: number;
    svgWidth: number;
    svgHeight: number;
  } | null>(null);

  const touchDistanceRef = useRef<number | null>(null);
  const touchCenterRef = useRef<Point | null>(null);
  const rafAnimationRef = useRef<number | null>(null);

  // Helper to create a consistent MapTransform object
  const makeTransform = useCallback(
    (scale: number, tx: number, ty: number): MapTransform => ({
      scale,
      translateX: tx,
      translateY: ty,
      x: tx,
      y: ty,
    }),
    []
  );

  /**
   * Generous bounds clamping to allow full panning and mouse-centered zoom
   */
  const clampBounds = useCallback(
    (scale: number, tx: number, ty: number): MapTransform => {
      if (scale <= 1.01) {
        return makeTransform(1, 0, 0);
      }
      const minTx = (1 - scale) * MAP_WIDTH - 320;
      const maxTx = 320;
      const minTy = (1 - scale) * MAP_HEIGHT - 320;
      const maxTy = 320;

      return makeTransform(
        scale,
        Math.max(minTx, Math.min(maxTx, tx)),
        Math.max(minTy, Math.min(maxTy, ty))
      );
    },
    [makeTransform]
  );

  /**
   * Cancel any active RAF camera tween
   */
  const cancelAnimation = useCallback(() => {
    if (rafAnimationRef.current !== null) {
      cancelAnimationFrame(rafAnimationRef.current);
      rafAnimationRef.current = null;
    }
  }, []);

  /**
   * Smooth Frame-Synchronized Camera Animator
   * Drives both the SVG Map and Connection Line synchronously at 60 FPS
   */
  const animateTo = useCallback(
    (target: MapTransform, duration = 450) => {
      cancelAnimation();

      const start = transformRef.current;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);

        // Smooth cubic ease-out: f(t) = 1 - (1 - t)^3
        const ease = 1 - Math.pow(1 - progress, 3);

        const currentScale = start.scale + (target.scale - start.scale) * ease;
        const currentTx =
          start.translateX + (target.translateX - start.translateX) * ease;
        const currentTy =
          start.translateY + (target.translateY - start.translateY) * ease;

        setTransform(makeTransform(currentScale, currentTx, currentTy));

        if (progress < 1) {
          rafAnimationRef.current = requestAnimationFrame(tick);
        } else {
          rafAnimationRef.current = null;
          setTransform(target);
        }
      };

      rafAnimationRef.current = requestAnimationFrame(tick);
    },
    [cancelAnimation, makeTransform]
  );

  /**
   * Exact Mouse-Centered Zoom (Pointer-Invariant)
   */
  const processWheelZoom = useCallback(
    (e: { clientX: number; clientY: number; deltaY: number; preventDefault?: () => void; stopPropagation?: () => void }) => {
      if (typeof e.preventDefault === "function") e.preventDefault();
      if (typeof e.stopPropagation === "function") e.stopPropagation();

      cancelAnimation();

      const svg = svgRef.current;
      if (!svg) return;

      const svgRect = svg.getBoundingClientRect();
      if (svgRect.width <= 0 || svgRect.height <= 0) return;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;

      setTransform((prev) => {
        const newScale = Math.min(
          MAX_SCALE,
          Math.max(MIN_SCALE, prev.scale * zoomFactor)
        );

        if (Math.abs(newScale - prev.scale) < 0.0001) return prev;

        if (newScale <= 1.01) {
          return makeTransform(1, 0, 0);
        }

        // Calculate cursor position in SVG (0..703, 0..900) coordinates
        const scaleRatio = Math.min(
          svgRect.width / MAP_VIEWBOX_WIDTH,
          svgRect.height / MAP_VIEWBOX_HEIGHT
        );
        const viewWidth = MAP_VIEWBOX_WIDTH * scaleRatio;
        const viewHeight = MAP_VIEWBOX_HEIGHT * scaleRatio;
        const letterboxX = svgRect.left + (svgRect.width - viewWidth) / 2;
        const letterboxY = svgRect.top + (svgRect.height - viewHeight) / 2;

        const svgCursorX = (e.clientX - letterboxX) / scaleRatio;
        const svgCursorY = (e.clientY - letterboxY) / scaleRatio;

        // World coordinate under cursor before zoom
        const worldX = (svgCursorX - prev.translateX) / prev.scale;
        const worldY = (svgCursorY - prev.translateY) / prev.scale;

        // New translation preserving the point under cursor
        const newTx = svgCursorX - worldX * newScale;
        const newTy = svgCursorY - worldY * newScale;

        return clampBounds(newScale, newTx, newTy);
      });
    },
    [svgRef, cancelAnimation, makeTransform, clampBounds]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement> | WheelEvent) => {
      processWheelZoom(e);
    },
    [processWheelZoom]
  );

  // Native non-passive Wheel listener registration on Map container
  useEffect(() => {
    const el = containerRef?.current || svgRef.current;
    if (!el) return;

    const onNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      processWheelZoom(e);
    };

    el.addEventListener("wheel", onNativeWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onNativeWheel);
    };
  }, [containerRef, svgRef, processWheelZoom]);


  // Mouse Drag Pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (e.button !== 0) return; // Only primary button
      cancelAnimation();

      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      setIsDragging(true);
      dragStartRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        startTx: transformRef.current.translateX,
        startTy: transformRef.current.translateY,
        svgWidth: rect.width || MAP_WIDTH,
        svgHeight: rect.height || MAP_HEIGHT,
      };
    },
    [svgRef, cancelAnimation]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;
      const { clientX, clientY, startTx, startTy, svgWidth, svgHeight } =
        dragStartRef.current;

      const scaleRatio = Math.min(svgWidth / MAP_WIDTH, svgHeight / MAP_HEIGHT);
      const deltaX = (e.clientX - clientX) / (scaleRatio || 1);
      const deltaY = (e.clientY - clientY) / (scaleRatio || 1);

      setTransform((prev) =>
        clampBounds(prev.scale, startTx + deltaX, startTy + deltaY)
      );
    };

    const handleMouseUp = () => {
      if (dragStartRef.current) {
        dragStartRef.current = null;
        setIsDragging(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [clampBounds]);

  // Touch Pinch and Pan
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      cancelAnimation();
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();

      if (e.touches.length === 1) {
        setIsDragging(true);
        dragStartRef.current = {
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
          startTx: transformRef.current.translateX,
          startTy: transformRef.current.translateY,
          svgWidth: rect.width || MAP_WIDTH,
          svgHeight: rect.height || MAP_HEIGHT,
        };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchDistanceRef.current = Math.hypot(dx, dy);

        touchCenterRef.current = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        };
      }
    },
    [svgRef, cancelAnimation]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();

      if (e.touches.length === 1 && dragStartRef.current) {
        const { clientX, clientY, startTx, startTy, svgWidth, svgHeight } =
          dragStartRef.current;

        const scaleRatio = Math.min(
          svgWidth / MAP_WIDTH,
          svgHeight / MAP_HEIGHT
        );
        const deltaX = (e.touches[0].clientX - clientX) / (scaleRatio || 1);
        const deltaY = (e.touches[0].clientY - clientY) / (scaleRatio || 1);

        setTransform((prev) =>
          clampBounds(prev.scale, startTx + deltaX, startTy + deltaY)
        );
      } else if (
        e.touches.length === 2 &&
        touchDistanceRef.current !== null &&
        touchCenterRef.current !== null
      ) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);

        const ratio = currentDist / touchDistanceRef.current;
        touchDistanceRef.current = currentDist;

        setTransform((prev) => {
          const newScale = Math.min(
            MAX_SCALE,
            Math.max(MIN_SCALE, prev.scale * ratio)
          );
          if (newScale <= 1.01) return makeTransform(1, 0, 0);

          const scaleRatio = Math.min(
            (rect.width || MAP_WIDTH) / MAP_WIDTH,
            (rect.height || MAP_HEIGHT) / MAP_HEIGHT
          );
          const center = touchCenterRef.current!;
          const svgX = (center.x - rect.left) / scaleRatio;
          const svgY = (center.y - rect.top) / scaleRatio;

          const worldX = (svgX - prev.translateX) / prev.scale;
          const worldY = (svgY - prev.translateY) / prev.scale;

          const newTx = svgX - worldX * newScale;
          const newTy = svgY - worldY * newScale;

          return clampBounds(newScale, newTx, newTy);
        });
      }
    },
    [svgRef, clampBounds, makeTransform]
  );

  const handleTouchEnd = useCallback(() => {
    dragStartRef.current = null;
    touchDistanceRef.current = null;
    touchCenterRef.current = null;
    setIsDragging(false);
  }, []);

  const zoomIn = useCallback(() => {
    const prev = transformRef.current;
    const newScale = Math.min(MAX_SCALE, prev.scale * 1.3);
    const ratio = newScale / prev.scale;
    const newTx = MAP_WIDTH / 2 - (MAP_WIDTH / 2 - prev.translateX) * ratio;
    const newTy = MAP_HEIGHT / 2 - (MAP_HEIGHT / 2 - prev.translateY) * ratio;
    animateTo(clampBounds(newScale, newTx, newTy), 320);
  }, [animateTo, clampBounds]);

  const zoomOut = useCallback(() => {
    const prev = transformRef.current;
    const newScale = Math.max(MIN_SCALE, prev.scale / 1.3);
    if (newScale <= 1.05) {
      animateTo(makeTransform(1, 0, 0), 320);
      return;
    }
    const ratio = newScale / prev.scale;
    const newTx = MAP_WIDTH / 2 - (MAP_WIDTH / 2 - prev.translateX) * ratio;
    const newTy = MAP_HEIGHT / 2 - (MAP_HEIGHT / 2 - prev.translateY) * ratio;
    animateTo(clampBounds(newScale, newTx, newTy), 320);
  }, [animateTo, clampBounds, makeTransform]);

  const resetTransform = useCallback(() => {
    animateTo(makeTransform(1, 0, 0), 400);
  }, [animateTo, makeTransform]);

  /**
   * Dynamic Province Auto-Focus
   * Computes scale based on province bounding box and centers province anchor
   */
  const focusOnProvince = useCallback(
    (province: ProvinceInfo) => {
      let bbox: BoundingBox = province.bbox;

      const svg = svgRef.current;
      if (svg) {
        try {
          const pathEl = svg.querySelector<SVGPathElement>(
            `#province-${province.id}`
          );
          if (pathEl) {
            const domBBox = pathEl.getBBox();
            if (domBBox.width > 0 && domBBox.height > 0) {
              bbox = {
                minX: domBBox.x,
                maxX: domBBox.x + domBBox.width,
                minY: domBBox.y,
                maxY: domBBox.y + domBBox.height,
                width: domBBox.width,
                height: domBBox.height,
              };
            }
          }
        } catch {
          // Fall back to precomputed vector bbox
        }
      }

      // Usable viewport dimensions with 25% comfortable padding
      const usableWidth = MAP_WIDTH * (1 - PROVINCE_PADDING_RATIO);
      const usableHeight = MAP_HEIGHT * (1 - PROVINCE_PADDING_RATIO);

      // Required scale to fit province comfortably inside the viewport
      const scaleX = usableWidth / Math.max(bbox.width, 35);
      const scaleY = usableHeight / Math.max(bbox.height, 35);
      const requiredScale = Math.min(scaleX, scaleY);

      // Clamp between 1.8x and 3.0x
      const targetScale = Math.min(
        MAX_PROVINCE_SCALE,
        Math.max(MIN_PROVINCE_SCALE, requiredScale)
      );

      // Focus on canonical geographic anchor (or bbox center)
      const centerX = province.anchor?.x ?? (bbox.minX + bbox.maxX) / 2;
      const centerY = province.anchor?.y ?? (bbox.minY + bbox.maxY) / 2;

      // Translation to center the province in viewport (351.5, 450)
      const targetTx = MAP_WIDTH / 2 - centerX * targetScale;
      const targetTy = MAP_HEIGHT / 2 - centerY * targetScale;

      animateTo(clampBounds(targetScale, targetTx, targetTy), 500);
    },
    [svgRef, clampBounds, animateTo]
  );

  /**
   * Region Viewport Auto-Focus
   */
  const focusOnRegion = useCallback(
    (region: "ALL" | "Miền Bắc" | "Miền Trung" | "Miền Nam") => {
      if (region === "ALL") {
        resetTransform();
        return;
      }

      let centerX = 351.5;
      let centerY = 450;
      const targetScale = 1.45;

      if (region === "Miền Bắc") {
        centerX = 260;
        centerY = 220;
      } else if (region === "Miền Trung") {
        centerX = 370;
        centerY = 460;
      } else if (region === "Miền Nam") {
        centerX = 380;
        centerY = 720;
      }

      const targetTx = MAP_WIDTH / 2 - centerX * targetScale;
      const targetTy = MAP_HEIGHT / 2 - centerY * targetScale;
      animateTo(clampBounds(targetScale, targetTx, targetTy), 500);
    },
    [animateTo, clampBounds, resetTransform]
  );

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return {
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
  };
}
