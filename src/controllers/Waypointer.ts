import db from "../utils/db";

export const wayFinder = async () => {
  const searchResult = await db.query(
    // "SELECT * FROM zero_value_transactions WHERE DATE(created_at) = CURRENT_DATE;"
    "SELECT * FROM zero_value_transactions"
  );
  return searchResult.rows;
};
