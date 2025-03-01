import React from "react";
import styles from "./inputfield.module.css";

function InputField({
  placeholder = "Name",
  type = "text",
  value,
  onChange,
  name,
  label,
  ...props
}) {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={styles.input}
        {...props}
      />
    </div>
  );
}

export default InputField;
