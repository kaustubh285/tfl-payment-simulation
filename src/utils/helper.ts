import trainJson from "../information/trainline.json";
import { Person, TrainlineData } from "../../typings";

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
