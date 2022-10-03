import { Book } from "../database/models";

const createBooks = async (req, res) => {
  try {
    await Book.bulkCreate([req.body]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getBooks = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    if (!bookId) {
      const result = await Book.findAll({
        attributes: ["id", "name"],
      });

      return res.json(result);
    }

    const result = await Book.findByPk(bookId, {
      attributes: ["id", "name", "score"],
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const bookController = { createBooks, getBooks };

export default bookController;
