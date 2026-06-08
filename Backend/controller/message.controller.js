import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { encryptMessage, decryptMessage } from "../utils/encryption.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const encryptedMessage = encryptMessage(
      message,
      senderId.toString(),
      receiverId.toString()
    );

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: encryptedMessage, // ✅ FIXED
      seen: false,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // ✅ DECRYPT BEFORE EMIT
    const decryptedMessage = {
      ...newMessage._doc,
      message: decryptMessage(
        newMessage.message,
        senderId.toString(),
        receiverId.toString()
      ),
    };

    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId); // 👈 ADD THIS

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", decryptedMessage);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", decryptedMessage);
    }

    res.status(201).json(decryptedMessage);

  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");

    if (!conversation) {
      return res.status(201).json([]);
    }

    const messages = conversation.messages.map((msg) => ({
      ...msg._doc,
      message: decryptMessage(
        msg.message,
        msg.senderId.toString(),
        msg.receiverId.toString()
      ),
    }));

    res.status(201).json(messages);

  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
