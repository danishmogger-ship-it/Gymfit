require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const routineRoutes = require("./routes/routineRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "Welcome to GymFit API", status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => res.status(404).json({ message: `Route ${req.originalUrl} not found` }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`GymFit API running on port ${PORT}`)))
  .catch(err => { console.error("Database connection failed:", err.message); process.exit(1); });
