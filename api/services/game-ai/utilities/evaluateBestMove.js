module.exports = (checkMove, bestMove) => {
  let newBestMove = bestMove;

  if (checkMove.point < bestMove.point) {
    newBestMove = checkMove;
  }

  return newBestMove;
};
