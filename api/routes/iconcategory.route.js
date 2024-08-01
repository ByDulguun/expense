const { Router } = require("express");
const {
  getAllIconCategory,
  createIconCategory,
} = require("../controllers/iconcategory.controller");

const iconCategoryRouter = Router();

iconCategoryRouter.get("/", getAllIconCategory).post("/", createIconCategory);

module.exports = { iconCategoryRouter };
