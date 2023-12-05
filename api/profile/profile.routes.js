const express = require("express");
const {
  editProfile,
  viewGifts,
  viewOneGift,
} = require("./profile.controllers");

const router = express.Router();

const upload = require("../../middlewares/upload");
const passport = require("passport");

router.put(
  "/User/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  editProfile
);
router.get(
  "/MyGifts",
  passport.authenticate("jwt", { session: false }),
  viewGifts
);
router.get(
  "/MyGifts/:id",
  passport.authenticate("jwt", { session: false }),
  viewOneGift
);

module.exports = router;
