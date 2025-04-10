require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config");
const routes = require("./routes");

const app = express();

// Middlewares globais
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(config.STATIC_PATH, { extensions: ["html", "htm"] }));
app.use("/assets", express.static(config.ASSETS_PATH));
app.use("/js", express.static(config.JS_PATH));

// Rotas
app.use("/", routes);

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(config.STATIC_PATH, "comum/home.html"));
});

// Rota dinâmica para páginas HTML
app.get("/:page", (req, res) => {
  const page = req.params.page.endsWith(".html") ? req.params.page : `${req.params.page}.html`;
  const filePath = path.join(config.STATIC_PATH, `comum/${page}`);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Erro ao carregar a página: ${filePath}`);
      res.status(404).send("Página não encontrada.");
    }
  });
});

// Middleware para capturar erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor." });
});

// Inicia o servidor na porta especificada
app.listen(config.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${config.PORT}`);
});