const { Router } = require("express");
const { login, register } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/", login).post("/signup", register);

module.exports = { authRouter };
