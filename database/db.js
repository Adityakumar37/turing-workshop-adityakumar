const fs = require("fs/promises")
const path = require("path")

const filePath = path.join(__dirname, "db.json")

async function readData() {
    // added delay so the cache demo actually works
    await new Promise((res) => setTimeout(res, 5000))
    const raw = await fs.readFile(filePath, "utf-8")
    return JSON.parse(raw)
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = { readData, writeData }