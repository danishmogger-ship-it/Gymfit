const Plan = require("../models/Plan");
exports.list = async (_req, res, next) => {
  try { res.json(await Plan.find({ active: true }).sort({ price: 1 })); } catch (e) { next(e); }
};
exports.create = async (req, res, next) => {
  try {
    const { name, durationDays, price } = req.body;
    if (!name || !durationDays || price === undefined) return res.status(400).json({ message: "Name, duration and price are required" });
    res.status(201).json(await Plan.create(req.body));
  } catch (e) { next(e); }
};
exports.update = async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (e) { next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json({ message: "Plan deactivated" });
  } catch (e) { next(e); }
};
