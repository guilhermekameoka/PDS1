const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    process.exit(1); // Finaliza o processo em caso de erro na conexão
  } else {
    console.log("Conectado ao MySQL");
  }
});

module.exports = db;
