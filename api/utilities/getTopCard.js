module.exports = function getTopCard(cards) {
  if (!cards || (Array.isArray(cards) && cards.length === 0)) return null;

  return cards.reduce((previousValue, currentValue) => {
    return previousValue.value < currentValue.value
      ? previousValue
      : currentValue;
  });
};
