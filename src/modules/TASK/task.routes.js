const { Router } = require("express");
const { taskController } = require("./task.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { guardMiddleware } = require("../../middlewares/guard.middleware");

const router = Router();

// CREATE: Yangi vazifa yaratish
// Faqatgina "admin", "manager" yoki "leader" rollariga ega foydalanuvchilar yangi vazifa yaratishi mumkin
router.post(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "manager", "leader").bind(guardMiddleware),
  taskController.create.bind(taskController)
);

// GET ALL: Barcha vazifalarni olish
// Barcha roli bo'lgan autentifikatsiyadan o'tgan foydalanuvchilar vazifalarni ko'ra oladi
router.get(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  taskController.getAll.bind(taskController)
);

// GET BY ID: Vazifani ID bo'yicha olish
router.get(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  taskController.getTaskById.bind(taskController)
);

// GET TASKS BY USER ID: Foydalanuvchiga tegishli vazifalarni olish
router.get(
  "/user/:userId",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "manager", "leader").bind(guardMiddleware),
  taskController.getTasksByUserId.bind(taskController)
);

// UPDATE: Vazifani yangilash
router.put(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "leader").bind(guardMiddleware),
  taskController.update.bind(taskController)
);

// DELETE: Vazifani o'chirish
router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "leader").bind(guardMiddleware),
  taskController.delete.bind(taskController)
);

module.exports = { router: router };
