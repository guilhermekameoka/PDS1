const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db");

const router = express.Router();
router.use(express.json());

// Rota de login de usuários
router.post("/", async (req, res) => {
  try {
    console.log("Recebendo requisição de login:", req.body);

    const { email, senha } = req.body;

    if (!email || !senha) {
      console.log("Erro: E-mail ou senha não fornecidos.");
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    const emailNormalizado = email.trim().toLowerCase();
    console.log("E-mail normalizado:", emailNormalizado);

    const [user] = await db.query("SELECT * FROM usuarios WHERE email = ?", [emailNormalizado]);
    console.log("Resultado da query:", user);

    if (user.length === 0) {
      console.log("Erro: Usuário não encontrado.");
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const usuario = user[0];
    console.log("Usuário encontrado:", usuario);

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    console.log("Senha correta:", senhaCorreta);

    if (!senhaCorreta) {
      console.log("Erro: Senha incorreta.");
      return res.status(401).json({ error: "Senha incorreta." });
    }

    res.status(200).json({
      message: "Login realizado com sucesso!",
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    console.error("Erro no login de usuário:", err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;