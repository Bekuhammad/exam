const { messageService } = require("./message.service");
const { messageCreateDto } = require("../message/dto/message.create.dto");
const { validator } = require("../../lib/validator");
const { CustomError } = require("../../lib/customError");

class MessageController {
  async sendMessage(req, res, next) {
    try {
      const dto = req.body;

      // DTO validatsiyasi
      validator(messageCreateDto, dto);

      const resData = await messageService.sendMessage(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async getMessagesByUserId(req, res, next) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        throw new CustomError(400, "User ID is required");
      }

      const resData = await messageService.getMessagesByUserId(userId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(req, res, next) {
    try {
      const messageId = req.params.id;

      if (!messageId) {
        throw new CustomError(400, "Message ID is required");
      }

      const resData = await messageService.deleteMessage(messageId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const messageController = new MessageController();

module.exports = { messageController };
