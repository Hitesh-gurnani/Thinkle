import React from "react";
import styles from "../CSS/chatmain.module.css";

function ChatItem({ chat, isSelected, onSelect, formatTime }) {
  return (
    <div
      className={`${styles.chatItem} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <div className={styles.chatAvatar}>
        {chat.avatar ? (
          <img src={chat.avatar.url} alt={chat.fullname} />
        ) : (
          chat.fullname.charAt(0)
        )}
      </div>
      <div className={styles.chatInfo}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4>{chat.fullname}</h4>
          <span className={styles.chatTime}>
            {chat.lastMessage ? formatTime(chat.lastMessage.createdAt) : ""}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className={styles.chatMessage}>
            {chat.lastMessage
              ? chat.lastMessage.type === "Text"
                ? chat.lastMessage.messageContent
                : `${chat.lastMessage.type} message`
              : "No messages yet"}
          </span>
          {chat.unreadMessage > 0 && (
            <span className={styles.unreadBadge}>
              {chat.unreadMessage > 9 ? "9+" : chat.unreadMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
