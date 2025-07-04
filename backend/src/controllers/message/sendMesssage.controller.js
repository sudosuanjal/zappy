import { getSocketId, io } from "../../lib/socket.js";
import Message from "../../models/message.model.js";

export const sendMessage = async (req, res) => {
  console.log("from backend");
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    console.log("from backend");

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
    res.send(201).json(newMessage);
  } catch (error) {
    console.log("error while sending messages: " + error);
    throw error;
  }
};
