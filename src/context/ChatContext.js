import React, { createContext, useReducer, useEffect } from "react";


const ChatContext = createContext();


const initialState = {
  contacts: [], 
  messages: {}, 
  selectedContact: null, 
};


function chatReducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload, 
      };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: {
          ...state.messages, 
          ...action.payload, 
        },
      };

    case "SELECT_CONTACT":
      return {
        ...state,
        selectedContact: action.payload, 
      };

    default:
      return state;
  }
}


const fetchContactsFromInstantDB = async () => {
  try {
    const response = await fetch("https://api.instantdb.com/v1/contacts", {
      headers: { Authorization: "Bearer 4de6604d-11aa-404e-bfa1-516f01935ecb" },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    const data = await response.json();
    return data.contacts; 
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};


export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  
  useEffect(() => {
    const loadContacts = async () => {
      const contacts = await fetchContactsFromInstantDB();
      dispatch({ type: "SET_CONTACTS", payload: contacts });
    };

    loadContacts();
  }, []); 

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};


export default ChatContext;
