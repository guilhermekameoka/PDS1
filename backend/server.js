require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

// npm install express mysql2 dotenv cors body-parser bcrypt

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// Rota para cadastro de usuários
app.post("/cadastro", (req, res) => {
  const { nome, idade, email, telefone, cep, rua, numero, cidade, senha } = req.body;

  // Verifica se os campos obrigatórios foram preenchidos
  if (!nome || !idade || !email || !senha) {
    return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
  }

  // Gera um hash para a senha antes de inserir no banco
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Erro ao gerar hash da senha:", err);
      return res.status(500).json({ error: "Erro ao processar a senha" });
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
      hashedPassword, // Senha armazenada como hash
    ];

    // Executa a query no banco de dados
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir no banco:", err);
        return res.status(500).json({ error: "Erro ao cadastrar usuário" });
      }
      res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso", id: result.insertId });
    });
  });
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
