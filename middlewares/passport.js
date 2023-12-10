const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy = new LocalStrategy(
  {
    usernameField: "emailOrPhone",
  },
  async (emailOrPhone, password, done) => {
    try {
      const user = await User.findOne({
        // this lets user to authenticate using either email or username
        $or: [{ phoneNumber: emailOrPhone }, { email: emailOrPhone }],
      });
      if (!user) {
        return (
          done(null, false),
          {
            message: "Email or Phone Number are not found.",
          }
        );
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return done(null, false, {
          message: "The Entered Password is wrong",
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
    try {
      const user = await User.findOne({ _id: payload._id });
      if (!user) {
        return done(null, false);
      }
      const isAdmin = payload.isAdmin;
      user.isAdmin = isAdmin;
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
module.exports = { localStrategy, jwtStrategy };
