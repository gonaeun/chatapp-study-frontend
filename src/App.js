import React, { useEffect, useState } from "react";
import "./App.css";
// import socket from "./server";
import { io } from "socket.io-client";

// function App() {
//   return (
//     <div>
//       <div className="App"></div>
//     </div>
//   );
// }

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = io("http://localhost:5002"); // 백엔드 주소

  useEffect(() => {
    // 연결 성공 시 상태 업데이트
    socket.on("connect", () => {
      console.log("Connected to server with socket ID:", socket.id);
      setIsConnected(true);
    });

    // 연결 해제 시 상태 업데이트
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container">
      {isConnected ? (
        <div className="connected">서버에 연결되었습니다!</div>
      ) : (
        <div className="disconnected">서버 연결을 확인하세요.</div>
      )}
    </div>
  );
};

export default App;