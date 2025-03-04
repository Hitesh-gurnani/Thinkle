import React, { useState, useEffect, useRef } from "react";
import styles from "../CSS/messagareastyles.module.css";
import CochingSessionUI from "./CochingSessionUI";

function MessageArea({ selectedChatId }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
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
        content: "Just working on this new project. It's coming along nicely!",
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
  }, [selectedChatId]);

  useEffect(() => {}, [selectedChatId, messages]);

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
                  <div className={styles.messageHeader}>
                    <span className={styles.senderName}>
                      {message.sender === "self" ? "You" : "John Doe"}
                    </span>
                    <span className={styles.dotSeparator}>•</span>
                    <span className={styles.messageTime}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  {message.isSession && message.sender === "self" ? (
                    <CochingSessionUI />
                  ) : (
                    <div className={styles.messageContent}>
                      <p>{message.content}</p>
                    </div>
                  )}
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
