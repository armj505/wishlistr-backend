const Brand = require("../../../models/Brand");

// Get all brands
exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    return res.status(200).json(brands);
  } catch (error) {
    return next(error);
  }
};

// Get one brand
exports.getBrandById = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.brandId).populate("items");
    return res.status(200).json(brand);
  } catch (error) {
    return next(error);
  }
};

// Create a brand - admin only
exports.createBrand = async (req, res, next) => {
  try {
    const newBrand = await Brand.create(req.body);
    return res.status(201).json(newBrand);
  } catch (error) {
    return next(error);
  }
};

// Update a brand - admin only
exports.updateBrand = async (req, res, next) => {
  try {
    const updateBrand = await Brand.findByIdAndUpdate(
      req.params.brandId,
      req.body
    );
    return res.status(200).json(updateBrand);
  } catch (error) {
    return next(error);
  }
};

// delete a brand - admin only
exports.deleteBrand = async (req, res, next) => {
  try {
    await Brand.findByIdAndDelete(req.params.brandId);
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
};
