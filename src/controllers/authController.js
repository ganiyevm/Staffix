const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../../logs/logger");
const authService = require("../services/authService"); 

exports.showSignup = (req, res) => {
  res.render("signup", { title: "Sign Up" });
};

exports.signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const response = await authService.signup(fullname, email, password);

    if (response.status === 400) {
      return res.render("signup", {
        title: "Sign Up",
        error: response.data.message,
        fullname,
        email,
      });
    }

    const { accessToken, refreshToken, user } = response.data;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 3600000, // 1 soat
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 86400000, // 1 kun
    });

    res.redirect("/dashboard"); 
  } catch (error) {
    logger.error("Error during signup: " + error.message);
    res.render("signup", {
      title: "Sign Up",
      error: "Ro'yxatdan o'tishda xato yuz berdi. Iltimos, qayta urinib ko'ring.",
    });
  }
};

exports.showSignin = (req, res) => {
  res.render("signin", { title: "Sign In" });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await authService.signin(email, password);

    if (response.status === 400) {
      return res.render("signin", {
        title: "Sign In",
        error: response.data.message,
        email,
      });
    }

    const { accessToken, refreshToken, user } = response.data;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 3600000, 
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 86400000, 
    });

    res.redirect("/dashboard"); 
  } catch (error) {
    logger.error("Error during signin: " + error.message);
    res.render("signin", {
      title: "Sign In",
      error: "Kirishda xato yuz berdi. Iltimos, qayta urinib ko'ring.",
    });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    const response = await authService.refreshToken(refreshToken);

    if (response.status === 400) {
      return res.status(400).json({ message: response.data.message });
    }

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 3600000, 
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 86400000, 
    });

    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    logger.error("Error during refresh token generation: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Tizimga kirgan foydalanuvchining dashboardini ko'rsatish
exports.dashboard = (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
};

exports.logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.redirect("/signin");
};
