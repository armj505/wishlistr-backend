const express = require("express");
const { editProfile, viewGifts, viewOneGift } = require("./controller");

const router = express.Router();

const upload = require("../../middlewares/upload");

router.put("/User/:id", upload.single("image"), editProfile);
router.get("/MyGifts", viewGifts);
router.get("/MyGifts/:id", viewOneGift);

module.exports = router;
