import React, { useState } from "react";
import styles from "./uploadstyle.module.css";
import InputField from "../../atoms/InputField/InputField";
import Button from "../../atoms/Button/Button";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import FileUpload from "../../atoms/FileUpload/FileUpload";

function UploadContent() {
  const options = [
    { value: "video", label: "Video" },
    { value: "template", label: "Template" },
    { value: "pdf", label: "PDF" },
  ];
  return (
    <div className={styles.uploadContent}>
      <div className={styles.uploadContentHeader}>
        <div className={styles.uploadContentHeaderTitle}>
          Upload New Content
        </div>
      </div>
      <div className={styles.uploadContentBody}>
        <InputField label="Title" placeholder="Content Title" />
        <InputField label="Description" placeholder="About the content" />
        <div className={styles.uploadContentBodyNested}>
          <div className={styles.uploadContentBodyNestedDropdown}>
            <Dropdown
              options={options}
              className={styles.dropdown}
              placeholder="Video"
              label={"Content Type"}
            />
          </div>
          <FileUpload label="Image" placeholder="Image" />
        </div>
        <div className={styles.uploadContentBodyVideo}>
          <FileUpload
            label="Image"
            placeholder="Upload Video, PDF, templates etc."
          />
        </div>
      </div>
      <Button className={styles.uploadContentButton}>Upload Content</Button>
    </div>
  );
}

export default UploadContent;
