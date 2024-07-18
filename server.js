const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const express = require("express");
const cors = require("cors");

// Middleware para fazer o parsing do JSON no corpo da requisição
server.use(express.json());

// Middleware para habilitar CORS
server.use(cors());

// Middleware para remover a senha das respostas
server.use((req, res, next) => {
  if (req.method === "GET" && req.url.startsWith("/users")) {
    const send = res.send;
    res.send = (body) => {
      let data = JSON.parse(body);
      if (Array.isArray(data)) {
        data = data.map((user) => {
          const { password, ...rest } = user;
          return rest;
        });
      } else {
        const { password, ...rest } = data;
        data = rest;
      }
      send.call(res, JSON.stringify(data));
    };
  }
  next();
});

// Rota de autenticação
server.post("/auth", (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get("users").find({ email }).value();

  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
