const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  planName: { type: String, required: true },
  amountPaid: { type: Number, required: true, min: 0 },
  startDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" }
}, { timestamps: true });
module.exports = mongoose.model("Subscription", subscriptionSchema);
