import express from "express";

import { bookController } from "../controllers";
import validator from "../middlewares/joi/validator";

const router = express.Router();

const { createBooks, getBooks } = bookController;

router
  .route("/books/:bookId?")
  .post(validator("createBooks"), createBooks)
  .get(getBooks);

export default router;
