import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import getProfileById from "../../server/routes/getProfileById";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.get("/prof/:id", getProfileById);

describe("Test End Point : /getProfileById", () => {
  it("if profile exist return it,if not we got default.png", async () => {
    const res = await request(app).get("/prof/1");
    const body: Buffer = res.body;
    expect(body.byteLength).not.toBeUndefined();
  });
});
