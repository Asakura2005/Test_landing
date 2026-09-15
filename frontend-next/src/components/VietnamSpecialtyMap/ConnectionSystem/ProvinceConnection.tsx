import React from "react";
import { motion } from "framer-motion";
import { Point } from "../types";
import { lineDrawAnimation } from "../animations";
import styles from "../styles.module.css";

interface ProvinceConnectionProps {
  pathD: string;
  provinceStart: Point;
  cardEnd: Point;
  opacity: number;
  showDestinationMarker?: boolean;
}

export const ProvinceConnection: React.FC<ProvinceConnectionProps> = ({
  pathD,
  provinceStart,
  cardEnd,
  opacity,
  showDestinationMarker = true,
}) => {
  return (
    <g className="province-connection-mode" style={{ opacity }}>
      {/* Direct Curved Path from Province Anchor to Card */}
      <path
        d={pathD}
        className={styles.connectionPath}
      />

      {/* Subpixel-perfect Origin Marker Dot at Province Anchor */}
      <circle
        cx={provinceStart.x}
        cy={provinceStart.y}
        r={3.2}
        className={styles.lineOriginMarker}
      />

      {/* Destination Connection Point Marker at Card */}
      {showDestinationMarker && (
        <circle
          cx={cardEnd.x}
          cy={cardEnd.y}
          r={2.6}
          className={styles.lineDestinationMarker}
        />
      )}
    </g>
  );
};
