import React from "react";

const Message = ({ message, isSender }) => {
  return (
    <div
      className={`message ${isSender ? "sender" : "receiver"}`}
      style={{
        alignSelf: isSender ? "flex-end" : "flex-start",
        backgroundColor: isSender ? "#dcf8c6" : "#ffffff",
        borderRadius: "8px",
        margin: "5px 0",
        padding: "10px",
        maxWidth: "60%",
        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ margin: 0 }}>{message.text}</p>
      <span style={{ fontSize: "0.8em", color: "#999" }}>
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default Message;
