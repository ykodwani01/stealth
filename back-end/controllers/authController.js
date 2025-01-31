const authService = require("../services/authService");

// Register user
export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
    await authService.registerUser(email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
}

// Send OTP
export async function sendOtp(req, res) {
  try {
    const { email } = req.body;
    await authService.generateOtp(email);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
}

// Verify OTP
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const token = await authService.validateOtp(email, otp);
    res.json({ authToken: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Login user
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const token = await authService.loginUser(email, password);
    res.json({ authToken: token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
