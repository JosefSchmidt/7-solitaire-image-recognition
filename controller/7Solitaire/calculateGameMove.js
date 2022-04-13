// Libs
const fs = require("fs").promises;

// Services
const getPredictions = require("../../services/image-recognition/");

// Utilities
const splitImageToPieces = require("../../utilities/splitImageToPieces");
const getTopCard = require("../../utilities/getTopCard");
const getBottomCard = require("../../utilities/getBottomCard");

module.exports = async (req, res) => {
  try {
    const imageBuffer = await fs.readFile("images/card_layout.JPG");

    let { stackBuffer, foundationBuffer, columnsBuffer } =
      await splitImageToPieces(imageBuffer);

    const columnPromises = [];

    columnsBuffer.forEach((columnBuffer) => {
      let promise = new Promise(async function (resolve, reject) {
        try {
          const cards = await getPredictions(columnBuffer);
          const topCard = getTopCard(cards);
          let bottomCard = getBottomCard(cards);

          if (!bottomCard) bottomCard = null;
          return resolve({ topCard, bottomCard });
        } catch (error) {
          reject(error);
        }
      });
      columnPromises.push(promise);
    });

    const [
      stack,
      foundation,
      column_1,
      column_2,
      column_3,
      column_4,
      column_5,
      column_6,
      column_7,
    ] = await Promise.all([
      getPredictions(stackBuffer),
      getPredictions(foundationBuffer),
      ...columnPromises,
    ]);

    let columns = [
      column_1,
      column_2,
      column_3,
      column_4,
      column_5,
      column_6,
      column_7,
    ];

    // AI service
    console.log(`Stack: ${JSON.stringify(stack)}`);
    console.log(`Foundation: ${JSON.stringify(foundation)}`);
    columns.map((column, index) =>
      console.log(`Column ${index}: ${JSON.stringify(column)}`)
    );

    return res.json([
      {
        stack,
        foundation,
        columns,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
