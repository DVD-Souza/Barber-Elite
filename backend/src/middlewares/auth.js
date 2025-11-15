const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "Token ausente" });

  const [, token] = header.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-passwordHash");
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};
