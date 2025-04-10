const express = require("express");
const cadastroRoutes = require("./cadastro");
const loginRoutes = require("./login");
const regMedicamentoRoutes = require("./regMedicamento");

const router = express.Router();

router.use("/cadastro", cadastroRoutes);
router.use("/login", loginRoutes);
router.use("/medicamento", regMedicamentoRoutes);

module.exports = router;