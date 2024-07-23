const express = require("express");
const router = express.Router();
const db = require("../db.json");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

// Get users with search functionality
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

// Create a new user
router.post("/", async (req, res) => {
  const { email, name, password, role } = req.body;
  const existingUser = db.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: db.users.length + 1,
    email,
    name,
    password: hashedPassword,
    role: role || "user",
  };

  db.users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { email, name, password, role } = req.body;
  const user = db.users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  user.email = email || user.email;
  user.name = name || user.name;
  user.role = role || user.role;

  res.status(200).json(user);
});

// Delete a user
router.delete("/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const userIndex = db.users.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  db.users.splice(userIndex, 1);
  res.status(204).send();
});

router.put("/change-password/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  const user = db.users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Senha atual incorreta" });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  res.status(200).json({ message: "Senha alterada com sucesso" });
});

module.exports = router;
