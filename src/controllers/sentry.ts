import db from "../utils/db";

async function try_db() {
  try {
    const results = await db.query("SELECT NOW()");
    return { message: "Query successful", data: results.rows };
  } catch (error) {
    throw error;
  }
}

async function new_trial() {
  return { message: "POST new tea" }; // dummy function for now
}

export { try_db, new_trial };
