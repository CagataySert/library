import express from "express";

import { bookController } from "../controllers";
import validator from "../middlewares/joi/validator";

const router = express.Router();

const { createBooks, getBooks } = bookController;

router.post("/books", validator("createBooks"), createBooks);

router.get("/books/:bookId?", getBooks);

export default router;
