require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Habilita CORS para permitir requisições de diferentes origens
app.use(cors());
app.use(express.json());

// Define diretórios de arquivos estáticos para servir HTML e outros recursos
app.use(
  express.static(path.join(__dirname, "../frontend"), { extensions: ["html", "htm"] })
);
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Importa e define as rotas do módulo de cadastro
const cadastroRoutes = require("./routes/cadastro");
app.use("/cadastro", cadastroRoutes);
app.use("/js", express.static(path.join(__dirname, "../js")));

// Rota raiz para servir o arquivo HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/comum/index.html"));
});

// Rota dinâmica para servir páginas HTML da pasta comum, garantindo segurança na entrada do usuário
app.get("/:page", (req, res) => {
  let page = req.params.page.toLowerCase();
  if (!page.match(/^[a-z0-9-_]+\.html$/i)) {
    return res.status(400).send("Página inválida");
  }
  res.sendFile(path.join(__dirname, `../frontend/comum/${page}`));
});

// Middleware para capturar requisições a páginas inexistentes e retornar erro 404
app.use((req, res, next) => {
  res.status(404).send("Página não encontrada");
});

// Inicia o servidor na porta especificada e exibe a URL no console
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
