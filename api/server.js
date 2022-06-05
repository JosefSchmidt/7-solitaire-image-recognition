require("dotenv").config();

const moment = require("moment");
console.log(`[INFO] App starting ${moment().format("YYYY-MM-DD HH:mm:ss")}`);


const { version } = require("./package.json");
const app = require("./app");


app.listen(process.env.PORT || 3000, (error) => {
  console.log(
    `[OK] App started: ${version} listening on port ${process.env.PORT || 3000}`
  );
});
