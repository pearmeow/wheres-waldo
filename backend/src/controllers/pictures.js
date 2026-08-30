import { prisma } from "../lib/prisma.js";
import * as validator from "../middleware/validator.js";
import { matchedData, validationResult } from "express-validator";
export const get = async (req, res) => {
    // returns ids of all pictures for frontend to ask for
    try {
        const pictures = await prisma.picture.findMany({
            omit: {
                path: true,
            },
        });
        res.json(pictures);
    } catch (err) {
        console.log(err);
        res.status(404).send({ errors: "Not Found" });
    }
};

export const getId = [
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
            const picture = await prisma.picture.findUniqueOrThrow({
                where: {
                    id: Number(data.pictureId),
                },
            });
            res.sendFile(picture.path);
        } catch (err) {
            console.log(err);
            res.status(404).send({ errors: "Not Found" });
        }
    },
];
