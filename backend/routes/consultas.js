const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");


router.post("/", authorizeRoles("medico"), async (req, res) => {
  try {
    const { data, hora, local, observacoes, id_paciente } = req.body;
    const id_medico = req.user.id; 

    if (!data || !hora || !local || !id_paciente) {
      return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    const [pacienteRows] = await db.query(
      'SELECT * FROM usuarios WHERE id = ? AND tipo_usuario = "idoso"',
      [id_paciente]
    );

    if (pacienteRows.length === 0) {
      return res.status(404).json({ error: "Paciente não encontrado ou não é um idoso" });
    }

    const [result] = await db.query(
      "INSERT INTO consultas (data, hora, local, observacoes, id_medico, id_paciente) VALUES (?, ?, ?, ?, ?, ?)",
      [data, hora, local, observacoes, id_medico, id_paciente]
    );

    res.status(201).json({ id: result.insertId, message: "Consulta agendada com sucesso" });
  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
    res.status(500).json({ error: "Erro ao agendar consulta" });
  }
});

router.get("/medico", authorizeRoles("medico"), async (req, res) => {
  try {
    const id_medico = req.user.id;

    const [consultas] = await db.query(
      `SELECT c.*, p.nome as nome_paciente, p.idade as idade_paciente
       FROM consultas c
       JOIN usuarios p ON c.id_paciente = p.id
       WHERE c.id_medico = ?
       ORDER BY c.data ASC, c.hora ASC`,
      [id_medico]
    );

    res.json(consultas);
  } catch (error) {
    console.error("Erro ao listar consultas do médico:", error);
    res.status(500).json({ error: "Erro ao listar consultas" });
  }
});

router.get("/paciente", authorizeRoles("idoso"), async (req, res) => {
  try {
    const id_paciente = req.user.id;

    const [consultas] = await db.query(
      `SELECT c.*, m.nome as nome_medico
       FROM consultas c
       JOIN usuarios m ON c.id_medico = m.id
       WHERE c.id_paciente = ?
       ORDER BY c.data ASC, c.hora ASC`,
      [id_paciente]
    );

    res.json(consultas);
  } catch (error) {
    console.error("Erro ao listar consultas do paciente:", error);
    res.status(500).json({ error: "Erro ao listar consultas" });
  }
});

module.exports = router;
