
const moves = require("./checkGameMove");

module.exports = function ({ talon, foundation, stack}) {
  try {
    /*if(talon === null || talon === undefined){
        let action = moves.drawFromDeck();
        console.log(action + " logik");
        return action;
    }*/
    //move ace to foundation
    let data = moves.moveFromStackToFoundation({foundation, stack});
    
    return data;
  } catch (error) {
    console.log(error);
  }
};