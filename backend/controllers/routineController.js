const Routine = require("../models/Routine");
const User = require("../models/User");
exports.create = async (req, res, next) => {
  try {
    const { memberId, title, exercises } = req.body;
    const member = await User.findOne({ _id: memberId, role: "member" });
    if (!member) return res.status(404).json({ message: "Member not found" });
    if (!title || !Array.isArray(exercises) || !exercises.length)
      return res.status(400).json({ message: "Title and at least one exercise are required" });
    const routine = await Routine.create({ trainer: req.user._id, member: memberId, title, notes: req.body.notes, exercises });
    res.status(201).json(await routine.populate("trainer member", "name email"));
  } catch (e) { next(e); }
};
exports.list = async (req, res, next) => {
  try {
    const filter = req.user.role === "member" ? { member: req.user._id }
      : req.user.role === "trainer" ? { trainer: req.user._id } : {};
    res.json(await Routine.find(filter).populate("trainer member", "name email").sort({ createdAt: -1 }));
  } catch (e) { next(e); }
};
