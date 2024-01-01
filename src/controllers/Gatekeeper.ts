import db from "../utils/db";

type UserEvent = {
  user_id: string;
  card_id: string;
  location: string;
  zone: number;
  date: string;
};

type ZeroValueTransaction = {
  user_id: string;
  card_id: string;
  transaction_type: "entry" | "exit";
  location?: string;
  zone: number;
  date: string;
  event_id?: number;
};

export const database_entry = async (
  user_event: UserEvent,
  zero_value_transactions: ZeroValueTransaction
) => {
  try {
    const insertUserEventQuery = `
      INSERT INTO user_event (user_id, card_id, location, zone, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING event_id;`;

    const userEventResults = await db.query(insertUserEventQuery, [
      user_event.user_id,
      user_event.card_id,
      user_event.location,
      user_event.zone,
      user_event.date,
    ]);

    const event_id = userEventResults.rows[0].event_id;

    const insertZeroValueTransactionQuery = `
      INSERT INTO zero_value_transactions (user_id, card_id, transaction_type, location, zone, date, event_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;

    await db.query(insertZeroValueTransactionQuery, [
      zero_value_transactions.user_id,
      zero_value_transactions.card_id,
      zero_value_transactions.transaction_type,
      zero_value_transactions.location,
      zero_value_transactions.zone,
      zero_value_transactions.date,
      event_id,
    ]);

    console.log("USER ENTRY CREATED SUCCESSFULLY");
  } catch (err) {
    console.error("Error occurred while inserting data!!", err);
  }
};
