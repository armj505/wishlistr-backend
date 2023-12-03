const { model, Schema } = require("mongoose");

const myGiftSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    sender: String,
    message: String,
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

module.exports = model("Gift", myGiftSchema);
