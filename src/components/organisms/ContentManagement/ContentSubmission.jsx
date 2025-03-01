import React from "react";
import styles from "./contentmanagement.module.css";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import Table from "../../molecules/Table/Table";

function ContentSubmission() {
  const options = [
    { value: "thisweek", label: "This Week" },
    { value: "lastweek", label: "Last Week" },
    { value: "lastyear", label: "Last Year" },
    { value: "all", label: "All" },
  ];

  return (
    <div className={styles.contentbox}>
      <div className={styles.contentboxHeader}>
        <div className={styles.contentboxHeaderTitle}>Content Submission</div>
        <Dropdown
          options={options}
          className={styles.dropdown}
          placeholder="All"
          style={{ width: "121px", maxHeight: "400px" }}
        />
      </div>
      <Table
        columns={[
          "Title",
          "Type",
          "Submitted",
          "Feedback",
          "Status",
          "Live Date",
        ]}
        data={[
          {
            title: "Advanced Excel Tutorial",
            type: "Video",
            submitted: "05-04-2025",
            feedback: "Available",
            status: "Live",
            liveDate: "05-04-2025",
          },
          {
            title: "Resume Template Pack",
            type: "PDF",
            submitted: "05-04-2025",
            feedback: "Due",
            status: "In-Review",
            liveDate: "05-04-2025",
          },
        ]}
      />
    </div>
  );
}

export default ContentSubmission;
