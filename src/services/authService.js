const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../../logs/logger");

exports.signup = async (fullname, email, password) => {
  try {
    logger.info(`Signup attempt for email: ${email}`);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Signup failed: User with email ${email} already exists.`);
      return { status: 400, data: { message: "User already exists" } };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    logger.info(`User ${email} signed up successfully.`);
    return { status: 201, data: { message: "User created successfully" } };
  } catch (error) {
    logger.error(`Signup error for email ${email}: ${error.message}`);
    return { status: 500, data: { message: "Internal server error" } };
  }
};

exports.signin = async (email, password) => {
  try {
    logger.info(`Signin attempt for email: ${email}`);

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

    const token = jwt.sign({ id: user._id }, process.env.secretkey, { expiresIn: process.env.expiresIn });

    logger.info(`User ${email} signed in successfully.`);
    return { status: 200, data: { token, user: { id: user._id, fullname: user.fullname, email: user.email } } };
  } catch (error) {
    logger.error(`Signin error for email ${email}: ${error.message}`);
    return { status: 500, data: { message: "Internal server error" } };
  }
};
