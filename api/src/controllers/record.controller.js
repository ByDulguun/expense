const { v4 } = require("uuid");
const { readJson, saveJson } = require("../utils");
const { records } = require("../database/schema");
const { db } = require("../database/index.js");
const { v4: uuidv4 } = require("uuid");

const getAllRecords = async (req, res) => {
  try {
    const records = await db.query.records.findMany();

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createRecord = async (req, res) => {
  const { title, icon, iconColor, userId } = req.body;

  try {
    const record = await db
      .insert(records)
      .values({
        id: uuidv4(), // Generate a new UUID for the record
        title,
        icon,
        iconColor,
        userId: req.user.id,
      })
      .returning(); // Return the inserted record

    res.json(record);
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

const deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;

    const records = await readJson("records.json");

    const updatedRecords = records.filter(
      (record) => record.id !== id || record.userId !== req.user.id
    );

    if (records.length === updatedRecords.length) {
      return res
        .status(404)
        .json({ error: "Record not found or unauthorized" });
    }

    await saveJson("records.json", updatedRecords);

    res.json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllRecords,
  createRecord,
  deleteRecord,
};
