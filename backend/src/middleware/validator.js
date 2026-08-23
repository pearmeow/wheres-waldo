import { param } from "express-validator";

export const createIdParamCheck = (idName) =>
    param(idName).notEmpty().isInt({ min: 1 }).escape();
