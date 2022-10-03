import { User, LoanRecord, Book } from "../database/models";

const createUsers = async (req, res) => {
  try {
    await User.bulkCreate([req.body]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUsers = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      const result = await User.findAll({
        attributes: ["id", "name"],
      });

      return res.json(result);
    }

    const result = await User.findByPk(userId, {
      attributes: ["id", "name"],
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const book = await Book.findByPk(bookId);

    if (!book) return res.sendStatus(404);

    await LoanRecord.create({ bookId, name: book.name, borrowerId: userId });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateBookAvgScore = async (bookId, score) => {
  const book = await Book.findByPk(bookId);

  const updatedAvgScore = book.score < 0 ? score : (book.score + score) / 2;

  await Book.update({ score: updatedAvgScore }, { where: { id: bookId } });
};

const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    await LoanRecord.update(
      { userScore: score },
      {
        where: {
          bookId,
          borrowerId: userId,
        },
      }
    );

    await updateBookAvgScore(bookId, score);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const userController = {
  createUsers,
  borrowBook,
  returnBook,
  getUsers,
};

export default userController;
