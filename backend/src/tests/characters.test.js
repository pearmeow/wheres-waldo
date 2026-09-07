import request from "supertest";
import express from "express";
import { describe, test } from "@jest/globals";

import routes from "../routes/index.js";

const app = express();

app.use("/pictures", routes.pictures);

test("getting character by image works", (done) => {
    request(app)
        .get("/pictures/1/characters")
        .expect("Content-Type", /json/)
        .expect(200, done);
});

describe("singular character works", () => {
    test("waldo character works", (done) => {
        request(app)
            .get("/pictures/1/characters/1")
            .expect("Content-Type", "image/png")
            .expect(200, done);
    });
    test("second character works", (done) => {
        request(app)
            .get("/pictures/1/characters/2")
            .expect("Content-Type", "image/png")
            .expect(200, done);
    });
    test("third character does not work", (done) => {
        request(app).get("/pictures/1/characters/3").expect(404, done);
    });
});
