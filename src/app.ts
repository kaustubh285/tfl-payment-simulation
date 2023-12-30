import dotenv from "dotenv";

dotenv.config();

import config from "./config";
// import simulation from "./simulation";
import { try_db, new_trial } from "./controllers/sentry";

async function dummy() {
  try {
    const result = await try_db();
    console.log(result);

    const trialResult = await new_trial();
    console.log(trialResult);
  } catch (error) {
    console.error("Error:", error);
  }
}

function main() {
  config.configure_db();
  // simulation.simulationEngine();
}

main();

/*
    event_id - 1
    user_id - aslkdmaslkd
    card_id - abcd123
    location - "Bond Street"
    zone - 1
    datetime - 29-12-2023T13:05:05


        event_id - 2
    user_id - aslkdmaslkd
    card_id - abcd123
    location - "Sloan Square"
    zone - 1
    datetime - 29-12-2023T13:17:21
*/
