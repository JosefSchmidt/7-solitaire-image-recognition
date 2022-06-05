const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images")      //you tell where to upload the files,
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})

// const upload = multer({storage: storage,
//   onFileUploadStart: function (file) {
//     console.log(file.originalname + ' is starting ...')
//   },
// });

const upload = multer();


router.put("/", upload.single("file"), require("../controller/7Solitaire/calculateGameMove"));

module.exports = router;
