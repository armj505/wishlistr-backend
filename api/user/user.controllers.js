const User = require("../../models/User");

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate("wishList");
    if (!user) {
      return res.status(404).json("This user isn't exist");
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
