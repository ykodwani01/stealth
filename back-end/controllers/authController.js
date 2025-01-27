const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhavya.shah@searce.com",
    pass: "Bhavya@21",
  },
});

const sendOtpMail = (email, otp) => {
  const mailOptions = {
    from: "bhavya.shah@searce.com",
    to: email,
    subject: "OTP verification code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes. `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    console.log("Done");
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("error");
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.sentOtp = async(req,res)=>{
  try{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"User not found"});
    }
    const otp = crypto.randomInt(100000,999999).toString();
    const otpExpires = Date.now() + 10 *60*1000;//10 minutes


  }
  catch(error){
    
  }
}

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, "phaserunner03", {
      expiresIn: "1h",
    });
    res.json({ authToken: token });
    console.log(token);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
