// Libs
const fs = require("fs").promises;

// Services
const getPredictions = require("../../services/image-recognition");

// Utilities
const splitImageToPieces = require("../../utilities/splitImageToPieces");
const getTopCard = require("../../utilities/getTopCard");
const getBottomCard = require("../../utilities/getBottomCard");

module.exports = async (req, res) => {
  try {
    const imageBuffer = await fs.readFile(
      "/Users/josefbrondumschmidt/Desktop/Repositories/7-solitaire-image-recognition/test_image.JPG"
    );

    const { stackBuffer, foundationBuffer, columnsBuffer } =
      await splitImageToPieces(imageBuffer);

    const stack = await getPredictions(stackBuffer);
    const foundation = await getPredictions(foundationBuffer);

    const columns = [];
    for (let columnBuffer of columnsBuffer) {
      let cards = await getPredictions(columnBuffer);
      let bottomCard = getTopCard(cards);
      let topCard = getBottomCard(cards);
      columns.push({ bottomCard, topCard });
    }

    // AI service
    console.log(`Stack: ${JSON.stringify(stack)}`);
    console.log(`Foundation: ${JSON.stringify(foundation)}`);
    columns.map((column, index) =>
      console.log(`Column ${index}: ${JSON.stringify(column)}`)
    );

    return res.json([]);
  } catch (error) {
    console.log(error);
  }
};
