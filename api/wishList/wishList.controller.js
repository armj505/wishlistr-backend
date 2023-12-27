const WishList = require("../../models/WishList");
const Item = require("../../models/Item");
const { json } = require("express");
const User = require("../../models/User");
const ShareableLink = require("../../models/ShareableLink");

exports.createWishList = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const wishList = await WishList.findOne({ name: req.body.name });
    if (wishList) {
      return res
        .status(200)
        .json(`The wishList ${req.body.name} is already exist`);
    }

    const newWishList = await WishList.create(req.body);
    await req.user.updateOne({ $push: { wishLists: newWishList } });
    return res
      .status(201)
      .json(`The wishList has been created successfully by: ${req.user.email}`); // Replace it later with user's name
  } catch (error) {
    return next(error);
  }
};

exports.viewMyWishList = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json("User is not found");
    }

    const wishLists = await WishList.find({ user: req.user._id })
      .populate({
        path: "items",
        populate: { path: "item", model: "Item" },
      })
      .exec();
    if (!wishLists || wishLists.length === 0) {
      return res.status(404).json("The user hasn't added any wishList yet");
    }

    return res.status(200).json(wishLists);
  } catch (error) {
    return next(error);
  }
};

exports.deleteMyList = async (req, res, next) => {
  try {
    const { wishListId } = req.params;
    const wishList = await WishList.findById(wishListId);
    if (!wishList) {
      return res.status(404).json("This list isn't exist");
    }
    if (!wishList.user.equals(req.user._id)) {
      return res
        .status(403)
        .json("You dont't have the permission to delete this list");
    }
    await wishList.deleteOne();
    return res.status(200).json("Your wish list has been deleted");
  } catch (error) {
    return next(error);
  }
};

exports.addItemtoList = async (req, res, next) => {
  try {
    const { wishListId } = req.params;
    const { itemId } = req.params;

    const wishList = await WishList.findById(wishListId);
    if (!wishList) {
      return res
        .status(404)
        .json("The wishList isn't found or no longer exist");
    }
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json("This item isn't exist");
    }
    if (!wishList.user.equals(req.user._id)) {
      return res
        .status(403)
        .json("You're not allowed to add item to this list");
    }

    wishList.items.push({
      item: itemId,
      isHighlighted: false,
      isFulfilled: false,
    });
    await wishList.save();
    if (item) {
      item.trendValue = (item.trendValue || 0) + 1;
    }
    await item.save();
    return res
      .status(200)
      .json(
        `The item: ${item.name} has been added to your ${wishList.name} wishList`
      );
  } catch (error) {
    return next(error);
  }
};

exports.getOneList = async (req, res, next) => {
  // Should this action only be allowed to the owner
  try {
    const { wishListId } = req.params;
    const wishList = await WishList.findById(wishListId)
      .populate({
        path: "items",
        populate: { path: "item", model: "Item" },
      })
      .exec();
    if (!wishList) {
      return res.status(404).json("The wishList isn't or no longer exist");
    }
    res.status(200).json(wishList);
  } catch (error) {
    return next(error);
  }
};

exports.getOnePublicList = async (req, res, next) => {
  try {
    const { wishListId } = req.params;
    const wishList = await WishList.findById(wishListId)
      .populate({
        path: "items",
        populate: { path: "item", model: "Item" },
      })
      .exec();
    if (!wishList) {
      return res.status(404).json("The wishList isn't or no longer exist");
    }
    res.status(200).json(wishList);
  } catch (error) {
    return next(error);
  }
};

exports.updateListName = async (req, res, next) => {
  try {
    const { wishListId } = req.params;
    const wishList = await WishList.findById(wishListId);
    if (!wishList) {
      return res.status(404).json("The wishList isn't or no longer exist");
    }
    await wishList.updateOne({ name: req.body.name });
    return res.status(200).json("updated list name");
  } catch (error) {
    next(error);
  }
};
exports.shareMyList = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const wishList = await WishList.findById(wishlistId);
    if (!wishList) {
      return res.status(404).json({ error: "WishList not found" });
    }
    const shareableLink = `https://hammerhead-app-kz3f9.ondigitalocean.app/api/shared-wishlist?id=${wishlistId}`;
    const sharedWishlist = new ShareableLink({
      wishList: wishList._id,
      shareableLink,
    });
    await sharedWishlist.save();

    return res.status(200).json({ shareableLink });
  } catch (error) {
    next(error);
  }
};
/////////////////////////////////////////////////
exports.generateShareableLink = async (req, res, next) => {
  //Under trial and testing
  try {
    const { wishListId } = req.params;
    const wishList = await WishList.findById(wishListId);
    if (!wishList) {
      return res
        .status(404)
        .json("the wishList isn't found or no longer exist");
    }
    const queryParams = new URLSearchParams({
      senderName: req.user.email,
      profileImage: req.user.profileImage,
      items: JSON.stringify(
        wishList.items
      ) /*JSON.stringify is a JavaScript method that converts a
       JavaScript object or value to a JSON (JavaScript Object Notation) string.*/,
    });
    const sharableLink = `share/whishList?${queryParams.toString()}`;
    return res.status(201).json(sharableLink);
  } catch (error) {
    return next(error);
  }
};

////////////////////////////////////////////////
