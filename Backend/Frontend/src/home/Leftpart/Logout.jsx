import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await axios.post("/api/user/logout");

      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");

      toast.success("Logged out successfully");

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-4 bg-white">
      <div
        onClick={handleLogout}
        className="flex items-center px-4 py-3 rounded-2xl border border-gray-200 hover:border-red-300 hover:bg-red-50 cursor-pointer duration-300 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-red-100">
            <BiLogOutCircle className="text-2xl text-red-500" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              {loading ? "Logging out..." : "Logout"}
            </h2>
            <p className="text-sm text-gray-500">
              End your current session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;