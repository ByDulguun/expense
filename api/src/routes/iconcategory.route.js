const { Router } = require("express");
const {
  getAllIconCategory,
  createIconCategory,
  deleteIconCategory,
} = require("../controllers/iconcategory.controller");

const iconCategoryRouter = Router();

iconCategoryRouter
  .get("/", getAllIconCategory)
  .post("/", createIconCategory)
  .delete("/:id", deleteIconCategory);

module.exports = { iconCategoryRouter };
