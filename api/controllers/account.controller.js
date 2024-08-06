const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const getAllAccounts = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");

    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAccount = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rowData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rowData);
    const newAccount = { ...req.body, id: uuidv4() };
    accounts.push(newAccount);
    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2));
    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAccount = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const { id } = req.params;
    const rawData = fs.readFileSync(filePath);
    let account = JSON.parse(rawData);

    account = account.filter((account) => account.id != id);

    fs.writeFileSync(filePath, JSON.stringify(account, null, 2));
    res.status(204).end();
  } catch (error) {}
};
module.exports = { getAllAccounts, createAccount, deleteAccount };
