import React from "react";
import { motion } from "framer-motion";
import styles from "../styles.module.css";

interface ProvinceMarkerProps {
  id: string;
  cx: number;
  cy: number;
  isActive: boolean;
  hasSpecialties: boolean;
  onSelect?: (id: string) => void;
}

export const ProvinceMarker: React.FC<ProvinceMarkerProps> = React.memo(
  ({ id, cx, cy, isActive, hasSpecialties, onSelect }) => {
    if (!hasSpecialties && !isActive) return null;

    return (
      <g
        className={styles.provinceMarkerGroup}
        transform={`translate(${cx}, ${cy})`}
        onClick={(e) => {
          if (onSelect) {
            e.stopPropagation();
            onSelect(id);
          }
        }}
      >
        {/* Invisible 44x44 touch hit area for mobile tap precision */}
        <rect
          x={-22}
          y={-22}
          width={44}
          height={44}
          fill="transparent"
          style={{ cursor: "pointer", pointerEvents: "all" }}
        />
        {isActive ? (
          <>
            {/* Pulsing subtle radar wave */}
            <motion.circle
              r={12}
              className={styles.markerPulseWave}
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{
                scale: [0.4, 1.6, 2.0],
                opacity: [0.8, 0.3, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Accent outer ring */}
            <circle r={5.5} className={styles.markerOuterRing} />

            {/* Inner solid anchor dot */}
            <circle r={2.5} className={styles.markerInnerCore} />
          </>
        ) : (
          /* Subtle resting dot marker */
          <circle
            r={2.2}
            className={styles.markerRestingDot}
          />
        )}
      </g>
    );
  }
);
