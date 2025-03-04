import React from "react";
import styles from "../CSS/chatmain.module.css";

function NoSelection() {
  return (
    <div className={styles.noSelection}>
      <p>Select a chat to start messaging</p>
    </div>
  );
}

export default NoSelection;
