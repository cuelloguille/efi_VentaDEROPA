// middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Token requerido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Formato de token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // payload con id, rol, etc.
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token inválido o expirado" });
  }
};
