const router = require("express").Router();

router.post("/", require("../controller/7Solitaire/calculateGameMove"))

module.exports = router;