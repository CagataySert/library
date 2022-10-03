import { User } from "../database/models";

const borrowBook = (req, res) => res.send("Borrow Book");
const returnBook = (req, res) => res.send("Return Book");

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

const userController = {
  createUsers,
  borrowBook,
  returnBook,
  getUsers,
};

export default userController;
