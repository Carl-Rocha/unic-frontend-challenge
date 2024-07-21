const express = require("express");
const router = express.Router();
const db = require("../db.json");

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

module.exports = router;
