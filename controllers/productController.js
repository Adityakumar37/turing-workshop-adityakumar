const productService = require("../services/productService")

async function getAll(req, res) {
    try {
        const products = await productService.getAllProducts()
        res.json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

async function getOne(req, res) {
    try {
        const id = parseInt(req.params.id)
        const product = await productService.getProductById(id)

        if (product === null) {
            res.status(404).json({ message: "product not found" })
            return
        }

        res.json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

async function create(req, res) {
    try {
        const name = req.body.name
        const price = req.body.price

        if (!name || price === undefined) {
            res.status(400).json({ message: "name and price are required" })
            return
        }

        const newProduct = await productService.createProduct(name, price)
        res.status(201).json(newProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id)
        const updated = await productService.updateProduct(id, req.body)

        if (updated === null) {
            res.status(404).json({ message: "product not found" })
            return
        }

        res.json(updated)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id)
        const result = await productService.deleteProduct(id)

        if (!result) {
            res.status(404).json({ message: "product not found" })
            return
        }

        res.json({ message: "product deleted successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}

module.exports = { getAll, getOne, create, update, remove }