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

    // Fetch all users with their posts
    const allPics = await prisma.picture.findMany();
    console.log("All pics:", JSON.stringify(allPics, null, 2));
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
