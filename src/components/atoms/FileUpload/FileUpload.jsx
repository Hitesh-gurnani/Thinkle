import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import styles from "./fileuploadstyles.module.css";

export default function FileUpload({
  label,
  onChange,
  accept = "",
  placeholder = "Choose a file",
  className = "",
  style = {},
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const uploadRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (onChange) {
        onChange(file);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleUploadClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadRef.current && !uploadRef.current.contains(event.target)) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayText = selectedFile ? selectedFile.name : placeholder;

  return (
    <div
      className={`${styles.fileUploadContainer}`}
      style={style}
      ref={uploadRef}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={`${styles.fileUploadTrigger} ${className}`}
        onClick={handleUploadClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
      >
        <span
          className={selectedFile ? styles.selectedText : styles.placeholder}
        >
          {displayText}
        </span>
        <Upload className={styles.uploadIcon} size={18} />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className={styles.hiddenInput}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
