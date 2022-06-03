// Services
const getPredictions = require("../../services/image-recognition/getPredictions");

// Utilities
const splitImageToPieces = require("../../utilities/splitImageToPieces");
const getTopCard = require("../../utilities/getTopCard");
const sortCards = require("../../utilities/sortCards");
const removeDuplicateCards = require("../../utilities/removeDuplicateCards");

module.exports = async (imageBuffer) => {
  try {
    let { talonBuffer, foundationBuffer, stacksBuffer } =
      await splitImageToPieces(imageBuffer);

    const stacksPromises = [];

    stacksBuffer.forEach((columnBuffer, index) => {
      let promise = new Promise(async function (resolve, reject) {
        try {
          let cards = await getPredictions(columnBuffer);
          cards = removeDuplicateCards(cards);

          const topCard = getTopCard(cards);
          cards = sortCards(cards);

          return resolve({ column: index + 1, topCard, cards });
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
      talon: removeDuplicateCards(talon),
      foundation: removeDuplicateCards(foundation),
      stacks,
    };
  } catch (error) {
    console.log(error);
  }
};
