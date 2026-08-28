import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProvinceSpecialty, ProvinceInfo } from "../types";
import { ProductImage } from "./ProductImage";
import { ProductNavigator } from "./ProductNavigator";
import { cardAnimation, productContentAnimation } from "../animations";
import styles from "../styles.module.css";

interface SpecialtyStoryCardProps {
  specialty?: ProvinceSpecialty | null;
  provinceInfo?: ProvinceInfo | null;
  productIndex: number;
  isEmpty?: boolean;
  isLoading?: boolean;
  onPrevProduct: () => void;
  onNextProduct: () => void;
  onClose?: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

export const SpecialtyStoryCard: React.FC<SpecialtyStoryCardProps> = ({
  specialty,
  provinceInfo,
  productIndex,
  isEmpty = false,
  isLoading = false,
  onPrevProduct,
  onNextProduct,
  onClose,
  cardRef,
}) => {
  const provinceLabel = specialty?.provinceLabel || provinceInfo?.name || "Tỉnh / Thành";
  const regionName = specialty?.region || provinceInfo?.region || "Việt Nam";
  const hasProducts = !isEmpty && specialty && specialty.products && specialty.products.length > 0;
  const currentProduct = hasProducts ? specialty.products[productIndex] || specialty.products[0] : null;

  return (
    <motion.div
      ref={cardRef}
      className={styles.storyCard}
      data-scrollable-panel="true"
      variants={cardAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      {/* Visual Line Entrance Port (chỉ kích hoạt khi có sản phẩm để đón connection line) */}
      {hasProducts && (
        <div
          data-card-anchor="true"
          className={styles.cardAnchorPort}
          aria-hidden="true"
        />
      )}

      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderTitles}>
          <span className={styles.cardProvinceName}>{provinceLabel}</span>
          <span className={styles.cardRegionName}>{regionName.toUpperCase()}</span>
        </div>

        {onClose && (
          <button
            type="button"
            className={styles.cardCloseBtn}
            onClick={onClose}
            aria-label="Đóng thẻ thông tin"
            title="Đóng"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Loading Skeleton Mode */}
      {isLoading ? (
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonTag} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonText} />
        </div>
      ) : hasProducts && currentProduct ? (
        /* Has Products State */
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${specialty.province}-${productIndex}`}
              variants={productContentAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className={styles.cardBody}
            >
              {/* Product Image */}
              <ProductImage
                src={currentProduct.image}
                alt={currentProduct.imageAlt || currentProduct.name}
                category={currentProduct.category}
                provinceName={provinceLabel}
              />

              {/* Category Tag */}
              <div className={styles.cardCategory}>
                {currentProduct.category || specialty.tag || "ĐẶC SẢN NGUYÊN BẢN"}
              </div>

              {/* Product Title */}
              <h3 className={styles.cardProductTitle}>{currentProduct.name}</h3>

              {/* Province Tagline / Short Story (if present) */}
              {specialty.shortDescription && (
                <div style={{ fontSize: "11.5px", color: "#16a34a", fontStyle: "italic", marginBottom: "8px", fontWeight: 500 }}>
                  "{specialty.shortDescription}"
                </div>
              )}

              {/* Story Description */}
              <p className={styles.cardStoryDescription}>{currentProduct.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Card Footer */}
          <div className={styles.cardFooter}>
            <a
              href={currentProduct.href || "/san-pham"}
              className={styles.cardCta}
              onClick={(e) => {
                if (!currentProduct.href || currentProduct.href === "#") {
                  e.preventDefault();
                }
              }}
            >
              <span>KHÁM PHÁ SẢN PHẨM</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </a>

            {specialty.products.length > 1 && (
              <ProductNavigator
                currentIndex={productIndex}
                total={specialty.products.length}
                onPrev={onPrevProduct}
                onNext={onNextProduct}
              />
            )}
          </div>
        </>
      ) : (
        /* Empty State (Click province without product) */
        <motion.div
          key={`empty-${specialty?.province || 'unknown'}`}
          variants={productContentAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.cardBody}
        >
          <div className={styles.emptyIllustrationBox}>
            <div className={styles.emptyEmblemCircle}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className={styles.emptyBadgeText}>ĐANG PHÁT TRIỂN</span>
          </div>

          <div className={styles.cardCategory}>
            VĂN HÓA ẨM THỰC ĐỊA PHƯƠNG
          </div>

          <h3 className={styles.cardProductTitle}>
            {provinceLabel.toUpperCase()}
          </h3>

          {/* Province Story from Database or Fallback */}
          <p className={styles.cardStoryDescription}>
            {specialty?.description || specialty?.shortDescription || (
              <>
                HAQ FOOD đang mở rộng hệ sinh thái đặc sản tại <strong>{provinceLabel}</strong>. Chúng tôi liên tục tìm kiếm và phát triển các sản phẩm nông sản, ẩm thực truyền thống giữ trọn hương vị nguyên bản và an toàn vệ sinh thực phẩm.
              </>
            )}
          </p>

          <div className={styles.cardFooter}>
            <a href="/san-pham" className={styles.cardCta}>
              <span>XEM TẤT CẢ SẢN PHẨM</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
