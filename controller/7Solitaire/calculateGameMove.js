// Libs
const fs = require("fs").promises;

// Services
const imageRecognition = require("../../services/image-recognition/");
const gameAI = require("../../services/game-ai");

module.exports = async (req, res) => {
  try {
    const imageBuffer = await fs.readFile("images/statetest.JPG");

    const { talon, foundation, stacks } = await imageRecognition(imageBuffer);

    const bestMove = await gameAI({ talon, foundation, stacks });

    // AI service
    console.log(`Talon: ${JSON.stringify(talon)}`);
    console.log(`Foundation: ${JSON.stringify(foundation)}`);
    stacks.map((stack, index) =>
      console.log(`Stack ${index}: ${JSON.stringify(stack)}`)
    );

    res.send({ talon, foundation, stacks });
  } catch (error) {
    console.log(error);
  }
};
