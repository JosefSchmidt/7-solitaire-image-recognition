const sizeOf = require("buffer-image-size");
const sharp = require("sharp");

module.exports = async function splitImageToPieces(imageBuffer) {
  try {
    let dimensions = sizeOf(imageBuffer);
    let height = dimensions.height;
    let width = dimensions.width;

    const columnBuffer = await sharp(imageBuffer)
      .extract({
        left: 0,
        width,
        height: parseInt(height / 5, 10) * 4,
        top: parseInt(height / 5, 10),
      })
      .toBuffer();

    let stacksBuffer = [];

    for (let i = 0; i < 7; i++) {
      let column_dimensions = sizeOf(columnBuffer);
      let column_height = column_dimensions.height;
      let column_width = column_dimensions.width;

      let buffer = await sharp(columnBuffer)
        .extract({
          left: parseInt(column_width / 7, 10) * i,
          width: parseInt(column_width / 7, 10),
          height: parseInt(column_height, 10),
          top: 0,
        })
        .resize(416, 416, { fit: "contain" })
        // .toFile(`images/column-${i}.JPEG`);
      .toBuffer();

      stacksBuffer.push(buffer);
    }

    // The random stack
    const talonBuffer = await sharp(imageBuffer)
      .extract({
        left: 0,
        width: parseInt(width / 3, 10),
        height: parseInt(height / 5, 10),
        top: 0,
      })
      .resize(416, 416, { fit: "contain" })

      // .toFile(`images/stack.JPEG`);
    .toBuffer();

    // The goal stacks
    const foundationBuffer = await sharp(imageBuffer)
      .extract({
        left: parseInt(width / 3),
        width: parseInt(width / 3, 10)*2,
        height: parseInt(height / 5, 10),
        top: 0,
      })
      .resize(416, 416, { fit: "contain" })
      // .toFile(`images/foundation.JPEG`);
    .toBuffer();

    return {
      talonBuffer,
      foundationBuffer,
      stacksBuffer,
    };
  } catch (error) {
    throw error;
  }
};
