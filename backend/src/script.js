import { prisma } from "./lib/prisma.js";

async function main() {
    // Create a new user with a post
    const picture = await prisma.picture.create({
        data: {
            path: "./assets/waldo.jpg",
        },
    });
    console.log("Created picture:", picture);

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
