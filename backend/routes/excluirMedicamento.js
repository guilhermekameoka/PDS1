const express = require("express");
const { executeQuery } = require("../utils/dbhelper");
const router = express.Router();
router.use(express.json());

// Rota para excluir um medicamento
router.delete("/:id", async (req, res) => {
  try {
    const medicamentoId = req.params.id;

    if (!medicamentoId) {
      return res.status(400).json({ error: "ID do medicamento é obrigatório" });
    }

    // Verifica se o medicamento existe antes de excluir
    const checkSql = "SELECT * FROM medicamentos WHERE id = ?";
    const medicamento = await executeQuery(checkSql, [medicamentoId]);

    if (medicamento.length === 0) {
      return res.status(404).json({ error: "Medicamento não encontrado" });
    }

    // Exclui o medicamento
    const deleteSql = "DELETE FROM medicamentos WHERE id = ?";
    await executeQuery(deleteSql, [medicamentoId]);

    res.status(200).json({ message: "Medicamento excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir medicamento:", err);
    res.status(500).json({ error: "Erro ao excluir medicamento" });
  }
});

module.exports = router;
