const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.showSignup);

router.post("/signup", authController.signup);

router.get("/signin", authController.showSignin);

router.post("/signin", authController.signin);

router.post("/refresh-token", authController.refreshToken);

router.get("/dashboard", authController.dashboard);

router.get("/logout", authController.logout);

module.exports = router;
