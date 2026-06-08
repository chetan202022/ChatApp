import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const {
    updateMessages,
    selectedConversation,
  } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (
        selectedConversation &&
        (
          newMessage.senderId.toString() === selectedConversation._id.toString() ||
          newMessage.receiverId.toString() === selectedConversation._id.toString()
        )
      ) {
        updateMessages((prev) => {
          const exists = prev.some(
            (msg) => msg._id === newMessage._id
          );

          if (exists) return prev;

          return [...prev, newMessage];
        });
      }
    };

    const handleMessagesSeen = () => {
      updateMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          seen: true,
        }))
      );
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messagesSeen", handleMessagesSeen);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messagesSeen", handleMessagesSeen);
    };
  }, [socket, selectedConversation, updateMessages]);
};

export default useGetSocketMessage;