import express from "express";
import {
  getMessage,
  sendMessage,
} from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import Message from "../models/message.model.js";

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);

// MARK AS SEEN
router.post("/seen/:id", secureRoute, async (req, res) => {
  try {
    const senderId = req.params.id;
    const receiverId = req.user._id;

    await Message.updateMany(
      {
        senderId,
        receiverId,
        seen: false,
      },
      {
        $set: { seen: true },
      }
    );

    res.status(200).json({
      message: "Messages marked as seen",
    });
  } catch (error) {
    console.log("Error in markSeen route", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// EDIT MESSAGE
router.put("/edit/:id", secureRoute, async (req, res) => {
  try {
    const { message } = req.body;
    const messageId = req.params.id;
    const userId = req.user._id;

    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return res.status(404).json({
        error: "Message not found",
      });
    }

    if (existingMessage.senderId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "You can edit only your own messages",
      });
    }

    existingMessage.message = message;
    existingMessage.edited = true;

    await existingMessage.save();

    res.status(200).json(existingMessage);
  } catch (error) {
    console.log("Edit message error", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// DELETE MESSAGE FOR EVERYONE
router.put("/delete/:id", secureRoute, async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.user._id;

    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return res.status(404).json({
        error: "Message not found",
      });
    }

    if (existingMessage.senderId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "You can delete only your own messages",
      });
    }

    existingMessage.message = "This message was deleted";
    existingMessage.deleted = true;

    await existingMessage.save();

    res.status(200).json(existingMessage);
  } catch (error) {
    console.log("Delete message error", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;