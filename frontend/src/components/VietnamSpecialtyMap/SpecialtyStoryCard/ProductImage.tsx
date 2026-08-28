import React, { useState } from "react";
import styles from "../styles.module.css";

interface ProductImageProps {
  src?: string;
  alt: string;
  category?: string;
  provinceName: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  category,
  provinceName,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={styles.productImageContainer}>
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className={`${styles.productImage} ${loaded ? styles.imageLoaded : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : null}

      {/* Editorial artistic badge if loading or fallback */}
      {(!src || error || !loaded) && (
        <div className={styles.productImageFallback}>
          <div className={styles.fallbackPattern}>
            <svg
              className={styles.fallbackEmblem}
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <circle cx="32" cy="32" r="28" strokeDasharray="3 3" />
              <path d="M32 14 L36 26 L48 26 L38 34 L42 46 L32 38 L22 46 L26 34 L16 26 L28 26 Z" fill="currentColor" fillOpacity="0.1" />
              <circle cx="32" cy="32" r="6" fill="currentColor" fillOpacity="0.2" />
            </svg>
            <span className={styles.fallbackCategory}>{category || "ĐẶC SẢN NGUYÊN BẢN"}</span>
            <span className={styles.fallbackProvince}>{provinceName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
