const express = require("express");
const { executeQuery } = require("../utils/dbhelper");
const validate = require("../middlewares/validate");
const { medicamentoSchema } = require("../utils/validation");
const MESSAGES = require("../utils/messages");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();
router.use(express.json());

// Rota para cadastrar medicamento
router.post("/", validate(medicamentoSchema),authorizeRoles("medico"), async (req, res) => {
  try {
    const {
      nome,
      data_inicial,
      data_final,
      frequencia,
      hora,
      dose,
      id_usuario,
      id_medico,
    } = req.body;

    // Verifica se o id_usuario foi fornecido
    if (!id_usuario) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    // Verifica se o id_medico foi fornecido
    if (!id_medico) {
      return res.status(400).json({ error: "ID do médico é obrigatório" });
    }

    const sql = `
      INSERT INTO medicamentos (nome, data_inicial, data_final, frequencia, hora, dose, id_usuario, id_medico)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nome,
      data_inicial,
      data_final,
      frequencia,
      hora,
      dose,
      id_usuario,
      id_medico,
    ];

    const result = await executeQuery(sql, values);

    res
      .status(201)
      .json({ message: MESSAGES.MEDICAMENTO.SUCCESS, id: result.insertId });
  } catch (err) {
    console.error("Erro ao cadastrar medicamento:", err);
    res.status(500).json({ error: MESSAGES.MEDICAMENTO.SERVER_ERROR });
  }
});

// Rota para listar medicamentos de um usuário
router.get("/usuario/:id",authorizeRoles("medico", "idoso"), async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const sql = `
      SELECT m.*, u.nome as medico_nome
      FROM medicamentos m
      LEFT JOIN usuarios u ON m.id_medico = u.id
      WHERE m.id_usuario = ?
      ORDER BY m.data_inicial DESC
    `;

    const medicamentos = await executeQuery(sql, [userId]);

    res.status(200).json(medicamentos);
  } catch (err) {
    console.error("Erro ao listar medicamentos:", err);
    res.status(500).json({ error: "Erro ao buscar medicamentos" });
  }
});

module.exports = router;
