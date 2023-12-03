const express = require("express");
const passport = require("passport");
const { getMyProfile } = require("./user.controllers");
const router = express.Router();

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);

module.exports = router;
