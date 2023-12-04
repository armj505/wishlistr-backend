const { model, Schema } = require("mongoose");
const corn = require("node-cron");
const itemSchema = new Schema({
  name: String,
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  vendor: String,
  description: String,
  price: Number,
  imageURL: String,
  wishList: { type: Schema.Types.ObjectId, ref: "WishList" },
  subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
  preferences: {
    size: String,
    color: String,
  },
  trendValue: { type: Number, default: 0 },
});
const Item = model("Item", itemSchema);
corn.schedule("*/2 * * * *", async () => {
  try {
    await Item.updateMany({}, { $set: { trendValue: 0 } });
    console.log(`reset every 2 minutes....`);
  } catch (error) {
    console.log(`TrendValue resting error ${error.message}`);
  }
});

module.exports = Item;
