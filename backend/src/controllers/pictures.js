import { prisma } from "../lib/prisma.js";
export const get = async (req, res) => {
    console.log("in?");
    // returns ids of all pictures for frontend to ask for
    const pictures = await prisma.picture.findMany({
        omit: {
            path: true,
        },
    });
    console.log("and there are the pictures");
    res.json(pictures);
};

export const getId = async (req, res) => {
    const picture = await prisma.picture.findUnique({
        where: { id: req.params.id },
    });
    res.sendFile(picture.path);
};
