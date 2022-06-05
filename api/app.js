const app = require("express")();
const helmet = require("helmet");
const bodyParser = require("body-parser");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/7-solitaire/", require("./routes/7Solitaire"))


module.exports = app;