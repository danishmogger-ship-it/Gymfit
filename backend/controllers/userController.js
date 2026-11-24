const User = require("../models/User");
exports.members = async (_req, res, next) => {
  try { res.json(await User.find({ role: "member" }).select("name email createdAt").sort({ name: 1 })); } catch (e) { next(e); }
};
