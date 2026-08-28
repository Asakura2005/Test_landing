import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles.module.css";

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
                {productCount} đặc sản HAQ FOOD
              </span>
            ) : (
              <span className={styles.tooltipRegionText}>{region || "Việt Nam"}</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
