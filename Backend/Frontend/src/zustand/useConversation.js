import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],

  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  // ✅ rename properly
  setMessages: (messages) => set({ messages }),

  // ✅ ADD THIS (for updates)
  updateMessages: (fn) =>
    set((state) => ({
      messages: fn(state.messages),
    })),
}));

export default useConversation;