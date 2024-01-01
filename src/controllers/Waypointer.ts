import { JourneyEntry, db_zvt_fetch } from "../../typings";
import db from "../utils/db";
import {
  checkNumberOfEntryTransactions,
  checkNumberOfZones,
  getChargeCap,
  groupBy,
} from "../utils/helper";

const get_event_logs = async () => {
  const searchResult = await db.query(
    // "SELECT * FROM zero_value_transactions WHERE DATE(created_at) = CURRENT_DATE;"
    "SELECT * FROM zero_value_transactions"
  );
  return searchResult.rows;
};

function generateJourneyEntries(travelData: db_zvt_fetch[]): JourneyEntry[] {
  const journeyEntries: JourneyEntry[] = [];

  let currentEntry: JourneyEntry | null = null;

  // Sort the travel - transaction date
  const sortedTravelData = travelData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Process each transaction
  for (const transaction of sortedTravelData) {
    if (transaction.transaction_type === "entry") {
      currentEntry = {
        user_id: transaction.user_id,
        from_location: transaction.location,
        from_zone: transaction.zone,
        to_location: "",
        to_zone: 0,
        from_time: transaction.date,
        to_time: "",
      };
    } else if (transaction.transaction_type === "exit" && currentEntry) {
      // If an exit is encountered, update the current journey entry
      currentEntry.to_location = transaction.location;
      currentEntry.to_zone = transaction.zone;
      currentEntry.to_time = transaction.date;

      journeyEntries.push(currentEntry);

      // Reset the current entry to null
      currentEntry = null;
    }
  }

  if (journeyEntries.length !== travelData.length / 2) {
    journeyEntries.push({
      user_id: travelData[0].user_id,
      from_location: "START",
      from_zone: 0,
      to_location: "END", // Placeholder, will be updated when an exit is encountered
      to_zone: 5, // Placeholder, will be updated when an exit is encountered
      from_time: travelData[0].date,
      to_time: travelData[0].date, // Placeholder, will be updated when an exit is encountered
    });
  }

  return journeyEntries;
}

export const waypointer = async () => {
  const data: db_zvt_fetch[] = await get_event_logs();

  const groupedData = groupBy(data, "user_id");

  groupedData.forEach((userTravelData: db_zvt_fetch[]) => {
    /*
    // Check Number of zones travelled ✅

    // Check number of entry

    // Check time of the entry, because 1 entry event covers the charge of all entries within the next 1 hour. But this does not apply to the 2nd tap within that hour.

    const numberOfZones = checkNumberOfZones(travel);

    const numberOfEntryTaps = checkNumberOfEntryTransactions(travel);

    const paymentCap = getChargeCap(numberOfZones);
    console.log(`USER PAYMENT cap is ${paymentCap}`);
    */

    const journeyEntries = generateJourneyEntries(userTravelData);

    console.log("JOURNEYYYYYY");
    console.log(journeyEntries);
  });
};
