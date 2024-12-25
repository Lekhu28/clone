import React, { useContext, useEffect } from "react";
import ChatContext from "../context/ChatContext";
import { useInstantDB } from "../hooks/useInstantDB";
import Message from "./Message";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const { state, dispatch } = useContext(ChatContext);
  const { fetchMessages } = useInstantDB();

  useEffect(() => {
    if (state.selectedContact) {
      (async () => {
        try {
          const messages = await fetchMessages(state.selectedContact.id);
          dispatch({ type: "SET_MESSAGES", payload: { [state.selectedContact.id]: messages } });
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      })();
    }
  }, [state.selectedContact, dispatch]);

  if (!state.selectedContact) {
    return <div className="chat-window-placeholder">Select a contact to start chatting!</div>;
  }

  const messages = state.messages[state.selectedContact.id] || [];

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <Message
            key={msg.id || `${state.selectedContact.id}-${Math.random()}`}
            message={msg}
            isSender={msg.sender === "currentUser"} 
          />
        ))}
      </div>
      <MessageInput contactId={state.selectedContact.id} />
    </div>
  );
};

export default ChatWindow;
