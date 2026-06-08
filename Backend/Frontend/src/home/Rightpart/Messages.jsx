import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import axios from "axios";

function Messages() {
  const { loading, messages } = useGetMessage();
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  useGetSocketMessage();

  const chatContainerRef = useRef(null);

  // ✅ Scroll after messages are fully rendered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [messages, selectedConversation]);

  // ✅ Mark as seen
  useEffect(() => {
    if (selectedConversation) {
      axios.post(`/api/message/seen/${selectedConversation._id}`);

      socket.emit("markSeen", {
        senderId: selectedConversation._id,
      });
    }
  }, [selectedConversation, socket]);

  // ✅ Sort messages by latest time
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto px-2"
      style={{ height: "calc(100vh - 140px)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        sortedMessages.length > 0 &&
        sortedMessages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && sortedMessages.length === 0 && (
        <div>
          <p className="text-center mt-[20%] text-gray-500">
            Say Hi 👋 to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;