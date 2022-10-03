const createBooks = (req, res) => res.send("Create Books");
const getBooks = (req, res) => res.send("Get Books");

const bookController = { createBooks, getBooks };

export default bookController;
