const express = require("express")
const productController = require("../controllers/productController")
const { cacheMiddleware, invalidateCacheMiddleware } = require("../middleware/cache")

const router = express.Router()

router.get("/", cacheMiddleware, productController.getAll)
router.get("/:id", cacheMiddleware, productController.getOne)

router.post("/", invalidateCacheMiddleware, productController.create)
router.put("/:id", invalidateCacheMiddleware, productController.update)
router.patch("/:id", invalidateCacheMiddleware, productController.update)
router.delete("/:id", invalidateCacheMiddleware, productController.remove)

module.exports = router