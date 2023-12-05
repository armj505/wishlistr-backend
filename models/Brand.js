const { model, Schema } = require("mongoose");

const brandSchema = new Schema({
  name: String,
  image: String,
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = model("Brand", brandSchema);
