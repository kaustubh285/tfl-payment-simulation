import { Person, Card, db_zvt_fetch } from "../typings.d";
import { database_entry } from "./controllers/Gatekeeper";
import { waypointer } from "./controllers/Waypointer";
import { getStationNames, isValidStation } from "./utils/helper";

const stationNames = getStationNames(); // Assuming you have a function to retrieve station names
export class User {
  card: Card;
  data: Person;
  constructor(id, cardId) {
    this.card = {
      id: cardId,
    };

    this.data = {
      id: id,
      card: this.card,
    };
  }
}

export type Event = {
  user: User;
  eventType: "entry" | "exit" | "EOD";
  location: string;
  zone: number;
  time: string;
};

export const simulatedEvent = async ({
  user,
  eventType,
  location,
  zone,
  time,
}: Event): Promise<void> => {
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

  switch (eventType) {
    case "entry":
    case "exit":
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
          transaction_type: eventType,
          location,
          zone,
          date: time,
        }
      );
      break;

    case "EOD":

    default:
      break;
  }
};

async function run() {
  const users = [
    new User("1", "applePay1234"),
    new User("2", "googlePay9824"),
    new User("3", "card:_encrypt_983394"),
  ];

  const events = [
    {
      user: users[0],
      eventType: "entry",
      location: "Victoria",
      zone: 1,
      time: "2023-01-10T19:30:00",
    },
    {
      user: users[0],
      eventType: "exit",
      location: "Vauxhall",
      zone: 2,
      time: "2023-01-10T20:00:00",
    },
    {
      user: users[1],
      eventType: "entry",
      location: "Waterloo",
      zone: 1,
      time: "2023-01-10T14:30:00",
    },
    {
      user: users[1],
      eventType: "exit",
      location: "South Hampstead",
      zone: 1,
      time: "2023-01-10T19:13:20",
    },
    {
      user: users[2],
      eventType: "entry",
      location: "Bayswater",
      zone: 1,
      time: "2023-01-10T15:00:20",
    },
    {
      user: users[2],
      eventType: "exit",
      location: "Green Park",
      zone: 1,
      time: "2023-01-10T16:30:05",
    },
    {
      user: users[0],
      eventType: "entry",
      location: "Vauxhall",
      zone: 2,
      time: "2023-01-10T20:30:00",
    },
    {
      user: users[0],
      eventType: "exit",
      location: "Warren Street",
      zone: 1,
      time: "2023-01-10T21:39:00",
    },
  ];

  // events.forEach((event: Event) => {
  //   simulatedEvent(event);
  // });

  // EVENT: End of Day
  await waypointer();
}

export default { run };
