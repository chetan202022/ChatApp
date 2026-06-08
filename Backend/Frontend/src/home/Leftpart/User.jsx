import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const {
    selectedConversation,
    setSelectedConversation,
  } = useConversation();

  const isSelected =
    selectedConversation?._id === user._id;

  const { onlineUsers } = useSocketContext();

  // FIXED ONLINE CHECK
  const isOnline = onlineUsers.some(
    (id) => id.toString() === user._id.toString()
  );

  return (
    <div
      className={`hover:bg-gray-200 duration-300 ${
        isSelected ? "bg-gray-300" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-gray-300 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div>
          <h1 className="font-bold">
            {user.fullname}
          </h1>

          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;