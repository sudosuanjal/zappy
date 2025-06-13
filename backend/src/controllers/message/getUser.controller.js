import User from "../../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const totalUsers = await User.find({ _id: { $ne: currentUser } });
    res.status(200).json(totalUsers);
  } catch (error) {
    console.error("error in getting total users: ", error.message);

    res.status(500).json({ message: "internal server error" });
  }
};
