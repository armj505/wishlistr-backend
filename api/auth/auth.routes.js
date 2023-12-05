const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");
const passport = require("passport");
const {
  register,
  signIn,
  forgotPassword,
  resetPassword,
  changePassword,
  changePhoneNumber,
  verifyEmail,
} = require("./auth.controllers");

router.post("/register", register);
router.post(
  "/signIn",
  passport.authenticate("local", { session: false }),
  signIn
);
router.put(
  "/changePassword",
  passport.authenticate("jwt", { session: false }),
  changePassword
);

router.put(
  "/changeNumber",
  passport.authenticate("jwt", { session: false }),
  changePhoneNumber
);
router.get("/verify-email", verifyEmail);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password/:resetToken", resetPassword);
module.exports = router;
