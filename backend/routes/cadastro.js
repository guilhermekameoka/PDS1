const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db");

const router = express.Router();
router.use(express.json());

// Rota de cadastro de usuários
router.post("/", async (req, res) => {
  try {
    const { nome, idade, email, telefone, cep, rua, numero, cidade, senha } = req.body;

    console.log("Dados recebidos no backend:", req.body);

    // Verifica se os campos obrigatórios foram preenchidos
    if (
      !nome ||
      !idade ||
      !email ||
      !telefone ||
      !cep ||
      !rua ||
      !numero ||
      !cidade ||
      !senha
    ) {
      console.error("Erro: Campos obrigatórios não preenchidos.");
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Verifica se a idade é um número valido
    if (isNaN(idade) || idade <= 0) {
      console.error("Erro: Idade inválida.");
      return res.status(400).json({ error: "Idade deve ser um número válido." });
    }

    // Normaliza o email para evitar duplicação acidental
    const emailNormalizado = email.trim().toLowerCase();

    // Verifica se o email já existe no banco de dados
    const [existingUser] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      emailNormalizado,
    ]);

    if (existingUser.length > 0) {
      console.warn("Tentativa de cadastro com e-mail já existente:", emailNormalizado);
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Gera um hash para a senha antes de inserir no banco
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Query para inserir um novo usuário no banco de dados
    const sql = `INSERT INTO usuarios (nome, idade, email, telefone, cep, rua, numero, cidade, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      nome,
      idade,
      emailNormalizado,
      telefone,
      cep,
      rua,
      numero,
      cidade,
      hashedPassword,
    ];

    console.log("Inserindo dados no banco de dados...");

    // Executa a query no banco de dados
    const [result] = await db.query(sql, values);

    console.log("Usuário cadastrado com sucesso! ID:", result.insertId);
    res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso", id: result.insertId });
  } catch (err) {
    console.error("Erro no cadastro de usuário:", err);
    res
      .status(500)
      .json({ error: "Erro ao cadastrar usuário. Tente novamente mais tarde." });
  }
});

module.exports = router;
