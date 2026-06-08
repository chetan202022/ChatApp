import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessages } = useSendMessage();

  const emojiRef = useRef();

  const MAX_LENGTH = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;
    if (message.length > MAX_LENGTH) return;

    await sendMessages(message.trim());
    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100 px-4 py-3 border-t relative">
        <div className="flex items-center gap-3">

          {/* Emoji Section */}
          <div className="relative" ref={emojiRef}>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 duration-300"
            >
              <BsEmojiSmile className="text-2xl text-gray-700" />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-14 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex-1">
            <input
              type="text"
              value={message}
              maxLength={MAX_LENGTH}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-full px-5 py-3 outline-none"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white"
          >
            <IoSend className="text-xl" />
          </button>
        </div>

        {/* Character Counter */}
        <div className="text-right text-xs text-gray-500 mt-1 pr-2">
          {message.length}/{MAX_LENGTH}
        </div>
      </div>
    </form>
  );
}

export default Typesend;