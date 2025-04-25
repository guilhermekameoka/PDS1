const express = require("express");
const { executeQuery } = require("../utils/dbhelper");

const router = express.Router();
router.use(express.json());

// Rota para buscar todos os usuários do tipo idoso
router.get("/idosos", async (req, res) => {
  try {
    const sql = "SELECT id, nome FROM usuarios WHERE tipo_usuario = 'idoso'";
    const usuarios = await executeQuery(sql, []);

    res.status(200).json(usuarios);
  } catch (err) {
    console.error("Erro ao buscar idosos:", err);
    res.status(500).json({ error: "Erro ao buscar a lista de idosos." });
  }
});

module.exports = router;
