const cache = new Map();          // key -> { data, createdAt }
const TTL = 60 * 1000;            // 1 minute

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;  // "/products" and "/products/1" get separate entries
    const entry = cache.get(key);

    if (entry) {
        const age = Date.now() - entry.createdAt;
        if (age < TTL) {
            res.set("X-Cache", "HIT");
            return res.json(entry.data);
        }
        cache.delete(key);        // expired -> don't use it
    }

    res.set("X-Cache", "MISS");

    // wrap res.json so we can store the fresh value when the controller responds
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode === 200) {
            cache.set(key, { data: body, createdAt: Date.now() });
        }
        return originalJson(body);
    };

    next();
}

// For POST / PUT / PATCH / DELETE
function invalidateCacheMiddleware(req, res, next) {
    res.on("finish", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.clear();        // list AND single-item entries may be stale
        }
    });
    next();
}

module.exports = { cacheMiddleware, invalidateCacheMiddleware };