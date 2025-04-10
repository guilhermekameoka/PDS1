const db = require("../database/db");

const executeQuery = async (sql, values) => {
  try {
    const [result] = await db.execute(sql, values);
    return result;
  } catch (err) {
    console.error("Erro ao executar query:", err);
    throw err;
  }
};

module.exports = { executeQuery };