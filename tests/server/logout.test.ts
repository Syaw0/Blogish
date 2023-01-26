import express from "express";
import request from "supertest";
import { SHA256 } from "crypto-js";
import bodyParser from "body-parser";
import logout from "../../server/routes/logout";
import cookieParser from "cookie-parser";
import loginRoute from "../../server/routes/login";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.post("/login", loginRoute);
app.get("/logout", logout);

describe("Test End Point : /logout", () => {
  const email = "someMagicEmail@gmail.com";
  const pass = "123123123";
  const hashedPassword = SHA256(pass).toString();
  beforeEach(async () => {
    await request(app).post("/login").send({ email, password: hashedPassword });
  });
  it("server check cookie and remove it from redis and return true", async () => {
    const res = await request(app)
      .get("/logout")
      .set("Cookie", [
        `session=${SHA256(
          email
        ).toString()}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      ]);
    const body = res.body;
    const headers = res.headers;
    expect(body.status).toBeTruthy();
    expect(body.msg).toEqual("remove the session key is successful");
    expect(headers["set-cookie"][0]).toContain(
      `session=${SHA256(email).toString()}; Max-Age=0`
    );
  });
});
