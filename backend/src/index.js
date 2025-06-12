import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { connect } from "./database/connectDB.js";
import authRoutes from "./routes/auth.rotue.js";

configDotenv();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connect();
  console.log("server listening at port:", PORT);
});
