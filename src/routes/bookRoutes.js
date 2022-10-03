import express from "express";

import { Book, User } from "../database/models";

const createBooks = (req, res) => res.send("Create Books");
const getBooks = async (req, res) => {
  try {
    const result = await Book.findAll({
      include: User,
      attributes: ["name", "score"],
      where: {
        "$User.id$": 2,
      },
    });

    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send("Something bad happened!");
  }
};

const router = express.Router();

router.route("/books/:bookId?").post(createBooks).get(getBooks);

export default router;
