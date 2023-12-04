const express = require("express");
const passport = require("passport");
const {
  createItem,
  viewItem,
  getAllItems,
  deleteItem,

  removeItemFromList,
  updateItem,
  updateItemInList,
} = require("./item.controllers");
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
router.get(
  "/item",
  passport.authenticate("jwt", { session: false }),
  getAllItems
);
router.put(
  "/item/:itemId/:wishListId",
  passport.authenticate("jwt", { session: false }),
  removeItemFromList
);
// router.put(
//   "/item/update-item/:itemId/:wishListId",
//   passport.authenticate("jwt", { session: false }),
//   updateItemInList
// );
module.exports = router;
