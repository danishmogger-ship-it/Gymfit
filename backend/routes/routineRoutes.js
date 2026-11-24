const router = require("express").Router();
const c = require("../controllers/routineController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
router.get("/", protect, c.list);
router.post("/", protect, allowRoles("trainer"), c.create);
module.exports = router;
