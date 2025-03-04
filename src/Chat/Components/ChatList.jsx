import React from "react";
import styles from "../CSS/chatmain.module.css";
import InputField from "../../components/atoms/InputField/InputField";
import ChatItem from "./ChatItem";

function ChatList({ chatList, onChatSelect, selectedChat, formatTime }) {
  return (
    <div className={styles.chatList}>
      <div className={styles.chatListHeader}>
        <div className={styles.allMessages}>All Message</div>
        <InputField
          label=""
          placeholder="Search"
          className={styles.inputField}
        />
      </div>
      {chatList.map((chat) => (
        <ChatItem
          key={chat._id}
          chat={chat}
          isSelected={selectedChat === chat._id}
          onSelect={() => onChatSelect(chat._id)}
          formatTime={formatTime}
        />
      ))}
    </div>
  );
}

export default ChatList;
