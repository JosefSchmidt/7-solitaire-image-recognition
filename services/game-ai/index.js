const moves = require("./moves")

module.exports = function ({ talon, foundation, stack  }) {
  try {
    let move = moves(talon, foundation, stack);

    return move;
  } catch (error) {
    console.log(error);
  }
};
