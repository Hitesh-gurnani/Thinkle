import React, { useState, useEffect } from "react";
import styles from "./CSS/chatmain.module.css";
import InputField from "../components/atoms/InputField/InputField";
import ChatHeader from "./Components/ChatHeader";
import MessageInput from "./Components/MessageInput";
import MessageArea from "./Components/MesageArea";
import ChatList from "./Components/ChatList";
import NoSelection from "./Components/NoSelection";

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [chatList, setChatList] = useState([]);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    const chatData = [
      {
        _id: "67b9ccee946efb0dea99d4dd",
        fullname: "Divyanshu Gupta",
        uuid: 44,
        avatar: {
          identifier: "1740559713422.67b9ccee946efb0dea99d4dd.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/67b9ccee946efb0dea99d4dd/profile/1740559713422.67b9ccee946efb0dea99d4dd.jpg",
        },
        unreadMessage: 1,
        lastMessage: null,
      },
      {
        _id: "67c2d9d7ff752539c250fcf8",
        fullname: "Thijs (Ben) Becker",
        uuid: 53,
        avatar: {
          identifier: "1740824698254.67c2d9d7ff752539c250fcf8.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/67c2d9d7ff752539c250fcf8/profile/1740824698254.67c2d9d7ff752539c250fcf8.jpg",
        },
        unreadMessage: 122,
        lastMessage: null,
      },
      {
        _id: "67ac945465bc301c68e53c28",
        fullname: "Vinayak Kulkarni",
        uuid: 34,
        avatar: {
          identifier: "1740635300609.image.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/User/1740635300609.image.jpg",
        },
        unreadMessage: 0,
        lastMessage: {
          _id: "67b44c40152289d400df2e09",
          messageContent: "hi",
          type: "Text",
          createdAt: "2025-02-18T09:00:48.925Z",
        },
      },
      {
        _id: "661d22cf109f119651d677d9",
        fullname: "Vishal Suvarna",
        uuid: 1,
        avatar: {
          identifier: "1740137580060.profile_1740137580060_1.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/661d22cf109f119651d677d9/profile/1740137580060.profile_1740137580060_1.jpg",
        },
        unreadMessage: 0,
        lastMessage: {
          _id: "67bc5b9b152289d400df2fda",
          messageContent: "as",
          type: "Text",
          createdAt: "2025-02-24T11:44:27.238Z",
        },
      },
      {
        _id: "67bc47a8e54a5a20a21ac8cd",
        fullname: "Caleb Mellas",
        uuid: 50,
        avatar: {
          identifier: "1740825462574.67bc47a8e54a5a20a21ac8cd.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/67bc47a8e54a5a20a21ac8cd/profile/1740825462574.67bc47a8e54a5a20a21ac8cd.jpg",
        },
        unreadMessage: 100,
        lastMessage: null,
      },
      {
        _id: "67babceb83d16fa1441bce3e",
        fullname: "Divyanshu Gupta",
        uuid: 47,
        avatar: {
          identifier: "1740388482700.67babceb83d16fa1441bce3e.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/67babceb83d16fa1441bce3e/profile/1740388482700.67babceb83d16fa1441bce3e.jpg",
        },
        unreadMessage: 0,
        lastMessage: null,
      },
      {
        _id: "67b812b8b614b069da890b0c",
        fullname: "Shubham Pal",
        uuid: 43,
        avatar: {
          identifier: "1740146549124.profile_1740146549124_1.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/67b812b8b614b069da890b0c/profile/1740146549124.profile_1740146549124_1.jpg",
        },
        unreadMessage: 0,
        lastMessage: {
          _id: "67b9e397152289d400df2fc7",
          messageContent: "hi",
          type: "Text",
          createdAt: "2025-02-22T14:47:51.456Z",
        },
      },
      {
        _id: "66337521ebeeeefcb798d77c",
        fullname: "Divyanshu Gupta",
        uuid: 3,
        avatar: {
          identifier: "1740146678989.image.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/User/1740146678989.image.jpg",
        },
        unreadMessage: 0,
        lastMessage: {
          _id: "67b055d9152289d400df2d44",
          messageContent: "Book 1:1 Coaching Session",
          type: "1:1",
          createdAt: "2025-02-15T08:52:41.902Z",
        },
      },
      {
        _id: "678f7f55d4a6e0bb98b1d427",
        fullname: "Divyanshu Gupta",
        uuid: 22,
        unreadMessage: 0,
        lastMessage: {
          _id: "67a9a188152289d400df29b4",
          messageContent: "hello",
          type: "Text",
          createdAt: "2025-02-10T06:49:44.842Z",
        },
      },
      {
        _id: "679e216d545c90c3c0994797",
        fullname: "Shailendra Kushwah",
        uuid: 25,
        avatar: {
          identifier: "1740389550539.679e216d545c90c3c0994797.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/679e216d545c90c3c0994797/profile/1740389550539.679e216d545c90c3c0994797.jpg",
        },
        unreadMessage: 0,
        lastMessage: null,
      },
      {
        _id: "67b45c8040353fca3cff132e",
        fullname: "Anoop ",
        uuid: 42,
        unreadMessage: 0,
        lastMessage: null,
      },
      {
        _id: "679e2882545c90c3c099483e",
        fullname: "Shubham Pal",
        uuid: 26,
        avatar: {
          identifier: "1738762456631.image.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/User/1738762456631.image.jpg",
        },
        unreadMessage: 0,
        lastMessage: {
          _id: "67b44f4e152289d400df2e29",
          messageContent: "Hello",
          type: "Text",
          createdAt: "2025-02-18T09:13:50.065Z",
        },
      },
      {
        _id: "67af312b3c7cd8b5428ee6ce",
        fullname: "Dipankar Datta",
        uuid: 37,
        unreadMessage: 0,
        lastMessage: null,
      },
      {
        _id: "67ac4484d840b1237505afdc",
        fullname: "Apple",
        uuid: 31,
        unreadMessage: 0,
        lastMessage: {
          _id: "67ac90f8152289d400df2c0c",
          messageContent: "hey",
          type: "Text",
          createdAt: "2025-02-12T12:15:52.986Z",
        },
      },
      {
        _id: "67aaf9f25ff9260b9202bbfe",
        fullname: "Sadhik Bhatia",
        uuid: 29,
        unreadMessage: 0,
        lastMessage: null,
      },
      {
        _id: "677d896b7ae7f521b02c5874",
        fullname: "Shubham Pal",
        uuid: 17,
        avatar: {
          identifier: "1740382676548.profile_1740382676548_1.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/677d896b7ae7f521b02c5874/profile/1740382676548.profile_1740382676548_1.jpg",
        },
        unreadMessage: 0,
        lastMessage: {
          _id: "67aadd47152289d400df2adc",
          messageContent: "Jab",
          type: "Text",
          createdAt: "2025-02-11T05:16:55.704Z",
        },
      },
      {
        _id: "67a5ec061b9d008e7b42a256",
        fullname: "Omkar",
        uuid: 27,
        unreadMessage: 0,
        lastMessage: null,
      },
      {
        _id: "6772772354bd0a8222a3fc90",
        fullname: "Shubham Pal",
        uuid: 10,
        unreadMessage: 0,
        lastMessage: {
          _id: "67a598ea152289d400df28d1",
          messageContent: "ds",
          type: "Text",
          createdAt: "2025-02-07T05:23:54.833Z",
        },
      },
      {
        _id: "679cff6d803bc9ba716c67d0",
        fullname: "Pratt",
        uuid: 24,
        avatar: {
          identifier: "1738342749822.image.jpg",
          url: "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/User/1738342749822.image.jpg",
        },
        unreadMessage: 0,
        lastMessage: null,
      },
      {
        _id: "678648fb242bc07f07432825",
        fullname: "Shubham tesert",
        uuid: 18,
        unreadMessage: 0,
        lastMessage: {
          _id: "679c855e4bd25a73ab74ec8f",
          messageContent: "hhh",
          type: "Text",
          createdAt: "2025-01-31T08:10:06.535Z",
        },
      },
      {
        _id: "679b0f56032f3fd20f680eef",
        fullname: "Vishal ",
        uuid: 23,
        unreadMessage: 0,
        lastMessage: {
          _id: "679cabde4bd25a73ab74ed2f",
          messageContent: "hey",
          type: "Text",
          createdAt: "2025-01-31T10:54:22.906Z",
        },
      },
      {
        _id: "678f3d787025ed32a7d6a023",
        fullname: "Shivansh",
        uuid: 21,
        unreadMessage: 0,
        lastMessage: null,
      },
    ];
    setChatList(chatData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleMessageSent = (message) => {
    setNewMessage(message);

    // Update the last message in chat list
    setChatList((prevList) => {
      return prevList.map((chat) => {
        if (chat._id === selectedChat) {
          return {
            ...chat,
            lastMessage: {
              _id: message.id,
              messageContent: message.content,
              type: message.type,
              createdAt: message.timestamp,
            },
          };
        }
        return chat;
      });
    });
  };

  return (
    <div className={styles.chatmain}>
      {isMobileView && selectedChat ? (
        <div className={styles.chatContainer}>
          <ChatHeader
            title={chatList.find((chat) => chat._id === selectedChat)?.fullname}
            profileImage={
              chatList.find((chat) => chat._id === selectedChat)?.avatar?.url
            }
            onBack={handleBackToList}
            showBackButton={true}
          />
          <MessageArea selectedChatId={selectedChat} newMessage={newMessage} />
          <MessageInput
            selectedChatId={selectedChat}
            onMessageSent={handleMessageSent}
          />
        </div>
      ) : isMobileView ? (
        <ChatList
          chatList={chatList}
          onChatSelect={handleChatSelect}
          formatTime={formatTime}
        />
      ) : (
        <div className={styles.desktopLayout}>
          <ChatList
            chatList={chatList}
            onChatSelect={handleChatSelect}
            selectedChat={selectedChat}
            formatTime={formatTime}
          />
          <div className={styles.chatContainer}>
            {selectedChat ? (
              <>
                <ChatHeader
                  title={
                    chatList.find((chat) => chat._id === selectedChat)?.fullname
                  }
                  profileImage={
                    chatList.find((chat) => chat._id === selectedChat)?.avatar
                      ?.url
                  }
                  showBackButton={false}
                />
                <MessageArea
                  selectedChatId={selectedChat}
                  newMessage={newMessage}
                />
                <MessageInput
                  selectedChatId={selectedChat}
                  onMessageSent={handleMessageSent}
                />
              </>
            ) : (
              <NoSelection />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
