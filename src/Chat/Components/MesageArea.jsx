import React, { useState, useEffect, useRef } from "react";
import styles from "../CSS/messagareastyles.module.css";
import CochingSessionUI from "./CochingSessionUI";
import { FaReply, FaRegSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

function MessageArea({ selectedChatId, newMessage, onReplyToMessage }) {
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      const chatKey = `chat_${selectedChatId}`;
      const storedMessages = JSON.parse(localStorage.getItem(chatKey) || "[]");

      if (storedMessages.length === 0) {
        const mockMessages = [
          {
            id: 1,
            content: "Hey there! How are you doing?",
            sender: "other",
            timestamp: new Date(Date.now() - 3600000 * 24),
            isSession: true,
          },
          {
            id: 2,
            content: "I'm good, thanks for asking! How about you?",
            sender: "self",
            timestamp: new Date(Date.now() - 3600000 * 23),
            isSession: false,
          },
          {
            id: 3,
            content:
              "Just working on this new project. It's coming along nicely!",
            sender: "other",
            timestamp: new Date(Date.now() - 1800000),
            isSession: true,
          },
          {
            id: 4,
            content: "That sounds great! Would love to see it when it's ready.",
            sender: "self",
            timestamp: new Date(Date.now() - 900000),
            isSession: true,
          },
          {
            id: 5,
            content: "Sure thing! I'll share it with you soon.",
            sender: "other",
            timestamp: new Date(),
            isSession: true,
          },
        ];
        setMessages(mockMessages);

        localStorage.setItem(chatKey, JSON.stringify(mockMessages));
      } else {
        setMessages(storedMessages);
      }
    }
  }, [selectedChatId]);

  useEffect(() => {
    if (newMessage && newMessage.uuid === selectedChatId) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  }, [newMessage, selectedChatId]);

  const handleReplyClick = (message) => {
    if (onReplyToMessage) {
      onReplyToMessage(message);
    }
  };

  const handleEmojiClick = (messageId, emojiObj) => {
    const emoji = emojiObj.emoji;

    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === messageId) {
          const reactions = message.reactions || {};

          if (reactions[emoji]) {
            const { [emoji]: removedEmoji, ...remainingReactions } = reactions;

            return {
              ...message,
              reactions:
                removedEmoji > 1
                  ? { ...reactions, [emoji]: removedEmoji - 1 }
                  : remainingReactions,
            };
          } else {
            return {
              ...message,
              reactions: {
                ...reactions,
                [emoji]: 1,
              },
            };
          }
        }
        return message;
      })
    );

    // Update in localStorage
    const chatKey = `chat_${selectedChatId}`;
    localStorage.setItem(
      chatKey,
      JSON.stringify(
        messages.map((message) => {
          if (message.id === messageId) {
            const reactions = message.reactions || {};
            if (reactions[emoji]) {
              // If emoji exists, remove it or decrease count
              const { [emoji]: removedEmoji, ...remainingReactions } =
                reactions;
              return {
                ...message,
                reactions:
                  removedEmoji > 1
                    ? { ...reactions, [emoji]: removedEmoji - 1 }
                    : remainingReactions,
              };
            } else {
              return {
                ...message,
                reactions: {
                  ...reactions,
                  [emoji]: 1,
                },
              };
            }
          }
          return message;
        })
      )
    );

    setShowEmojiPicker(null);
  };

  const formatTime = (timestamp) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp) => {
    const messageDate =
      timestamp instanceof Date ? timestamp : new Date(timestamp);

    if (isNaN(messageDate.getTime())) {
      return "Unknown date";
    }

    const today = new Date();
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (
      messageDate.toDateString() ===
      new Date(today.setDate(today.getDate() - 1)).toDateString()
    ) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const renderReplyContent = (replyToMessage) => {
    if (!replyToMessage) return null;

    return (
      <div className={styles.replyPreview}>
        <div className={styles.replyLine}></div>
        <div className={styles.replyContent}>
          <span className={styles.replySender}>
            {replyToMessage.sender === "self" ? "You" : "John Doe"}
          </span>
          <p className={styles.replyText}>{replyToMessage.content}</p>
        </div>
      </div>
    );
  };

  const renderReactions = (reactions, messageId) => {
    if (!reactions || Object.keys(reactions).length === 0) return null;

    return (
      <div className={styles.reactionsContainer}>
        {Object.entries(reactions).map(([emoji, count]) => (
          <div
            key={emoji}
            className={styles.reaction}
            onClick={() => handleEmojiClick(messageId, { emoji })}
            title="Click to remove reaction"
          >
            <span className={styles.reactionEmoji}>{emoji}</span>
            {count > 1 && <span className={styles.reactionCount}>{count}</span>}
          </div>
        ))}
      </div>
    );
  };

  const renderMessageContent = (message) => {
    if (message.isSession && message.sender === "self") {
      return <CochingSessionUI />;
    }

    let replyToMessage = null;
    if (message.replyTo) {
      replyToMessage = messages.find((msg) => msg.id === message.replyTo);
    }

    if (message.isLoading) {
      return (
        <div className={styles.messageContent}>
          {replyToMessage && renderReplyContent(replyToMessage)}
          <div className={styles.pdfContainer}>
            <div className={styles.pdfWrapper}>
              <div className={styles.pdfIconContainer}>
                <div className={styles.pdfIcon}>PDF</div>
              </div>
              <div className={styles.pdfInfo}>
                <p className={styles.pdfFileName}>{message.fileName}</p>
                <p className={styles.pdfFileSize}>Processing...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    let content;
    switch (message.type) {
      case "Image":
        content = (
          <div className={styles.messageContent}>
            {replyToMessage && renderReplyContent(replyToMessage)}
            <div className={styles.imageContainer}>
              <a
                href={message.fileData}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={message.fileData}
                  alt={message.fileName}
                  className={styles.messageImage}
                />
              </a>
            </div>
            <p className={styles.fileName}>{message.fileName}</p>
          </div>
        );
        break;
      case "PDF":
        content = (
          <div className={styles.messageContent}>
            {replyToMessage && renderReplyContent(replyToMessage)}
            <div className={styles.pdfContainer}>
              <a
                href={message.fileData}
                download={message.fileName}
                className={styles.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.pdfWrapper}>
                  <div className={styles.pdfIconContainer}>
                    <div className={styles.pdfIcon}>PDF</div>
                  </div>
                  <div className={styles.pdfInfo}>
                    <p className={styles.pdfFileName}>{message.fileName}</p>
                    <p className={styles.pdfFileSize}>
                      {formatFileSize(message.fileSize || 0)}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        );
        break;
      default:
        content = (
          <div className={styles.messageContent}>
            {replyToMessage && renderReplyContent(replyToMessage)}
            <p>{message.content}</p>
          </div>
        );
    }

    return (
      <>
        {content}
        {renderReactions(message.reactions, message.id)}
      </>
    );
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={styles.messageArea}>
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className={styles.messageGroup}>
          <div className={styles.dateHeader}>
            <span>{date}</span>
          </div>
          {dateMessages.map((message, index) => {
            const showAvatar =
              index === 0 || dateMessages[index - 1].sender !== message.sender;

            return (
              <div
                key={message.id}
                className={`${styles.messageContainer} ${
                  message.sender === "self"
                    ? styles.selfMessage
                    : styles.otherMessage
                }`}
              >
                {showAvatar && (
                  <div className={styles.messageSenderAvatar}>
                    <div className={styles.avatarCircle}>
                      {message.avatar ? (
                        <img src={message.avatar} alt={message.sender} />
                      ) : message.sender === "self" ? (
                        "Y"
                      ) : (
                        "J"
                      )}
                    </div>
                  </div>
                )}
                <div className={styles.messageContentWrapper}>
                  <div className={styles.messageColumn}>
                    <div className={styles.messageHeader}>
                      <span className={styles.senderName}>
                        {message.sender === "self" ? "You" : "John Doe"}
                      </span>
                      <span className={styles.dotSeparator}>•</span>
                      <span className={styles.messageTime}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    {renderMessageContent(message)}
                  </div>

                  <div className={styles.messageActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleReplyClick(message)}
                    >
                      <FaReply size={14} />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => setShowEmojiPicker(message.id)}
                    >
                      <FaRegSmile size={14} />
                    </button>

                    {showEmojiPicker === message.id && (
                      <div
                        className={styles.emojiPickerContainer}
                        ref={emojiPickerRef}
                      >
                        <EmojiPicker
                          onEmojiClick={(emojiObj) =>
                            handleEmojiClick(message.id, emojiObj)
                          }
                          width={280}
                          height={350}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageArea;
