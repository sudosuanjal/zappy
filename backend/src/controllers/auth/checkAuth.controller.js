import User from "../../models/user.model.js";

export const checkAuth = async (req, res) => {
  const userReq = req.user;
  if (!userReq) {
    return res.status(401).json({ message: "userId is not provided" });
  }
  try {
    const user = await User.findById(userReq._id);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user authenticated", user });
  } catch (error) {
    console.error("authentication error: " + error);
    res.status(500).json({ message: "internal server error" });
  }
};
