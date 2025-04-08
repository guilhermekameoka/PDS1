require("dotenv").config();
 const express = require("express");
 const cors = require("cors");
 const bodyParser = require("body-parser");
 const path = require("path");
 
 const app = express();
 const port = process.env.PORT || 3000;
 
 app.use(cors());
 app.use(bodyParser.json());
 app.use(express.static(path.join(__dirname, "../frontend"), { extensions: ['html', 'htm'] }));
 app.use("/assets", express.static(path.join(__dirname, "../assets")));
 
 const cadastroRoutes = require("./routes/cadastro");
 app.use("/cadastro", cadastroRoutes);
 app.use("/js", express.static(path.join(__dirname, "../js")));
 
 const loginRoutes = require("./routes/login");
 app.use("/login", loginRoutes);
 
 app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "../frontend/comum/home.html"));
 });
 
 app.get("/:page", (req, res) => {
   let page = req.params.page;
   if (!page.endsWith(".html")) {
     page += ".html";
   }
   res.sendFile(path.join(__dirname, `../frontend/comum/${page}`));
 });
 
 // Inicia o servidor na porta especificada
 app.listen(port, () => {
   console.log(`Servidor rodando em http://localhost:${port}`);
 });