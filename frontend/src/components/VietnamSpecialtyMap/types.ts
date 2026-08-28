export type RegionName = "Miền Bắc" | "Miền Trung" | "Miền Nam";

export interface Product {
  name: string;
  category?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  region?: string;
  productId?: string;
  href?: string;
}

export interface ProvinceSpecialty {
  province: string; // ID e.g. "tayninh"
  provinceLabel: string; // e.g. "Tây Ninh"
  region: RegionName;
  tag?: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  products: Product[];
}

export type SpecialtyData = Record<string, ProvinceSpecialty>;

export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  height: number;
}

export interface ProvinceInfo {
  id: string;
  name: string;
  region?: RegionName;
  anchor: Point; // Curated SVG coordinate center anchor
  bbox: BoundingBox;
  centerX: number;
  centerY: number;
  labelOffset?: Point;
  labelAnchor?: "start" | "middle" | "end";
}

/**
 * CORE ARCHITECTURE: Single source of truth for all camera & coordinate transformations
 */
export interface MapTransform {
  scale: number;
  translateX: number;
  translateY: number;
  x: number; // Backward-compatible alias
  y: number; // Backward-compatible alias
}

export interface ConnectionPathResult {
  pathD: string;
  start: Point;
  end: Point;
}

export interface AdaptiveLineData {
  provincePathD: string;
  edgePathD: string;
  provinceStart: Point;
  edgeStart: Point;
  cardEnd: Point;
  provinceOpacity: number;
  edgeOpacity: number;
}
