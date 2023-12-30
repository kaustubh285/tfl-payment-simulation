import db from "../utils/db";
import User from "../../simulatorEngine";
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

const database_entry = async (
  user_event: UserEvent,
  zero_value_transactions: ZeroValueTransaction
) => {
  try {
    let insert_query = `INSERT INTO user_event (user_id, card_id, location,zone, date) VALUES(${user_event.user_id},${user_event.card_id},${user_event.location},${user_event.zone},${user_event.date}) RETURNING event_id;`;

    const userEventResults = await db.query(insert_query);

    const event_id = userEventResults.rows[0].event_id;

    insert_query = `INSERT INTO zero_value_transactions (user_id, card_id, transaction_type, location,zone, date, event_id) VALUES(${zero_value_transactions.user_id},${zero_value_transactions.card_id},${zero_value_transactions.transaction_type},${zero_value_transactions.location},${zero_value_transactions.zone},${zero_value_transactions.date}, ${event_id})`;

    const zeroValueTransactionResults = await db.query(insert_query);

    console.log("USER ENTRY CREATED SUCCESSFULLY");
  } catch (err) {
    console.error("Error occuered while inserting data!!", err);
  }
};

const event = async (
  user: Person,
  type: string,
  location: string,
  zone: number,
  time: string
) => {
  // Event triggers multiple things based on the type

  switch (type) {
    case "entry":
    case "exit":
      database_entry(
        {
          user_id: user.id,
          card_id: user.card.id,
          location,
          zone,
          date: time,
        },
        {
          user_id: user.id,
          card_id: user.card.id,
          transaction_type: type,
          location,
          zone,
          date: time,
        }
      );
      // person entered or exited underground station
      // Database entry in user_events table
      // ZVT will be triggered
      // Database entry in zvt table
      break;
    default:
      break;
  }
};

export { try_db, new_trial };
