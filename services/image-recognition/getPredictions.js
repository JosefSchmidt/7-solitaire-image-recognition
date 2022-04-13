// libs
const tf = require("@tensorflow/tfjs-node");
require("@tensorflow/tfjs-node");

// config
const imageTypes = require("../../config/imageTypes");

module.exports = async function (imageBuffer) {
  try {
    let model = await tf.loadGraphModel(
      "file://services/image-recognition/model/model.json"
    );

    const input_size = model.inputs[0].shape[1];

    let image = tf.node.decodeImage(imageBuffer, 3);

    let input = tf.image
      .resizeBilinear(image, [input_size, input_size], true)
      .div(255.0)
      .expandDims(0);

    const outputs = await model.executeAsync(input);

    const [boxes, scores, classes, valid_detections] = outputs;
    const boxes_data = boxes.dataSync();
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];

    let predictions = [];
    for (let i = 0; i < valid_detections_data; ++i) {
      let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
      const width = x2 - x1;
      const height = y2 - y1;
      const klass = imageTypes[classes_data[i]];
      const score = scores_data[i].toFixed(2);
      predictions.push(klass);
    }

    return predictions;
  } catch (error) {
    console.log(error);
  }
};
