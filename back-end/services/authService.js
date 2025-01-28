const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bhavya.shah@searce.com",
    pass: "gupq kplt ulow qsaw",
  },
});

// Send OTP email
const sendOtpMail = async (email, otp) => {
  const mailOptions = {
    from: "bhavya.shah@searce.com",
    to: email,
    subject: "OTP Verification Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
};

// Register user
exports.registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const newUser = new User({ email, password });
  await newUser.save();
};

// Generate OTP
exports.generateOtp = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await OTP.findOneAndUpdate(
    { email },
    { otp, otpExpires },
    { upsert: true, new: true }
  );
  await sendOtpMail(email, otp);
};

// Verify OTP
exports.validateOtp = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord || otpRecord.otpExpires < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  await OTP.deleteOne({ email, otp });
  const user = await User.findOne({ email });
  const token = jwt.sign({ id: user._id }, "phaserunner03", { expiresIn: "1h" });
  return token;
};

// Login user
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: user._id }, "phaserunner03", { expiresIn: "1h" });
  return token;
};
