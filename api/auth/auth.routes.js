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

router.post("/auth/register", register);
router.post(
  "/auth/signIn",
  passport.authenticate("local", { session: false }),
  signIn
);
router.put(
  "/auth/changePassword",
  passport.authenticate("jwt", { session: false }),
  changePassword
);

router.put(
  "/auth/changeNumber",
  passport.authenticate("jwt", { session: false }),
  changePhoneNumber
);
router.get("/verify-email", verifyEmail);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password/:resetToken", resetPassword);
module.exports = router;
