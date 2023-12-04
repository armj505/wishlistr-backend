const MyGifts = require("../../models/MyGifts");

const User = require("../../models/User");

const editProfile = async (req, res) => {
  const { profileId } = req.params;
  const editProfileData = req.body;
  try {
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

    res.json(editingProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile." });
  }
};

const viewGifts = async (req, res) => {
  try {
    const view_gifts = await MyGifts.find();
    res.json(view_gifts);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching gifts." });
  }
};

const viewOneGift = async (req, res) => {
  const { giftId } = req.params.id;
  try {
    const Gift = await Gift.findById(giftId);
    if (!Gift) {
      return res.status(404).json({ error: "Gift not found" });
    }
    res.json(Gift);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the gift." });
  }
};

module.exports = { editProfile, viewGifts, viewOneGift };
