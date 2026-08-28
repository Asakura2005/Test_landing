import React from "react";
import styles from "../styles.module.css";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  scale: number;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  scale,
}) => {
  return (
    <div className={styles.mapControls} aria-label="Điều khiển bản đồ">
      <button
        type="button"
        className={styles.controlBtn}
        onClick={onZoomIn}
        aria-label="Phóng to"
        title="Phóng to"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <button
        type="button"
        className={styles.controlBtn}
        onClick={onZoomOut}
        aria-label="Thu nhỏ"
        title="Thu nhỏ"
        disabled={scale <= 1.05}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <div className={styles.controlDivider} />

      <button
        type="button"
        className={styles.controlBtn}
        onClick={onReset}
        aria-label="Đặt lại góc nhìn"
        title="Đặt lại bản đồ (Reset)"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
};
