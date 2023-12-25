const Category = require("../../../models/Categories");
const SubCategory = require("../../../models/SubCategories");

// Categories
// Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

// Get one category
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId)
      .populate("subCategories")
      .populate("items");
    return res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

// Create a category - admin only
exports.createCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

// Update a category - admin only
exports.updateCategory = async (req, res, next) => {
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body
    );
    return res.status(200).json(updateCategory);
  } catch (error) {
    return next(error);
  }
};

// Delete a category - admin only
exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
};

// Sub-categories
// Create sub-category - admin only
exports.createSubCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await findById(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    const newSubCategory = await SubCategory.create(req.body);
    await category.updateOne({ $push: { subCategories: newSubCategory } });
    return res.status(201).json(newSubCategory);
  } catch (error) {
    return next(error);
  }
};

// Update sub-category - admin only
exports.updateSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.subcategoryId,
      req.body
    );
    return res.status(200).json(subCategory);
  } catch (error) {
    return next(error);
  }
};

// Delete sub-category - admin
exports.deleteSubCategory = async (req, res, next) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.subcategoryId);
    return res.status(200).json({ message: "Sub Category deleted" });
  } catch (error) {
    return next(error);
  }
};
