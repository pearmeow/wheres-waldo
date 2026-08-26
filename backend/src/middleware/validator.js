import { param, query } from "express-validator";

export const createIdParamCheck = (idName) =>
    param(idName).notEmpty().isInt({ min: 1 }).escape();

export const createIdQueryCheck = (idName) =>
    query(idName).notEmpty().isInt({ min: 1 }).escape();
