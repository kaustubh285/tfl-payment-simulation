import trainJson from "../information/trainline.json";
import { Person, TrainlineData, db_zvt_fetch } from "../../typings";

// Helper function to get station names from the configuration file
export function getStationNames(): string[] {
  // Assuming your configuration file is stored in a variable called 'trainLineConfig'
  const trainlineJson: TrainlineData = trainJson;
  const stationNames = trainlineJson.stations.map((station) => station.name);
  return stationNames;
}

// Helper function to check if a given location is a valid station name
export function isValidStation(
  location: string,
  validStationNames: string[]
): boolean {
  return validStationNames.includes(location);
}

export const groupBy = function (xs, key) {
  let temp = xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
  return Object.values(temp);
};

export function checkNumberOfZones(travelData: db_zvt_fetch[]) {
  let travel_zone = [];
  travelData.forEach((event) => {
    if (!travel_zone.includes(event.zone)) travel_zone.push(event.zone);
  });

  return travel_zone.length;
}

export function checkNumberOfEntryTransactions(travelData) {
  // Implement your logic here
  // Example: Check if the user has more than 1 entry transaction
  return travelData.filter(
    (transaction) => transaction.transaction_type === "entry"
  );
}

export function getChargeCap(numberOfZones: number): number {
  // Implement your logic here
  // Example: Return the payment cap based on the number of zones
  switch (numberOfZones) {
    case 0:
    case 1:
      return 8.5;
    case 2:
      return 9.5;
    default:
      return 0; // Handle other cases as needed
  }
}
