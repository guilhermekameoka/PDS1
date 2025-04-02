const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db");

const router = express.Router();

// Rota de cadastro de usuários
router.post("/", (req, res) => {
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

  // Verifica se o email já existe no banco de dados
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Erro ao verificar usuário existente:", err);
      return res.status(500).json({ error: "Erro ao verificar usuário existente." });
    }

    if (results.length > 0) {
      console.warn("Tentativa de cadastro com e-mail já existente:", email);
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Gera um hash para a senha antes de inserir no banco
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erro ao gerar hash da senha:", err);
        return res.status(500).json({ error: "Erro ao processar a senha." });
      }

      // Query para inserir um novo usuário no banco de dados
      const sql = `INSERT INTO usuarios (nome, idade, email, telefone, cep, rua, numero, cidade, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        nome,
        idade,
        email,
        telefone,
        cep,
        rua,
        numero,
        cidade,
        hashedPassword,
      ];

      console.log("Inserindo dados no banco de dados...");

      // Executa a query no banco de dados
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Erro ao inserir no banco:", err);
          return res
            .status(500)
            .json({ error: "Erro ao cadastrar usuário. Tente novamente mais tarde." });
        }

        console.log("Usuário cadastrado com sucesso! ID:", result.insertId);
        res
          .status(201)
          .json({ message: "Usuário cadastrado com sucesso", id: result.insertId });
      });
    });
  });
});

module.exports = router;
