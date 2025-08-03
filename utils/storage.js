/**
 * @file upload.js
 * @description Configures multer middleware for handling image uploads.
 *              Saves uploaded files into /public/images with unique filenames.
 *              Ensures upload directory exists before saving.
 * @author
 * @created 2025-06-09
 */

const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * @constant storage
 * @description Defines custom storage engine for multer.
 *              - Sets destination to /public/images (creates it if missing)
 *              - Renames files to prevent collisions: [timestamp]-[sanitized_name].[ext]
 */
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../public/images");

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      return cb(new Error("The upload directory does not exist."));
    }

    cb(null, uploadDir);
  },

  // Define the filename format for saved files
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // e.g. '.jpg'
    const baseName = path
      .basename(file.originalname, ext) // e.g. 'coverPhoto'
      .replace(/\s+/g, "_"); // replace spaces with underscores
    cb(null, `${Date.now()}-${baseName}${ext}`); // e.g. '1691000000000-cover_photo.jpg'
  },
});

/**
 * @constant upload
 * @description Multer instance with the custom storage engine.
 *              To be used as middleware in routes requiring file upload.
 */
const upload = multer({ storage });

module.exports = upload;
