const { Router } = require("express");
const express = require("express");
const { authController } = require("./auth.controller");

const router = Router();


// Register API
router.post("/register", authController.register);
// Login API
router.post("/login", authController.login);
// Refresh token API
router.post("/refresh", authController.refresh);


module.exports = { router };
