const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");
const { NotificationModel } = require("./entity/notification.entity");

class NotificationService {
  #notificationRepo;

  constructor(notificationRepo) {
    this.#notificationRepo = notificationRepo;
  }

  // create: Notification yaratish
  async create(dto) {
    const notification = await this.#notificationRepo.create({
      userId: dto.userId,
      message: dto.message,
    });

    const resData = new ResData(201, "Notification created successfully", notification);
    return resData;
  }

  // getAll: Barcha notificationlarni olish
  async getAll() {
    const notifications = await this.#notificationRepo.find();

    if (!notifications || notifications.length === 0) {
      throw new CustomError(404, "No notifications found");
    }

    const resData = new ResData(200, "Notifications fetched successfully", notifications);
    return resData;
  }

  async delete(id) {
    const notification = await this.#notificationRepo.findByIdAndDelete(id);

    if (!notification) {
      throw new CustomError(404, "Notification not found");
    }

    const resData = new ResData(200, "Notification deleted successfully", notification);
    return resData;
  }
}

const notificationService = new NotificationService(NotificationModel);

module.exports = { notificationService };
