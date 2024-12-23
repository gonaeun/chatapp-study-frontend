import React, { useState } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

  // 프론트엔드에서 메세지 내용 보여주기 위해서
  // 메세지 리스트랑 유저정보 받아서
  // map으로 메세지 리스트 싹 프린트함
  // 유저정보에 따라서 보여주는 부분이(오른쪽,왼쪽) 달라짐 + 시스템 메세지도 보여줘야함
  // 1. 시스템 메세지인지
  // 2. 시스템메세지가 아니라면, 유저 메세지인지 >> 오른쪽에 보여주기
  // 3. 상대방 메세지인지 >> 왼쪽에 보여주기기
const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].user.name === user.name) ||
                    messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
