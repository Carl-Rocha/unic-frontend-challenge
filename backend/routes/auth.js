const express = require("express");
const jwt = require("jsonwebtoken");
const jsonServer = require("json-server");
const config = require("../config/auth.json");
const routerDB = jsonServer.router("./db.json");

const router = express.Router();
const SECRET_KEY = config.SECRET_KEY;

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const user = routerDB.db.get("users").find({ email }).value();

  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ ...userWithoutPassword, token });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

module.exports = router;
