import { prisma } from "../lib/prisma.js";
import * as validator from "../middleware/validator.js";
import { matchedData, validationResult } from "express-validator";
export const get = [
    validator.createIdParamCheck("pictureId"),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(404).send({
                errors: result.array({ onlyFirstError: true }),
            });
            return;
        }
        const data = matchedData(req);
        try {
            const characters = await prisma.character.findMany({
                where: {
                    pictureId: Number(data.pictureId),
                },
                omit: {
                    // don't give the user the answers
                    positionX: true,
                    positionY: true,
                },
            });
            console.log(characters);
            res.json(characters);
        } catch (err) {
            console.log(err);
            res.status(404).json({ errors: "Picture not found" });
        }
    },
];
