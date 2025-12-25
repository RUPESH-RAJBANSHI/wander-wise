import "dotenv/config";

import express from "express";
import connectDB from "./config/db.js";
import HANDLERS from "./handlers/index.js";
import errorMiddleware from "./middlewares/error.js";
import { authMiddleware } from "./middlewares/auth.js";

const SERVER = express();

connectDB()
  .then(() => {})
  .catch(() => {})
  .finally(() => {});

SERVER.get("/", (req, res,) => {
  res.send("Wander Wise");
});

SERVER.use(express.json());
SERVER.use(authMiddleware);
SERVER.use("/", HANDLERS);
SERVER.use(errorMiddleware);

SERVER.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
