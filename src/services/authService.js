const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const logger = require("../../logs/logger");

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES;

const createTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
  return { accessToken, refreshToken };
};

exports.signin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Signin failed: No user found with email ${email}.`);
      return { status: 400, data: { message: "Invalid credentials" } };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Signin failed: Incorrect password for email ${email}.`);
      return { status: 400, data: { message: "Invalid credentials" } };
    }

    const { accessToken, refreshToken } = createTokens(user._id);
    logger.info(`User ${email} signed in successfully.`);
    return {
      status: 200,
      data: {
        accessToken,
        refreshToken,
        user: { id: user._id, fullname: user.fullname, email: user.email },
      },
    };
  } catch (error) {
    logger.error(`Signin error for email ${email}: ${error.message}`);
    return { status: 500, data: { message: "Internal server error" } };
  }
};

exports.signup = async (fullname, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Signup failed: User with email ${email} already exists.`);
      return { status: 400, data: { message: "User already exists" } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    const { accessToken, refreshToken } = createTokens(newUser._id);
    logger.info(`User ${email} signed up successfully.`);
    return {
      status: 201,
      data: {
        accessToken,
        refreshToken,
        user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email },
      },
    };
  } catch (error) {
    logger.error(`Signup error for email ${email}: ${error.message}`);
    return { status: 500, data: { message: "Internal server error" } };
  }
};

exports.refreshToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      logger.warn("Refresh token is missing");
      return { status: 400, data: { message: "Refresh token is required" } };
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (!decoded) {
      logger.warn("Invalid or expired refresh token");
      return { status: 400, data: { message: "Invalid or expired refresh token" } };
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      logger.warn(`User not found for refresh token: ${decoded.id}`);
      return { status: 400, data: { message: "User not found" } };
    }

    const { accessToken, refreshToken: newRefreshToken } = createTokens(user._id);
    logger.info(`Refresh token for user ${user.email} has been successfully refreshed.`);
    return {
      status: 200,
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    };
  } catch (error) {
    logger.error("Error during refresh token generation: " + error.message);
    return { status: 500, data: { message: "Internal server error" } };
  }
};
