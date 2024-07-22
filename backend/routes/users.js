const express = require("express");
const router = express.Router();
const db = require("../tmp/db.json");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).send("Query parameter 'q' is required");
  }

  const searchTerm = q.toLowerCase();
  const filteredUsers = db.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  res.json(filteredUsers);
});

router.post("/change-password", verifyToken, async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  const user = db.users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Senha atual incorreta" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;

  res.status(200).json({ message: "Senha alterada com sucesso" });
});

module.exports = router;
