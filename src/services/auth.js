import { createUser } from "./user.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import NotFoundErrror from "../errors/not-found-error.js";
import UnauthorizedError from "../errors/unauthorize-error.js";
import { compare } from "bcrypt";

export const register = async (userData) => {
  const user = await createUser(userData);

  const token = await signAsync(
    { userId: user._id.toString() },
    process.env.JWT_SECRET,
    {
      expireIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return { user, token };
};

export const login = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new NotFoundErrror("This email is not registered.");
  }
  const isPasswordValid = await compare(userData.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials.");
  }
  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET,
    {
      expireIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return { user, token };
};
