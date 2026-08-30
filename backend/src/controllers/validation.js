import { prisma } from "../lib/prisma.js";
import * as validator from "../middleware/validator.js";
import { validationResult, matchedData } from "express-validator";

export const post = [
    validator.createIdParamCheck("pictureId"),
    validator.createIdParamCheck("characterId"),
    validator.createFloatBodyCheck("x"),
    validator.createFloatBodyCheck("y"),
    async (req, res) => {
        console.log(req.body);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(404).send({
                errors: result.array(),
            });
            return;
        }
        const data = matchedData(req);
        let correct = false;
        try {
            const char = await prisma.character.findUniqueOrThrow({
                where: {
                    pictureId: Number(data.pictureId),
                    id: Number(data.characterId),
                },
            });
            if (
                Math.abs(char.positionX - data.x) < 0.01 &&
                Math.abs(char.positionY - data.y) < 0.01
            ) {
                correct = true;
            }
            res.json({
                correct,
            });
        } catch (err) {
            console.log(err);
            res.status(404).send({ errors: "Not Found" });
        }
    },
];
