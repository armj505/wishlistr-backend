// // Importing path to manipulate file name and multer to setup our file upload
// const multer = require("multer");

// // Setting up storage filename and destination
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./media");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${+new Date()}${file.originalname}`);
//   },
// });

// // Setting up multer upload function
// let upload = multer({
//   storage: storage,
//   fileFilter: (req, file, callback) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpeg" ||
//       file.mimetype == "image/jpg"
//     ) {
//       callback(null, true);
//     } else {
//       console.log("Only .jpg and .png files are supported!");
//       callback(null, false);
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 1,
//   },
// });

// module.exports = upload;
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "./media",
//   filename: (req, file, cb) => {
//     cb(null, `${+new Date()}${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
// });
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  endpoint: "https://hammerhead-app-kz3f9.ondigitalocean.app",
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "wishList-bucket",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `${Date.now()}${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {},
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
