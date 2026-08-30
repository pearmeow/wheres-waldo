import request from "supertest";
import express from "express";
import { afterAll, describe, test } from "@jest/globals";
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

describe("singular image works", () => {
    test("image 1 works", (done) => {
        request(app)
            .get("/pictures/1")
            .expect("Content-Type", "image/jpeg")
            .expect(200, done);
    });
    test("image 2 works", (done) => {
        request(app)
            .get("/pictures/2")
            .expect("Content-Type", "image/jpeg")
            .expect(200, done);
    });
    test("image -1 doesn't work", (done) => {
        request(app).get("/pictures/-1").expect(404, done);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
