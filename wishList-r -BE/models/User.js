const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  isAdmin: { type: Boolean, default: false },

  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationTokenExp: Date,

  dateJoined: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
  dateOfBirth: String,
  gender: { type: String, required: true, enum: ["male", "female"] },
  address: {
    street: String,
    city: String,
    residenceArea: String,
    block: String,
  },
  name: {
    firstName: String,
    lastName: String,
  },
  wishLists: [{ type: Schema.Types.ObjectId, ref: "WishList" }],
  //myGifts [{senderName, message, item}] ???   <==

  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = model("User", userSchema);
