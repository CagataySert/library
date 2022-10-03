import { User, LoanRecord, Book } from "../database/models";

const checkUserIfExists = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const createUsers = async (req, res) => {
  try {
    await User.bulkCreate([req.body]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// TODO: Refactor
const findUserLoandRecordsAndFormat = async (userId) => {
  const formattedRecords = {
    past: [],
    present: [],
  };

  const records = await LoanRecord.findAll({ where: { borrowerId: userId } });

  if (records.length === 0) {
    return formattedRecords;
  }

  records.forEach((record) => {
    if (!record.userScore) {
      formattedRecords.present.push({ name: record.name });
    } else {
      formattedRecords.past.push({
        name: record.name,
        userScore: record.userScore,
      });
    }
  });

  return formattedRecords;
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

    const doesUserExist = await checkUserIfExists(userId);

    if (!doesUserExist)
      return res.json({
        message: "Can not find any user related sended userId",
      });

    const user = await User.findByPk(userId, {
      attributes: ["id", "name"],
    });

    const loanRecords = await findUserLoandRecordsAndFormat(userId);

    res.json({
      id: user.id,
      name: user.name,
      books: loanRecords,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const doesUserExist = await checkUserIfExists(userId);

    if (!doesUserExist)
      return res.json({
        message: "Can not find any user related sended userId",
      });

    const book = await Book.findByPk(bookId);

    if (!book) return res.sendStatus(404);

    if (!book.isAccessible)
      return res.json({ message: "Book was already borrowed by someone!" });

    await LoanRecord.create({ bookId, name: book.name, borrowerId: userId });
    await Book.update({ isAccessible: false }, { where: { id: bookId } });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateBookAvgScoreAndAccessibility = async (bookId, score) => {
  const book = await Book.findByPk(bookId);

  const updatedAvgScore = book.score < 0 ? score : (book.score + score) / 2;

  await Book.update(
    { isAccessible: true, score: updatedAvgScore },
    { where: { id: bookId } }
  );
};

const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    const doesUserExist = await checkUserIfExists(userId);

    if (!doesUserExist)
      return res.json({
        message: "Can not find any user related sended userId",
      });

    const isUpdated = await LoanRecord.update(
      { userScore: score },
      {
        where: {
          bookId,
          borrowerId: userId,
        },
      }
    );

    if (isUpdated[0] > 0) {
      await updateBookAvgScoreAndAccessibility(bookId, score);
    }

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
