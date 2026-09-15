import { Point, MapTransform } from "./types";

export const MAP_VIEWBOX_WIDTH = 703;
export const MAP_VIEWBOX_HEIGHT = 900;

/**
 * Transforms a point from World / Geographic SVG Space (0..703, 0..900)
 * to Transformed SVG Space under matrix(scale, 0, 0, scale, translateX, translateY).
 */
export function worldToTransformedSvg(
  worldPt: Point,
  transform: MapTransform
): Point {
  const tx = transform.translateX ?? transform.x ?? 0;
  const ty = transform.translateY ?? transform.y ?? 0;
  return {
    x: worldPt.x * transform.scale + tx,
    y: worldPt.y * transform.scale + ty,
  };
}

/**
 * Transforms a point from Transformed SVG Space back to
 * World / Geographic SVG Space (0..703, 0..900).
 */
export function transformedSvgToWorld(
  svgPt: Point,
  transform: MapTransform
): Point {
  const tx = transform.translateX ?? transform.x ?? 0;
  const ty = transform.translateY ?? transform.y ?? 0;
  return {
    x: (svgPt.x - tx) / transform.scale,
    y: (svgPt.y - ty) / transform.scale,
  };
}

/**
 * Converts a World Point (province anchor) directly to Container Pixel Coordinates
 * using exact closed-form SVG geometric viewport scaling + DOM offset projection.
 *
 * Guaranteed 100% synchronized across zoom, pan, scroll, and viewport resize.
 */
export function worldToContainerPoint(
  worldPt: Point,
  transform: MapTransform,
  svgElement: SVGSVGElement,
  containerElement: HTMLElement
): Point | null {
  try {
    const svgRect = svgElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();
    if (svgRect.width <= 0 || svgRect.height <= 0) return null;

    // 1. Calculate point in SVG root coordinate space (0..703, 0..900)
    const transformedSvgPt = worldToTransformedSvg(worldPt, transform);

    // 2. Exact preserveAspectRatio="xMidYMid meet" mapping from (703, 900) to svgRect:
    const scaleRatio = Math.min(
      svgRect.width / MAP_VIEWBOX_WIDTH,
      svgRect.height / MAP_VIEWBOX_HEIGHT
    );
    const viewWidth = MAP_VIEWBOX_WIDTH * scaleRatio;
    const viewHeight = MAP_VIEWBOX_HEIGHT * scaleRatio;
    const letterboxX = svgRect.left + (svgRect.width - viewWidth) / 2;
    const letterboxY = svgRect.top + (svgRect.height - viewHeight) / 2;

    // 3. Screen coordinates of the anchor point:
    const screenX = letterboxX + transformedSvgPt.x * scaleRatio;
    const screenY = letterboxY + transformedSvgPt.y * scaleRatio;

    // 4. Container coordinates (relative to experienceRef):
    return {
      x: screenX - containerRect.left,
      y: screenY - containerRect.top,
    };
  } catch {
    return null;
  }
}

/**
 * Converts a Client/Screen coordinate (e.g. from mouse event) back to
 * World / Geographic SVG Space.
 */
export function clientToWorldPoint(
  clientX: number,
  clientY: number,
  transform: MapTransform,
  svgElement: SVGSVGElement
): Point | null {
  try {
    const pt = svgElement.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    const ctm = svgElement.getScreenCTM();
    if (!ctm) return null;

    // Convert Client Screen -> SVG Root Space
    const svgRootPt = pt.matrixTransform(ctm.inverse());

    // Convert SVG Root Space -> World Geographic Space
    return transformedSvgToWorld({ x: svgRootPt.x, y: svgRootPt.y }, transform);
  } catch {
    return null;
  }
}

export type ConnectionDirection = "RIGHT" | "BOTTOM" | "LEFT" | "TOP";

export interface DynamicMapEdgeAnchorParams {
  provincePt: Point;
  mapContainerRect: DOMRect;
  cardRect: DOMRect;
  experienceRect: DOMRect;
}

/**
 * PHASE 12: Dynamic Map Edge Anchor Calculation
 *
 * Computes the dynamic exit anchor on the exact boundary edge of the Map Container
 * facing the storytelling card:
 *
 * 1. Computes direction vector between Map Container & Story Card
 * 2. Identifies exit boundary edge (Right on Desktop, Bottom on Mobile/Stacked)
 * 3. Dynamically projects province anchor position onto that boundary edge
 * 4. Clamps safely within container padding to prevent corner overlap
 */
export function getMapEdgeAnchor({
  provincePt,
  mapContainerRect,
  cardRect,
  experienceRect,
}: DynamicMapEdgeAnchorParams): { anchor: Point; direction: ConnectionDirection } {
  const mapCenterScreenX = mapContainerRect.left + mapContainerRect.width / 2;
  const mapCenterScreenY = mapContainerRect.top + mapContainerRect.height / 2;
  const cardCenterScreenX = cardRect.left + cardRect.width / 2;
  const cardCenterScreenY = cardRect.top + cardRect.height / 2;

  const dx = cardCenterScreenX - mapCenterScreenX;
  const dy = cardCenterScreenY - mapCenterScreenY;

  // Determine primary connection direction
  const isHorizontalPrimary = Math.abs(dx) >= Math.abs(dy) * 0.75;

  if (isHorizontalPrimary && dx >= 0) {
    // DIRECTION: RIGHT (Standard Desktop 2-Column: Map Left -> Card Right)
    const mapMinY = mapContainerRect.top - experienceRect.top + 24;
    const mapMaxY = mapContainerRect.bottom - experienceRect.top - 24;

    const clampedY = Math.max(mapMinY, Math.min(mapMaxY, provincePt.y));
    return {
      anchor: {
        x: mapContainerRect.right - experienceRect.left,
        y: clampedY,
      },
      direction: "RIGHT",
    };
  } else if (dy >= 0) {
    // DIRECTION: BOTTOM (Stacked Mobile / Tablet: Map Top -> Card Bottom)
    const mapMinX = mapContainerRect.left - experienceRect.left + 24;
    const mapMaxX = mapContainerRect.right - experienceRect.left - 24;

    const clampedX = Math.max(mapMinX, Math.min(mapMaxX, provincePt.x));
    return {
      anchor: {
        x: clampedX,
        y: mapContainerRect.bottom - experienceRect.top,
      },
      direction: "BOTTOM",
    };
  } else if (dx < 0) {
    // DIRECTION: LEFT (If Story Card is positioned to the left)
    const mapMinY = mapContainerRect.top - experienceRect.top + 24;
    const mapMaxY = mapContainerRect.bottom - experienceRect.top - 24;

    const clampedY = Math.max(mapMinY, Math.min(mapMaxY, provincePt.y));
    return {
      anchor: {
        x: mapContainerRect.left - experienceRect.left,
        y: clampedY,
      },
      direction: "LEFT",
    };
  } else {
    // DIRECTION: TOP (If Story Card is positioned above)
    const mapMinX = mapContainerRect.left - experienceRect.left + 24;
    const mapMaxX = mapContainerRect.right - experienceRect.left - 24;

    const clampedX = Math.max(mapMinX, Math.min(mapMaxX, provincePt.x));
    return {
      anchor: {
        x: clampedX,
        y: mapContainerRect.top - experienceRect.top,
      },
      direction: "TOP",
    };
  }
}
