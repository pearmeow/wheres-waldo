import request from "supertest";
import express from "express";
import { describe, expect, test } from "@jest/globals";

import routes from "../routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pictures", routes.pictures);

describe("validation tests", () => {
    describe("coordinate tests", () => {
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
        test("returns errors on out of bounds coordinates", async () => {
            const res = await request(app)
                .post("/pictures/1/validation/1")
                .send({ x: -1, y: -1 });
            expect(res.body.errors).toBeDefined();
            expect(res.body.correct).toBeFalsy();
        });
        test("returns errors on string coordinates", async () => {
            const res = await request(app)
                .post("/pictures/1/validation/1")
                .send({ x: "asdf", y: "jkl;" });
            expect(res.body.errors).toBeDefined();
            expect(res.body.correct).toBeFalsy();
        });
        test("returns errors on object coordinates", async () => {
            const res = await request(app)
                .post("/pictures/1/validation/1")
                .send({ x: { abc: "d", y: 3 }, y: { x: { x: 2 } } });
            expect(res.body.errors).toBeDefined();
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
    describe("picture and character id tests", () => {
        test("returns 404 with string picture id", (done) => {
            request(app)
                .post("/pictures/adkfjas/validation/1")
                .send({ abc: "abc" })
                .expect(404, done);
        });
        test("returns 404 with out of bounds picture id", (done) => {
            request(app)
                .post("/pictures/9999/validation/1")
                .send({ abc: "abc" })
                .expect(404, done);
        });
        test("returns 404 with negative picture id", (done) => {
            request(app)
                .post("/pictures/-1/validation/1")
                .send({ abc: "abc" })
                .expect(404, done);
        });
        test("returns 404 with string character id", (done) => {
            request(app)
                .post("/pictures/1/validation/aksdjf")
                .send({ abc: "abc" })
                .expect(404, done);
        });
        test("returns 404 with out of bounds character id", (done) => {
            request(app)
                .post("/pictures/1/validation/9999")
                .send({ abc: "abc" })
                .expect(404, done);
        });
        test("returns 404 with negative character id", (done) => {
            request(app)
                .post("/pictures/1/validation/-1")
                .send({ abc: "abc" })
                .expect(404, done);
        });
        test("returns 404 with character id that does not belong to the picture", (done) => {
            request(app)
                .post("/pictures/3/validation/1")
                .send({ abc: "abc" })
                .expect(404, done);
        });
    });
});
