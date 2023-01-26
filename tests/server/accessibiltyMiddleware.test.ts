import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import accessibilityMiddleware from "../../server/middleware/accessibilityMiddleware";
import { SHA256 } from "crypto-js";
import loginRoute from "../../server/routes/login";

// TODO initial db on server test

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(accessibilityMiddleware);
app.post("/login", loginRoute);

describe.only("Test MIDDLEWARE ", () => {
  it("if we are not logged we can not reach /write , /publish /logout", async () => {
    const res = await request(app).get("/write");
    const headers = res.headers;
    expect(headers.location).toEqual("/");

    const res2 = await request(app).post("/publish");
    const headers2 = res2.headers;
    expect(headers2.location).toEqual("/");

    const res3 = await request(app).get("/logout");
    const headers3 = res3.headers;
    expect(headers3.location).toEqual("/");
  });
  it("if we are logged we can not reach /login , /register /auth", async () => {
    const email = "someMagicEmail@gmail.com";
    const setCookie = () => {
      return [
        `session=${SHA256(
          email
        ).toString()}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      ];
    };
    const res = await request(app).post("/login").set("Cookie", setCookie());
    const headers = res.headers;
    expect(headers.location).toEqual("/");

    const res2 = await request(app)
      .post("/register")
      .set("Cookie", setCookie());
    const headers2 = res2.headers;
    expect(headers2.location).toEqual("/");

    const res3 = await request(app).get("/auth").set("Cookie", setCookie());
    const headers3 = res3.headers;
    expect(headers3.location).toEqual("/");
  });

  it("only user who has same ID with post authorID can access /publish", async () => {
    const email = "someMagicEmail@gmail.com";
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    await request(app).post("/login").send({ email, password: hashedPassword });
    const setCookie = () => {
      return [
        `session=${SHA256(
          email
        ).toString()}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      ];
    };
    const res = await request(app)
      .post("/publish")
      .set("Cookie", setCookie())
      .send({ author: "1" });
    const headers = res.headers;
    expect(headers.location).not.toEqual("/");

    const res2 = await request(app)
      .post("/publish")
      .set("Cookie", setCookie())
      .send({ author: "2" });

    const headers2 = res2.headers;
    expect(headers2.location).toEqual("/");
  });
});
