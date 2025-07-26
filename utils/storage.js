const multer = require("multer");
const path = require("path");
const fs = require("fs");

// const storage = multer.diskStorage({xw
//   destination: (req, file, cb) =>
//     cb(null, path.join(__dirname, "../../../public/images")),

//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });

// Configure multer to store uploaded files in public/images
const storage = multer.diskStorage({
  //Multer will store uploaded files in the actual public/images directory.
  destination: (req, file, cb) => {
    // make sure the upload directory exists
    const uploadDir = path.join(__dirname, "../public/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      return cb(new Error("the upload directory does not exist"));
    }
    cb(null, uploadDir);
  },
  //Express will correctly serve any /images/... requests as static resources.
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${baseName}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
