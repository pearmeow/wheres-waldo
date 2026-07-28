import { prisma } from "./lib/prisma.js";

async function main() {
    // Create a new user with a post
    await prisma.picture.deleteMany();
    await prisma.picture.create({
        data: {
            path: "./assets/waldo.jpg",
        },
    });
    await prisma.picture.create({
        data: {
            path: "./assets/3.jpg",
        },
    });
    await prisma.picture.create({
        data: {
            path: "./assets/4.jpg",
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
