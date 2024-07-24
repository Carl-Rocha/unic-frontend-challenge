const jwt = require("jsonwebtoken");
const config = require("../config/auth.json");

const SECRET_KEY = config.SECRET_KEY;

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: "Token não fornecido" });
  }
};
