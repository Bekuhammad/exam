const { Router } = require("express");
const userRoutes = require("./user/user.routes");
const authRoutes = require("./auth/auth.routes");
const taskRoutes = require("./TASK/task.routes"); 
const notificationRoutes=require("./NOTIFICATION/notification.routes")
const messageRoutes = require("./message/message.routes"); // Message marshrutini qo'shish




const router = Router();

router.use("/user", userRoutes.router);

router.use("/auth", authRoutes.router);

router.use("/task", taskRoutes.router); 

router.use("/notification",notificationRoutes.router)

router.use("/message", messageRoutes.router); // Message marshrutini qo'shish


module.exports = { router };
