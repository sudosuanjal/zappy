import User from "../../models/user.model.js";

export const login = async (req, res) => {
  // const { email, fullName, username, profilePic } = req.body;
  // if (!email || !username || !fullName) {
  //   return res.status(400).json({ message: "missing required credentials" });
  // }
  // try {
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     const existingUsername = await User.findOne({ username });
  //     if (existingUsername) {
  //       return res.status(409).json({ message: "Username is already taken" });
  //     }
  //     const newUser = new User({
  //       email,
  //       fullName,
  //       username,
  //       profilePic,
  //     });
  //     await newUser.save();
  //     return res
  //       .status(201)
  //       .json({ message: "new user created successfully", user: newUser });
  //   } else {
  //     return res
  //       .status(200)
  //       .json({ message: "user logged in succesfully", user });
  //   }
  // } catch (error) {
  //   console.error("login error: " + error);
  //   return res.status(500).json({ message: "internal server error" });
  // }
  console.log("from login api [req.user]:");
  console.log(req.user);
};
