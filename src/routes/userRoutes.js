import express from "express";

import { userController } from "../controllers";
import validator from "../middlewares/joi/validator";

const router = express.Router();

const { createUsers, borrowBook, returnBook, getUsers } = userController;

router
  .route("/users/:userId?")
  .post(validator("createUsers"), createUsers)
  .get(getUsers);

router.post("/:userId/borrow/:bookId", borrowBook);

router.post("/userId/return/:bookId", returnBook);

export default router;
