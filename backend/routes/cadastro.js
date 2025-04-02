const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db");

const router = express.Router();

// Rota de cadastro de usuários
router.post("/", (req, res) => {
  const { nome, idade, email, telefone, cep, rua, numero, cidade, senha } = req.body;

  // Verifica se os campos obrigatórios foram preenchidos
  if (!nome || !idade || !email || !senha) {
    return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
  }

  // Verifica se o email já existe no banco de dados
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao verificar usuário existente" });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    // Gera um hash para a senha antes de inserir no banco
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erro ao gerar hash da senha:", err);
        return res.status(500).json({ error: "Erro ao processar a senha" });
      }

      // Query para inserir um novo usuario no banco de dados
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

      // Executa a query no banco de dados
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Erro ao inserir no banco:", err);
          return res
            .status(500)
            .json({ error: "Erro ao cadastrar usuário. Tente novamente mais tarde." });
        }
        res
          .status(201)
          .json({ message: "Usuário cadastrado com sucesso", id: result.insertId });
      });
    });
  });
});

module.exports = router;
