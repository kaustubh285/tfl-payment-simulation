import simulationEngine from "./simulationEngine";
import config from "./utils/config";

function main() {
  config.init(); // Creates the user_events and the zero value transaction table
  simulationEngine.run();

  // GATEKEEPER
  // WAYPOINTER
  // FARECOLLECTOR
  // Matrix
}

main();
