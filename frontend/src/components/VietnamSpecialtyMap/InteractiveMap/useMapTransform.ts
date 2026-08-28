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
  handleTouchStart: (e: React.TouchEvent<SVGSVGElement> | TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent<SVGSVGElement> | TouchEvent) => void;
  handleTouchEnd: (e?: React.TouchEvent<SVGSVGElement> | TouchEvent) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
  focusOnProvince: (province: ProvinceInfo) => void;
  focusOnRegion: (region: "ALL" | "Miền Bắc" | "Miền Trung" | "Miền Nam") => void;
}

type TouchSession =
  | {
      type: "single";
      startX: number;
      startY: number;
      startTx: number;
      startTy: number;
      scaleRatio: number;
    }
  | {
      type: "pinch";
      startDistance: number;
      startScale: number;
      startWorldX: number;
      startWorldY: number;
    }
  | null;

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
  const isAnimated = false;

  const transformRef = useRef<MapTransform>(transform);
  transformRef.current = transform;

  const mouseDragRef = useRef<{
    clientX: number;
    clientY: number;
    startTx: number;
    startTy: number;
    scaleRatio: number;
  } | null>(null);

  const touchSessionRef = useRef<TouchSession>(null);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const rafAnimationRef = useRef<number | null>(null);

  // Helper to create a consistent MapTransform object with finite guards
  const makeTransform = useCallback(
    (scale: number, tx: number, ty: number): MapTransform => {
      const safeScale = Number.isFinite(scale) ? Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale)) : 1;
      const safeTx = Number.isFinite(tx) ? tx : 0;
      const safeTy = Number.isFinite(ty) ? ty : 0;
      return {
        scale: safeScale,
        translateX: safeTx,
        translateY: safeTy,
        x: safeTx,
        y: safeTy,
      };
    },
    []
  );

  /**
   * Generous bounds clamping to allow full panning and mouse-centered zoom
   */
  const clampBounds = useCallback(
    (scale: number, tx: number, ty: number): MapTransform => {
      if (!Number.isFinite(scale) || scale <= 1.01) {
        return makeTransform(1, 0, 0);
      }
      const safeScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
      const minTx = (1 - safeScale) * MAP_WIDTH - 320;
      const maxTx = 320;
      const minTy = (1 - safeScale) * MAP_HEIGHT - 320;
      const maxTy = 320;

      const safeTx = Number.isFinite(tx) ? Math.max(minTx, Math.min(maxTx, tx)) : 0;
      const safeTy = Number.isFinite(ty) ? Math.max(minTy, Math.min(maxTy, ty)) : 0;

      return makeTransform(safeScale, safeTx, safeTy);
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
   */
  const animateTo = useCallback(
    (target: MapTransform, duration = 450) => {
      cancelAnimation();

      const start = transformRef.current;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out

        const currentScale = start.scale + (target.scale - start.scale) * ease;
        const currentTx = start.translateX + (target.translateX - start.translateX) * ease;
        const currentTy = start.translateY + (target.translateY - start.translateY) * ease;

        const next = makeTransform(currentScale, currentTx, currentTy);
        transformRef.current = next;
        setTransform(next);

        if (progress < 1) {
          rafAnimationRef.current = requestAnimationFrame(tick);
        } else {
          rafAnimationRef.current = null;
          transformRef.current = target;
          setTransform(target);
        }
      };

      rafAnimationRef.current = requestAnimationFrame(tick);
    },
    [cancelAnimation, makeTransform]
  );

  // Helper to compute SVG Root Coordinates (0..703, 0..900) from screen clientX/clientY
  const getSvgCoordinates = useCallback(
    (clientX: number, clientY: number, svgRect: DOMRect): Point => {
      const scaleRatio = Math.min(
        svgRect.width / MAP_VIEWBOX_WIDTH,
        svgRect.height / MAP_VIEWBOX_HEIGHT
      );
      const viewWidth = MAP_VIEWBOX_WIDTH * scaleRatio;
      const viewHeight = MAP_VIEWBOX_HEIGHT * scaleRatio;
      const letterboxX = svgRect.left + (svgRect.width - viewWidth) / 2;
      const letterboxY = svgRect.top + (svgRect.height - viewHeight) / 2;

      return {
        x: (clientX - letterboxX) / (scaleRatio || 1),
        y: (clientY - letterboxY) / (scaleRatio || 1),
      };
    },
    []
  );

  /**
   * Pointer-Invariant Mouse Wheel Zoom
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
      const prev = transformRef.current;
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev.scale * zoomFactor));

      if (Math.abs(newScale - prev.scale) < 0.0001) return;

      if (newScale <= 1.01) {
        const resetT = makeTransform(1, 0, 0);
        transformRef.current = resetT;
        setTransform(resetT);
        return;
      }

      const svgCursor = getSvgCoordinates(e.clientX, e.clientY, svgRect);
      const worldX = (svgCursor.x - prev.translateX) / prev.scale;
      const worldY = (svgCursor.y - prev.translateY) / prev.scale;

      const newTx = svgCursor.x - worldX * newScale;
      const newTy = svgCursor.y - worldY * newScale;

      const next = clampBounds(newScale, newTx, newTy);
      transformRef.current = next;
      setTransform(next);
    },
    [svgRef, cancelAnimation, makeTransform, clampBounds, getSvgCoordinates]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement> | WheelEvent) => {
      processWheelZoom(e);
    },
    [processWheelZoom]
  );

  // Mouse Drag Handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (e.button !== 0) return;
      cancelAnimation();

      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const scaleRatio = Math.min(rect.width / MAP_WIDTH, rect.height / MAP_HEIGHT) || 1;

      setIsDragging(true);
      mouseDragRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        startTx: transformRef.current.translateX,
        startTy: transformRef.current.translateY,
        scaleRatio,
      };
    },
    [svgRef, cancelAnimation]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDragRef.current) return;
      const { clientX, clientY, startTx, startTy, scaleRatio } = mouseDragRef.current;

      const deltaX = (e.clientX - clientX) / scaleRatio;
      const deltaY = (e.clientY - clientY) / scaleRatio;

      const next = clampBounds(transformRef.current.scale, startTx + deltaX, startTy + deltaY);
      transformRef.current = next;
      setTransform(next);
    };

    const handleMouseUp = () => {
      if (mouseDragRef.current) {
        mouseDragRef.current = null;
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

  /**
   * Double Tap to Zoom / Reset on Mobile
   */
  const handleDoubleTap = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return;

      const svgRect = svg.getBoundingClientRect();
      if (svgRect.width <= 0 || svgRect.height <= 0) return;

      const current = transformRef.current;
      if (current.scale > 1.5) {
        animateTo(makeTransform(1, 0, 0), 380);
      } else {
        const targetScale = 2.2;
        const svgCursor = getSvgCoordinates(clientX, clientY, svgRect);
        const worldX = (svgCursor.x - current.translateX) / current.scale;
        const worldY = (svgCursor.y - current.translateY) / current.scale;

        const targetTx = MAP_WIDTH / 2 - worldX * targetScale;
        const targetTy = MAP_HEIGHT / 2 - worldY * targetScale;

        animateTo(clampBounds(targetScale, targetTx, targetTy), 420);
      }
    },
    [svgRef, animateTo, makeTransform, clampBounds, getSvgCoordinates]
  );

  /**
   * Mobile Touch Handlers — Zero Runaway, Invariant Pinch & Pan
   */
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGSVGElement> | TouchEvent) => {
      cancelAnimation();
      const svg = svgRef.current;
      if (!svg) return;

      const svgRect = svg.getBoundingClientRect();
      if (svgRect.width <= 0 || svgRect.height <= 0) return;

      const touches = e.touches;

      if (touches.length === 1) {
        // Single finger pan setup
        const t = touches[0];
        const scaleRatio = Math.min(svgRect.width / MAP_WIDTH, svgRect.height / MAP_HEIGHT) || 1;

        setIsDragging(true);
        touchSessionRef.current = {
          type: "single",
          startX: t.clientX,
          startY: t.clientY,
          startTx: transformRef.current.translateX,
          startTy: transformRef.current.translateY,
          scaleRatio,
        };
      } else if (touches.length >= 2) {
        // Multi-touch pinch & pan setup
        if (e.cancelable) e.preventDefault();

        const t0 = touches[0];
        const t1 = touches[1];
        const dist = Math.max(10, Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY));
        const centerScreenX = (t0.clientX + t1.clientX) / 2;
        const centerScreenY = (t0.clientY + t1.clientY) / 2;

        const centerSvg = getSvgCoordinates(centerScreenX, centerScreenY, svgRect);
        const curScale = transformRef.current.scale;
        const curTx = transformRef.current.translateX;
        const curTy = transformRef.current.translateY;

        const worldX = (centerSvg.x - curTx) / curScale;
        const worldY = (centerSvg.y - curTy) / curScale;

        setIsDragging(true);
        touchSessionRef.current = {
          type: "pinch",
          startDistance: dist,
          startScale: curScale,
          startWorldX: worldX,
          startWorldY: worldY,
        };
      }
    },
    [svgRef, cancelAnimation, getSvgCoordinates]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<SVGSVGElement> | TouchEvent) => {
      const svg = svgRef.current;
      if (!svg || !touchSessionRef.current) return;

      const svgRect = svg.getBoundingClientRect();
      if (svgRect.width <= 0 || svgRect.height <= 0) return;

      const touches = e.touches;

      if (touches.length === 1 && touchSessionRef.current.type === "single") {
        // Single finger pan: Allow native touch pan
        const t = touches[0];
        const session = touchSessionRef.current;
        const deltaX = (t.clientX - session.startX) / session.scaleRatio;
        const deltaY = (t.clientY - session.startY) / session.scaleRatio;

        const next = clampBounds(
          transformRef.current.scale,
          session.startTx + deltaX,
          session.startTy + deltaY
        );
        transformRef.current = next;
        setTransform(next);
      } else if (touches.length >= 2) {
        // Multi-touch pinch & pan: Stop page zoom and compute closed-form transform
        if (e.cancelable) e.preventDefault();

        const t0 = touches[0];
        const t1 = touches[1];
        const dist = Math.max(10, Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY));
        const centerScreenX = (t0.clientX + t1.clientX) / 2;
        const centerScreenY = (t0.clientY + t1.clientY) / 2;
        const centerSvg = getSvgCoordinates(centerScreenX, centerScreenY, svgRect);

        // If session was single finger, upgrade smoothly to pinch without jumping
        if (touchSessionRef.current.type !== "pinch") {
          const curScale = transformRef.current.scale;
          const curTx = transformRef.current.translateX;
          const curTy = transformRef.current.translateY;

          touchSessionRef.current = {
            type: "pinch",
            startDistance: dist,
            startScale: curScale,
            startWorldX: (centerSvg.x - curTx) / curScale,
            startWorldY: (centerSvg.y - curTy) / curScale,
          };
          return;
        }

        const session = touchSessionRef.current;
        const scaleMultiplier = dist / session.startDistance;
        let newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, session.startScale * scaleMultiplier));

        if (!Number.isFinite(newScale)) newScale = 1;

        let newTx = 0;
        let newTy = 0;

        if (newScale > 1.01) {
          newTx = centerSvg.x - session.startWorldX * newScale;
          newTy = centerSvg.y - session.startWorldY * newScale;
        }

        const next = clampBounds(newScale, newTx, newTy);
        transformRef.current = next;
        setTransform(next);
      }
    },
    [svgRef, clampBounds, getSvgCoordinates]
  );

  const handleTouchEnd = useCallback(
    (e?: React.TouchEvent<SVGSVGElement> | TouchEvent) => {
      const touches = e ? e.touches : undefined;

      if (!touches || touches.length === 0) {
        // All fingers lifted
        setIsDragging(false);

        // Double tap detection on release of single touch
        if (e && 'changedTouches' in e && e.changedTouches.length === 1) {
          const ct = e.changedTouches[0];
          const now = performance.now();
          if (lastTapRef.current && now - lastTapRef.current.time < 300) {
            const dist = Math.hypot(ct.clientX - lastTapRef.current.x, ct.clientY - lastTapRef.current.y);
            if (dist < 32) {
              handleDoubleTap(ct.clientX, ct.clientY);
              lastTapRef.current = null;
              touchSessionRef.current = null;
              return;
            }
          }
          lastTapRef.current = { time: now, x: ct.clientX, y: ct.clientY };
        }

        touchSessionRef.current = null;
      } else if (touches.length === 1) {
        // Transition from 2 fingers down to 1 finger smoothly without jumping
        const svg = svgRef.current;
        if (svg) {
          const svgRect = svg.getBoundingClientRect();
          const scaleRatio = Math.min(svgRect.width / MAP_WIDTH, svgRect.height / MAP_HEIGHT) || 1;
          const t = touches[0];
          touchSessionRef.current = {
            type: "single",
            startX: t.clientX,
            startY: t.clientY,
            startTx: transformRef.current.translateX,
            startTy: transformRef.current.translateY,
            scaleRatio,
          };
        }
      }
    },
    [svgRef, handleDoubleTap]
  );

  // Zoom controls
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
   */
  const focusOnProvince = useCallback(
    (province: ProvinceInfo) => {
      let bbox: BoundingBox = province.bbox;

      const svg = svgRef.current;
      if (svg) {
        try {
          const pathEl = svg.querySelector<SVGPathElement>(`#province-${province.id}`);
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

      const usableWidth = MAP_WIDTH * (1 - PROVINCE_PADDING_RATIO);
      const usableHeight = MAP_HEIGHT * (1 - PROVINCE_PADDING_RATIO);

      const scaleX = usableWidth / Math.max(bbox.width, 35);
      const scaleY = usableHeight / Math.max(bbox.height, 35);
      const requiredScale = Math.min(scaleX, scaleY);

      const targetScale = Math.min(
        MAX_PROVINCE_SCALE,
        Math.max(MIN_PROVINCE_SCALE, requiredScale)
      );

      const centerX = province.anchor?.x ?? (bbox.minX + bbox.maxX) / 2;
      const centerY = province.anchor?.y ?? (bbox.minY + bbox.maxY) / 2;

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
