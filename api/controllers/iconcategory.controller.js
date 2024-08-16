const { v4 } = require("uuid");
const { readJson, saveJson } = require("../utils");

// Function to get all icon categories
const getAllIconCategory = async (req, res) => {
  try {
    const iconcategories = await readJson("iconcategories.json");

    const userIconCategories = iconcategories.filter(
      (item) => item.userId === req.user.id
    );
    res.json(userIconCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to create a new icon category
const createIconCategory = async (req, res) => {
  try {
    const iconcategories = await readJson("iconcategories.json");

    const newIconCategory = { ...req.body, id: v4(), userId: req.user.id };
    iconcategories.push(newIconCategory);

    await saveJson("iconcategories.json", iconcategories);
    res.json(newIconCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const deleteIconCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const iconcategories = await readJson("iconcategories.json");

    const updatedCategories = iconcategories.filter(
      (category) => category.id !== id
    );

    if (iconcategories.length === updatedCategories.length) {
      return res.status(404).json({ error: "Category not found" });
    }

    await saveJson("iconcategories.json", updatedCategories);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllIconCategory, createIconCategory, deleteIconCategory };
