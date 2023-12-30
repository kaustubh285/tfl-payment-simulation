import { Person, TrainlineData } from "../../typings";
import db from "../utils/db";
import trainJson from "../information/trainline.json";
import { User } from "../simulationEngine";

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

const stationNames = getStationNames(); // Assuming you have a function to retrieve station names

export const simulatedEvent = async (
  user: User,
  type: "entry" | "exit",
  location: string,
  zone: number,
  time: string
): Promise<void> => {
  // Event triggers multiple things based on the type
  if (!isValidStation(location, stationNames)) {
    console.error(`Invalid station name: ${location}`);
    return;
  }
  /**
  person entered or exited underground station
  Database entry in user_events table
  ZVT will be triggered
  Database entry in zvt table
   */

  database_entry(
    {
      user_id: user.data.id,
      card_id: user.data.card.id,
      location,
      zone,
      date: time,
    },
    {
      user_id: user.data.id,
      card_id: user.card.id,
      transaction_type: type,
      location,
      zone,
      date: time,
    }
  );
};

// Helper function to get station names from the configuration file
function getStationNames(): string[] {
  // Assuming your configuration file is stored in a variable called 'trainLineConfig'
  const trainlineJson: TrainlineData = trainJson;
  const stationNames = trainlineJson.stations.map((station) => station.name);
  return stationNames;
}

// Helper function to check if a given location is a valid station name
function isValidStation(
  location: string,
  validStationNames: string[]
): boolean {
  return validStationNames.includes(location);
}
