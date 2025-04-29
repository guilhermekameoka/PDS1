const express = require("express");
const bcrypt = require("bcryptjs");
const { executeQuery } = require("../utils/dbhelper");
const validate = require("../middlewares/validate");
const { userSchema } = require("../utils/validation");
const MESSAGES = require("../utils/messages");

const router = express.Router();
router.use(express.json());

// Rota de cadastro de usuários
// Rota POST para criação de um novo usuário
// Aplica validação do corpo da requisição com base no schema definido
router.post("/", validate(userSchema), async (req, res) => {
  try {
    const {
      nome,
      idade,
      email,
      telefone,
      cep,
      rua,
      numero,
      cidade,
      senha,
      tipo_usuario,
    } = req.body;

    // Normaliza o email para evitar duplicidades causadas por letras maiúsculas ou espaços extras
    const emailNormalizado = email.trim().toLowerCase();

    // Verifica se já existe um usuário cadastrado com o mesmo email
    const existingUsers = await executeQuery(
      "SELECT * FROM usuarios WHERE email = ?",
      [emailNormalizado]
    );

    // Se já houver usuário com o mesmo email, retorna erro
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ error: MESSAGES.CADASTRO.EMAIL_EXISTS });
    }

    // Criptografa a senha utilizando o algoritmo bcrypt com salt de 10 rounds
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Query SQL para inserir o novo usuário na tabela 'usuarios'
    const sql = `
      INSERT INTO usuarios (nome, idade, email, telefone, cep, rua, numero, cidade, senha, tipo_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Caso o tipo de usuário não seja informado, define como 'idoso' por padrão
    const tipoUsuario = tipo_usuario || "idoso";
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
      tipoUsuario,
    ];

    // Retorna resposta de sucesso com ID do novo usuário e o tipo definido
    const result = await executeQuery(sql, values);

    res.status(201).json({
      message: MESSAGES.CADASTRO.SUCCESS,
      id: result.insertId,
      tipo: tipoUsuario,
    });
  } catch (err) {
    // Em caso de erro inesperado, registra o erro e retorna resposta 500
    console.error("Erro no cadastro de usuário:", err);
    res.status(500).json({ error: MESSAGES.CADASTRO.SERVER_ERROR });
  }
});

module.exports = router;
