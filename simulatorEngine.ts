class User {
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

export default { User };
