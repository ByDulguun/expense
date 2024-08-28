const { v4 } = require("uuid");
const { readJson, saveJson } = require("../utils");
const { records } = require("../database/schema");
const { db } = require("../database/index.js");

// const getAllRecords = async (req, res) => {
//   try {
//     const records = await readJson("records.json");

//     const userRecords = records.filter((item) => item.userId === req.user.id);

//     res.json(userRecords);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getAllRecords = async (req, res) => {
  try {
    const records = await db.query.records.findMany();

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const createRecord = async (req, res) => {
//   try {
//     const records = await readJson("records.json");

//     const newRecord = {
//       ...req.body,
//       id: v4(),
//       userId: req.user.id,
//     };

//     records.push(newRecord);

//     await saveJson("records.json", records);

//     res.json(newRecord);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const createRecord = async (req, res) => {
  const { title, icon, iconcolor, userId } = req.body;

  try {
    const record = await db
      .insert(records)
      .values({ title, icon, iconcolor, userId: req.user.id })
      .returning();

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const updateRecord = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const records = await readJson("records.json");

//     let updatedRecord;

//     const updatedRecords = records.map((record) => {
//       if (record.id === id && record. === req.user.id) {
//         updatedRecord = {
//           ...record,
//           ...req.body,
//         };
//         return updatedRecord;
//       }
//       return record;
//     });

//     await saveJson("records.json", updatedRecords);

//     if (updatedRecord) {
//       res.json(updatedRecord);
//     } else {
//       res.status(404).json({ error: "Record not found or unauthorized" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
  // updateRecord,
  deleteRecord,
};
