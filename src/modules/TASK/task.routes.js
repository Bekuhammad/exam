const { Router } = require("express");
const { taskController } = require("./task.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { guardMiddleware } = require("../../middlewares/guard.middleware");

const router = Router();

// CREATE: Yangi vazifa yaratish

router.post(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "manager", "leader").bind(guardMiddleware),
  taskController.create.bind(taskController)
);

// GET ALL: Barcha vazifalarni olish
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
