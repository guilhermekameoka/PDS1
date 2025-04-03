require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Habilita CORS e JSON
app.use(cors());
app.use(express.json());

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "../frontend"), { extensions: ["html", "htm"] }));
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/js", express.static(path.join(__dirname, "../js")));
app.use("/medico", express.static(path.join(__dirname, "../frontend/medico")));

// Importação de rotas
const cadastroRoutes = require("./routes/cadastro");
const regMedicamentoRoutes = require("./routes/regMedicamento");

app.use("/cadastro", cadastroRoutes);
app.use("/medicamentos", regMedicamentoRoutes);

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/comum/index.html"));
});

// Rota dinâmica para páginas HTML
app.get("/:page", (req, res) => {
  let page = req.params.page.toLowerCase();
  if (!page.match(/^[a-z0-9-_]+\.html$/i)) {``
    return res.status(400).send("Página inválida");
  }
  res.sendFile(path.join(__dirname, `../frontend/comum/${page}`));
});

// Middleware para capturar erros 404
app.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

// Iniciando servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});