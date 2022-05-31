module.exports = function getTopCard(cards) {
  return cards.reduce((previousValue, currentValue) => {
    return previousValue.value < currentValue.value
      ? previousValue
      : currentValue;
  });
};
