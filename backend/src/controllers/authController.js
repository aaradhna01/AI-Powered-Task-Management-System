const User = require("../models/User");
const UserSession = require("../models/UserSession");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login User
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    res.json({ token, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Logout User
async function logout(req, res) {
  try {
    // Agar DB/Redis session system use kar rahe ho to yaha cleanup karna hoga
    // Filhaal simple success response bhej rahe hain
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Refresh Token
async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "No refresh token provided" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}

module.exports = { register, login, logout, refreshToken };
