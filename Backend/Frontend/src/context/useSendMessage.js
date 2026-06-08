import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const {
    messages,
    setMessages,
    selectedConversation,
  } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true,
        }
      );

      // immediately update UI
      setMessages([...messages, res.data]);

    } catch (error) {
      console.log(
        "Error in send messages:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessages,
  };
};

export default useSendMessage;