import { prisma } from "../lib/prisma.js";
import { resolve } from "path";

async function main() {
    // Create a new user with a post
    await prisma.picture.create({
        data: {
            path: resolve("./assets/1.jpg"),
        },
    });
    await prisma.picture.create({
        data: {
            path: resolve("./assets/2.jpg"),
        },
    });
    await prisma.picture.create({
        data: {
            path: resolve("./assets/3.jpg"),
        },
    });
    await prisma.character.create({
        data: {
            pictureId: 1,
            positionX: 0.6895787139689579,
            positionY: 0.3609910384818134,
            name: "Waldo",
        },
    });
    // Fetch all users with their posts
    const allPics = await prisma.picture.findMany();
    console.log("All pics:", JSON.stringify(allPics, null, 2));
    const allChars = await prisma.character.findMany();
    console.log("All characters:", JSON.stringify(allChars, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
