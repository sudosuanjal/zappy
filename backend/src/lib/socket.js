// lib/socket.js
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://zappy-opal.vercel.app", // production
];

const io = new Server(httpServer, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("Blocked by Socket.IO CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});

export function getSocketId(userId) {
  return connectedUsers[userId];
}

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) connectedUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(connectedUsers));

  socket.on("disconnect", () => {
    console.log("a user disconnected: " + socket.id);
    delete connectedUsers[userId];
    io.emit("getOnlineUsers", Object.keys(connectedUsers));
  });
});

export { io, app, httpServer };
