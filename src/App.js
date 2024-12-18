import React, { useEffect, useState } from "react";
import "./App.css";
// import socket from "./server";
import { io } from "socket.io-client";
import InputField from "./components/InputField/InputField";

function App() {

  const socket = io("http://localhost:5002"); // 백엔드와 소켓 연결 요청

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('')
  
  useEffect(()=>{
    askUserName()
  },[]);   // 웹사이트 처음 로딩되자마자 프롬프트 호출
  

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

  const sendMessage = () =>{};

  return (
    <div>
      <div className="App">
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

// const App = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const socket = io("http://localhost:5002"); // 백엔드 주소

  // useEffect(() => {
  //   // 연결 성공 시 상태 업데이트
  //   socket.on("connect", () => {
  //     console.log("Connected to server with socket ID:", socket.id);
  //     setIsConnected(true);
  //   });

  //   // 연결 해제 시 상태 업데이트
  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //     setIsConnected(false);
  //   });

  //   // Cleanup
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

//   return (
//     <div className="container">
//       {isConnected ? (
//         <div className="connected">서버에 연결되었습니다!</div>
//       ) : (
//         <div className="disconnected">서버 연결을 확인하세요.</div>
//       )}
//     </div>
//   );
// };

// export default App;