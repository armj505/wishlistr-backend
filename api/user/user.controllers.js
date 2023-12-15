const User = require("../../models/User");

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
