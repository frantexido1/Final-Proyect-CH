const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileTypes = req.body.fileTypes;
    switch (fileTypes) {
      case "profile":
        cb(null, "./uploads/profiles/");
        break;
      case "product":
        cb(null, "./uploads/product/");
        break;
      case "document":
        cb(null, "./uploads/document/");
        break;
      default:
        cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
