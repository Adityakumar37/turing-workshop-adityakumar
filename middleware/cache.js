// simple in-memory cache
const cache = new Map()
const TTL = 60 * 1000 // 1 minute in ms

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl
    const cached = cache.get(key)

    if (cached) {
        const timePassed = Date.now() - cached.createdAt
        if (timePassed < TTL) {
            res.set("X-Cache", "HIT")
            res.json(cached.data)
            return
        }
        // cache expired so remove it
        cache.delete(key)
    }

    res.set("X-Cache", "MISS")

    // intercept res.json to save response into cache
    const originalJson = res.json.bind(res)
    res.json = function(body) {
        if (res.statusCode === 200) {
            cache.set(key, { data: body, createdAt: Date.now() })
        }
        return originalJson(body)
    }

    next()
}

function invalidateCacheMiddleware(req, res, next) {
    res.on("finish", function() {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.clear()
        }
    })
    next()
}

module.exports = { cacheMiddleware, invalidateCacheMiddleware }