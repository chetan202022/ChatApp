import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import { decryptMessage } from "../utils/encryption.js";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );

          const decryptedMessages = res.data.map((msg) => ({
            ...msg,
            message: decryptMessage(msg.message),
          }));

          setMessages(decryptedMessages);

        } catch (error) {
          console.log("Error in getting messages", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]); // ✅ FIXED

  return { loading, messages };
};

export default useGetMessage;