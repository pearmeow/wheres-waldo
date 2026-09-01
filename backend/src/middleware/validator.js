import { param, query, body } from "express-validator";

export const createIdParamCheck = (idName) =>
    param(idName)
        .notEmpty()
        .withMessage(idName + " cannot be empty")
        .isInt({ min: 1 })
        .withMessage("Must be an integer greater than 0")
        .escape();

export const createIdQueryCheck = (idName) =>
    query(idName)
        .notEmpty()
        .withMessage(idName + " cannot be empty")
        .isInt({ min: 1 })
        .withMessage("Must be an integer greater than 0")
        .escape();

export const createFloatBodyCheck = (fieldName) =>
    body(fieldName)
        .notEmpty()
        .withMessage(fieldName + " cannot be empty")
        .isFloat({ min: 0.0, max: 1.0 })
        .withMessage("Must be a float")
        .escape();
