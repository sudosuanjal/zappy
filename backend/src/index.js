import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { connect } from "./database/connectDB.js";

configDotenv();
const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  connect();
  console.log("server listening at port:", PORT);
});
