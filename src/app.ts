import dotenv from "dotenv";

dotenv.config();

import config from "./config";
import { try_db, new_trial } from "./controllers/sentry";

async function main() {
  try {
    const result = await try_db();
    console.log(result);

    const trialResult = await new_trial();
    console.log(trialResult);
  } catch (error) {
    console.error("Error:", error);
  }
}

config.configure_db();
main();
