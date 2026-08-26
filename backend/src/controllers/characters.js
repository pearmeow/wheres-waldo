import { prisma } from "../lib/prisma.js";
import * as validator from "../middleware/validator.js";
import { matchedData, validationResult } from "express-validator";
export const get = [
    validator.createIdParamCheck("pictureId"),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
            return;
        }
        const data = matchedData(req);
        const characters = await prisma.character.findMany({
            where: {
                pictureId: Number(data.pictureId),
            },
        });
        console.log(characters);
        res.json(characters);
    },
];
