const Item = require("../../models/Item");
const WishList = require("../../models/WishList");

exports.createItem = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
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
