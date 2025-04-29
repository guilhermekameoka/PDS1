const express = require("express");
const bcrypt = require("bcryptjs");
const { executeQuery } = require("../utils/dbhelper");
const MESSAGES = require("../utils/messages");

const router = express.Router();
router.use(express.json());

// Rota POST para login de usuários
// Verifica credenciais e retorna informações do usuário autenticado
router.post("/", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se os campos de email e senha foram preenchidos
    if (!email || !senha) {
      return res.status(400).json({ error: MESSAGES.LOGIN.MISSING_FIELDS });
    }

    // Normaliza o email removendo espaços e convertendo para minúsculas
    const emailNormalizado = email.trim().toLowerCase();

    // Busca usuário no banco de dados pelo email informado
    const users = await executeQuery("SELECT * FROM usuarios WHERE email = ?", [
      emailNormalizado,
    ]);

    // Verifica se o usuário foi encontrado
    if (!users || users.length === 0) {
      return res.status(404).json({ error: MESSAGES.LOGIN.USER_NOT_FOUND });
    }

    const usuario = users[0];

    // Compara a senha informada com a senha criptografada no banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    // Se a senha estiver incorreta, retorna erro de autenticação
    if (!senhaCorreta) {
      return res.status(401).json({ error: MESSAGES.LOGIN.INCORRECT_PASSWORD });
    }

    // Se a autenticação for bem sucedida, retorna os dados do usuário
    res.status(200).json({
      message: MESSAGES.LOGIN.SUCCESS,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo_usuario || "idoso",
      },
    });
  } catch (err) {
    // Em caso de erro inesperado, registra o erro no console e retorna erro 500
    console.error("Erro no login de usuário:", err);
    res.status(500).json({ error: MESSAGES.LOGIN.SERVER_ERROR });
  }
});

module.exports = router;
