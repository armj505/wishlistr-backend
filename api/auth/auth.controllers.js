const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const WishList = require("../../models/WishList");
require("dotenv").config();

// token generation
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });

  return token;
};

// E-mail verification
const generateVerificationToken = () => {
  return require("crypto").randomBytes(32).toString("hex");
};

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // TO DO - Change Verification Link
  const verificationLink = `https://hammerhead-app-kz3f9.ondigitalocean.app/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email Address",
    text: `Click the following link to verify your email address: ${verificationLink}`,
    html: `<p>Click the following link to verify your email address: <a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  return transporter.sendMail(mailOptions);
};

// create user
exports.register = async (req, res, next) => {
  console.log("HRLLO EOTOGMKLTGKLNT");
  try {
    const existingEmail = await User.findOne({
      email: req.body.email,
    });
    if (existingEmail) {
      return res.status(400).json({ error: "This Email is already in use" });
    }
    req.body.password = await hashPassword(req.body.password);

    req.body.isAdmin = false;
    const newUser = await User.create(req.body);
    const defaultWishList = await WishList.create({
      name: "Favorites",
      user: newUser._id,
      isDefaultList: true,
    });
    newUser.wishLists.push(defaultWishList._id);

    const token = generateToken(newUser);
    const verificationToken = generateVerificationToken();
    newUser.emailVerificationToken = verificationToken;
    newUser.emailVerificationTokenExp = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );
    await newUser.save();
    await sendVerificationEmail(newUser.email, verificationToken);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// verify email
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Verification token is missing." });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExp: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification token." });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExp = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: "Email verification successful. You can now log in." });
  } catch (error) {
    next(error);
  }
};

// sign in
exports.signIn = async (req, res, next) => {
  try {
    // const isEmailVerified = req.user.isEmailVerified;
    // if (!isEmailVerified) {
    //   return res.status(403).json("Your email isn't verified yet");
    // }
    const token = generateToken(req.user);

    // res.status(200).json({ token, isEmailVerified });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json("The user isn't found");
    }
    if (!user._id.equals(req.user._id)) {
      return res.status(403).json("You're not allowed to change the password");
    }
    const comparePassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!comparePassword) {
      return res.status(404).json("The two password aren't matched");
    }
    req.body.password = await hashPassword(req.body.newPassword, 10);
    await user.updateOne({ password: req.body.password });
    res.status(200).json("The password has been changed successfully");
  } catch (error) {
    next(error);
  }
};

exports.changePhoneNumber = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json("The user is not found");
    }
    if (!user._id.equals(req.user._id)) {
      return res
        .status(403)
        .json("You're not allowed to change the phone number");
    }
    await user.updateOne({ phoneNumber: req.body.phoneNumber });
    res.status(200).json("The phone number has been updated successfully");
  } catch (error) {
    next(error);
  }
};

//////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET;
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "1h",
    });
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await user.save();
    const resetLink = `http://localhost:7000/api/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });
    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;

    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = await hashPassword(password);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

/////////////////////////////////////////////////
