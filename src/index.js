import express from "express";
import connectDB from "./config/db.js";
import HANDLERS from "./handlers/index.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

connectDB()
  .then(() => {})
  .catch(() => {})
  .finally(() => {});

app.get("/", (req, res) => {
  res.send("Wander Wise");
});

app.use(express.json());
app.use("/", HANDLERS);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
