import { supabase } from "../../lib/supabase.js";
import User from "../../models/user.model.js"; //
import fetch from "node-fetch";

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

    let profilePicUrl = profilePic;

    if (profilePic) {
      const response = await fetch(profilePic);
      const buffer = await response.buffer();

      const fileName = `${email}-${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, buffer, {
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw new Error("Failed to upload profile picture");
      }

      const { data: publicUrlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(fileName);

      profilePicUrl = publicUrlData.publicUrl;
    }

    if (!user) {
      const newUser = new User({
        email,
        fullName,
        profilePic: profilePicUrl,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "new user created successfully", user: newUser });
    } else {
      if (user.profilePic !== profilePicUrl) {
        user.profilePic = profilePicUrl;
        await user.save();
      }
      return res
        .status(200)
        .json({ message: "user logged in successfully", user });
    }
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
