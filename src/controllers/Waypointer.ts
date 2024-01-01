import { db_zvt_fetch } from "../../typings";
import db from "../utils/db";
import { groupBy } from "../utils/helper";

const get_event_logs = async () => {
  const searchResult = await db.query(
    // "SELECT * FROM zero_value_transactions WHERE DATE(created_at) = CURRENT_DATE;"
    "SELECT * FROM zero_value_transactions"
  );
  return searchResult.rows;
};

export const waypointer = async () => {
  const data: db_zvt_fetch[] = await get_event_logs();

  const groupedData = groupBy(data, "user_id");

  groupedData.forEach((travel: db_zvt_fetch[]) => {
    // Check Number of zones travelled

    // Check number of entry

    // Check time of the entry

    let travel_zone = [];
    travel.forEach((event) => {
      if (!travel_zone.includes(event.zone)) travel_zone.push(event.zone);
    });

    console.log(travel_zone);

    switch (travel_zone.length) {
      case 0:
        console.log("USER PAYMENT 8.50");
        break;
      case 1:
        console.log("USER PAYMENT 8.50");
        break;
      case 2:
        console.log("USER PAYMENT 9.50");
        break;
    }
  });
};
