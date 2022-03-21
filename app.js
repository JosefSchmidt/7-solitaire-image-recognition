const app = require("express")();
const helmet = require("helmet");


app.use(helmet());

app.use("/api/7-solitaire/", require("./routes/7Solitaire"))

module.exports = app;