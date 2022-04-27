module.exports = function ({ talon, foundation, stacks }) {
  try {

    if (Object.keys(talon).length === 0) return { action: "draw" };


    let bestMove = null;

    stacks.forEach(({cards}) => {

      cards.forEach(card => {

        stacks.forEach(({topCard}) => {

          // Check if move is valid
          if((card.color === topCard.color) || ( card.value - topCard.value !== 1 ) ) return;



        })

        foundation.forEach(foundationCard => {



        })

      })

    })




  } catch (error) {
    console.log(error);
  }
};




