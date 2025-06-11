import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log("server listening at port:", PORT);
});
