require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

// npm install express mysql2 dotenv cors body-parser bcrypt

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const cadastroRoutes = require("./cadastro");
app.use("/cadastro", cadastroRoutes);

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
