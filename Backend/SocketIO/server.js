import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

// import { createClient } from "redis";
// import { createAdapter } from "@socket.io/redis-adapter";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// async function setupRedis() {
//   try {
//     const pubClient = createClient({
//       url: "redis://localhost:6379",
//     });

//     const subClient = pubClient.duplicate();

//     pubClient.on("error", (err) =>
//       console.log("Redis Pub Error:", err)
//     );

//     subClient.on("error", (err) =>
//       console.log("Redis Sub Error:", err)
//     );

//     await pubClient.connect();
//     await subClient.connect();

//     io.adapter(createAdapter(pubClient, subClient));

//     console.log("Redis adapter connected successfully");
//   } catch (error) {
//     console.log("Redis setup error:", error);
//   }
// }

// setupRedis();

const users = new Map();

export const getReceiverSocketId = (userId) => {
  const userSockets = users.get(userId);
  return userSockets ? [...userSockets][0] : null;
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    if (!users.has(userId)) {
      users.set(userId, new Set());
    }

    users.get(userId).add(socket.id);
  }

  io.emit(
    "getOnlineUsers",
    [...users.keys()]
  );

  // MARK AS SEEN
  socket.on("markSeen", async ({ senderId }) => {
    try {
      await Message.updateMany(
        {
          senderId,
          receiverId: userId,
          seen: false,
        },
        {
          $set: {
            seen: true,
          },
        }
      );

      const senderSockets = users.get(senderId);

      if (senderSockets) {
        senderSockets.forEach((socketId) => {
          io.to(socketId).emit("messagesSeen");
        });
      }

    } catch (error) {
      console.log(
        "Error in markSeen socket:",
        error
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (userId && users.has(userId)) {
      users.get(userId).delete(socket.id);

      if (users.get(userId).size === 0) {
        users.delete(userId);
      }
    }

    io.emit(
      "getOnlineUsers",
      [...users.keys()]
    );
  });
});

export { app, io, server };