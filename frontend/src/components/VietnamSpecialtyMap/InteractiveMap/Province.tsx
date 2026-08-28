import React from "react";
import styles from "../styles.module.css";

interface ProvinceProps {
  id: string;
  name: string;
  d: string;
  hasProducts: boolean;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (e: React.MouseEvent<SVGPathElement>, id: string) => void;
  onLeave: () => void;
  onClick: (id: string) => void;
}

export const Province: React.FC<ProvinceProps> = React.memo(
  ({
    id,
    name,
    d,
    hasProducts,
    isActive,
    isDimmed,
    onHover,
    onLeave,
    onClick,
  }) => {
    const handleKeyDown = (e: React.KeyboardEvent<SVGPathElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(id);
      }
    };

    const classNames = [
      styles.provincePath,
      hasProducts ? styles.hasProducts : "",
      isActive ? styles.isActive : "",
      isDimmed ? styles.isDimmed : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <path
        id={`province-${id}`}
        d={d}
        className={classNames}
        role="button"
        tabIndex={0}
        aria-label={`Khám phá đặc sản ${name}${hasProducts ? " (có sản phẩm)" : ""}`}
        aria-pressed={isActive}
        onMouseEnter={(e) => onHover(e, id)}
        onMouseLeave={onLeave}
        onClick={() => onClick(id)}
        onKeyDown={handleKeyDown}
      />
    );
  }
);


