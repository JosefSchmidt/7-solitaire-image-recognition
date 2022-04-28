module.exports = function ({ talon, foundation, stacks }) {
  try {

    //if talon is empty draw
    if (Object.keys(talon).length === 0) return { action: "draw" };

    let suitArray = [ "SPADE", "HEART", "CLOVER", "DIAMOND"];

   

    let bestMove = null;

    stacks.forEach(({cards}) => {

      cards.forEach(card => {

        stacks.forEach(({topCard}) => {
          
          if(Object.keys(topCard).length === 0 && card.value === 13) return bestMove = {action: "move", from: card.class, to: "s1"};

          // Check if move is valid
          if((card.color === topCard.color) || (topCard.value - card.value !== 1 ) ) return;


        })

        foundation.forEach(foundationCard => {

          // Check if move is valid
          if((card.color !== foundationCard.color) || (card.value - foundationCard.value !== 1 ) ) return;

          
          // Move from stack to a already same suit in the foundation
          if(card.suit === foundationCard.suit) return bestMove = {action: "move" , from: card.class, to: foundationCard.class};


          
        })

      })

    })

    //if avalible moves draw
    if(bestMove == null) { 
      return { action: "draw"} 
    } else {
      return bestMove;
    };



  } catch (error) {
    console.log(error);
  }
};




