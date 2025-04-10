const express = require("express");
const { executeQuery } = require("../utils/dbhelper");
const validate = require("../middlewares/validate");
const { medicamentoSchema } = require("../utils/validation");
const MESSAGES = require("../utils/messages");

const router = express.Router();
router.use(express.json());

// Rota para cadastrar medicamento
router.post("/", validate(medicamentoSchema), async (req, res) => {
  try {
    const { nome, data_inicial, data_final, frequencia, hora, dose } = req.body;

    const sql = `
      INSERT INTO medicamentos (nome, data_inicial, data_final, frequencia, hora, dose)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, data_inicial, data_final, frequencia, hora, dose];

    const result = await executeQuery(sql, values);

    res.status(201).json({ message: MESSAGES.MEDICAMENTO.SUCCESS, id: result.insertId });
  } catch (err) {
    console.error("Erro ao cadastrar medicamento:", err);
    res.status(500).json({ error: MESSAGES.MEDICAMENTO.SERVER_ERROR });
  }
});

module.exports = router;