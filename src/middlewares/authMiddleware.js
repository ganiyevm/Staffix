const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  

  if (!token) {
    return res.status(401).json({ message: "Token yo‘q, ruxsat berilmagan!" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.secretkey);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Noto‘g‘ri yoki eskirgan token!" });
  }
};

module.exports = authMiddleware;
