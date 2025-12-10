import { validationResult } from "express-validator";
import ValidationError from "../errors/validation-error.js";

const errorMiddleware = (err, _, res, __) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      sucess: false,
      message: err.message,
      errors: err.errors,
    });
  }

  const statuscode = err.statusCode ?? res.statusCode ?? 500;
  res.status(statuscode).json({
    sucess: false,
    message: err.message || "something went wrong",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    error: err.errors
      ? Object.values(err.errors).map((error) => error.message)
      : null,
  });
};
export default errorMiddleware;
