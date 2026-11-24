const mongoose = require("mongoose");
const routineSchema = new mongoose.Schema({
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  notes: { type: String, default: "" },
  exercises: [{
    name: { type: String, required: true },
    sets: { type: Number, default: 3, min: 1 },
    reps: { type: String, default: "10" }
  }]
}, { timestamps: true });
module.exports = mongoose.model("Routine", routineSchema);
