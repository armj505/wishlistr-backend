const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./category.controllers");
const router = express.Router();

// TO DO - Add isAdmin middleware

// Category
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

// Sub-category
router.post("/:categoryId/");
router.put("/subcategory/:subcategoryId");
router.delete("/subcategory/:subcategoryId");

module.exports = router;
