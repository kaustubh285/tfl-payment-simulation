import { Person, Card, db_zvt_fetch } from "../typings.d";
import { database_entry } from "./controllers/Gatekeeper";
import { wayFinder } from "./controllers/Waypointer";
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

var groupBy = function (xs, key) {
  let temp = xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
  return Object.values(temp);
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
      zone: 1,
      time: "2023-01-10T21:39:00",
    },
    {
      user: users[1],
      eventType: "entry",
      location: "Waterloo",
      zone: 1,
      time: "2023-01-10T12:30:00",
    },
    {
      user: users[1],
      eventType: "exit",
      location: "South Hampstead",
      zone: 1,
      time: "2023-01-10T01:13:20",
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
      eventType: "entry",
      location: "Green Park",
      zone: 1,
      time: "2023-01-10T16:30:05",
    },
  ];

  // events.forEach((event: Event) => {
  //   simulatedEvent(event);
  // });
  console.log("************************");
  const data: db_zvt_fetch[] = await wayFinder();

  const groupedData = groupBy(data, "user_id");

  groupedData.forEach((travel: db_zvt_fetch[]) => {
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
        console.log("USER PAYMENT 9.50");
        break;
      case 2:
        console.log("USER PAYMENT 10.50");
        break;
    }
  });
}

export default { run };
