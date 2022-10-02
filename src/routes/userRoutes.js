import express from "express";

const createUsers = (req, res) => res.send("Create Users");
const borrowBook = (req, res) => res.send("Borrow Book");
const returnBook = (req, res) => res.send("Return Book");
const getUsers = (req, res) => res.send("Read Users");

const router = express.Router();

router.route("/users/:userId?").post(createUsers).get(getUsers);

router.post("/:userId/borrow/:bookId", borrowBook);

router.post("/userId/return/:bookId", returnBook);

export default router;
