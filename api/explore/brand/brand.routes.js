const express = require("express");
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("./brand.controllers");
const router = express.Router();

// TO DO - Add isAdmin middleware
router.post("/", createBrand);
router.get("/", getAllBrands);
router.get("/:brandId", getBrandById);
router.put("/:brandId", updateBrand);
router.delete("/:brandId", deleteBrand);

module.exports = router;
