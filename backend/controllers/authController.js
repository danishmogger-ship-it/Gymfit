const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function tokenFor(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8)
      return res.status(400).json({ message: "Name, email and password (minimum 8 characters) are required" });
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail }))
      return res.status(409).json({ message: "Email is already registered" });
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: normalizedEmail, password: hashed, role: "member" });
    res.status(201).json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || "").toLowerCase().trim() }).select("+password");
    if (!user || !await bcrypt.compare(password || "", user.password))
      return res.status(401).json({ message: "Invalid email or password" });
    res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};
exports.me = (req, res) => res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role } });
