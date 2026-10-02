const service = require("../services/productService");

async function getAll(req, res) {
    try {
        res.json(await service.getAllProducts());
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getOne(req, res) {
    try {
        const product = await service.getProductById(parseInt(req.params.id));
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function create(req, res) {
    try {
        const { name, price } = req.body;
        if (!name || price === undefined) {
            return res.status(400).json({ message: "name and price are required" });
        }
        const product = await service.createProduct({ name, price });
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function update(req, res) {
    try {
        const product = await service.updateProduct(parseInt(req.params.id), req.body);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function remove(req, res) {
    try {
        const deleted = await service.deleteProduct(parseInt(req.params.id));
        if (!deleted) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getAll, getOne, create, update, remove };