const router = require("express").Router();

router.get("/", require("../controller/7Solitaire/calculateGameMove"))

router.get("/game", require("../services/game-ai"));

module.exports = router;