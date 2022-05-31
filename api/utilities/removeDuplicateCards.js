module.exports = (cards) => {
  return cards.filter(
    (card, index, self) =>
      index === self.findIndex((c) => c.class === card.class)
  );
};
