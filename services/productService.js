const { readData, writeData } = require("../database/db");

async function getAllProducts() {
    return readData();
}

async function getProductById(id) {
    const data = await readData();
    return data.find((p) => p.id === id) || null;
}

async function createProduct({ name, price }) {
    const data = await readData();
    const newId = data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1;
    const product = { id: newId, name, price };
    data.push(product);
    await writeData(data);
    return product;
}

// PUT = replace, PATCH = partial update (same logic works for both)
async function updateProduct(id, fields) {
    const data = await readData();
    const index = data.findIndex((p) => p.id === id);
    if (index === -1) return null;

    data[index] = { ...data[index], ...fields, id };
    await writeData(data);
    return data[index];
}

async function deleteProduct(id) {
    const data = await readData();
    const index = data.findIndex((p) => p.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    await writeData(data);
    return true;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};