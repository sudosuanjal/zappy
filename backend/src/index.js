import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { connect } from "./database/connectDB.js";
import authRoutes from "./routes/auth.rotue.js";
import messageRoutes from "./routes/message.route.js";
import { app, httpServer } from "./lib/socket.js";

configDotenv();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello anjal" });
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

httpServer.listen(PORT, () => {
  connect();
  console.log("server listening at port:", PORT);
});
