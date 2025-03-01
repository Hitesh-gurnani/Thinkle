import React from "react";
import styles from "./tablestyles.module.css";
import StatusPill from "../../atoms/StatusPill/StatusPill";

function Table({ columns, data }) {
  return (
    <div className={styles.table}>
      <div className={styles.desktopView}>
        <div className={styles.tableHeader}>
          {columns.map((column, index) => (
            <div key={index} className={styles.headerCell}>
              {column}
            </div>
          ))}
        </div>
        <div className={styles.tableBody}>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.tableRow}>
              {Object.values(row).map((value, cellIndex) => {
                if (cellIndex === 4) {
                  return (
                    <div key={cellIndex} className={styles.tableCell}>
                      <StatusPill
                        status={value}
                        color={
                          value === "Live"
                            ? "rgba(52, 186, 59, 0.2)"
                            : value === "In-Review"
                            ? "rgba(54, 144, 255, 0.2)"
                            : value === "Due"
                            ? "rgba(255, 0, 0, 0.2)"
                            : "rgba(52, 186, 59, 0.2)"
                        }
                        fontColor={
                          value === "Live"
                            ? "rgba(52, 186, 59, 1)"
                            : value === "In-Review"
                            ? "rgba(54, 144, 255, 1)"
                            : value === "Due"
                            ? "#FF0000"
                            : "#34BA3B"
                        }
                      />
                    </div>
                  );
                }
                return (
                  <div key={cellIndex} className={styles.tableCell}>
                    {value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileView}>
        <div className={styles.tableBody}>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.mobileTableRow}>
              {Object.entries(row).map(([key, value], cellIndex) => {
                const columnName = columns[cellIndex];

                if (cellIndex === 4) {
                  return (
                    <div key={cellIndex} className={styles.mobileTableCell}>
                      <div className={styles.cellValue}>
                        <StatusPill
                          status={value}
                          color={
                            value === "Live"
                              ? "rgba(52, 186, 59, 0.2)"
                              : value === "In-Review"
                              ? "rgba(54, 144, 255, 0.2)"
                              : value === "Due"
                              ? "rgba(255, 0, 0, 0.2)"
                              : "rgba(52, 186, 59, 0.2)"
                          }
                          fontColor={
                            value === "Live"
                              ? "rgba(52, 186, 59, 1)"
                              : value === "In-Review"
                              ? "rgba(54, 144, 255, 1)"
                              : value === "Due"
                              ? "#FF0000"
                              : "#34BA3B"
                          }
                        />
                      </div>
                      <div className={styles.cellHeading}>{columnName}</div>
                    </div>
                  );
                }

                return (
                  <div key={cellIndex} className={styles.mobileTableCell}>
                    <div className={styles.cellValue}>{value}</div>
                    <div className={styles.cellHeading}>{columnName}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
