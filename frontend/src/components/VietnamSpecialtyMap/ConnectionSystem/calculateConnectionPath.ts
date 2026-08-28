import { Point, ConnectionPathResult } from "../types";

export interface CalculatePathOptions {
  start: Point;
  end: Point;
  isStacked?: boolean;
}

/**
 * Calculates direct Bézier curve from province anchor to card entrance point.
 */
export function calculateProvincePath({
  start,
  end,
  isStacked = false,
}: CalculatePathOptions): string {
  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  if (isStacked) {
    // Flow vertically from province down to card top
    const dy = endY - startY;
    const dx = endX - startX;

    const cp1X = startX + dx * 0.15;
    const cp1Y = startY + dy * 0.45;
    const cp2X = endX - dx * 0.1;
    const cp2Y = startY + dy * 0.85;

    return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(
      1
    )} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(
      1
    )}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  } else {
    // Flow horizontally towards storytelling card
    const dx = endX - startX;
    const dy = endY - startY;

    const cp1X = startX + Math.max(dx * 0.38, 30);
    const cp1Y = startY + dy * 0.08;
    const cp2X = startX + dx * 0.72;
    const cp2Y = endY - dy * 0.05;

    return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(
      1
    )} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(
      1
    )}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  }
}

/**
 * Calculates progressive Bézier curve according to transition progress [0, 1].
 * When progress = 1: Full curve from province to card.
 * When progress = 0: Retracted completely back to province anchor.
 */
export function calculateRetractedPath(
  start: Point,
  end: Point,
  progress: number,
  isStacked = false
): string {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0.001) {
    return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} L ${start.x.toFixed(1)} ${start.y.toFixed(1)}`;
  }

  // De Casteljau subdivision for cubic Bézier curve
  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  let cp1X: number, cp1Y: number, cp2X: number, cp2Y: number;

  if (isStacked) {
    const dy = endY - startY;
    const dx = endX - startX;
    cp1X = startX + dx * 0.15;
    cp1Y = startY + dy * 0.45;
    cp2X = endX - dx * 0.1;
    cp2Y = startY + dy * 0.85;
  } else {
    const dx = endX - startX;
    const dy = endY - startY;
    cp1X = startX + Math.max(dx * 0.38, 30);
    cp1Y = startY + dy * 0.08;
    cp2X = startX + dx * 0.72;
    cp2Y = endY - dy * 0.05;
  }

  // Intermediate control points at parameter t = p
  const x01 = startX + (cp1X - startX) * p;
  const y01 = startY + (cp1Y - startY) * p;
  const x12 = cp1X + (cp2X - cp1X) * p;
  const y12 = cp1Y + (cp2Y - cp1Y) * p;
  const x23 = cp2X + (endX - cp2X) * p;
  const y23 = cp2Y + (endY - cp2Y) * p;

  const x012 = x01 + (x12 - x01) * p;
  const y012 = y01 + (y12 - y01) * p;
  const x123 = x12 + (x23 - x12) * p;
  const y123 = y12 + (y23 - y12) * p;

  const finalX = x012 + (x123 - x012) * p;
  const finalY = y012 + (y123 - y012) * p;

  return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${x01.toFixed(1)} ${y01.toFixed(1)}, ${x012.toFixed(1)} ${y012.toFixed(1)}, ${finalX.toFixed(1)} ${finalY.toFixed(1)}`;
}

/**
 * Calculates overview edge Bézier curve from map container boundary to card entrance point.
 */
export function calculateEdgePath({
  start,
  end,
  isStacked = false,
}: CalculatePathOptions): string {
  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  if (isStacked) {
    const dy = endY - startY;
    const dx = endX - startX;

    const cp1X = startX + dx * 0.2;
    const cp1Y = startY + dy * 0.5;
    const cp2X = endX - dx * 0.1;
    const cp2Y = startY + dy * 0.5;

    return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(
      1
    )} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(
      1
    )}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  } else {
    const dx = endX - startX;
    const dy = endY - startY;

    const cp1X = startX + dx * 0.45;
    const cp1Y = startY + dy * 0.05;
    const cp2X = startX + dx * 0.65;
    const cp2Y = endY - dy * 0.05;

    return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(
      1
    )} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(
      1
    )}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  }
}

/**
 * Calculates progressive overview edge Bézier curve according to transition progress [0, 1].
 */
export function calculateRetractedEdgePath(
  start: Point,
  end: Point,
  progress: number,
  isStacked = false
): string {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0.001) {
    return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} L ${start.x.toFixed(1)} ${start.y.toFixed(1)}`;
  }

  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  let cp1X: number, cp1Y: number, cp2X: number, cp2Y: number;

  if (isStacked) {
    const dy = endY - startY;
    const dx = endX - startX;
    cp1X = startX + dx * 0.2;
    cp1Y = startY + dy * 0.5;
    cp2X = endX - dx * 0.1;
    cp2Y = startY + dy * 0.5;
  } else {
    const dx = endX - startX;
    const dy = endY - startY;
    cp1X = startX + dx * 0.45;
    cp1Y = startY + dy * 0.05;
    cp2X = startX + dx * 0.65;
    cp2Y = endY - dy * 0.05;
  }

  // De Casteljau subdivision at parameter t = p
  const x01 = startX + (cp1X - startX) * p;
  const y01 = startY + (cp1Y - startY) * p;
  const x12 = cp1X + (cp2X - cp1X) * p;
  const y12 = cp1Y + (cp2Y - cp1Y) * p;
  const x23 = cp2X + (endX - cp2X) * p;
  const y23 = cp2Y + (endY - cp2Y) * p;

  const x012 = x01 + (x12 - x01) * p;
  const y012 = y01 + (y12 - y01) * p;
  const x123 = x12 + (x23 - x12) * p;
  const y123 = y12 + (y23 - y12) * p;

  const finalX = x012 + (x123 - x012) * p;
  const finalY = y012 + (y123 - y012) * p;

  return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${x01.toFixed(1)} ${y01.toFixed(1)}, ${x012.toFixed(1)} ${y012.toFixed(1)}, ${finalX.toFixed(1)} ${finalY.toFixed(1)}`;
}
