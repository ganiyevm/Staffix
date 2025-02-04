const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (fullname, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullname, email, password: hashedPassword });
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = { createUser, findUserByEmail };
