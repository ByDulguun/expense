const fs = require("fs");
const path = require("path");

const getAllIconCategory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "iconcategories.json");

    const rawData = fs.readFileSync(filePath);
    const iconcategories = JSON.parse(rawData);
    res.json(iconcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createIconCategory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "iconcategories.json");
    const rowData = fs.readFileSync(filePath);
    const categories = JSON.parse(rowData);
    const newIconCategory = req.body;
    categories.push(newIconCategory);
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
    res.json(newIconCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllIconCategory, createIconCategory };
