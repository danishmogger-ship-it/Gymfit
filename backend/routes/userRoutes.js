const router = require("express").Router();
const { members } = require("../controllers/userController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
router.get("/members", protect, allowRoles("trainer", "admin"), members);
module.exports = router;
