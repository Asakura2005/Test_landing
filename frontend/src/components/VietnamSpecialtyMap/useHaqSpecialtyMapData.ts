import { useState, useEffect, useCallback, useMemo } from "react";
import { getProducts, getProvinces } from "../../services/supabase";
import {
  resolveCanonicalProvinceCode,
  CANONICAL_PROVINCE_MAP,
  CANONICAL_PROVINCE_CODES,
  CanonicalProvinceCode,
} from "./provinceCodes";
import { SpecialtyData, ProvinceSpecialty, Product, RegionName } from "./types";
import { provinceCentroids } from "./mapData";

export interface HaqSpecialtyMapDataResult {
  specialties: SpecialtyData;
  hasSpecialtiesMap: Record<string, boolean>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useHaqSpecialtyMapData(
  initialProducts?: any[]
): HaqSpecialtyMapDataResult {
  const [rawProducts, setRawProducts] = useState<any[]>(initialProducts || []);
  const [rawProvinces, setRawProvinces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, provincesData] = await Promise.all([
        initialProducts && initialProducts.length > 0 ? Promise.resolve(initialProducts) : getProducts(),
        getProvinces(true).catch(() => [])
      ]);

      if (productsData && Array.isArray(productsData)) {
        setRawProducts(productsData);
      }
      if (provincesData && Array.isArray(provincesData)) {
        setRawProvinces(provincesData);
      }
    } catch (err: any) {
      console.warn("[useHaqSpecialtyMapData] Error fetching map data from Supabase:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [initialProducts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Transform and group products by Canonical Province Code
  const { specialties, hasSpecialtiesMap } = useMemo(() => {
    const specialtyMap: SpecialtyData = {};
    const hasMap: Record<string, boolean> = {};

    // 1. Initialize all 34 canonical provinces with metadata
    for (const code of CANONICAL_PROVINCE_CODES) {
      const dbProv = rawProvinces.find((p) => p.code === code);
      const fallbackMeta = CANONICAL_PROVINCE_MAP[code] || provinceCentroids[code];

      const provinceName = dbProv?.name || fallbackMeta?.name || code;
      const regionName = (dbProv?.region || fallbackMeta?.region || "Miền Nam") as RegionName;

      specialtyMap[code] = {
        province: code,
        provinceLabel: provinceName,
        region: regionName,
        tag: `Đặc sản ${provinceName}`,
        shortDescription: dbProv?.short_description || undefined,
        description: dbProv?.description || undefined,
        image: dbProv?.image || undefined,
        products: [],
      };
      hasMap[code] = false;
    }

    // 2. Also incorporate any additional active provinces from DB not in static list
    for (const dbProv of rawProvinces) {
      const code = dbProv.code;
      if (!specialtyMap[code]) {
        specialtyMap[code] = {
          province: code,
          provinceLabel: dbProv.name,
          region: (dbProv.region || "Miền Nam") as RegionName,
          tag: `Đặc sản ${dbProv.name}`,
          shortDescription: dbProv.short_description || undefined,
          description: dbProv.description || undefined,
          image: dbProv.image || undefined,
          products: [],
        };
        hasMap[code] = false;
      }
    }

    // 3. Distribute products to their respective provinces
    if (rawProducts && rawProducts.length > 0) {
      for (const item of rawProducts) {
        // Resolve canonical code directly from Supabase province_id
        const provinceCode = resolveCanonicalProvinceCode(item, rawProvinces);
        if (!provinceCode || !specialtyMap[provinceCode]) {
          // Not assigned or not a valid map province
          continue;
        }

        const currentProv = specialtyMap[provinceCode];

        // Resolve product image from Supabase
        let imgUrl = item.image_url || "";
        if (!imgUrl && item.images && Array.isArray(item.images) && item.images.length > 0) {
          imgUrl = item.images[0];
        } else if (!imgUrl && item.variants && Array.isArray(item.variants) && item.variants.length > 0 && item.variants[0].img) {
          imgUrl = item.variants[0].img;
        }

        const productModel: Product = {
          name: item.name || "Sản phẩm HAQ FOOD",
          category: item.categories?.name || item.category_name || item.category || "ĐẶC SẢN NGUYÊN BẢN",
          description:
            item.description ||
            item.short_description ||
            "Sản phẩm đặc sản cao cấp được HAQ FOOD tuyển chọn kỹ lưỡng từ nguồn nguyên liệu tươi ngon tại địa phương.",
          image: imgUrl,
          imageAlt: item.name || currentProv.provinceLabel,
          region: currentProv.region,
          productId: item.id || item.slug,
          href: `/san-pham/${item.slug || item.id}`,
        };

        // If pinned, unshift to first position; else push
        if (item.is_pinned) {
          currentProv.products.unshift(productModel);
        } else {
          currentProv.products.push(productModel);
        }
        hasMap[provinceCode] = true;
      }
    }

    return { specialties: specialtyMap, hasSpecialtiesMap: hasMap };
  }, [rawProducts, rawProvinces]);

  return {
    specialties,
    hasSpecialtiesMap,
    isLoading,
    error,
    refetch: fetchData,
  };
}
