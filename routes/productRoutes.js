const express = require("express");
const controller = require("../controllers/productController");
const { cacheMiddleware, invalidateCacheMiddleware } = require("../middleware/cache");

const router = express.Router();

router.get("/", cacheMiddleware, controller.getAll);
router.get("/:id", cacheMiddleware, controller.getOne);

router.post("/", invalidateCacheMiddleware, controller.create);
router.put("/:id", invalidateCacheMiddleware, controller.update);
router.patch("/:id", invalidateCacheMiddleware, controller.update);
router.delete("/:id", invalidateCacheMiddleware, controller.remove);

module.exports = router;