const jwt = require("jsonwebtoken");
const config = require("../config/auth.json");

const SECRET_KEY = config.SECRET_KEY;

module.exports = (req, res, next) => {
  // Verificar se o cabeçalho Authorization está presente
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // Extrair o token Bearer

    // Verificar e decodificar o token
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido ou expirado" });
      }

      // Adicionar o usuário à solicitação
      req.user = user;

      // Verificar se a role do usuário é "admin"
      if (req.user && req.user.role === "admin") {
        next(); // Permitir que a solicitação continue
      } else {
        res.status(403).json({
          error:
            "Acesso negado. Somente administradores podem realizar essa ação.",
        });
      }
    });
  } else {
    res.status(403).json({ error: "Token de autenticação não fornecido" });
  }
};
