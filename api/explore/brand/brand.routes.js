const express = require("express");
const { isAdmin } = require("../../../middlewares/isAdmin");
const passport = require("passport");
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("./brand.controllers");
const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  createBrand
);
router.get("/", getAllBrands);
router.get("/:brandId", getBrandById);
router.put(
  "/:brandId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateBrand
);
router.delete(
  "/:brandId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteBrand
);

module.exports = router;
