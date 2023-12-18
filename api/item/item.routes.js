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
  generateItem,
} = require("./item.controllers");
const upload = require("../../middlewares/upload");
const router = express.Router();
// router.post(
//   "/",
//   upload.single("image"),
//   passport.authenticate("jwt", { session: false }),
//   createItem
// );
router.get(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  viewItem
);
router.get("/", passport.authenticate("jwt", { session: false }), getAllItems);
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
router.post(
  "/generate/:brandId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  generateItem
);
// router.put(
//   "/item/update-item/:itemId/:wishListId",
//   passport.authenticate("jwt", { session: false }),
//   updateItemInList
// );
module.exports = router;
