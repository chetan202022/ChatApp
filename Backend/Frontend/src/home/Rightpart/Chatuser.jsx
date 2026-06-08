import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // FIXED ONLINE STATUS CHECK
  const isOnline = onlineUsers.some(
    (id) =>
      id.toString() ===
      selectedConversation?._id?.toString()
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <CiMenuFries className="text-gray-900 text-xl" />
        </label>

        {/* Avatar */}
        <div className="relative">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="w-12 h-12 rounded-full object-cover"
            alt="profile"
          />

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* Name + Status */}
        <div>
          <h1 className="font-semibold text-gray-900 text-lg">
            {selectedConversation?.fullname}
          </h1>

          <p
            className={`text-sm ${
              isOnline
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-gray-300"></div>

        {/* User Info */}
        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-500">
            Chatting with
          </p>

          <p className="text-sm font-medium text-gray-700">
            {selectedConversation?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;