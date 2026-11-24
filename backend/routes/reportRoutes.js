const router = require("express").Router();
const c = require("../controllers/reportController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
router.get("/progress", protect, c.memberProgress);
router.get("/progress/:memberId", protect, allowRoles("trainer", "admin"), c.memberProgress);
router.get("/revenue-by-plan", protect, allowRoles("admin"), c.revenueByPlan);
module.exports = router;
