const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "chave_padrao_super_secreta";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido ou expirado" });
    req.user = user;
    next();
  });
}

function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader)
    console.log(token)
    console.log(SECRET)

    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Token inválido ou expirado" });
      if (!rolesPermitidos.includes(user.tipo)) {
        return res.status(403).json({ error: "Acesso negado: permissão insuficiente" });
      }
      req.user = user;
      next();
    });
  };
}

module.exports = { authenticateToken, authorizeRoles };
