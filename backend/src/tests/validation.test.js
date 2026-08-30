import request from "supertest";
import express from "express";
import { describe, expect, test } from "@jest/globals";

import routes from "../routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pictures", routes.pictures);

describe("validation routes", () => {
    test("returns true with correct coordinates", async () => {
        const res = await request(app)
            .post("/pictures/1/validation/1")
            .send({ x: 0.69, y: 0.36 });
        expect(res.body.errors).toBeUndefined();
        expect(res.body.correct).toBeTruthy();
    });
    test("returns false on incorrect coordinates", async () => {
        const res = await request(app)
            .post("/pictures/1/validation/1")
            .send({ x: 0.66, y: 0.26 });
        expect(res.body.errors).toBeUndefined();
        expect(res.body.correct).toBeFalsy();
    });
    test("returns errors without coordinates", async () => {
        const res = await request(app)
            .post("/pictures/1/validation/1")
            .send({ abc: "abc" });
        expect(res.body.errors).toBeDefined();
        expect(res.body.correct).toBeUndefined();
    });
});
