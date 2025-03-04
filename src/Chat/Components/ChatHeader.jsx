import React from "react";
import styles from "../CSS/chatmain.module.css";
import Button from "../../components/atoms/Button/Button";

function ChatHeader({ title, onBack, showBackButton, profileImage }) {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatHeaderProfile}>
        {showBackButton && (
          <button className={styles.backButton} onClick={onBack}>
            ←
          </button>
        )}
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
        <h3
          className={styles.profileName}
          style={{
            marginLeft: "12px",
          }}
        >
          {title}
        </h3>
      </div>

      <Button className={styles.bookSessionButton}>Book Session</Button>
    </div>
  );
}

export default ChatHeader;
