import express from "express";
import request from "supertest";
import { SHA256 } from "crypto-js";
import bodyParser from "body-parser";
import register from "../../server/routes/register";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.post("/register", register);

describe("Test End Point : /register", () => {
  it("if email  exist on db respond false", async () => {
    const email = "someMagicEmail@gmail.com";
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    const res = await request(app)
      .post("/register")
      .send({ email, password: hashedPassword });
    const body = res.body;
    expect(body.status).toBeFalsy();
    expect(body.data).toBeUndefined();
  });

  it("if email  is new create account on db and respond true and set cookie", async () => {
    const email = `some${Math.random() * 1000}@gmail.com`;
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    const res = await request(app)
      .post("/register")
      .send({ email, password: hashedPassword });
    const body = res.body;
    const headers = res.headers;
    expect(body.status).toBeTruthy();
    expect(body.data.email).toEqual(email);
    expect(body.data.password).toEqual(hashedPassword);
    expect(headers["set-cookie"][0]).toEqual(
      `session=${SHA256(
        email
      ).toString()}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );
  });
});
