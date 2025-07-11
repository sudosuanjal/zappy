import { getSocketId, io } from "../../lib/socket.js";
import Message from "../../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const newMessage = new Message({
      senderId,
      receiverId,
      text: message,
    });

    await newMessage.save();

    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error while sending messages:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};
