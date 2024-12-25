import React, { useEffect, useContext } from "react";
import { useInstantDB } from "../hooks/useInstantDB";
import ChatContext from "../context/ChatContext";

const ContactList = () => {
  const { fetchContactsFromInstantDB, loading } = useInstantDB();
  const { state, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contacts = await fetchContactsFromInstantDB();
        dispatch({ type: "SET_CONTACTS", payload: contacts });
      } catch (error) {
        console.error("Failed to load contacts:", error);
      }
    };

    loadContacts();
  }, [fetchContactsFromInstantDB, dispatch]);

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div className="contact-list">
      {state.contacts.length > 0 ? (
        state.contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => dispatch({ type: "SELECT_CONTACT", payload: contact })}
            className="contact-item"
          >
            {contact.name}
          </div>
        ))
      ) : (
        <div>No contacts available</div>
      )}
    </div>
  );
};

export default ContactList;
