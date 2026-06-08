import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useConversation from "../../zustand/useConversation.js";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const { messages, setMessages } = useConversation();

  const itsMe = message.senderId === authUser.user._id;
  const chatName = itsMe ? "chat-end" : "chat-start";

  const createdAt = new Date(message.createdAt);

  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.message);

  // ref for auto scroll when editing starts
  const messageRef = useRef(null);

  // AUTO SCROLL TO MESSAGE WHEN EDIT MODE OPENS
  useEffect(() => {
    if (isEditing && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isEditing]);

  // SAVE EDIT
  const handleSaveEdit = async () => {
    if (!editedText.trim()) return;

    try {
      const res = await axios.put(
        `/api/message/edit/${message._id}`,
        {
          message: editedText,
        }
      );

      const updatedMessages = messages.map((msg) =>
        msg._id === message._id ? res.data : msg
      );

      setMessages(updatedMessages);
      setIsEditing(false);
    } catch (error) {
      console.log("Edit message error:", error);
    }
  };

  // DELETE MESSAGE
  const handleDelete = async () => {
    try {
      const res = await axios.put(
        `/api/message/delete/${message._id}`
      );

      const updatedMessages = messages.map((msg) =>
        msg._id === message._id ? res.data : msg
      );

      setMessages(updatedMessages);
    } catch (error) {
      console.log("Delete message error:", error);
    }
  };

  return (
    <div ref={messageRef} className="px-3 py-2">
      <div className={`chat ${chatName}`}>
        <div
          className={`
            chat-bubble
            max-w-[75%]
            break-words
            whitespace-pre-wrap
            text-sm
            leading-relaxed
            rounded-2xl
            px-4
            py-3
            shadow-sm
            border
            ${
              itsMe
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-200 text-gray-900 border-gray-300"
            }
          `}
        >
          {/* Deleted Message */}
          {message.deleted ? (
            <p className="italic opacity-70">
              This message was deleted
            </p>
          ) : isEditing ? (
            <>
              {/* Input */}
              <input
                type="text"
                value={editedText}
                onChange={(e) =>
                  setEditedText(e.target.value)
                }
                className="w-full rounded-xl px-4 py-2 text-black border border-gray-300 outline-none"
                autoFocus
              />

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedText(message.message);
                  }}
                  className="px-3 py-1 rounded-lg bg-gray-300 text-black text-xs font-medium hover:bg-gray-400 duration-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-1 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 duration-300"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <p>{message.message}</p>
          )}

          {/* Footer */}
          {!isEditing && (
            <div className="flex justify-end items-center gap-1 mt-2 text-[10px] opacity-80">
              <span>{formattedTime}</span>

              {/* Ticks */}
              {itsMe && (
                <span
                  className={`text-xs font-bold ${
                    message.seen
                      ? "text-blue-200"
                      : message.delivered
                      ? "text-gray-200"
                      : "text-gray-300"
                  }`}
                >
                  {message.seen
                    ? "✓✓"
                    : message.delivered
                    ? "✓✓"
                    : "✓"}
                </span>
              )}

              {/* Edited */}
              {message.edited && (
                <span className="italic ml-1">
                  edited
                </span>
              )}

              {/* Edit + Delete */}
              {itsMe && !message.deleted && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs underline ml-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="text-xs underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;