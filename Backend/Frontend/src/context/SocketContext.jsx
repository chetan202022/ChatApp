import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () =>
  useContext(socketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    let socketInstance = null;

    if (authUser?.user?._id) {
      socketInstance = io("http://localhost:4002", {
        query: {
          userId: authUser.user._id,
        },
        transports: ["websocket"],
        withCredentials: true,
      });

      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log(
          "Socket connected:",
          socketInstance.id
        );
      });

      socketInstance.on(
        "getOnlineUsers",
        (users) => {
          console.log(
            "Online users received:",
            users
          );
          setOnlineUsers(users);
        }
      );

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [authUser?.user?._id]);

  return (
    <socketContext.Provider
      value={{
        socket,
        onlineUsers,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};