const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "..", "data", "iconcategories.json");

// Function to ensure the data directory and file exist
const ensureFileExists = () => {
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

const getAllIconCategory = async (req, res) => {
  try {
    ensureFileExists();

    const rawData = fs.readFileSync(filePath, "utf8");
    const iconcategories = JSON.parse(rawData);

    res.json(iconcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createIconCategory = async (req, res) => {
  try {
    ensureFileExists();

    const rawData = fs.readFileSync(filePath, "utf8");
    const categories = JSON.parse(rawData);
    const newIconCategory = { ...req.body, id: uuidv4() };

    categories.push(newIconCategory);
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
    res.json(newIconCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteIconCategory = async (req, res) => {
  try {
    ensureFileExists();

    const rawData = fs.readFileSync(filePath, "utf8");
    const categories = JSON.parse(rawData);
    const { id } = req.params;

    // Filter out the category to delete
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );

    // Check if the category was found and deleted
    if (categories.length === updatedCategories.length) {
      return res.status(404).json({ error: "Category not found" });
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedCategories, null, 2));
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllIconCategory, createIconCategory, deleteIconCategory };
