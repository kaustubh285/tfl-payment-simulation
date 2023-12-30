const { Pool } = require("pg");

const dbConfig = {
  user: "developerkd",
  host: "localhost",
  database: "TFL",
  password: 123456,
  port: 5432,
};

const pool = new Pool(dbConfig);
async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    throw error;
  }
}

export default { query };
