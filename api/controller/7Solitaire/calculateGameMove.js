// Services
const imageRecognition = require("../../services/image-recognition/");
const gameAI = require("../../services/game-ai");

module.exports = async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;

    /**
     *
     * The format returned for talon, foundation and stacks are the following;
     *
     * talon = [
     *  { class: "10h", value: 10, color: colors.BLACK }
     * ]
     *
     * foundation = [
     *  { class: "10c", value: 10, color: colors.BLACK },
     *  { class: "10d", value: 10, color: colors.RED },
     *  { class: "10h", value: 10, color: colors.BLACK }
     * ]
     *
     * stacks = [
     *  {
     *    column: 1,
     *    topCard: { class: "10c", value: 10, color: colors.BLACK }
     *    cards: [
     *      { class: "10c", value: 10, color: colors.BLACK },
     *      { class: "10d", value: 10, color: colors.RED },
     *      { class: "10h", value: 10, color: colors.BLACK }
     *    ]
     *  },
     *  {
     *    column: 2,
     *    topCard: { class: "10c", value: 10, color: colors.BLACK }
     *    cards: [
     *      { class: "10c", value: 10, color: colors.BLACK },
     *      { class: "10d", value: 10, color: colors.RED },
     *      { class: "10h", value: 10, color: colors.BLACK }
     *    ]
     *  }
     * ]
     *
     * **/

    const { talon, foundation, stacks } = await imageRecognition(imageBuffer);

    const bestMove = await gameAI({ talon, foundation, stacks });



    return res.send(bestMove);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};
