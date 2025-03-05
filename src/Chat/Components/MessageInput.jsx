import React, { useState, useRef } from "react";
import styles from "../CSS/chatmain.module.css";
import Button from "../../components/atoms/Button/Button";
import { FaRegImage } from "react-icons/fa6";
import { CiFaceSmile } from "react-icons/ci";
import { MdClose } from "react-icons/md";

function MessageInput({
  selectedChatId,
  onMessageSent,
  replyToMessage,
  onCancelReply,
}) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (
      (message.trim() || fileInputRef.current.files.length > 0) &&
      selectedChatId
    ) {
      if (message.trim()) {
        sendTextMessage(message);
      }

      if (fileInputRef.current.files.length > 0) {
        Array.from(fileInputRef.current.files).forEach((file) => {
          sendFileMessage(file);
        });
        fileInputRef.current.value = ""; // Clear the file input
      }

      // Clear reply after sending
      if (onCancelReply && replyToMessage) {
        onCancelReply();
      }
    }
  };

  const sendTextMessage = (text) => {
    const messagePayload = {
      id: Date.now(),
      uuid: selectedChatId,
      ucid: 1,
      sender: "self",
      receiver: selectedChatId,
      content: text,
      messageContent: text,
      type: "Text",
      replyTo: replyToMessage ? replyToMessage.id : null,
      timestamp: new Date(),
      isSession: false,
    };

    saveAndSendMessage(messagePayload);
    setMessage("");
  };

  const sendFileMessage = (file) => {
    const fileType = file.type.startsWith("image/") ? "Image" : "PDF";

    // Show immediate feedback that file is being processed
    if (fileType === "PDF") {
      // Create a temporary message to show loading state
      const tempMessage = {
        id: `temp-${Date.now()}`,
        uuid: selectedChatId,
        ucid: 1,
        sender: "self",
        receiver: selectedChatId,
        content: `Processing ${file.name}...`,
        messageContent: file.name,
        fileName: file.name,
        fileSize: file.size,
        type: "Text", // Temporary type
        timestamp: new Date(),
        isSession: false,
        isLoading: true,
      };

      if (onMessageSent) {
        onMessageSent(tempMessage);
      }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;

      const messagePayload = {
        id: Date.now(),
        uuid: selectedChatId,
        ucid: 1,
        sender: "self",
        receiver: selectedChatId,
        content: file.name,
        messageContent: file.name,
        fileData: fileData,
        fileName: file.name,
        fileSize: file.size,
        type: fileType,
        replyTo: replyToMessage ? replyToMessage.id : null,
        timestamp: new Date(),
        isSession: false,
      };

      saveAndSendMessage(messagePayload);
    };

    // Use smaller chunk size for PDFs to improve performance
    if (fileType === "PDF") {
      reader.readAsDataURL(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const saveAndSendMessage = (messagePayload) => {
    const chatKey = `chat_${selectedChatId}`;
    const existingMessages = JSON.parse(localStorage.getItem(chatKey) || "[]");
    existingMessages.push(messagePayload);
    localStorage.setItem(chatKey, JSON.stringify(existingMessages));

    if (onMessageSent) {
      onMessageSent(messagePayload);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.messageInput}>
      {replyToMessage && (
        <div className={styles.replyPreviewContainer}>
          <div className={styles.replyInfo}>
            <div className={styles.replyLabel}>Replying to {"John Doe"}</div>
            <div className={styles.replyPreviewText}>
              {replyToMessage.content}
            </div>
          </div>
          <button className={styles.cancelReplyButton} onClick={onCancelReply}>
            <MdClose size={16} />
          </button>
        </div>
      )}
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
              <div onClick={handleFileIconClick} style={{ cursor: "pointer" }}>
                <FaRegImage size={20} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*,.pdf"
                multiple
                onChange={() => {}}
              />
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
