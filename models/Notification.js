const { model, Schema } = require("mongoose");

const notificationSchema = new Schema({
  message: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now(), immutable: true },
  isRed: { type: Boolean, default: false },
});

module.exports = model("SubCategory", subCategorySchema);
