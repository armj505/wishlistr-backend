const { model, Schema } = require("mongoose");

const wishListSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: "Item" },
      isHighlighted: { type: Boolean, default: false },
      isFulfilled: { type: Boolean, default: false },
    },
  ],
  isDefaultList: { type: Boolean, default: false },
});

module.exports = model("WishList", wishListSchema);
