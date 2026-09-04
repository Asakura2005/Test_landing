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
import { useLanguage } from "../../context/LanguageContext";
import { getLocalizedProvince, getLocalizedProduct } from "../../utils/i18nData";

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
  const { language } = useLanguage();
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

  // Transform and group products by Canonical Province Code with localization
  const { specialties, hasSpecialtiesMap } = useMemo(() => {
    const specialtyMap: SpecialtyData = {};
    const hasMap: Record<string, boolean> = {};

    // 1. Initialize all 34 canonical provinces with metadata
    for (const code of CANONICAL_PROVINCE_CODES) {
      const dbProv = rawProvinces.find((p) => p.code === code);
      const fallbackMeta = CANONICAL_PROVINCE_MAP[code] || provinceCentroids[code];

      const rawProvObj = {
        code,
        name: dbProv?.name || fallbackMeta?.name || code,
        region: dbProv?.region || fallbackMeta?.region || "Miền Nam",
        short_description: dbProv?.short_description,
        description: dbProv?.description,
        image: dbProv?.image,
      };
      const locProv = getLocalizedProvince(rawProvObj, language);

      const provinceName = locProv.name;
      const regionName = (locProv.region || "Miền Nam") as RegionName;

      specialtyMap[code] = {
        province: code,
        provinceLabel: provinceName,
        region: regionName,
        tag: language === 'en' ? `Specialty of ${provinceName}` : language === 'ko' ? `${provinceName} 특산품` : `Đặc sản ${provinceName}`,
        shortDescription: locProv.short_description || undefined,
        description: locProv.description || undefined,
        image: locProv.image || undefined,
        products: [],
      };
      hasMap[code] = false;
    }

    // 2. Also incorporate any additional active provinces from DB not in static list
    for (const dbProv of rawProvinces) {
      const code = dbProv.code;
      if (!specialtyMap[code]) {
        const locProv = getLocalizedProvince(dbProv, language);
        const provinceName = locProv.name;
        const regionName = (locProv.region || "Miền Nam") as RegionName;

        specialtyMap[code] = {
          province: code,
          provinceLabel: provinceName,
          region: regionName,
          tag: language === 'en' ? `Specialty of ${provinceName}` : language === 'ko' ? `${provinceName} 특산품` : `Đặc sản ${provinceName}`,
          shortDescription: locProv.short_description || undefined,
          description: locProv.description || undefined,
          image: locProv.image || undefined,
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
        const locItem = getLocalizedProduct(item, language);

        // Resolve product image from Supabase
        let imgUrl = locItem.image_url || "";
        if (!imgUrl && locItem.images && Array.isArray(locItem.images) && locItem.images.length > 0) {
          imgUrl = locItem.images[0];
        } else if (!imgUrl && locItem.variants && Array.isArray(locItem.variants) && locItem.variants.length > 0 && locItem.variants[0].img) {
          imgUrl = locItem.variants[0].img;
        }

        const fallbackDesc = language === 'en'
          ? "Premium specialty products carefully selected by HAQ FOOD from fresh local ingredients."
          : language === 'ko'
          ? "신선한 현지 원료로 HAQ FOOD가 엄선한 프리미엄 특산품입니다."
          : "Sản phẩm đặc sản cao cấp được HAQ FOOD tuyển chọn kỹ lưỡng từ nguồn nguyên liệu tươi ngon tại địa phương.";

        const productModel: Product = {
          name: locItem.name || "HAQ FOOD",
          category: locItem.categories?.name || locItem.category_name || locItem.category || (language === 'en' ? 'AUTHENTIC SPECIALTY' : language === 'ko' ? '정통 특산품' : 'ĐẶC SẢN NGUYÊN BẢN'),
          description:
            locItem.description ||
            locItem.short_description ||
            fallbackDesc,
          image: imgUrl,
          imageAlt: locItem.name || currentProv.provinceLabel,
          region: currentProv.region,
          productId: locItem.id || locItem.slug,
          href: `/san-pham/${locItem.slug || locItem.id}`,
        };

        // If pinned, unshift to first position; else push
        if (locItem.is_pinned) {
          currentProv.products.unshift(productModel);
        } else {
          currentProv.products.push(productModel);
        }
        hasMap[provinceCode] = true;
      }
    }

    return { specialties: specialtyMap, hasSpecialtiesMap: hasMap };
  }, [rawProducts, rawProvinces, language]);

  return {
    specialties,
    hasSpecialtiesMap,
    isLoading,
    error,
    refetch: fetchData,
  };
}
