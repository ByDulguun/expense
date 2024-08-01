const fs = require("fs");
const path = require("path");

const getAllCategory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "categories.json");

    const rawData = fs.readFileSync(filePath);
    const categories = JSON.parse(rawData);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCategory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "categories.json");
    const rowData = fs.readFileSync(filePath);
    const categories = JSON.parse(rowData);
    const newCategory = req.body;
    categories.push(newCategory);
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllCategory, createCategory };
