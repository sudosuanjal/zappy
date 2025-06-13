import User from "../../models/user.model.js";

export const login = async (req, res) => {
  const { email, user_metadata } = req.user;
  const { full_name: fullName, picture: profilePic } = user_metadata;
  console.log("login in backend");

  if (!email || !fullName) {
    return res.status(400).json({ message: "missing required credentials" });
  }
  try {
    console.log("in the login");

    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({
        email,
        fullName,
        profilePic,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "new user created successfully", user: newUser });
    } else {
      return res
        .status(200)
        .json({ message: "user logged in succesfully", user });
    }
  } catch (error) {
    console.error("login error: " + error);
    return res.status(500).json({ message: "internal server error" });
  }
};
