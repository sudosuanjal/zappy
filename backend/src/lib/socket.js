import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected: " + socket.id);
  });
});

export { io, app, httpServer };
