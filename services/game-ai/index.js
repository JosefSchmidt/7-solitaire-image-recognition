const gameLogik = require("./gameLogik");
const mockData = {talon: {}, foundation: [], stack: []}


module.exports = function ({ talon, foundation, stack}) {
  try {
    let action = gameLogik({ talon, foundation, stack});
    console.log(action + " index");

    return action;
  } catch (error) {
    console.log(error);
  }
};
