type Person = {
  id: string;
  card: Card;
};

type Card = {
  id: string;
};

type ZeroValueTransaction = {
  location: string;
  zone: string;
  datetime: string;
  card: Card;
  user: Person;
};

type UserEvent = {
  user: Person;
  datetime: string;
  type: string; // eg user enters, user leaves station etc.
};
