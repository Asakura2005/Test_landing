import React from "react";
import { motion } from "framer-motion";
import { Point } from "../types";
import { lineDrawAnimation } from "../animations";
import styles from "../styles.module.css";

interface EdgeConnectionProps {
  pathD: string;
  edgeStart: Point;
  cardEnd: Point;
  opacity: number;
  showDestinationMarker?: boolean;
}

export const EdgeConnection: React.FC<EdgeConnectionProps> = ({
  pathD,
  edgeStart,
  cardEnd,
  opacity,
  showDestinationMarker = true,
}) => {
  return (
    <g className="edge-connection-mode" style={{ opacity }}>
      {/* Overview Container-Edge Connection Path */}
      <path
        d={pathD}
        className={styles.connectionPathEdge}
      />

      {/* Origin Marker Dot at Map Container Boundary */}
      <circle
        cx={edgeStart.x}
        cy={edgeStart.y}
        r={2.6}
        className={styles.lineEdgeMarker}
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
