const UserService = require("../services/UserService");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("hammasi toldir");
  }

  const existingUser = await UserService.findUserByEmail(email);
  if (existingUser) {
    res.status(400);
    throw new Error("Bu email orqali royxat otilgan");
  }

  const user = await UserService.createUser(name, email, password);
  res.status(201).json({ message: "user yaratildi", user });
});

module.exports = { registerUser };
