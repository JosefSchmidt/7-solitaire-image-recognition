module.exports = ({ checkMove, bestMove, previousMoveStack }) => {
  let shouldReturn = false;

  previousMoveStack.forEach((previousMove) => {
    // Prevent infinity circle of moving cards
    if (
      (previousMove &&
        checkMove.from &&
        checkMove.from.card &&
        previousMove.from &&
        previousMove.from.card &&
        checkMove.from.card.value === previousMove.from.card.value) ||
      (previousMove &&
        checkMove.to &&
        checkMove.to.card &&
        previousMove.to &&
        previousMove.to.card &&
        checkMove.to.card.value === previousMove.to.card.value)
    ) {
      shouldReturn = true;
    }
  });

  if (shouldReturn) return bestMove;

  let newBestMove = bestMove;

  if (checkMove.point < bestMove.point) {
    newBestMove = checkMove;
  }

  return newBestMove;
};
