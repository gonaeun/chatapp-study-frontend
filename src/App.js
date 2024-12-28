import React, { useEffect, useState } from "react";
import "./App.css";
// import socket from "./server";
import { io } from "socket.io-client";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {

  //const socket = io("http://localhost:5002"); // 백엔드와 소켓 연결 요청
  // let socket; // 소켓 객체를 전역으로 선언 >> 이러면 여러브라우저 열어도 하나의 소켓밖에 연결 안됨

  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  console.log("message List", messageList);
  const [rooms, setRooms] = useState([]);
  
  
  // useEffect(()=>{
  //   socket.on('message',(message)=>{
  //     console.log("res", message);
  //   })
  //   askUserName()
  // },[]);   // 웹사이트 처음 로딩되자마자 프롬프트 호출

  useEffect(() => {
    // 소켓 객체 생성 (각 브라우저 탭에서 독립적)
    const newSocket = io("http://localhost:5002"); // 새 소켓 연결
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("message", (message) => {
      console.log("res", message);
      setMessageList((preState)=>preState.concat(message));
    });

    // 방 정보 수신
    newSocket.on("rooms",(res) => {
      console.log("Received rooms:", res); // 서버에서 받은 방목록을 콘솔에 출력
      setRooms(res); // 방 목록 상태를 저장
    })

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected.");
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []); // 의존성 배열 비어있음 → 각 탭에서 한 번만 실행됨
  
  // socket이 초기화된 후 askUserName 호출
  useEffect(() => {
    if (socket) {
      askUserName();
    }
  }, [socket]); // socket 상태 변경 시 실행됨

  
  const askUserName=()=>{
    const userName = prompt("당신의 이름을 입력하세요")
    console.log("UserName", userName);
    
    socket.emit("login",userName,(res)=>{
        console.log("Res",res);
        if(res?. ok){
          setUser(res.data);
          // response가 true이면 유저정보를 respose의 data값으로 저장
        }
    })
  }

  const sendMessage = (event) =>{
    event.preventDefault();
    if (!socket) {
      console.error("Socket is not connected.");
      return;
    }
    socket.emit("sendMessage", message, (res)=>{
      console.log("sendMessage res",res);
    });
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;