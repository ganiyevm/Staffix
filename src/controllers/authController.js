const authService = require("../services/authService");
const logger = require("../../logs/logger");

exports.signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const response = await authService.signup(fullname, email, password);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await authService.signin(email, password);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
