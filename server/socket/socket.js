import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.LOCAL_CLIENT_URL, process.env.LOCAL_CLIENT_URL_2],
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("addUserIsOnline", (userId) => {
    if (!userId) return;

    const isExisted = onlineUsers.some((item) => item.userId === userId);

    if (!isExisted) {
      onlineUsers.push({ userId, socketId: socket.id });
    }

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

export const getUserSocketId = (userId) => {
  const user = onlineUsers.find((user) => user.userId === userId);
  return user ? user.socketId : null;
};

export { app, io, server };
