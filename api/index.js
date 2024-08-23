const express = require("express");
require("dotenv").config();

var cors = require("cors");
const { iconCategoryRouter } = require("./src/routes/iconcategory.route");
const { authRouter } = require("./src/routes/auth.route");
const { userRouter } = require("./src/routes/user.route");
const { authMiddleware } = require("./src/middlewares/auth.middleware");
const { recordsRouter } = require("./src/routes/record.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

const port = 5000;

app.use("/records", recordsRouter);
app.use("/iconcategories", iconCategoryRouter);

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
