const mongoose = require("mongoose");
const planSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  durationDays: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  benefits: [{ type: String }],
  active: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model("Plan", planSchema);
