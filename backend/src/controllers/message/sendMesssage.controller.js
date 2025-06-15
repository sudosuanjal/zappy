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
    res.send(201).json(newMessage);
  } catch (error) {
    console.log("error while sending messages: " + error);
    throw error;
  }
};
