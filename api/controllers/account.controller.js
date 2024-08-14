const { v4 } = require("uuid");
const { readJson, saveJson } = require("../utils");

const getAllAccounts = async (_, res) => {
  try {
    const accounts = readJson("accounts.json");

    const userAccounts = accounts.filter((item) => item.userId === req.user.id);

    res.json(userAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAccount = async (req, res) => {
  try {
    const accounts = readJson("accounts.json");

    const newAccount = {
      ...req.body,
      id: v4(),
    };

    accounts.push(newAccount);

    saveJson("accounts.json", accounts);

    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAccount = async (req, res) => {
  try {
    let updateAccount;

    const id = req.params.id;

    const accounts = readJson("accounts.json");

    const updatedAccounts = accounts.map((account) => {
      if (account.id === id) {
        updatedAccount = {
          ...account,
          ...req.body,
        };

        return updateAccount;
      }

      return account;
    });

    saveJson("accounts.json", updatedAccounts);

    res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;

    const accounts = readJson("accounts.json");

    const updatedAccounts = accounts.filter((account) => account.id !== id);

    saveJson("accounts.json", updatedAccounts);

    res.json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
