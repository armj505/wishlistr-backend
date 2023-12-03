const { model, Schema } = require("mongoose");

const subCategorySchema = new Schema({
  name: String,
  image: String,
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = model("SubCategory", subCategorySchema);
