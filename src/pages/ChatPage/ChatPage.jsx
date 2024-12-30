import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import "./chatPageStyle.css";

const ChatPage = ({ user, socket }) => {
  const { id } = useParams(); // URL에서 방 ID 가져오기
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    console.log("Joining room with ID:", id); // 디버깅 로그

    // 방에 참여 요청
    socket.emit("joinRoom", id, (res) =>{
      console.log("Server response:", res); // 서버 응답 로그
      if (res && res.ok) {
        console.log("Successfully joined the room", res);        
      } else {
        console.error("Failed to join the room", res);
      }
    });

    // 메세지 수신 핸들러
    socket.on("message", (res) => {
      console.log("Received message:", res);
      setMessageList((prevState) => [...prevState, res]);
    });

    return () => {
      socket.off("message"); // 이벤트 리스너 제거
    };
  // }, [socket]);
  }, [socket, id]);  // id를 의존성 배열에 추가 하라고 gpt가 그러는데 일단 주석처리

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
