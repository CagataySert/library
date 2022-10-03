const createUsers = (req, res) => res.send("Create Users");
const borrowBook = (req, res) => res.send("Borrow Book");
const returnBook = (req, res) => res.send("Return Book");
const getUsers = (req, res) => res.send("Read Users");

const userController = {
  createUsers,
  borrowBook,
  returnBook,
  getUsers,
};

export default userController;
