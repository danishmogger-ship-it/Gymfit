const router = require("express").Router();
const c = require("../controllers/subscriptionController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
router.post("/", protect, allowRoles("member"), c.subscribe);
router.get("/mine", protect, allowRoles("member"), c.mine);
router.get("/expiring", protect, allowRoles("admin"), c.expiring);
module.exports = router;
