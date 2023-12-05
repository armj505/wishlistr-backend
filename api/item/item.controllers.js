const Item = require("../../models/Item");
const WishList = require("../../models/WishList");

exports.createItem = async (req, res, next) => {
  //Delete it later. Isn't needed
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
exports.viewItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId).populate({
      path: "vendor",
      select: "name brand price imageURL description",
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
exports.removeItemFromList = async (req, res, next) => {
  // Should've done in the wishList controllers/routes
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