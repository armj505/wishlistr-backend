const { model, Schema } = require("mongoose");
const shareableLinkSchema = new Schema({
  wishList: { type: Schema.Types.ObjectId, ref: "WishList" },
  shareableLink: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = model("shareableLink", shareableLinkSchema);
