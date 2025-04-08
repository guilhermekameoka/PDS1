const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db");
const { userSchema } = require("../utils/validation");

const router = express.Router();
router.use(express.json());

// Rota de cadastro de usuários
router.post("/", async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nome, idade, email, telefone, cep, rua, numero, cidade, senha } = req.body;

    const emailNormalizado = email.trim().toLowerCase();

    const [existingUser] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      emailNormalizado,
    ]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const sql = `INSERT INTO usuarios (nome, idade, email, telefone, cep, rua, numero, cidade, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nome, idade, emailNormalizado, telefone, cep, rua, numero, cidade, hashedPassword];

    const [result] = await db.query(sql, values);

    res.status(201).json({ message: "Usuário cadastrado com sucesso", id: result.insertId });
  } catch (err) {
    console.error("Erro no cadastro de usuário:", err);
    res.status(500).json({ error: "Erro ao cadastrar usuário. Tente novamente mais tarde." });
  }
});

module.exports = router;
