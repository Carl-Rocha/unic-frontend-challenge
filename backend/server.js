const express = require("express");
const cors = require("cors");
const removePassword = require("./middlewares/removePassword");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const server = express();

server.use(express.json());
server.use(cors());
server.use(removePassword);
server.use("/auth", authRoutes);
server.use("/users", userRoutes);

server.listen(process.env.PORT || 3001, () => {
  console.log("JSON Server is running on port 3001");
});
