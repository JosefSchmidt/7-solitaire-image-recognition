// Libs
const fs = require("fs").promises;

// Services
const imageRecognition = require("../../services/image-recognition/");
const gameAI = require("../../services/game-ai");

module.exports = async (req, res) => {
  try {

    // const imageBuffer = await fs.readFile("images/card_layout.JPG");

    const imageBuffer = req.file.buffer;

    const { talon, foundation, stacks } = await imageRecognition(imageBuffer);

    const bestMove = await gameAI({ talon, foundation, stacks });

    return res.json(bestMove);
  } catch (error) {
    console.log(error);
  }
};
