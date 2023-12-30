export type Person = {
  id: string;
  card: Card;
};

export type Card = {
  id: string;
};

export type ZeroValueTransaction = {
  location: string;
  zone: string;
  datetime: string;
  card: Card;
  user: Person;
};

export type UserEvent = {
  user: Person;
  datetime: string;
  type: string; // eg user enters, user leaves station etc.
};

export interface Station {
  name: string;
  zone: number;
  lines: LineStation[];
}

export interface LineStation {
  name: string;
  order: number;
}

export interface Line {
  name: string;
  stations: StationOrder[];
}

export interface StationOrder {
  name: string;
  order: number;
}

export interface TrainlineData {
  stations: Station[];
  lines: Line[];
}
