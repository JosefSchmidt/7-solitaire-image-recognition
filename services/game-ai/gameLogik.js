
const moves = require("./moves")

module.exports = function ({ talon, foundation, stack}) {
  try {
    if(talon === null || talon === undefined){
        let action = moves.drawFromDeck();
        console.log(action + " logik");
        return action;
    }

    
  } catch (error) {
    console.log(error);
  }
};