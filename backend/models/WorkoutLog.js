const mongoose = require("mongoose");
const workoutLogSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  workoutName: { type: String, required: true },
  durationMinutes: { type: Number, min: 0, default: 0 },
  notes: { type: String, default: "" },
  weightKg: { type: Number, min: 0 },
  bodyFatPercent: { type: Number, min: 0, max: 100 }
}, { timestamps: true });
module.exports = mongoose.model("WorkoutLog", workoutLogSchema);
