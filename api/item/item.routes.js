const express = require("express");
const passport = require("passport");
const { isAdmin } = require("../../middlewares/isAdmin");
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
// router.post(
//   "/item",
//   passport.authenticate("jwt", { session: false }),
//   createItem
// );
router.get(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  viewItem
);
router.get("/"), getAllItems;
router.put(
  "/:itemId/:wishListId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  removeItemFromList
);
router.delete(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteItem
);
router.put(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateItem
);
// router.put(
//   "/item/update-item/:itemId/:wishListId",
//   passport.authenticate("jwt", { session: false }),
//   updateItemInList
// );
module.exports = router;
