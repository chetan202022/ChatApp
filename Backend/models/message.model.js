import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },

    seen: {
      type: Boolean,
      default: false,
    },

    delivered: {
      type: Boolean,
      default: false,
    },

    edited: {
      type: Boolean,
      default: false,
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// IMPORTANT PERFORMANCE INDEXES

// Fast query for sender-receiver chat messages
messageSchema.index({ senderId: 1, receiverId: 1 });

// Fast latest message sorting
messageSchema.index({ createdAt: -1 });

const Message = mongoose.model("message", messageSchema);

export default Message;