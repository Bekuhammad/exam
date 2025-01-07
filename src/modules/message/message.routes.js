const { Router } = require("express");
const { messageController } = require("./message.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { guardMiddleware } = require("../../middlewares/guard.middleware");

const router = Router();

// Xabar yuborish (admin, leader, manager roli uchun)
router.post(
  "/send",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),
  messageController.sendMessage.bind(messageController)
);

// Foydalanuvchi xabarlarini olish
router.get(
  "/:userId",
  authMiddleware.verifyToken.bind(authMiddleware),
  messageController.getMessagesByUserId.bind(messageController)
);

// Xabarni o'chirish (admin, leader, manager roli uchun)
router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),
  messageController.deleteMessage.bind(messageController)
);

module.exports = { router };
