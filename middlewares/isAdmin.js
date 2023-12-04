const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user && user.isAdmin) {
      next();
    }
    res.status(403).json({ message: "Admission denied" });
  } catch (error) {
    next(error);
  }
};
