const express = require("express");
const db = require("../database/db");
const { medicamentoSchema } = require("../utils/validation");

const router = express.Router();
router.use(express.json());

// Rota para cadastrar medicamento
router.post("/", async (req, res) => {
  try {
    const { error } = medicamentoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nome, data_inicial, data_final, frequencia, hora, dose } = req.body;

    // Query de inserção
    const sql = `
      INSERT INTO medicamentos (nome, data_inicial, data_final, frequencia, hora, dose)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, data_inicial, data_final, frequencia, hora, dose];

    // Executa a inserção no banco utilizando execute
    const [result] = await db.execute(sql, values);

    res.status(201).json({ message: "Medicamento cadastrado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao cadastrar medicamento:", err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;