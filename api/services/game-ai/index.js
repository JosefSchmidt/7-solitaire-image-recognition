//utilities
const colemnString = require("./config/colemnString");

const { move, draw } = { move: "move", draw: "draw" };

module.exports = function ({ talon, foundation, stacks }) {
  let checkMove = {};
  let bestMove = { from: "", to: "", point: 100 };
  let outputMove = {};

  try {
    // if talon is empty draw
    if (Object.keys(talon).length === 0) return { action: draw };

    stacks.forEach(({ cards }) => {
      cards.forEach((card) => {
        stacks.forEach(({ topCard }, index) => {
          let stringStack = colemnString(index);

          // talon to stack
          // move from talon to stack
          if (
            topCard.color !== talon.color &&
            topCard.value - talon.value === 1
          ) {
            checkMove = { from: talon.class, to: topCard.class, point: 20 };
            return (outputMove = bestMoveFunction(checkMove));
          }

          //Stack
          //king to column
          if (Object.keys(topCard).length === 0 && card.value === 13) {
            checkMove = { from: card.class, to: stringStack, point: 2 };
            return (outputMove = bestMoveFunction(checkMove));
          }

          //Check if move is valid
          if (card.color === topCard.color || topCard.value - card.value !== 1)
            return;

          //move card if valid
          checkMove = { from: card.class, to: topCard.class, point: 5 };
          return (outputMove = bestMoveFunction(checkMove));
        });

        foundation.forEach((foundationCard) => {
          //talon to foundation
          //bigger than 2
          if (
            talon.suit === foundationCard.suit &&
            talon.value - foundationCard.value === 1 &&
            talon.value > 2
          ) {
            checkMove = {
              from: talon.class,
              to: foundationCard.class,
              point: 4,
            };
            return (outputMove = bestMoveFunction(checkMove));
          }

          //from 2 and down
          if (
            talon.suit === foundationCard.suit &&
            talon.value - foundationCard.value === 1 &&
            talon.value < 3
          ) {
            checkMove = {
              from: talon.class,
              to: foundationCard.class,
              point: 1,
            };
            return (outputMove = bestMoveFunction(checkMove));
          }

          //ace
          if (talon.value === 1) {
            checkMove = { from: talon.class, to: "f", point: 0 };
            return (outputMove = bestMoveFunction(checkMove));
          }

          //stack to foundation
          //empty foundation
          if (card.value === 1) {
            checkMove = { from: card.class, to: "f", point: 0 };
            return (outputMove = bestMoveFunction(checkMove));
          }

          // Check if move is valid
          if (
            card.color !== foundationCard.color ||
            card.value - foundationCard.value !== 1
          )
            return;

          //Same suit in foundation under 3
          if (card.suit === foundationCard.suit && card.value < 3) {
            checkMove = {
              from: card.class,
              to: foundationCard.class,
              point: 2,
            };
            return (outputMove = bestMoveFunction(checkMove));
          }

          //Same suit in foundation bigger than 2
          if (talon.suit === foundationCard.suit && talon.value > 2) {
            checkMove = {
              from: talon.class,
              to: foundationCard.class,
              point: 4,
            };
            return (outputMove = bestMoveFunction(checkMove));
          }
        });
      });
    });

    //if avalible moves draw
    if (Object.keys(outputMove).length === 0) {
      return { action: draw };
    } else {
      return outputMove;
    }
  } catch (error) {
    console.log(error);
  }
};

//function for best move
function bestMoveFunction(checkMove) {
  let bestMove = { from: "", to: "", point: 100 };
  if (checkMove.point < bestMove.point) {
    bestMove = checkMove;
    outputMove = { action: move, from: bestMove.from, to: bestMove.to };
  }

  return outputMove;
}
