import Message from "../../models/message.model.js";

export const getMessage = async (req, res) => {
  try {
    const { id: oppositeUser } = req.params;
    const currentUser = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUser, receiverId: oppositeUser },
        { senderId: oppositeUser, receiverId: currentUser },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};
