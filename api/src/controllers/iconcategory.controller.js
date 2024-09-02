const { v4: uuidv4 } = require("uuid");
const { readJson, saveJson } = require("../utils");
const { db } = require("../database/index.js");
const {
  iconcategories: iconcategoriesSchema,
} = require("../database/schema.js"); // Renamed for clarity
const { eq } = require("drizzle-orm");

const getAllIconCategory = async (req, res) => {
  const { id } = req.user;
  try {
    const userIconCategories = await db.query.iconcategories.findMany({
      where: eq(iconcategoriesSchema.userId, id), // Use the renamed constant here
    });

    res.json(userIconCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createIconCategory = async (req, res) => {
  const { amount, category, date, time, payee, note, status } = req.body;

  try {
    const newIconCategory = await db
      .insert(iconcategoriesSchema) // Use the renamed constant here
      .values({
        id: uuidv4(), // Generate a new UUID for the record
        amount,
        category,
        date,
        time,
        payee,
        note,
        status,
        userId: req.user.id,
      })
      .returning(); // Return the inserted record

    res.json(newIconCategory);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      // Unique violation error code
      res.status(409).json({ error: "Record already exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const deleteIconCategory = async (req, res) => {
  try {
    const id = req.params.id; // Extract category ID from request parameters

    const iconcategories = await readJson("iconcategories.json"); // Read the current list of icon categories

    const updatedCategories = iconcategories.filter(
      (category) => category.id !== id // Create a new list excluding the category with the specified ID
    );

    if (iconcategories.length === updatedCategories.length) {
      return res.status(404).json({ error: "Category not found" }); // If the updated list has the same length, the category wasn't found
    }

    await saveJson("iconcategories.json", updatedCategories); // Save the updated list back to iconcategories.json
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Catch and log errors, then respond with a 500 status code
  }
};

module.exports = { getAllIconCategory, createIconCategory, deleteIconCategory };
