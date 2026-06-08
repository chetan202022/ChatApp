import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function VerifySuccess() {
  const [, setAuthUser] = useAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/user/me", {
          withCredentials: true,
        });

        const userData = {
          user: res.data.user,
        };

        // Save logged-in user
        localStorage.setItem(
          "ChatApp",
          JSON.stringify(userData)
        );

        setAuthUser(userData);

        toast.success("Email verified successfully");

        // ✅ CLOSE verification tab if possible
        // and move old tab to home page
        if (window.opener) {
          window.opener.location.href = "/";
          window.close();
        } else {
          // fallback if browser blocks close()
          window.location.href = "/";
        }

      } catch (error) {
        console.log(error);

        toast.error("Verification failed");
        window.location.href = "/login";
      }
    };

    fetchCurrentUser();
  }, [setAuthUser]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">
        Verifying your account...
      </h1>
    </div>
  );
}

export default VerifySuccess;