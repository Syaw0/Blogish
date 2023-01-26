import express from "express";
import getMorePosts from "../../server/routes/getMorePosts";
import request from "supertest";
import loginRoute from "../../server/routes/login";
import { SHA256 } from "crypto-js";
import bodyParser from "body-parser";
import register from "../../server/routes/register";
import logout from "../../server/routes/logout";
import cookieParser from "cookie-parser";

// TODO here we need to initial DB's
// in my environment i have it already running!

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.get("/getMorePost", getMorePosts);
app.post("/login", loginRoute);
app.post("/register", register);
app.get("/logout", logout);

describe("TEST SERVER :", () => {
  describe("Test End Point : /getMorePost", () => {
    it("if we request this route we get posts (len is for maria to give it range)", async () => {
      const res = await request(app).get("/getMorePost?len=0");
      const body = res.body;
      expect(body.status).toBeTruthy();
      expect(body.data.length).toBeGreaterThan(1);
    });

    it("if we don't specify a len we got error )", async () => {
      const res = await request(app).get("/getMorePost");
      const body = res.body;
      expect(body.status).toBeFalsy();
      expect(body.data).toBeUndefined();
    });

    it("if there is no any post server return false with msg )", async () => {
      const res = await request(app).get("/getMorePost?len=111");
      const body = res.body;
      expect(body.status).toBeFalsy();
      expect(body.msg).toEqual("Error not found any thing");
      expect(body.data).toBeUndefined();
    });
  });

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

  describe.only("Test End Point : /logout", () => {
    const email = "someMagicEmail@gmail.com";
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    beforeEach(async () => {
      await request(app)
        .post("/login")
        .send({ email, password: hashedPassword });
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
});
