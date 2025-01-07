const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const { messageHandler } = require("./src/socket/messageHandler");
const { notificationHandler } = require("./src/socket/notificationHandler");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB ulanish
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("send:message", (data) => {
    messageHandler.createMessage(socket, data);
  });

  socket.on("get:message", (data) => {
    messageHandler.getMessages(socket, data);
  });

  socket.on("delete:message", (data) => {
    messageHandler.deleteMessage(socket, data);
  });

  socket.on("update:message", (data) => {
    messageHandler.updateMessage(socket, data);
  });

  socket.on("send:notification", (data) => {
    notificationHandler.sendNotification(socket, data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(2006, () => {
  console.log("Server  run port 2006");
});
