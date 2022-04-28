const router = require("express").Router();

router.get("/", require("../controller/7Solitaire/calculateGameMove"))


module.exports = router;