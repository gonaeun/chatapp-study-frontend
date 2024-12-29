import React from "react";
import { useNavigate } from "react-router-dom";
import "./roomListPageStyle.css";

const RoomListPage = ({ rooms, socket }) => {
  const navigate = useNavigate();

  const moveToChat = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="room-body">
      <div className="room-nav">채팅 ▼</div>
      {rooms.length > 0
        ? rooms.map((room) => (
            <div
              className="room-list"
              key={room._id}
              onClick={() => moveToChat(room._id)}
            >
              <div className="room-title">
                <img src="/profile.jpeg" alt="profile" />
                <p>{room.room}</p>
              </div>
              <div className="member-number">{room.members.length}</div>
            </div>
          ))
        : <p>방이 없습니다</p>}
    </div>
  );
};

export default RoomListPage;
