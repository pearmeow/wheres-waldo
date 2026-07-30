import request from "supertest";
import express from "express";
import { afterAll, test } from "@jest/globals";
import { prisma } from "../lib/prisma.js";

import routes from "../routes/index.js";

const app = express();

app.use("/pictures", routes.pictures);

test("pictures route works", (done) => {
    request(app)
        .get("/pictures")
        .expect("Content-Type", /json/)
        .expect(200, done);
});

test("singular picture works", (done) => {
    request(app)
        .get("/pictures/3")
        .expect("Content-Type", /json/)
        .expect(200, done);
});

afterAll(async () => {
    await prisma.$disconnect();
});
