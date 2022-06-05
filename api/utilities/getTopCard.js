module.exports = function getTopCard(cards) {
  if (!cards || (Array.isArray(cards) && cards.length === 0)) return [];

  return cards.reduce((previousValue, currentValue) => {
    return previousValue.value < currentValue.value
      ? previousValue
      : currentValue;
  });
};
