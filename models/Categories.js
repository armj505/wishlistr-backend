const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: String,
  image: String,
  subCategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
});

module.exports = model("Category", categorySchema);
