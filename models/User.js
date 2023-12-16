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
  image: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
  },
  isAdmin: { type: Boolean, default: false },

  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationTokenExp: Date,

  dateJoined: { type: Date, default: () => new Date(), immutable: true },
  dateOfBirth: {
    type: Date,
    validate: function (input) {
      // TO TEST
      /* return true only if the input is a valid date, AND is 
    greater than or equal to the current date/time */
      return typeof new Date(input) === "date" && new Date(input) >= new Date();
    },
    message: (input) =>
      `${input} must be greater than or equal to the current date!`,
  }, //data tem de ser superior a data atual,
  gender: { type: String, default: "Not yet specified" },

  address: {
    city: { type: String },
    residenceArea: { type: String },
    block: { type: String },
    street: { String },
    avenue: { type: String },
    house: { type: String },
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
userSchema.pre("save", function (next) {
  if (!this.address) {
    this.address = {
      city: "Kuwait",
      residenceArea: "Kuwait",
      block: "1",
      street: "108",
      avenue: "none",
      house: "5",
    };
  }
  next();
});

module.exports = model("User", userSchema);
