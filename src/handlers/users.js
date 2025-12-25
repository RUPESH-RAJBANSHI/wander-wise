import { Router } from "express";
import {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} from "../services/user.js";
import {
  createUserValidator,
  updateUserValidator,
} from "../validators/user.js";
import useValidator from "../middlewares/usevalidator.js";

const USER_ROUTER = Router();

USER_ROUTER.post(
  "/",
  useValidator(createUserValidator),
  async (req, res, next) => {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

USER_ROUTER.get("/", async (req, res, next) => {
  try {
    const users = await findAllUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

USER_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

USER_ROUTER.patch(
  "/:id",
  useValidator(updateUserValidator),
  async (req, res, next) => {
    try {
      const user = await updateUserById(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

USER_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    const user = await deleteUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default USER_ROUTER;
