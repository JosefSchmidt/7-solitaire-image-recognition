module.exports = (checkMove, bestMove) => {
  let newBestMove = bestMove;
  if(bestMove === undefined){
    newBestMove = checkMove;
  } else if (checkMove.point < bestMove.point) {
    newBestMove = checkMove;
  }

  return newBestMove;
};
