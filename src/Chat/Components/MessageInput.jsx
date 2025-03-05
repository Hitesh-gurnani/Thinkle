import React, { useState } from "react";
import styles from "../CSS/chatmain.module.css";
import Button from "../../components/atoms/Button/Button";
import { FaRegImage } from "react-icons/fa6";
import { CiFaceSmile } from "react-icons/ci";

function MessageInput({ selectedChatId, onMessageSent }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChatId) {
      const messagePayload = {
        id: Date.now(),
        uuid: selectedChatId,
        ucid: 1,
        sender: "self",
        receiver: selectedChatId,
        content: message,
        messageContent: message,
        type: "Text",
        replyTo: null,
        timestamp: new Date(),
        isSession: false,
      };

      const chatKey = `chat_${selectedChatId}`;
      const existingMessages = JSON.parse(
        localStorage.getItem(chatKey) || "[]"
      );
      existingMessages.push(messagePayload);
      localStorage.setItem(chatKey, JSON.stringify(existingMessages));
      if (onMessageSent) {
        onMessageSent(messagePayload);
      }
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.messageInput}>
      <div className={styles.inputContainer}>
        <div className={styles.textareaWrapper}>
          <textarea
            className={styles.messageTextarea}
            placeholder="Enter a message"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <div className={styles.inputActions}>
            <div className={styles.actionButtons}>
              <FaRegImage size={20} />
              <CiFaceSmile size={20} />
            </div>
            <Button className={styles.sendButton} onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
