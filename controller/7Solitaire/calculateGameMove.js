// Libs
const fs = require("fs").promises;

// Services
const getPredictions = require("../../services/image-recognition");

module.exports = async (req, res) => {
    try {

        const imageBuffer = await fs.readFile("/Users/josefbrondumschmidt/Desktop/Repositories/7-solitaire-image-recognition/test-image.JPG");
        const predictions = await getPredictions(imageBuffer);
        console.log(predictions);

        return res.json();

    } catch (error) {
        console.log(error)
    }
}