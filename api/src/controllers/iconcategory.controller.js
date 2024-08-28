const { v4 } = require("uuid");
const { readJson, saveJson } = require("../utils");
const { db } = require("../database/index.js");
const { v4: uuidv4 } = require("uuid");
const { iconcategories } = require("../database/schema.js");

const getAllIconCategory = async (req, res) => {
  try {
    const iconcategory = await db.query.iconcategories.findMany();

    res.json(iconcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createIconCategory = async (req, res) => {
  const { amount, category, date, time, payee, note, status, userId } =
    req.body;

  try {
    const iconcategory = await db
      .insert(iconcategories)
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

    res.json(iconcategory);
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
    const id = req.params.id; //Хүсэлтийн параметрүүдээс категорийн ID-г задалдаг

    const iconcategories = await readJson("iconcategories.json"); //Одоогийн дүрс ангиллын жагсаалтыг уншина

    const updatedCategories = iconcategories.filter(
      (category) => category.id !== id //Тодорхой ID-тай ангиллаас бусад дүрсний ангиллын шинэ жагсаалтыг үүсгэнэ
    );

    if (iconcategories.length === updatedCategories.length) {
      return res.status(404).json({ error: "Category not found" }); //Хэрэв шинэчлэгдсэн жагсаалтын урт нь анхны жагсаалттай ижил байвал тухайн ID-тай ангилал олдсонгүй гэсэн үг. 404 статусын кодоор хариулна.
    }

    await saveJson("iconcategories.json", updatedCategories); //Шинэчлэгдсэн жагсаалтыг iconcategories.json руу буцааж хадгална
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); //Аливаа алдааг барьж, бүртгэж, 500 статусын кодоор хариулна.
  }
};

module.exports = { getAllIconCategory, createIconCategory, deleteIconCategory };
