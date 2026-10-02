const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "db.json");

async function readData() {
    // artificial 5s delay so you can SEE the cache working
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };