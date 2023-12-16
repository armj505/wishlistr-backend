const User = require("../../models/User");
const WishList = require("../../models/WishList");

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate(
      "wishLists"
    );
    if (!user) {
      return res.status(404).json("This user isn't exist");
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

exports.updateMyProfile = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json("The user is not found");
    }
    if (req.file) {
      req.body.image = req.file.path;
    }
    await user.updateOne(req.body);
    res.status(200).json("Successfully updated");
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json("The user is not exist");
    }
    if (!user._id.equals(req.user._id)) {
      return res.status(403).json("You're not allowed to make this action");
    }
    await User.deleteOne();
    await WishList.deleteMany({ user: user._id });
    res.status(200).json("Account has been deleted");
  } catch (error) {
    next(error);
  }
};
