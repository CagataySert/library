import express from "express";

import { userRoutes, bookRoutes } from "./src/routes";

const app = express();
const port = 3000;

// Middlewares

// Routes
app.use("/", userRoutes);
app.use("/", bookRoutes);

//Todo: Remove it, it is just a garbage.
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Library Automation app listening on port: ${port}`);
});
