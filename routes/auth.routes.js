const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/verify", isAuthenticated, authController.verify);

module.exports = router;
