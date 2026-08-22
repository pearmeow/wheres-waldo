import { prisma } from "../lib/prisma.js";
export const post = async (req, res) => {
    let correct = false;
    // TODO: check character coordinates with db entry
    if (correct === false) {
        correct = true;
    }
    res.json({
        correct,
    });
};
