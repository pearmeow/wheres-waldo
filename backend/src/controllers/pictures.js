import { prisma } from "../lib/prisma.js";
export const get = async (req, res) => {
    // returns ids of all pictures for frontend to ask for
    const pictures = await prisma.picture.findMany({
        omit: {
            path: true,
        },
    });
    res.json(pictures);
};

export const getId = async (req, res) => {
    const picture = await prisma.picture.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    res.sendFile(picture.path);
};
