const { Pool } = require("pg");

const dbConfig = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
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

/*
const db_config = {
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
  };

  const pool = new Pool(db_config);

  console.log(await pool.query("SELECT NOW()"));

  const client = new Client(db_config);

  await client.connect();
  console.log(await client.query("SELECT NOW()"));

  await client.end(); */
