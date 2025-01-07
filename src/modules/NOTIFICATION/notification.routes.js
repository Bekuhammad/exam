const { Router } = require("express");
const { notificationController } = require("./notification.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { guardMiddleware } = require("../../middlewares/guard.middleware");

const router = Router();

// CREATE: Notification yaratish
router.post(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),  // Tokenni tekshirish
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),  // Rolni tekshirish
  notificationController.create.bind(notificationController)  // Controller metodini chaqirish
);

// GET ALL: Barcha notificationsni olish
router.get(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),  // Tokenni tekshirish
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),  // Rolni tekshirish
  notificationController.getAll.bind(notificationController)  // Controller metodini chaqirish
);

// DELETE: Notificationni o'chirish
router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),  // Tokenni tekshirish
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),  // Rolni tekshirish
  notificationController.delete.bind(notificationController)  // Controller metodini chaqirish
);

module.exports = { router };
