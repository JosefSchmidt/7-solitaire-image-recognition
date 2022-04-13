module.exports = function getBottomCard(cards) {
  return cards.reduce((previousValue, currentValue) => {
    return previousValue.value > currentValue.value
      ? previousValue
      : currentValue;
  });
};
