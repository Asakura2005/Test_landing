import React from "react";
import styles from "../styles.module.css";
import { Point } from "../types";

interface ProvinceLabelProps {
  id: string;
  name: string;
  cx: number;
  cy: number;
  isActive: boolean;
  isHovered: boolean;
  hasSpecialties: boolean;
  offset?: Point;
  anchorAlign?: "start" | "middle" | "end";
  onSelect: (id: string) => void;
  onHover?: (e: React.MouseEvent<SVGElement>, id: string) => void;
  onLeave?: () => void;
}

export const ProvinceLabel: React.FC<ProvinceLabelProps> = React.memo(
  ({
    id,
    name,
    cx,
    cy,
    isActive,
    isHovered,
    hasSpecialties,
    offset,
    anchorAlign = "middle",
    onSelect,
    onHover,
    onLeave,
  }) => {
    if (!hasSpecialties) return null;

    const labelX = cx + (offset?.x ?? 0);
    const labelY = cy + (offset?.y ?? -10);

    const classNames = [
      styles.provinceLabel,
      isActive ? styles.labelActive : "",
      isHovered ? styles.labelHovered : "",
    ]
      .filter(Boolean)
      .join(" ");

    let hitBoxX = -40;
    if (anchorAlign === "start") {
      hitBoxX = -4;
    } else if (anchorAlign === "end") {
      hitBoxX = -76;
    }

    return (
      <g
        className={styles.provinceLabelGroup}
        transform={`translate(${labelX}, ${labelY})`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onMouseEnter={(e) => onHover?.(e, id)}
        onMouseLeave={onLeave}
        style={{ outline: "none" }}
        role="button"
        aria-label={`Khám phá đặc sản ${name}`}
      >
        <rect
          x={hitBoxX}
          y={-12}
          width={80}
          height={24}
          fill="transparent"
          style={{ cursor: "pointer", pointerEvents: "all", outline: "none" }}
        />

        <text
          x={0}
          y={0}
          textAnchor={anchorAlign}
          dominantBaseline="central"
          className={classNames}
        >
          {name}
        </text>
      </g>
    );
  }
);
