import React from "react";
// Make sure this path is correct - it should point to where your CSS file is located
import styles from "../../CSS/Booking.module.css";
import Button from "../../../components/atoms/Button/Button";

function Booking(props) {
  const { heading, subHeading, isOpen, onClose } = props;

  console.log("Booking component rendered, isOpen:", isOpen);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          {heading && <h2>{heading}</h2>}
          {subHeading && <p className={styles.subHeadingStyle}>{subHeading}</p>}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "10px",
          }}
        >
          {" "}
          <Button className={styles.cancelButton}>Cancel</Button>
          <Button className={styles.actionButton}>Yes , Send!</Button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
