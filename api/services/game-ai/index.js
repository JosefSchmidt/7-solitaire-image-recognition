// Utilities
const getColumnName = require("./utilities/getColumnName");
const evaluateBestMove = require("./utilities/evaluateBestMove");

// Config
const section = require("../../config/section");
const action = require("../../config/action");

let previousMoveStack = [];
let winStack = [];

module.exports = function ({ talon, foundation, stacks }) {
  let bestMove = { point: 500 };

  try {
    // Talon contains a card that is an es
    if (talon && talon.value === 1) {
      return {
        action: action.move,
        from: { section: section.talon, card: talon },
        to: { section: section.foundation, card: null },
      };
    }

    // A stack contains an es
    for (let i = 0; i < stacks.length; i++) {
      if (stacks[i] && stacks[i].topCard && stacks[i].topCard.value === 1) {
        let fromColumn = getColumnName(i);
        return {
          action: action.move,
          from: { section: section.columns, column: fromColumn, card: stacks[i].topCard },
          to: { section: section.foundation, card: null }
        };
      }
    }
    // Check for done foundation.
    foundation.forEach((foundationCard) => {
      if(foundationCard.value === 13 ){
        winStack.push(foundationCard);
      }
    })

    stacks.forEach(({ cards, topCard }, index) => {
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
              point: 20,
            };
            bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            });
          }

          // Move king to empty column
          if (talon && talon.value === 13 && topCard === null) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.talon,
                card: talon,
              },
              to: {
                section: section.columns,
                column: toColumn,
                card: null,
              },
              point: 3,
            };
            bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            });
          }

          // Stack to stack
          // Move king to empty column
          if (card.value === 13 && topCard === null) {
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
                card: null,
              },
              point: 2,
            };
            bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            });
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
            bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            });
          }
        });

        foundation.forEach((foundationCard) => {
          // Talon to foundation

          // if equal 2
          if (
            talon &&
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
            bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            });
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
            bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            });
          }

          // Stack to foundation
          // Same suit in foundation under 3
          if (topCard && topCard.suit === foundationCard.suit && topCard.value === 2) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.columns,
                column: fromColumn,
                card: topCard,
              },
              to: {
                section: section.foundation,
                card: foundationCard,
              },
              point: 2,
            };
            bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            });
          }
    
          // Same suit in foundation bigger than 2
          if (
            topCard &&
            topCard.suit === foundationCard.suit &&
            topCard.value - foundationCard.value === 1 &&
            topCard.value > 2
          ) {
            let checkMove = {
              action: action.move,
              from: {
                section: section.columns,
                column: fromColumn,
                card: topCard,
              },
              to: {
                section: section.foundation,
                card: foundationCard,
              },
              point: 4,
            };
            return (bestMove = evaluateBestMove({
              checkMove,
              bestMove,
              previousMoveStack,
            }));
          }
        });
      });
    });

    

    // win move
    if(winStack.length === 4){
      return { action: action.win};
    }
    console.log(winStack.length);
    // if available moves draw
    if (!bestMove || !bestMove.action) {
      previousMoveStack = [];
      return { action: action.draw };
    }

    previousMoveStack.push(bestMove);

    delete bestMove.point;
    return bestMove;
  } catch (error) {
    throw error;
  }
};
