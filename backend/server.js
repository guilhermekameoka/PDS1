require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// npm install express dotenv cors body-parser

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const cadastroRoutes = require("./routes/cadastro");
app.use("/cadastro", cadastroRoutes);

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
