const sizeOf = require("buffer-image-size");
const sharp = require("sharp");

module.exports = async function splitImageToPieces(imageBuffer) {
  try {
    let dimensions = sizeOf(imageBuffer);
    let height = dimensions.height;
    let width = dimensions.width;

    const columnBuffer = await sharp(imageBuffer)
      .extract({ left: 0, width, height: height / 2, top: height / 2 })
      .toBuffer();

    let columnsBuffer = [];
    for (let i = 0; i < 7; i++) {
      let column_dimensions = sizeOf(columnBuffer);
      let column_height = column_dimensions.height;
      let column_width = column_dimensions.width;

      let buffer = await sharp(columnBuffer)
        .extract({
          left: (column_width / 7) * i,
          width: column_width / 7,
          height: column_height,
          top: 0,
        })
        .resize(416, 416, { fit: "contain" })
        // .toFile(`column-${i}.jpg`);
        .toBuffer();

      columnsBuffer.push(buffer);
    }

    // The random stack
    const stackBuffer = await sharp(imageBuffer)
      .extract({ left: 0, width: width / 2, height: height / 2, top: 0 })
      .resize(416, 416, { fit: "contain" })

      // .toFile(`stack.jpg`)
      .toBuffer();

    // The goal stacks
    const foundationBuffer = await sharp(imageBuffer)
      .extract({
        left: width / 2,
        width: width / 2,
        height: height / 2,
        top: 0,
      })
      .resize(416, 416, { fit: "contain" })
      // .toFile(`foundation.jpg`)
      .toBuffer();

    return {
      columnsBuffer,
      stackBuffer,
      foundationBuffer,
    };
  } catch (error) {
    throw error;
  }
};
