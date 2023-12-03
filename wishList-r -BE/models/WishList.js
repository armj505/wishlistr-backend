const { model, Schema } = require("mongoose");

const wishListSchema = new Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = model("WishList", wishListSchema);
