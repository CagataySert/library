import express from "express";

import { userRoutes, bookRoutes } from "./src/routes";
import db from "./src/database/models";

const app = express();
const PORT = process.env.PORT || 3000;

// test db connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", userRoutes);
app.use("/", bookRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to library application." });
});

app.listen(PORT, () => {
  console.log(`Library Automation app listening on port: ${PORT}`);
});
