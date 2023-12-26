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
  itemToSub,
} = require("./item.controllers");
const upload = require("../../middlewares/upload");
const router = express.Router();
router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  createItem
);
router.get(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  viewItem
);
router.get("/", passport.authenticate("jwt", { session: false }), getAllItems);
router.put(
  "/:itemId/:wishListId",
  passport.authenticate("jwt", { session: false }),

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
  upload.single("file"),
  generateItem
);
// router.put(
//   "/item/update-item/:itemId/:wishListId",
//   passport.authenticate("jwt", { session: false }),
//   updateItemInList
// );

router.put(
  "/:itemId/:subCategoryId",
  passport.authenticate("jwt", { session: false }),
  itemToSub
);

router.post(
  "/new/:subCategoryId",
  passport.authenticate("jwt", { session: false }),
  newItem
);
module.exports = router;
