import React from "react";
import styles from "./buttonstyles.module.css";

function Button({ children, onClick, className }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
