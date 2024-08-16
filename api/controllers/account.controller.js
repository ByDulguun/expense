const { v4 } = require("uuid");
const { readJson, saveJson } = require("../utils");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await readJson("accounts.json");

    const userAccounts = accounts.filter((item) => item.userId === req.user.id);

    res.json(userAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAccount = async (req, res) => {
  try {
    const accounts = await readJson("accounts.json");

    const newAccount = {
      ...req.body,
      id: v4(),
      userId: req.user.id,
    };

    accounts.push(newAccount);

    await saveJson("accounts.json", accounts);

    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAccount = async (req, res) => {
  try {
    const id = req.params.id;

    const accounts = await readJson("accounts.json");

    let updatedAccount;

    const updatedAccounts = accounts.map((account) => {
      if (account.id === id && account.userId === req.user.id) {
        updatedAccount = {
          ...account,
          ...req.body,
        };
        return updatedAccount;
      }
      return account;
    });

    await saveJson("accounts.json", updatedAccounts);

    if (updatedAccount) {
      res.json(updatedAccount);
    } else {
      res.status(404).json({ error: "Account not found or unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;

    const accounts = await readJson("accounts.json");

    const updatedAccounts = accounts.filter(
      (account) => account.id !== id || account.userId !== req.user.id
    );

    if (accounts.length === updatedAccounts.length) {
      return res
        .status(404)
        .json({ error: "Account not found or unauthorized" });
    }

    await saveJson("accounts.json", updatedAccounts);

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
