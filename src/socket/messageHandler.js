const { MessageModel } = require("../models/message.model");

const createMessage = async (socket, data) => {
  try {
    const message = new MessageModel(data);
    await message.save();
    socket.emit("message:created", message);
  } catch (err) {
    socket.emit("error", "Error creating message");
  }
};

const getMessages = async (socket, data) => {
  try {
    const messages = await MessageModel.find();
    socket.emit("messages", messages);
  } catch (err) {
    socket.emit("error", "Error retrieving messages");
  }
};

const deleteMessage = async (socket, data) => {
  try {
    const message = await MessageModel.findByIdAndDelete(data.messageId);
    socket.emit("message:deleted", message);
  } catch (err) {
    socket.emit("error", "Error deleting message");
  }
};

const updateMessage = async (socket, data) => {
  try {
    const message = await MessageModel.findByIdAndUpdate(data.messageId, data.update, { new: true });
    socket.emit("message:updated", message);
  } catch (err) {
    socket.emit("error", "Error updating message");
  }
};

module.exports = { createMessage, getMessages, deleteMessage, updateMessage };
