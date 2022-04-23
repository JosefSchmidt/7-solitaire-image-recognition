module.exports = (cards) => {
  cards = cards.sort((cardA, cardB) => {
    if (cardA.value <= cardB.value) return 1;
    if (cardA.value >= cardB.value) return -1;
    return 0;
  });
  return cards;
};
