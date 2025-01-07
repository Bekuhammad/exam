const sendNotification = (socket, data) => {
  socket.emit("notification", {
    message: data.message,
    userId: data.userId,
  });
};

module.exports = { sendNotification };
