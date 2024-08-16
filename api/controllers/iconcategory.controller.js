const { v4 } = require("uuid");
const { readJson, saveJson } = require("../utils");

// Function to get all icon categories
const getAllIconCategory = async (req, res) => {
  try {
    const iconcategories = await readJson("iconcategories.json"); //Бүх дүрсний ангиллыг агуулсан iconcategories.json-аас өгөгдлийг уншина

    const userIconCategories = iconcategories.filter(
      (item) => item.userId === req.user.id
    ); //Зөвхөн одоогийн хэрэглэгчдэд хамаарах (req.user.id-р тодорхойлогдсон) дүрсний ангиллыг шүүн
    res.json(userIconCategories); //Дүрс ангиллын шүүсэн жагсаалтыг JSON хариулт болгон илгээдэг
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); //Процессын явцад гарсан аливаа алдааг барьж, бүртгэж, серверийн дотоод алдааг илтгэх 500 статусын кодоор хариу өгдөг.
  }
};

// Function to create a new icon category
const createIconCategory = async (req, res) => {
  try {
    const iconcategories = await readJson("iconcategories.json"); //Процессын явцад гарсан аливаа алдааг барьж, бүртгэж, серверийн дотоод алдааг илтгэх 500 статусын кодоор хариу өгдөг.

    const newIconCategory = { ...req.body, id: v4(), userId: req.user.id };
    iconcategories.push(newIconCategory); //req.body-н өгөгдлийг шинэ өвөрмөц ID (uuid.v4() ашиглан) болон одоогийн хэрэглэгчийн ID (req.user.id)-тай нэгтгэж шинэ дүрсний ангилал үүсгэдэг

    await saveJson("iconcategories.json", iconcategories); //Дүрс ангиллын шинэчлэгдсэн жагсаалтыг iconcategories.json руу буцааж хадгална.
    res.json(newIconCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); //Аливаа алдааг олж, бүртгэж, 500 статусын кодоор хариу өгдөг
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
