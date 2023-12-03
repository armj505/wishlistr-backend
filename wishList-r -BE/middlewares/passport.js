const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy = new LocalStrategy(
  {
    usernameField: "phoneNumber",
  },
  async (phoneNumber, password, done) => {
    try {
      const user = await User.findOne({ phoneNumber: phoneNumber });
      if (!user) {
        return (
          done(false, null),
          {
            message: "The phone number is wrong",
          }
        );
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return done(false, null, {
          message: "The entered password is wrong",
        });
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    const user = await User.findOne({ _id: payload._id });
    if (!user) {
      return done(false, null);
    }
    const isAdmin = payload.isAdmin;
    user.isAdmin = isAdmin;
    return done(null, user);
  }
);
module.exports = { localStrategy, jwtStrategy };
