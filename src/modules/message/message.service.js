const { MessageModel } = require("./entity/message.entity");
const { ResData } = require("../../lib/resData");
const { CustomError } = require("../../lib/customError");

class MessageService {
  async sendMessage(dto) {
    const message = new MessageModel({
      sender: dto.sender,
      receiver: dto.receiver,
      content: dto.content,
    });

    await message.save();

    const resData = new ResData(201, "Message sent successfully", message);
    return resData;
  }

  async getMessagesByUserId(userId) {
    const messages = await MessageModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ timestamp: -1 }); // Yangi xabarlar birinchi

    if (!messages.length) {
      throw new CustomError(404, "No messages found");
    }

    const resData = new ResData(200, "Messages fetched successfully", messages);
    return resData;
  }

  async deleteMessage(id) {
    const message = await MessageModel.findByIdAndDelete(id);

    if (!message) {
      throw new CustomError(404, "Message not found");
    }

    return new ResData(200, "Message deleted successfully", message);
  }
}

const messageService = new MessageService();

module.exports = { messageService };
