const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createWishList,
  viewMyWishList,
  deleteMyList,
  getAll,
  addItemtoList,
  getOneList,
  generateShareableLink,
  updateListName,
} = require("./wishList.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createWishList
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  viewMyWishList
);

router.delete(
  "/:wishListId",
  passport.authenticate("jwt", { session: false }),
  deleteMyList
);

router.put(
  "/:wishListId/:itemId",
  passport.authenticate("jwt", { session: false }),
  addItemtoList
);
router.get(
  "/:wishListId",
  passport.authenticate("jwt", { session: false }),
  getOneList
);
router.post(
  "/:wishListId/generate-link",
  passport.authenticate("jwt", { session: false }),
  generateShareableLink
);
router.put(
  "/:wishListId",
  passport.authenticate("jwt", { session: false }),
  updateListName
);
module.exports = router;
