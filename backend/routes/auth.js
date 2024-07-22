const express = require("express");
const jwt = require("jsonwebtoken");
// const jsonServer = require("json-server");
const db = require("../tmp/db.json");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.json");
// const routerDB = jsonServer.router("../tmp/db.json");

const router = express.Router();
const SECRET_KEY = config.SECRET_KEY;

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find((item) => item.email === email);

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...userWithoutPassword } = user;
      const token = jwt.sign(userWithoutPassword, SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.json({ ...userWithoutPassword, token });
    }
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

module.exports = router;
