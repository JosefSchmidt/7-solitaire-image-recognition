// Services
const getPredictions = require("../../services/image-recognition/getPredictions");

// Utilities
const splitImageToPieces = require("../../utilities/splitImageToPieces");
const getTopCard = require("../../utilities/getTopCard");
const getBottomCard = require("../../utilities/getBottomCard");

module.exports = async (imageBuffer) => {
  try {
    let { talonBuffer, foundationBuffer, stacksBuffer } =
      await splitImageToPieces(imageBuffer);

    const stacksPromises = [];

    stacksBuffer.forEach((columnBuffer) => {
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
      stacksPromises.push(promise);
    });

    const [
      talon,
      foundation,
      stack_1,
      stack_2,
      stack_3,
      stack_4,
      stack_5,
      stack_6,
      stack_7,
    ] = await Promise.all([
      getPredictions(talonBuffer),
      getPredictions(foundationBuffer),
      ...stacksPromises,
    ]);

    let stacks = [
      stack_1,
      stack_2,
      stack_3,
      stack_4,
      stack_5,
      stack_6,
      stack_7,
    ];

    return {
      talon,
      foundation,
      stacks,
    };
  } catch (error) {
    console.log(error);
  }
};
