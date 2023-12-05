const MyGifts = require("../../models/MyGifts");
const User = require("../../models/User");

const editProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const editProfileData = req.body;
    if (req.file) {
      req.body.image = req.file.path;
    }
    const editingProfile = await User.findByIdAndUpdate(
      profileId,
      editProfileData,
      {
        new: true,
      }
    );
    if (!editingProfile) {
      return res.status(404).json({ error: "Profile Not Updated" });
    }
    return res.status(200).json(editingProfile);
  } catch (error) {
    return next(error);
  }
};

const viewGifts = async (req, res, next) => {
  try {
    const view_gifts = await MyGifts.find();
    return res.status(200).json(view_gifts);
  } catch (error) {
    return next(error);
  }
};

const viewOneGift = async (req, res, next) => {
  try {
    const { giftId } = req.params.id;
    const Gift = await Gift.findById(giftId);
    if (!Gift) {
      return res.status(404).json({ error: "Gift not found" });
    }
    return res.status(200).json(Gift);
  } catch (error) {
    return next(error);
  }
};

module.exports = { editProfile, viewGifts, viewOneGift };
