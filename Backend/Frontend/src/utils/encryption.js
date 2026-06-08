import CryptoJS from "crypto-js";

export const generateChatKey = (senderId, receiverId) => {
  return CryptoJS.SHA256(senderId + receiverId).toString();
};

export const encryptMessage = (message, senderId, receiverId) => {
  const key = generateChatKey(senderId, receiverId);
  return CryptoJS.AES.encrypt(message, key).toString();
};

export const decryptMessage = (encryptedMessage, senderId, receiverId) => {
  try {
    const key = generateChatKey(senderId, receiverId);
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || encryptedMessage;
  } catch {
    return encryptedMessage;
  }
};