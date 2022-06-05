// Libs
const fs = require("fs").promises;

// Services
const imageRecognition = require("../../services/image-recognition/");
const gameAI = require("../../services/game-ai");

module.exports = async (req, res) => {
  try {

    console.log(req.body)

    debugger;

    const imageBuffer = await fs.readFile("images/card_layout.JPG");

    const { talon, foundation, stacks } = await imageRecognition(imageBuffer);

    const bestMove = await gameAI({ talon, foundation, stacks });

    return res.send(bestMove);
  } catch (error) {
    console.log(error);
  }
};
