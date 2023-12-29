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

function SimulationEngine() {
  const Alice = new User("1", "applePay1234");
  const Bob = new User("2", "applePay1234");
  const Julia = new User("3", "applePay1234");
}

module.exports = SimulationEngine;
