const router = require("express").Router();
const c = require("../controllers/planController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
router.get("/", c.list);
router.post("/", protect, allowRoles("admin"), c.create);
router.put("/:id", protect, allowRoles("admin"), c.update);
router.delete("/:id", protect, allowRoles("admin"), c.remove);
module.exports = router;
