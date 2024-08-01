const { Router } = require("express");
const {
  getAllCategory,
  createCategory,
} = require("..controllers/category,controller");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory).post("/", createCategory);

module.exports = { accountRouter };
