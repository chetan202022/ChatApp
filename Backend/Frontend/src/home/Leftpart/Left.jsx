import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import { useAuth } from "../../context/AuthProvider";

function Left() {
  const [authUser] = useAuth();

  return (
    <div className="w-full h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* TOP PROFILE SECTION */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4">

          {/* Profile Image */}
          <div className="relative">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="profile"
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />

            {/* Online Dot */}
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {authUser?.user?.fullname}
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back 👋
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="px-2">
        <Search />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto px-2">
        <Users />
      </div>

      {/* LOGOUT */}
      <div className="border-t border-gray-200">
        <Logout />
      </div>
    </div>
  );
}

export default Left;