const { Router } = require("express");
const {
  getAllRecords,
  createRecord,
  deleteRecord,
} = require("../controllers/record.controller");

const recordsRouter = Router();

recordsRouter
  .get("/", getAllRecords)
  .post("/", createRecord)
  .delete("/:id", deleteRecord);

module.exports = { recordsRouter };
