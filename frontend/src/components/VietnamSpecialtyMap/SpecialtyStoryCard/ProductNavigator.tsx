import React from "react";
import styles from "../styles.module.css";

interface ProductNavigatorProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export const ProductNavigator: React.FC<ProductNavigatorProps> = ({
  currentIndex,
  total,
  onPrev,
  onNext,
}) => {
  if (total <= 1) return null;

  const currentFormatted = String(currentIndex + 1).padStart(2, "0");
  const totalFormatted = String(total).padStart(2, "0");

  return (
    <div className={styles.productNavigator}>
      <span className={styles.navCounter}>
        {currentFormatted} <span className={styles.navCounterSlash}>/</span> {totalFormatted}
      </span>
      <div className={styles.navButtons}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={onPrev}
          aria-label="Sản phẩm đặc sản trước"
          title="Sản phẩm trước"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.navBtn}
          onClick={onNext}
          aria-label="Sản phẩm đặc sản tiếp theo"
          title="Sản phẩm tiếp theo"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
