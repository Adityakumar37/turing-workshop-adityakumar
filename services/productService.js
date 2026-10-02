const { readData, writeData } = require("../database/db")

async function getAllProducts() {
    const products = await readData()
    return products
}

async function getProductById(id) {
    const products = await readData()
    const found = products.find(product => product.id === id)
    if (!found) return null
    return found
}

async function createProduct(name, price) {
    const products = await readData()

    // find the max id and add 1
    let maxId = 0
    for (let i = 0; i < products.length; i++) {
        if (products[i].id > maxId) maxId = products[i].id
    }

    const newProduct = {
        id: maxId + 1,
        name: name,
        price: price
    }

    products.push(newProduct)
    await writeData(products)
    return newProduct
}

async function updateProduct(id, updatedFields) {
    const products = await readData()
    let index = -1

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            index = i
            break
        }
    }

    if (index === -1) return null

    products[index] = { ...products[index], ...updatedFields, id: id }
    await writeData(products)
    return products[index]
}

async function deleteProduct(id) {
    const products = await readData()
    let index = -1

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            index = i
            break
        }
    }

    if (index === -1) return false

    products.splice(index, 1)
    await writeData(products)
    return true
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }