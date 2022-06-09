// Utilities
const getColumnName = require("./utilities/getColumnName");
const evaluateBestMove = require("./utilities/evaluateBestMove");

// Config
const section = require("../../config/section");
const action = require("../../config/action");

module.exports = function ({ talon, foundation, stacks }) {
  let bestMove = undefined;

  try {
    // Talon is empty draw
    if (talon === null) return { action: action.draw };

    // Talon contains a card that is an es
    if (talon.value === 1) {
      return {
        action: action.move,
        from: { section: section.talon, card: talon },
        to: { section: section.foundation },
      };
    }

    // A stack contains an es
    /*for (let i = 0; i < stacks.length; i++) {
      if (topCard.value === 1) {
        return {
          action: action.move,
          from: stacks[i].topCard,
          to: { section: section.foundation },
        };
      }
    }*/

    stacks.forEach(({ cards }, index) => {
      let fromColumn = getColumnName(index);
        
      cards.forEach((card) => {
        /*
         * First loop over all the topCards in all the other stacks to find the best move
         * */

        stacks.forEach(({ topCard }, index) => {
          // The stack number
          let toColumn = getColumnName(index);

          // Talon to stack
          // Move card from talon to stack
          if (
            talon !== null &&
            topCard !== null &&
            topCard.color !== talon.color &&
            topCard.value - talon.value === 1
          ) {
            //checkMove = { from: talon, to: topCard, point: 20 };
            let checkMove = {
              action: action.move,
              from: {
                section: section.talon,
                card: talon,
              },
              to: {
                section: section.columns,
                column: toColumn,
                card: topCard,
              },
              point: 20
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }
          
          // Stack to stack
          // Move king to empty column
          if (card.value === 13 && topCard === null) {
            console.log(index);
            let checkMove = {
              action: action.move,
              from: {
                section: section.columns,
                column: fromColumn,
                card,
              },
              to: {
                section: section.columns,
                column: toColumn,
                topcard: null,
              },
              point: 2
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // Move card if valid
          if (
            topCard !== null &&
            topCard.color !== card.color &&
            topCard.value - card.value === 1
          ) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.columns,
                column: fromColumn,
                card,
              },
              to: {
                section: section.columns,
                column: toColumn,
                card: topCard,
              },
              point: 5,
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }
        });

        foundation.forEach((foundationCard) => {
          // Talon to foundation
          // Ace
          /*if (talon.value === 1) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.talon,
                card: talon,
              },
              to: {
                section: section.foundation,
                card: null,
              },
              point: 0,
            };
            return (bestMove = evaluateBestMove(checkMove, bestMove));
          }*/

          // if equal 2
          if (
            talon.suit === foundationCard.suit &&
            talon.value - foundationCard.value === 1 &&
            talon.value === 2
          ) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.talon,
                card: talon,
              },
              to: {
                section: section.foundation,
                card: foundationCard,
              },
              point: 1,
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // From 3 and up
          if (
            talon !== null &&
            talon.suit === foundationCard.suit &&
            talon.value - foundationCard.value === 1 &&
            talon.value >= 3
          ) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.talon,
                card: talon,
              },
              to: {
                section: section.foundation,
                card: foundationCard,
              },
              point: 4,
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // Stack to foundation
          // Empty foundation
          if (card.value === 1) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.columns,
                column: fromColumn,
                card,
              },
              to: {
                section: section.foundation
              },
              point: 0,
            };
            return (bestMove = evaluateBestMove(checkMove, bestMove));
          }

          // Check if move is valid
          if (
            card.color !== foundationCard.color ||
            card.value - foundationCard.value !== 1
          )
            return;

          // Same suit in foundation under 3
          if (card.suit === foundationCard.suit && card.value === 2) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.columns,
                column: fromColumn,
                card,
              },
              to: {
                section: section.foundation,
                card: foundationCard,
              },
              point: 2,
            };
            bestMove = evaluateBestMove(checkMove, bestMove);
          }

          // Same suit in foundation bigger than 2
          if (card.suit === foundationCard.suit && card.value > 2) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.columns,
                column: fromColumn,
                card: card,
              },
              to: {
                section: section.foundation,
                card: foundationCard,
              },
              point: 4,
            };
            return (bestMove = evaluateBestMove(checkMove, bestMove));
          }
        });
      });
    });

    // if available moves draw
    if (!bestMove) return { action: action.draw };

    delete bestMove.point;
    return bestMove;
  } catch (error) {
    throw error;
  }
};
