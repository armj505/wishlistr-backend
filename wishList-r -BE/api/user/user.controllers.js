const User = require("../../models/User");

exports.getMyProfile = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const user = await User.findOne({ _id: req.user._id }).populate(
      "wishLists"
    );
    if (!user) {
      return res.status(404).json("This user isn't exist");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
