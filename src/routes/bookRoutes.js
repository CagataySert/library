import express from "express";

const createBooks = (req, res) => res.send("Create Books");
const getBooks = (req, res) => res.send("Read Books");

const router = express.Router();

router.route("/books/:bookId?").post(createBooks).get(getBooks);

export default router;
