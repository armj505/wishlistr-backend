const express = require("express");
const passport = require("passport");
const { createItem, viewItem } = require("./item.controllers");
const router = express.Router();
router.post(
  "/item",
  passport.authenticate("jwt", { session: false }),
  createItem
);
router.get(
  "/item/:itemId",
  passport.authenticate("jwt", { session: false }),
  viewItem
);

module.exports = router;
