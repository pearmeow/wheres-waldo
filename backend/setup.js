import { prisma } from "./src/lib/prisma.js";
import { afterAll } from "@jest/globals";

afterAll(async () => {
    await prisma.$disconnect();
});
