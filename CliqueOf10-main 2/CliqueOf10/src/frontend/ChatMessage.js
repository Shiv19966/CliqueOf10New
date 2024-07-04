import React from "react";
import { auth } from "../config";
import "./ChatRoom.css"; 

const ChatMessage = ({ message }) => {
  const { text, uid, photoURL, createdAt } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = timestamp.toDate();
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    }
  };

  return (
    <div className={`message ${messageClass}`}>
      {/* <img src={photoURL} alt="User Avatar" className="user-avatar" /> */}
      <div className="message-content">
        <p className="message-text">{text}</p>
        <p className="message-timestamp">{formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
