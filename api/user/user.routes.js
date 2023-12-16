const express = require("express");
const passport = require("passport");
const {
  getMyProfile,
  updateMyProfile,
  deleteAccount,
} = require("./user.controllers");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.get(
  "/",

  passport.authenticate("jwt", { session: false }),
  getMyProfile
);

router.put(
  "/",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  updateMyProfile
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteAccount
);
module.exports = router;
