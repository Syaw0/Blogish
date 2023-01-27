import express from "express";
import request from "supertest";
import loginRoute from "../../server/routes/login";
import { SHA256 } from "crypto-js";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.post("/login", loginRoute);

describe("Test End Point : /login", () => {
  it("if email and password exist on db respond true", async () => {
    const email = "someMagicEmail@gmail.com";
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    const res = await request(app)
      .post("/login")
      .send({ email, password: hashedPassword });
    const body = res.body;
    expect(body.status).toBeTruthy();
    expect(body.data.email).toEqual(email);
    expect(body.data.password).toEqual(hashedPassword);
  });

  it("if email and password not exist on db respond false", async () => {
    const email = "belabelabela";
    const pass = "2313";
    const hashedPassword = SHA256(pass).toString();
    const res = await request(app)
      .post("/login")
      .send({ email, password: hashedPassword });
    const body = res.body;
    expect(body.status).toBeFalsy();
    expect(body.data).toBeUndefined();
  });

  it("if email and password not match on db respond false", async () => {
    const email = "someMagicEmail@gmail.com";
    const pass = "231233";
    const hashedPassword = SHA256(pass).toString();
    const res = await request(app)
      .post("/login")
      .send({ email, password: hashedPassword });
    const body = res.body;
    expect(body.status).toBeFalsy();
    expect(body.data).toBeUndefined();
  });

  it("if email and password match on db set cookie on useragent", async () => {
    const email = "someMagicEmail@gmail.com";
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    const res = await request(app)
      .post("/login")
      .send({ email, password: hashedPassword });
    const headers = res.headers;
    expect(headers["set-cookie"][0]).toEqual(
      `session=${SHA256(
        email
      ).toString()}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );
  });
});
