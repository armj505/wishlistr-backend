const Item = require("../../models/Item");
const WishList = require("../../models/WishList");
const Brand = require("../../models/Brand");

exports.createItem = async (req, res, next) => {
  //Delete it later. Isn't needed
  try {
    const item = await Item.create(req.body);
    if (req.file) {
      item.image = req.file.path;
      await item.save();
    }

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

exports.generateItem = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json("Brand is not found");
    }
    if (req.file) {
      req.body.file = req.file.path;
    }
    const item = await Item.create(req.body);

    await item.updateOne({ $push: { brand: brandId } });
    await brand.updateOne({ $push: { items: item._id } });
    res.status(201).json("Generated");
  } catch (error) {
    next(error);
  }
};

exports.viewItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId).populate({
      path: "vendor",
      select: "name brand price imageURL description trendValue",
    });
    if (!item) {
      return res.status(404).json("The item isn't found");
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};
exports.getAllItems = async (req, res, next) => {
  try {
    const item = await Item.find();
    if (!item) {
      return res.status(404).json("There are no items to display");
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// Should've done in the wishList controllers/routes
exports.removeItemFromList = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const { itemId, wishListId } = req.params;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json("The item is not found");
    }

    const wishList = await WishList.findById(wishListId);
    if (!wishList) {
      return res.status(404).json("The wishList is not found");
    }

    await wishList.updateOne({ $pull: { items: { item: itemId } } });

    res
      .status(200)
      .json(
        `The item: ${item.name} has been removed from your ${wishList.name} successfully`
      );
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    await Item.findByIdAndUpdate(req.params.itemId);
    res.status(200).json({ message: "Item Updated" });
  } catch (error) {
    next(error);
  }
};
exports.deleteItem = async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.itemId);
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    next(error);
  }
};
// exports.updateItemInList = async (req, res, next) => {
//   try {
//     const { itemId, wishListId } = req.params;

//     const wishList = await WishList.findById(wishListId);
//     if (!wishList) {
//       return res.status(404).json("The wish list is not found");
//     }

//     const selectedItem = wishList.items.find(
//       (item) => item.item._id.toString() === itemId
//     );
//     if (!selectedItem) {
//       return res.status(404).json("The item is not found in the wish list");
//     }

//     const allowedPreferences = ["size", "color"];

//     allowedPreferences.forEach((field) => {
//       if (req.body.preferences && req.body.preferences[field]) {
//         selectedItem.item.preferences[field] = req.body.preferences[field];
//       }
//     });

//     await wishList.save();

//     res
//       .status(200)
//       .json(
//         `The item ${selectedItem.item.name}'s preferences have been updated`
//       );
//   } catch (error) {
//     next(error);
//   }
// };
// hyhhyh
