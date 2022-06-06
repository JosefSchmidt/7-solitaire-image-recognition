const router = require("express").Router();
const multer = require("multer");

const upload = multer();

router.put(
  "/",
  upload.single("file"),
  require("../controller/7Solitaire/calculateGameMove")
);

module.exports = router;
