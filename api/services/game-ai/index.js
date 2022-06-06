// Utilities
const getColumnName = require("./utilities/getColumnName");
const evaluateBestMove = require("./utilities/evaluateBestMove");

const { move, draw } = { move: "move", draw: "draw" };

module.exports = function ({ talon, foundation, stacks }) {
  let checkMove = {};
  let bestMove = { from: "", to: "", point: 100 };
  let outputMove = {};

  try {
    // Talon is empty draw
    if (talon === null) return { action: draw };

    // // Talon contains a card that is an es
    // if (talon.value === 1) return { from: talon, to: "foundation" };
    //
    // // A stack contains an es
    // for (let i = 0; i < stacks.length; i++) {
    //   if (topCard.value === 1) return { from: talon, to: "foundation" };
    // }

    stacks.forEach(({ cards }) => {
      cards.forEach((card) => {
        /*
         * First loop over all the topCards in all the other stacks to find the best move
         * */

        stacks.forEach(({ topCard }, index) => {
          // The stack number
          let stringStack = getColumnName(index);

          // Talon to stack
          // Move card from talon to stack
          if (
            talon !== null &&
            topCard.color !== talon.color &&
            topCard.value - talon.value === 1
          ) {
            checkMove = { from: talon.class, to: topCard.class, point: 20 };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // Stack to stack
          // Move king to empty column
          if (card.value === 13 && topCard.length === 0) {
            checkMove = { from: card.class, to: stringStack, point: 2 };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // Stack to stack
          // Move card if valid
          if (
            topCard.color !== card.color &&
            topCard.value - card.value === 1
          ) {
            checkMove = { from: card.class, to: topCard.class, point: 5 };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }
        });

        foundation.forEach((foundationCard) => {
          // Talon to foundation
          // B
          if (
            talon !== null &&
            talon.suit === foundationCard.suit &&
            talon.value - foundationCard.value === 1 &&
            talon.value > 2
          ) {
            checkMove = {
              from: talon.class,
              to: foundationCard.class,
              point: 4,
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // From 2 and down
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
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // Ace
          if (talon.value === 1) {
            checkMove = { from: talon.class, to: "f", point: 0 };
            return (bestMove = evaluateBestMove(checkMove, bestMove));
          }

          // Stack to foundation
          // Empty foundation
          if (card.value === 1) {
            checkMove = { from: card.class, to: "f", point: 0 };
            return (bestMove = evaluateBestMove(checkMove, bestMove));
          }

          // Check if move is valid
          if (
            card.color !== foundationCard.color ||
            card.value - foundationCard.value !== 1
          )
            return;

          // Same suit in foundation under 3
          if (card.suit === foundationCard.suit && card.value < 3) {
            checkMove = {
              from: card.class,
              to: foundationCard.class,
              point: 2,
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // Same suit in foundation bigger than 2
          if (talon.suit === foundationCard.suit && talon.value > 2) {
            checkMove = {
              from: talon.class,
              to: foundationCard.class,
              point: 4,
            };
            return (bestMove = evaluateBestMove(checkMove, bestMove));
          }
        });
      });
    });

    // if available moves draw
    if (bestMove.point === 100) {
      return { action: draw };
    } else {
      outputMove = { action: move, from: bestMove.from, to: bestMove.to };
      return outputMove;
    }
  } catch (error) {
    console.log(error);
  }
};
