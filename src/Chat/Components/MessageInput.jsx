import React, { useState } from "react";
import styles from "../CSS/chatmain.module.css";
import Button from "../../components/atoms/Button/Button";
import { FaRegImage } from "react-icons/fa6";
import { CiFaceSmile } from "react-icons/ci";

function MessageInput({ selectedChatId }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      const messagePayload = {
        messageContent: message,
        type: "Text",
      };
      if (window.addChatMessage && selectedChatId) {
        window.addChatMessage(selectedChatId, message);
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
