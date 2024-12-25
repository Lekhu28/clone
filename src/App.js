import React from "react";
import { ChatProvider } from "./context/ChatContext";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import "./index.css";

const App = () => {
  return (
    <ChatProvider>
      <div className="app">
        <div className="sidebar">
          <h2>Contacts</h2>
          <ContactList />
        </div>
        <div className="main">
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
