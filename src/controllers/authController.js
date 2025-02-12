const authService = require("../services/authService");

exports.signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  const result = await authService.signup(fullname, email, password);
  res.status(result.status).json(result.data);
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.signin(email, password);
  res.status(result.status).json(result.data);
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshToken(refreshToken);
  res.status(result.status).json(result.data);
};
