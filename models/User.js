const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  image: String,
  isAdmin: { type: Boolean, default: false },

  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationTokenExp: Date,

  dateJoined: { type: Date, default: () => new Date(), immutable: true },
  dateOfBirth: {
    type: Date,
    validate: function (input) {
      /* return true only if the input is a valid date, AND is 
    greater than or equal to the current date/time */
      return typeof new Date(input) === "date" && new Date(input) >= new Date();
    },
    message: (input) =>
      `${input} must be greater than or equal to the current date!`,
  }, //data tem de ser superior a data atual,
  gender: { type: String, required: true, enum: ["male", "female"] },
  address: {
    city: String,
    residenceArea: String,
    block: String,
    street: String,
    avenue: String,
    house: String,
    addNotes: String,
  },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  wishLists: [{ type: Schema.Types.ObjectId, ref: "WishList" }],
  myGifts: [{ type: Schema.Types.ObjectId, ref: "Gift" }],

  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = model("User", userSchema);