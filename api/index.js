const express = require("express");

var cors = require("cors");
const { accountRouter } = require("./routes/account.route");
const { iconCategoryRouter } = require("./routes/iconcategory.route");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

app.use("/accounts", accountRouter);

app.use("/iconcategories", iconCategoryRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
