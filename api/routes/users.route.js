import { createUser, getUsers } from "../../test-api/src/controllers/users.controller.js";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", getUsers).post("/", createUser);

export { usersRouter };
