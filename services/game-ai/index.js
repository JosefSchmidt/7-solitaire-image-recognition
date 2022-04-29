const colemnString = require("../../utilities/colemnString");
const actionType = {move: "move", draw: "draw"}
module.exports = function ({ talon, foundation, stacks }) {
  try {
    const {move, draw} = actionType;
    //if talon is empty draw
    if (Object.keys(talon).length === 0) return { action: draw };
    let checkMove = {};
    let bestMove = {from: "", to: "", point: 100};
    let outputMove = {};
    
    
    function bestMoveFunction(checkMove, bestMove){
      console.log(checkMove);
      console.log(bestMove)
    if(checkMove.point < bestMove.point){
      bestMove = checkMove;
      outputMove = {action: move, from: bestMove.from, to: bestMove.to}
    }
    console.log(outputMove)
    return outputMove;
  }
    console.log("fd")

    stacks.forEach(({cards}) => {
      
      cards.forEach(card => {

        stacks.forEach((stack, index) => {
          const {topCard} = stack;
          
            let stringStack = colemnString(index);
          
          //king to column
          if(Object.keys(topCard).length === 0 && card.value === 13){ 
            checkMove = {from: card.class, to: stringStack, point: 3}; 
            return outputMove = bestMoveFunction(checkMove, bestMove);
          }
          
          // Check if move is valid
          if((card.color === topCard.color) || (topCard.value - card.value !== 1 ) ) return;

          if(topCard.value - card.value === 1) {
            checkMove = {from: card.class, to: topCard.class, point: 5}; 
          return outputMove = bestMoveFunction(checkMove, bestMove);
        } 

        })
          
          

        foundation.forEach(foundationCard => {

          if(card.value === 1 ){
            checkMove = {from: card.class, to: "f", point: 1}; 
          return outputMove = bestMoveFunction(checkMove, bestMove);
        }  

          // Check if move is valid
          if((card.color !== foundationCard.color) || (card.value - foundationCard.value !== 1 ) ) return;

          
          // Move from stack to a already same suit in the foundation
          if(card.suit === foundationCard.suit){
            checkMove = {from: card.class, to: foundationCard.class, point: 2}; 
          return outputMove = bestMoveFunction(checkMove, bestMove);
        }  



          
        })

      })

    })
    

    //if avalible moves draw
    if(Object.keys(outputMove).length === 0) { 
      return { action: draw} 
    } else {
      return outputMove;
    };



  } catch (error) {
    console.log(error);
  }
};




