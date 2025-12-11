import { body } from "express-validator";

export const createTripValidator = [
    body("title").trim ().notEmpty().withMessage("Title is required"),
    body("startDate")
        .trim()
        .notEmpty()
        .withMessage("Start date is required")
        .isDate()
        .withMessage("Start date must be a valid date"),
    body("endDate")
        .trim()
        .notEmpty()
        .withMessage("End date is required")
        .isDate()
        .withMessage("End date must be a valid date")
        .custom((value, { req }) => {
            if (value < req.body.startDate) {
                throw new Error("End date must be after start date");
            }
            return true;
        }),
    body("destination").
    trim()
    .notEmpty()
    .withMessage("Destination is required")
    .isArray()
    .withMessage("Destination must be an array of strings")
    .custom((value) => {
        return value.every((item) => typeof Destination === "string");
    })
    .withMessage("Destination must be a string"),
    body("budget.total")
    .trim()
    .notEmpty()
    .withMessage("Total budget is required")
    .isNumeric()
    .withMessage("Total budget must be a number"),
    body("budget.expenses")
    .optional()
    .isArray()
    .withMessage("Expenses must be an array"),
    body("budget.expenses.*.name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Expense name is required"),
    body("budget.expenses.*.amount")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Expense amount must be a number"),
];