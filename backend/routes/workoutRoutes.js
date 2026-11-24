const router = require("express").Router();
const c = require("../controllers/workoutController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
router.get("/mine", protect, allowRoles("member"), c.mine);
router.post("/", protect, allowRoles("member"), c.create);
module.exports = router;
