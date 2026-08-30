import { prisma } from "../lib/prisma.js";
import * as validator from "../middleware/validator.js";
import { matchedData, validationResult } from "express-validator";
export const get = async (req, res) => {
    // returns ids of all pictures for frontend to ask for
    const pictures = await prisma.picture.findMany({
        omit: {
            path: true,
        },
    });
    res.json(pictures);
};

export const getId = [
    validator.createIdParamCheck("pictureId"),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(404).send({ errors: result.array() });
            return;
        }
        const data = matchedData(req);
        const picture = await prisma.picture.findUnique({
            where: {
                id: Number(data.pictureId),
            },
        });
        res.sendFile(picture.path);
    },
];
