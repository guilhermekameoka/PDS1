const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const { executeQuery } = require("../utils/dbhelper");
const MESSAGES = require("../utils/messages");

const router = express.Router();
router.use(express.json());

const SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto"; 

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

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        tipo: usuario.tipo_usuario || "idoso"
      },
      SECRET,
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: MESSAGES.LOGIN.SUCCESS,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo_usuario || "idoso"
      },
      token, 
    });
    console.log(token);
    console.log(SECRET);
  } catch (err) {
    console.error("Erro no login de usuário:", err);
    res.status(500).json({ error: MESSAGES.LOGIN.SERVER_ERROR });
  }
});

module.exports = router;
