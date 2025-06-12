import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "unauthorized - no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("jwt verification failed: " + error.message);
    return res.status(401).json({ message: "invalid token or token expired" });
  }
};
