const express = require("express");
const cadastroRoutes = require("./cadastro");
const loginRoutes = require("./login");
const regMedicamentoRoutes = require("./regMedicamento");
const usuariosRoutes = require("./usuarios");
const consultasRoutes = require("./consultas");

const router = express.Router();

router.use("/cadastro", cadastroRoutes);
router.use("/login", loginRoutes);
router.use("/medicamento", regMedicamentoRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/consulta", consultasRoutes);

module.exports = router;