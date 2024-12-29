import React, { useEffect, useState } from "react";
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import "./chatPageStyle.css";

const ChatPage = ({ user, socket }) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (res) => {
      console.log("Received message:", res);
      setMessageList((prevState) => [...prevState, res]);
    });

    return () => {
      socket.off("message"); // 이벤트 리스너 제거
    };
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!socket) return;

    socket.emit("sendMessage", message, (res) => {
      if (!res.ok) {
        console.error("Error sending message:", res.error);
      }
      setMessage("");
    });
  };

  return (
    <div className="App">
      <MessageContainer messageList={messageList} user={user} />
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatPage;
