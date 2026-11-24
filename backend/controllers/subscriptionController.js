const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");
exports.subscribe = async (req, res, next) => {
  try {
    const plan = await Plan.findOne({ _id: req.body.planId, active: true });
    if (!plan) return res.status(404).json({ message: "Active plan not found" });
    const startDate = req.body.startDate ? new Date(req.body.startDate) : new Date();
    if (Number.isNaN(startDate.getTime())) return res.status(400).json({ message: "Invalid start date" });
    const expiryDate = new Date(startDate);
    expiryDate.setDate(expiryDate.getDate() + plan.durationDays);
    const sub = await Subscription.create({
      member: req.user._id, plan: plan._id, planName: plan.name,
      amountPaid: plan.price, startDate, expiryDate
    });
    res.status(201).json(await sub.populate("plan member", "name email"));
  } catch (e) { next(e); }
};
exports.mine = async (req, res, next) => {
  try { res.json(await Subscription.find({ member: req.user._id }).populate("plan", "name durationDays price").sort({ createdAt: -1 })); } catch (e) { next(e); }
};
exports.expiring = async (req, res, next) => {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90);
    const now = new Date();
    const end = new Date(now); end.setDate(end.getDate() + days);
    const rows = await Subscription.find({ status: "active", expiryDate: { $gte: now, $lte: end } })
      .populate("member", "name email").populate("plan", "name").sort({ expiryDate: 1 });
    res.json(rows);
  } catch (e) { next(e); }
};
