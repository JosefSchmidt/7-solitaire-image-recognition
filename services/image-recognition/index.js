const tf = require('@tensorflow/tfjs-node');

require('@tensorflow/tfjs-node');

TARGET_CLASSES = {
    0: "CLOVER_1",
    1: "CLOVER_10",
    2: "CLOVER_2",
    3: "CLOVER_3",
    4: "CLOVER_4",
    5: "CLOVER_5",
    6: "CLOVER_6",
    7: "CLOVER_7",
    8: "CLOVER_8",
    9: "CLOVER_9",
    10: "CLOVER_JACK",
    11: "CLOVER_KING",
    12: "CLOVER_QUEEN",
    13: "DIAMOND_1",
    14: "DIAMOND_10",
    15: "DIAMOND_2",
    16: "DIAMOND_3",
    17: "DIAMOND_4",
    18: "DIAMOND_5",
    19: "DIAMOND_6",
    20: "DIAMOND_7",
    21: "DIAMOND_8",
    22: "DIAMOND_9",
    23: "DIAMOND_JACK",
    24: "DIAMOND_KING",
    25: "DIAMOND_QUEEN",
    26: "HEART_1",
    27: "HEART_10",
    28: "HEART_2",
    29: "HEART_3",
    30: "HEART_4",
    31: "HEART_5",
    32: "HEART_6",
    33: "HEART_7",
    34: "HEART_8",
    35: "HEART_9",
    36: "HEART_JACK",
    37: "HEART_KING",
    38: "HEART_QUEEN",
    39: "SPADE_1",
    40: "SPADE_10",
    41: "SPADE_2",
    42: "SPADE_3",
    43: "SPADE_4",
    44: "SPADE_5",
    45: "SPADE_6",
    46: "SPADE_7",
    47: "SPADE_8",
    48: "SPADE_9",
    49: "SPADE_JACK",
    50: "SPADE_KING",
    51: "SPADE_QUEEN",
}




module.exports = async function (imageBuffer) {
    try {

        let model = await tf.loadGraphModel("file://services/image-recognition/model/model.json");

        const input_size = model.inputs[0].shape[1];

        let image = tf.node.decodeImage(imageBuffer, 3)
        image = tf.image.resizeBilinear(image.expandDims().toFloat(), [input_size, input_size]);


        const ANCHORS = [0.573, 0.677, 1.87, 2.06, 3.34, 5.47, 7.88, 3.53, 9.77, 9.17];

        const outputs = await model.executeAsync(image);

        const arrays = !Array.isArray(outputs) ? outputs.array() : Promise.all(outputs.map(t => t.array()));
        let predictions = await arrays;

        if (predictions.length !== 3) {
            console.log( "Post processing..." );
            const num_anchor = ANCHORS.length / 2;
            const channels = predictions[0][0][0].length;
            const height = predictions[0].length;
            const width = predictions[0][0].length;

            const num_class = channels / num_anchor - 5;

            let boxes = [];
            let scores = [];
            let classes = [];

            for (var grid_y = 0; grid_y < height; grid_y++) {
                for (var grid_x = 0; grid_x < width; grid_x++) {
                    let offset = 0;

                    for (var i = 0; i < num_anchor; i++) {
                        let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
                        let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
                        let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
                        let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;

                        let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
                        let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
                        offset += num_class;

                        class_probabilities = class_probabilities.mul(objectness);
                        let max_index = class_probabilities.argMax();
                        boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
                        scores.push(class_probabilities.max().dataSync()[0]);
                        classes.push(max_index.dataSync()[0]);
                    }
                }
            }

            boxes = tf.tensor2d(boxes);
            scores = tf.tensor1d(scores);
            classes = tf.tensor1d(classes);

            const selected_indices = await tf.image.nonMaxSuppressionAsync(boxes, scores, 10);
            predictions = [await boxes.gather(selected_indices).array(), await scores.gather(selected_indices).array(), await classes.gather(selected_indices).array()];
        }


        let finalPredictions = [];
        for (let n = 0; n < predictions[0].length; n++) {
            if (predictions[1][n] > 0.1) {

                finalPredictions.push(
                    {
                        label:  TARGET_CLASSES[predictions[2][n]],
                        percentage:  Math.round(parseFloat(predictions[1][n]) * 100)
                    })
            }
        }
        return finalPredictions;
    } catch (error) {
        console.log(error)
    }

}

function _logistic(x) {
    if (x > 0) {
        return (1 / (1 + Math.exp(-x)));
    } else {
        const e = Math.exp(x);
        return e / (1 + e);
    }
}

