const express = require("express");
const { isAdmin } = require("../../../middlewares/isAdmin");
const passport = require("passport");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("./category.controllers");
const router = express.Router();

// Category
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createCategory
);
router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.put(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateCategory
);
router.delete(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteCategory
);

// Sub-category
router.post(
  "/:categoryId/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createSubCategory
);
router.put(
  "/subcategory/:subcategoryId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateSubCategory
);
router.delete(
  "/subcategory/:subcategoryId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteSubCategory
);

module.exports = router;
