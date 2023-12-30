import { Person, Card } from "../typings.d";
import { simulatedEvent } from "./controllers/Gatekeeper";

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

type Event = {
  user: User;
  eventType: "entry" | "exit";
  location: string;
  zone: number;
  time: string;
};

function run() {
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

  events.forEach(({ user, eventType, location, zone, time }: Event) => {
    simulatedEvent(user, eventType, location, zone, time);
  });
}

export default { run };
