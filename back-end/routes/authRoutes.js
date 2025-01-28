const express = require('express');
const authController = require("../controllers/authController");


const router = express.Router();

router.post("/register", authController.register);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);

module.exports = router;