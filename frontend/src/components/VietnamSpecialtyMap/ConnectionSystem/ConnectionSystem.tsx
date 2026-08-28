import React, { useState, useLayoutEffect, useEffect, useMemo, useRef } from "react";
import { Point, MapTransform, AdaptiveLineData } from "../types";
import {
  calculateProvincePath,
  calculateEdgePath,
  calculateRetractedPath,
  calculateRetractedEdgePath,
} from "./calculateConnectionPath";
import {
  worldToContainerPoint,
  getMapEdgeAnchor,
} from "../coordinateSystem";
import { ProvinceConnection } from "./ProvinceConnection";
import { EdgeConnection } from "./EdgeConnection";
import { provinceCentroids } from "../mapData";
import styles from "../styles.module.css";

const FADE_START_SCALE = 1.35; // Zoom >= 1.35 => Province Line 100%, Edge Line 0%
const FADE_END_SCALE = 1.05;   // Zoom <= 1.05 => Province Line 0%, Edge Line 100%

// Durations for the 3-phase transition
const RETRACT_DURATION = 240; // Line A retracts back to A (240ms)
const PAUSE_DURATION = 80;    // Pause gap with 0 lines visible (80ms)
const DRAW_DURATION = 320;    // Line B draws out from B to Card (320ms)

interface ConnectionSystemProps {
  selectedProvinceId: string | null;
  provinceAnchor: Point | null;
  svgRef: React.RefObject<SVGSVGElement>;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  cardRef: React.RefObject<HTMLDivElement>;
  experienceRef: React.RefObject<HTMLDivElement>;
  transform: MapTransform;
}

export const ConnectionSystem: React.FC<ConnectionSystemProps> = ({
  selectedProvinceId,
  provinceAnchor,
  svgRef,
  mapContainerRef,
  cardRef,
  experienceRef,
  transform,
}) => {
  const [, setTick] = useState(0);
  const rafIdRef = useRef<number | null>(null);

  // Transition State Machine: "idle" | "retract" | "pause" | "draw"
  const [phase, setPhase] = useState<"idle" | "retract" | "pause" | "draw">("idle");
  const [activeProvinceId, setActiveProvinceId] = useState<string | null>(selectedProvinceId);
  const [progress, setProgress] = useState<number>(1); // [0, 1] line extension

  const currentIdRef = useRef<string | null>(selectedProvinceId);
  const animRafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Handle selectedProvinceId changes with Retract -> Pause -> Draw sequence
  useEffect(() => {
    const prevId = currentIdRef.current;
    const nextId = selectedProvinceId;

    if (prevId === nextId) return;

    // Clean up previous animations & timers
    if (animRafRef.current) {
      cancelAnimationFrame(animRafRef.current);
      animRafRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!prevId && nextId) {
      // 1. Initial selection: Draw from 0 -> 1 directly
      currentIdRef.current = nextId;
      setActiveProvinceId(nextId);
      setPhase("draw");
      setProgress(0);

      const startTime = performance.now();
      const runDraw = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / DRAW_DURATION);
        // Ease-out cubic: 1 - (1-t)^3
        const ease = 1 - Math.pow(1 - p, 3);
        setProgress(ease);

        if (p < 1) {
          animRafRef.current = requestAnimationFrame(runDraw);
        } else {
          animRafRef.current = null;
          setPhase("idle");
          setProgress(1);
        }
      };
      animRafRef.current = requestAnimationFrame(runDraw);
    } else if (prevId && !nextId) {
      // 2. Deselection: Retract back from 1 -> 0
      setPhase("retract");
      const startTime = performance.now();
      const runRetract = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / RETRACT_DURATION);
        // Ease-in cubic: t^3
        const ease = 1 - Math.pow(p, 2.5);
        setProgress(ease);

        if (p < 1) {
          animRafRef.current = requestAnimationFrame(runRetract);
        } else {
          animRafRef.current = null;
          currentIdRef.current = null;
          setActiveProvinceId(null);
          setPhase("idle");
          setProgress(0);
        }
      };
      animRafRef.current = requestAnimationFrame(runRetract);
    } else if (prevId && nextId && prevId !== nextId) {
      // 3. Switching province A -> B: Retract A -> Pause -> Draw B
      setPhase("retract");
      const startTime = performance.now();

      const runRetract = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / RETRACT_DURATION);
        // Retract easing: accelerates towards province anchor
        const ease = 1 - Math.pow(p, 2.5);
        setProgress(ease);

        if (p < 1) {
          animRafRef.current = requestAnimationFrame(runRetract);
        } else {
          // Retract complete: Enter Pause phase
          animRafRef.current = null;
          setPhase("pause");
          setProgress(0);

          timerRef.current = window.setTimeout(() => {
            // After pause: Switch active province to B and start Draw phase
            currentIdRef.current = nextId;
            setActiveProvinceId(nextId);
            setPhase("draw");

            const drawStartTime = performance.now();
            const runDraw = (nowDraw: number) => {
              const drawElapsed = nowDraw - drawStartTime;
              const drawP = Math.min(1, drawElapsed / DRAW_DURATION);
              // Ease-out cubic for smooth drawing to card
              const drawEase = 1 - Math.pow(1 - drawP, 3);
              setProgress(drawEase);

              if (drawP < 1) {
                animRafRef.current = requestAnimationFrame(runDraw);
              } else {
                animRafRef.current = null;
                setPhase("idle");
                setProgress(1);
              }
            };
            animRafRef.current = requestAnimationFrame(runDraw);
          }, PAUSE_DURATION);
        }
      };
      animRafRef.current = requestAnimationFrame(runRetract);
    }

    return () => {
      if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [selectedProvinceId]);

  // Synchronous geometry calculation for active province anchor
  const activeAnchorPoint = useMemo(() => {
    if (!activeProvinceId) return null;
    if (activeProvinceId === selectedProvinceId && provinceAnchor) {
      return provinceAnchor;
    }
    return provinceCentroids[activeProvinceId]?.anchor || null;
  }, [activeProvinceId, selectedProvinceId, provinceAnchor]);

  const lineData = useMemo(() => {
    if (
      !activeProvinceId ||
      !activeAnchorPoint ||
      !svgRef.current ||
      !cardRef.current ||
      !experienceRef.current ||
      !mapContainerRef.current ||
      phase === "pause"
    ) {
      return null;
    }

    try {
      const svg = svgRef.current;
      const experience = experienceRef.current;
      const card = cardRef.current;
      const mapContainer = mapContainerRef.current;

      // 1. Calculate Province Anchor in Experience Coordinate Space
      const provinceStart = worldToContainerPoint(
        activeAnchorPoint,
        transform,
        svg,
        experience
      );
      if (!provinceStart) return null;

      const experienceRect = experience.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const mapRect = mapContainer.getBoundingClientRect();

      // 2. Check layout mode (Stacked on mobile vs 2-Column Desktop)
      const isStacked =
        experienceRect.width < 1024 ||
        cardRect.top > mapRect.bottom - 20 ||
        cardRect.left < mapRect.left + 50;

      // 3. Calculate Dynamic Direction-Aware Map Edge Anchor (Phase 12)
      const edgeResult = getMapEdgeAnchor({
        provincePt: provinceStart,
        mapContainerRect: mapRect,
        cardRect,
        experienceRect,
      });
      const edgeStart = edgeResult.anchor;

      // 4. Determine Destination Endpoint
      let endX: number;
      let endY: number;

      if (isStacked) {
        // Mobile / Stacked layout: Line terminates cleanly at the BOTTOM EDGE of the Map Container.
        // Flow: Province -> Map Bottom Edge (clean, editorial, avoids diagonal screen clutter).
        endX = edgeStart.x;
        endY = edgeStart.y;
      } else {
        // Desktop 2-Column layout: Connects to Story Card Entrance Port on the right
        const anchorEl = card.querySelector<HTMLElement>('[data-card-anchor="true"]');
        if (anchorEl) {
          const portRect = anchorEl.getBoundingClientRect();
          endX = portRect.left - experienceRect.left;
          endY = portRect.top - experienceRect.top;
        } else {
          endX = cardRect.left - experienceRect.left;
          endY = cardRect.top - experienceRect.top + 42;
        }
      }

      // 5. PHASE 13: Calculate smooth Hermite scale interpolation
      const linearProgress = Math.min(
        1,
        Math.max(
          0,
          (transform.scale - FADE_END_SCALE) / (FADE_START_SCALE - FADE_END_SCALE)
        )
      );
      const smoothScaleProgress =
        linearProgress * linearProgress * (3 - 2 * linearProgress);

      // 6. Viewport Boundary Containment: Never let connection line escape map container bounds
      const mapMinX = mapRect.left - experienceRect.left;
      const mapMaxX = mapRect.right - experienceRect.left;
      const mapMinY = mapRect.top - experienceRect.top;
      const mapMaxY = mapRect.bottom - experienceRect.top;

      const distLeft = provinceStart.x - mapMinX;
      const distRight = mapMaxX - provinceStart.x;
      const distTop = provinceStart.y - mapMinY;
      const distBottom = mapMaxY - provinceStart.y;
      const minEdgeDistance = Math.min(distLeft, distRight, distTop, distBottom);

      const BUFFER = 24;
      const containmentProgress = Math.max(0, Math.min(1, minEdgeDistance / BUFFER));
      const smoothContainment =
        containmentProgress * containmentProgress * (3 - 2 * containmentProgress);

      const effectiveProvinceOpacity = isStacked
        ? smoothContainment
        : smoothScaleProgress * smoothContainment;

      const effectiveEdgeOpacity = isStacked ? 0 : 1 - effectiveProvinceOpacity;

      // Retracted or Full Path Calculation based on progress [0, 1]
      const provincePathD =
        progress >= 0.999
          ? calculateProvincePath({
              start: provinceStart,
              end: { x: endX, y: endY },
              isStacked,
            })
          : calculateRetractedPath(
              provinceStart,
              { x: endX, y: endY },
              progress,
              isStacked
            );

      const edgePathD =
        progress >= 0.999
          ? calculateEdgePath({
              start: edgeStart,
              end: { x: endX, y: endY },
              isStacked,
            })
          : calculateRetractedEdgePath(
              edgeStart,
              { x: endX, y: endY },
              progress,
              isStacked
            );

      return {
        provincePathD,
        edgePathD,
        provinceStart,
        edgeStart,
        cardEnd: { x: endX, y: endY },
        provinceOpacity: effectiveProvinceOpacity,
        edgeOpacity: effectiveEdgeOpacity,
        showDestinationMarker: progress >= 0.95,
      };
    } catch {
      return null;
    }
  }, [
    activeProvinceId,
    activeAnchorPoint,
    svgRef,
    mapContainerRef,
    cardRef,
    experienceRef,
    transform,
    phase,
    progress,
  ]);

  // Ensure line renders immediately once StoryCard mounts
  useLayoutEffect(() => {
    setTick((t) => t + 1);
  }, [activeProvinceId]);

  // PHASE 18: Comprehensive Responsive & Resize Observer Engine
  useEffect(() => {
    const handleLayoutChange = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        setTick((t) => t + 1);
      });
    };

    window.addEventListener("resize", handleLayoutChange, { passive: true });
    window.addEventListener("scroll", handleLayoutChange, { passive: true });
    window.addEventListener("orientationchange", handleLayoutChange, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleLayoutChange);
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleLayoutChange();
      });

      if (experienceRef.current) resizeObserver.observe(experienceRef.current);
      if (mapContainerRef.current) resizeObserver.observe(mapContainerRef.current);
      if (svgRef.current) resizeObserver.observe(svgRef.current);
      if (cardRef.current) resizeObserver.observe(cardRef.current);
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("scroll", handleLayoutChange);
      window.removeEventListener("orientationchange", handleLayoutChange);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleLayoutChange);
      }

      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [experienceRef, mapContainerRef, svgRef, cardRef]);

  if (!activeProvinceId || !lineData || phase === "pause") return null;

  return (
    <svg className={styles.lineOverlay} aria-hidden="true">
      <g className="connection-system-group">
        {/* Mode A: Direct Province Connection Line */}
        <ProvinceConnection
          pathD={lineData.provincePathD}
          provinceStart={lineData.provinceStart}
          cardEnd={lineData.cardEnd}
          opacity={lineData.provinceOpacity}
          showDestinationMarker={lineData.showDestinationMarker}
        />

        {/* Mode B: Container Edge Connection Line */}
        <EdgeConnection
          pathD={lineData.edgePathD}
          edgeStart={lineData.edgeStart}
          cardEnd={lineData.cardEnd}
          opacity={lineData.edgeOpacity}
          showDestinationMarker={lineData.showDestinationMarker}
        />
      </g>
    </svg>
  );
};

// Also export as ConnectionLine for backward compatibility
export const ConnectionLine = ConnectionSystem;

