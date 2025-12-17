import Router from "express";
import useValidator from "../middlewares/usevalidator.js";
import { register, login } from "../services/auth.js";
import { createUserValidator } from "../validators/user.js";
import { loginValidator } from "../validators/auth.js";

const AUTH_ROUTER = Router();
AUTH_ROUTER.post(
  "/register",
  useValidator(createUserValidator),
  async (req, res, next) => {
    try {
      const { user, token } = await register(req.body);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }
);

AUTH_ROUTER.post(
  "/login",
  useValidator(loginValidator),
  async (req, res, next) => {
    try {
      const result = await login(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);
export default AUTH_ROUTER;
