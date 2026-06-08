import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-100">
      
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col h-screen">
          <Chatuser />
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <Typesend />
        </div>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative flex flex-col h-screen">
      
      {/* Mobile Menu */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-3"
      >
        <CiMenuFries className="text-gray-900 text-xl" />
      </label>

      {/* Center Content */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
        
        {/* Avatar */}
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          className="w-20 h-20 rounded-full mb-4 shadow"
        />

        {/* Welcome Text */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {authUser.user.fullname}
        </h1>

        <p className="text-gray-500 mt-2">
          Select a conversation to start chatting
        </p>

      </div>
    </div>
  );
};