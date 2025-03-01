import React from "react";
import styles from "./statuspill.module.css";

function StatusPill({ status, color, fontColor }) {
  return (
    <div
      className={styles.statusPill}
      style={{
        backgroundColor: color,
        color: fontColor,
      }}
    >
      {status}
    </div>
  );
}

export default StatusPill;
