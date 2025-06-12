import User from "../../models/user.model.js";

export const username = async (req, res) => {
  const { email } = req.user;
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ message: "Missing required credentials - username" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { username },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Username created successfully", user: updatedUser });
  } catch (error) {
    console.error("username submit error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
