require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

// Configuração do servidor
const config = {
  port: process.env.PORT || 3000,
  allowedFolders: ["comum", "medico", "idoso", "cuidador", "css"]
};

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(helmet());

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "../frontend"), { extensions: ["html", "htm"] }));
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/js", express.static(path.join(__dirname, "../js")));
app.use("/medico", express.static(path.join(__dirname, "../frontend/medico")));

// Importação e uso de rotas modulares
const cadastroRoutes = require("./routes/cadastro");
const regMedicamentoRoutes = require("./routes/regMedicamento");

app.use("/cadastro", cadastroRoutes);
app.use("/medicamentos", regMedicamentoRoutes);

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/comum/index.html"));
});

// Rota dinâmica para páginas HTML
app.get("/:folder/:page", (req, res) => {
  const { folder, page } = req.params;

  if (!config.allowedFolders.includes(folder.toLowerCase()) || !page.match(/^[a-z0-9-_]+\.html$/i)) {
    return res.status(400).send("Página inválida");
  }

  res.sendFile(path.join(__dirname, `../frontend/${folder}/${page}`));
});

// Middleware para capturar erros 404
app.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

// Middleware global para tratamento de erros
app.use((err, req, res, next) => {
  console.error("Erro interno:", err.stack);
  res.status(500).send("Erro interno do servidor");
});

// Iniciando servidor
app.listen(config.port, () => {
  console.log(`Servidor rodando em http://localhost:${config.port}`);
});