const { Router } = require("express");
const { notificationController } = require("./notification.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { guardMiddleware } = require("../../middlewares/guard.middleware");

const router = Router();

// CREATE: Notification yaratish
router.post(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),  
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),  
  notificationController.create.bind(notificationController)  
);

// GET ALL: Barcha notificationsni olish
router.get(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware), 
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),  
  notificationController.getAll.bind(notificationController)  
);

// DELETE: Notificationni o'chirish
router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),  
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),  
  notificationController.delete.bind(notificationController)  
);

module.exports = { router };
