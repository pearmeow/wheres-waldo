import request from "supertest";
import express from "express";
import { test } from "@jest/globals";

import routes from "../routes/index.js";

const app = express();

app.use("/pictures", routes.pictures);

test("pictures route works", (done) => {
    request(app)
        .get("/pictures")
        .expect("Content-Type", /json/)
        .expect(200, done);
});
