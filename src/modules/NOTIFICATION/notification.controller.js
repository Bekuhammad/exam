const { notificationService } = require("./notification.service");
const { notificationCreateDto } = require("../NOTIFICATION/dto/notification.create.dto");
const { validator } = require("../../lib/validator");
const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");

class NotificationController {
    #notificationService;

    constructor(notificationService) {
        this.#notificationService = notificationService;
    }

    async getAll(req, res, next) {
        try {
            const resData = await this.#notificationService.getAll();
            res.status(resData.statusCode).json(resData);
        } catch (error) {
            next(error);
        }
    }

    // create: Notification yaratish
    async create(req, res, next) {
        try {
            const dto = req.body;

            validator(notificationCreateDto, dto);

            const resData = await this.#notificationService.create(dto);
            res.status(resData.statusCode).json(resData);
        } catch (error) {
            next(error);
        }
    }

    // delete: Notificationni o'chirish
    async delete(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                throw new CustomError(400, "Notification ID is required");
            }

            const resData = await this.#notificationService.delete(id);
            res.status(resData.statusCode).json(resData);
        } catch (error) {
            next(error);
        }
    }
}

const notificationController = new NotificationController(notificationService);

module.exports = { notificationController };
