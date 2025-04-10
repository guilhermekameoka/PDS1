const express = require("express");
const bcrypt = require("bcrypt");
const { executeQuery } = require("../utils/dbhelper");
const MESSAGES = require("../utils/messages");

const router = express.Router();
router.use(express.json());

// Rota de login de usuários
router.post("/", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: MESSAGES.LOGIN.MISSING_FIELDS });
    }

    const emailNormalizado = email.trim().toLowerCase();
    const users = await executeQuery("SELECT * FROM usuarios WHERE email = ?", [emailNormalizado]);

    if (!users || users.length === 0) {
      return res.status(404).json({ error: MESSAGES.LOGIN.USER_NOT_FOUND });
    }

    const usuario = users[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: MESSAGES.LOGIN.INCORRECT_PASSWORD });
    }

    res.status(200).json({
      message: MESSAGES.LOGIN.SUCCESS,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    console.error("Erro no login de usuário:", err);
    res.status(500).json({ error: MESSAGES.LOGIN.SERVER_ERROR });
  }
});

module.exports = router;