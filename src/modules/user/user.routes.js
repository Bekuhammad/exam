const { Router } = require("express");
const { userController } = require("./user.controller");
const { guardMiddleware } = require("../../middlewares/guard.middleware");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const router = Router();

// CREATE: Foydalanuvchi yaratish
router.post(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),
  userController.create.bind(userController)
);

// GET ALL: Barcha foydalanuvchilar ro'yxatini olish
router.get(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),
  userController.getAll.bind(userController)
);

// GET BY ID: Foydalanuvchini ID bo'yicha olish
router.get(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  userController.getUserById.bind(userController)
);

// UPDATE: Foydalanuvchini yangilash
router.put(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  userController.update.bind(userController)
);

// DELETE: Foydalanuvchini o'chirish
router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware.verifyRole("admin", "leader", "manager").bind(guardMiddleware),
  userController.delete.bind(userController)
);

module.exports = { router };
