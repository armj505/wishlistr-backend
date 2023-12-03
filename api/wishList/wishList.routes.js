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
} = require("./wishList.controller");

router.post(
  "/wishList",
  passport.authenticate("jwt", { session: false }),
  createWishList
);

router.get(
  "/wishList",
  passport.authenticate("jwt", { session: false }),
  viewMyWishList
);

router.delete(
  "/wishList/:wishListId",
  passport.authenticate("jwt", { session: false }),
  deleteMyList
);

router.put(
  "/wishList/:wishListId/:itemId",
  passport.authenticate("jwt", { session: false }),
  addItemtoList
);
router.get(
  "/wishList/:wishListId",
  passport.authenticate("jwt", { session: false }),
  getOneList
);
router.post(
  "/wishList/:wishListId/generate-link",
  passport.authenticate("jwt", { session: false }),
  generateShareableLink
);
module.exports = router;
