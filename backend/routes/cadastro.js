const express = require("express");
const bcrypt = require("bcrypt");
const { executeQuery } = require("../utils/dbhelper");
const validate = require("../middlewares/validate");
const { userSchema } = require("../utils/validation");
const MESSAGES = require("../utils/messages");

const router = express.Router();
router.use(express.json());

// Rota de cadastro de usuários
router.post("/", validate(userSchema), async (req, res) => {
  try {
    const { nome, idade, email, telefone, cep, rua, numero, cidade, senha, tipo_usuario } = req.body;

    const emailNormalizado = email.trim().toLowerCase();
    
    // Correção: executeQuery já retorna um array de resultados
    const existingUsers = await executeQuery("SELECT * FROM usuarios WHERE email = ?", [emailNormalizado]);

    // Verifica se há algum usuário com o email informado
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ error: MESSAGES.CADASTRO.EMAIL_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const sql = `
      INSERT INTO usuarios (nome, idade, email, telefone, cep, rua, numero, cidade, senha, tipo_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // Define o tipo de usuário como 'idoso' por padrão se não for especificado
    const tipoUsuario = tipo_usuario || 'idoso';
    const values = [nome, idade, emailNormalizado, telefone, cep, rua, numero, cidade, hashedPassword, tipoUsuario];

    const result = await executeQuery(sql, values);

    res.status(201).json({ 
      message: MESSAGES.CADASTRO.SUCCESS, 
      id: result.insertId,
      tipo: tipoUsuario
    });
  } catch (err) {
    console.error("Erro no cadastro de usuário:", err);
    res.status(500).json({ error: MESSAGES.CADASTRO.SERVER_ERROR });
  }
});

module.exports = router;
