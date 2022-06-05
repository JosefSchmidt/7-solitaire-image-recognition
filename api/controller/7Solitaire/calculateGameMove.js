// Services
const imageRecognition = require("../../services/image-recognition/");
const gameAI = require("../../services/game-ai");

module.exports = async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;

    const { talon, foundation, stacks } = await imageRecognition(imageBuffer);

    console.log(JSON.stringify(talon))
    console.log(JSON.stringify(foundation))
    console.log(JSON.stringify(stacks))

    const bestMove = await gameAI({ talon, foundation, stacks });

    return res.send(bestMove);
  } catch (error) {
    console.log(error);
  }
};
