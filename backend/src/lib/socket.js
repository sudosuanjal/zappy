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

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);
  console.log("socket connection");

  const userId = socket.handshake.query.userId;
  if (userId) connectedUsers[userId] = socket.id;

  console.log(socket.id);

  io.emit("getOnlineUsers", Object.keys(connectedUsers));

  socket.on("disconnect", () => {
    console.log("a user disconnected: " + socket.id);
    delete connectedUsers[userId];
    io.emit("getOnlineUsers", Object.keys(connectedUsers));
  });
});

export { io, app, httpServer };
