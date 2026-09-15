import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles.module.css";
import { useLanguage } from "../../../context/LanguageContext";

interface ProvinceTooltipProps {
  name: string;
  region?: string;
  productCount: number;
  x: number;
  y: number;
  visible: boolean;
}

export const ProvinceTooltip: React.FC<ProvinceTooltipProps> = ({
  name,
  region,
  productCount,
  x,
  y,
  visible,
}) => {
  const { language } = useLanguage();

  const countText =
    language === 'en'
      ? `${productCount} HAQ FOOD specialt${productCount > 1 ? 'ies' : 'y'}`
      : language === 'ko'
      ? `${productCount}개 HAQ FOOD 특산품`
      : language === 'zh'
      ? `${productCount} 款 HAQ FOOD 特产`
      : `${productCount} đặc sản HAQ FOOD`;

  const defaultRegion =
    language === 'en' ? 'Vietnam' : language === 'ko' ? '베트남' : language === 'zh' ? '越南' : 'Việt Nam';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.tooltip}
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: -16 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div className={styles.tooltipProvince}>{name}</div>
          <div className={styles.tooltipMeta}>
            {productCount > 0 ? (
              <span className={styles.tooltipCountBadge}>
                {countText}
              </span>
            ) : (
              <span className={styles.tooltipRegionText}>{region || defaultRegion}</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
