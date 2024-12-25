import { useState } from "react";
import axios from "axios";

const API_KEY = "4de6604d-11aa-404e-bfa1-516f01935ecb";

export const useInstantDB = () => {
  const [loading, setLoading] = useState(false);

 
  const fetchContactsFromInstantDB = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.instantdb.com/v1/contacts`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
      console.log("API Response:", response.data); 
      return response.data.contacts || []; 
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return []; 
    } finally {
      setLoading(false);
    }
  };

  
  const fetchMessages = async (contactId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.instantdb.com/v1/messages/${contactId}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const sendMessage = async (contactId, message) => {
    try {
      await axios.post(
        `https://api.instantdb.com/v1/messages/${contactId}`,
        { message },
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { fetchContactsFromInstantDB, fetchMessages, sendMessage, loading };
};
