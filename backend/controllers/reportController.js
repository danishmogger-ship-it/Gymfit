const mongoose = require("mongoose");
const WorkoutLog = require("../models/WorkoutLog");
const Subscription = require("../models/Subscription");

exports.memberProgress = async (req, res, next) => {
  try {
    const memberId = req.user.role === "member" ? req.user._id : req.params.memberId;
    if (!memberId || !mongoose.isValidObjectId(memberId)) return res.status(400).json({ message: "Valid memberId is required" });
    const rows = await WorkoutLog.find({ member: memberId }).sort({ date: 1 });
    const totalWorkouts = rows.length;
    const measurements = rows.filter(x => x.weightKg != null || x.bodyFatPercent != null)
      .map(x => ({ date: x.date, weightKg: x.weightKg, bodyFatPercent: x.bodyFatPercent }));
    res.json({ totalWorkouts, measurements, workouts: rows });
  } catch (e) { next(e); }
};

exports.revenueByPlan = async (_req, res, next) => {
  try {
    const report = await Subscription.aggregate([
      { $group: { _id: "$plan", planName: { $first: "$planName" }, subscriptions: { $sum: 1 }, revenue: { $sum: "$amountPaid" } } },
      { $sort: { revenue: -1 } }
    ]);
    res.json(report);
  } catch (e) { next(e); }
};
