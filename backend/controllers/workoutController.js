const WorkoutLog = require("../models/WorkoutLog");
exports.create = async (req, res, next) => {
  try {
    const { workoutName } = req.body;
    if (!workoutName) return res.status(400).json({ message: "Workout name is required" });
    const log = await WorkoutLog.create({ ...req.body, member: req.user._id });
    res.status(201).json(log);
  } catch (e) { next(e); }
};
exports.mine = async (req, res, next) => {
  try { res.json(await WorkoutLog.find({ member: req.user._id }).sort({ date: -1 })); } catch (e) { next(e); }
};
