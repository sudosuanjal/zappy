// server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { connect } from "./database/connectDB.js";
import authRoutes from "./routes/auth.rotue.js";
import messageRoutes from "./routes/message.route.js";
import { app, httpServer } from "./lib/socket.js";

configDotenv();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://zappy-opal.vercel.app", // production
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
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
  console.log("Server listening at port:", PORT);
});
