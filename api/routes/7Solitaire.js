//lib
const router = require("express").Router();
const multer = require("multer");

//logic for lib
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./images");
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname)
  }
});

const upload = multer({storage: storage});

router.post("/gameMove", upload.single("takenPicture"), require("../controller/7Solitaire/calculateGameMove"));

router.get("/", require("../controller/7Solitaire/calculateGameMove"))


module.exports = router;