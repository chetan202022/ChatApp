import mongoose from "mongoose";
import User from "../models/user.model.js";
import Message from "./message.model.js";

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// IMPORTANT PERFORMANCE INDEX

// Fast conversation lookup between 2 users
conversationSchema.index({ members: 1 });

const Conversation = mongoose.model(
  "conversation",
  conversationSchema
);

export default Conversation;