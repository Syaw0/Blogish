import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { SHA256 } from "crypto-js";
import { pool, redisClient } from "../../db/dbController";
import cookieParser from "cookie-parser";
import deleteProfileRoute from "../../server/routes/deleteProfile";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(cookieParser());
app.post("/deleteProfile", deleteProfileRoute);

const userData = {
  name: "siavash",
  email: "siaw@gmail.com",
  password: SHA256("rootroot").toString(),
  profileUrl: "/prof/1",
};

describe("TEST END POINT : Delete Profile Router", () => {
  beforeAll(async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    if (res.length == 0) {
      await con.query(
        `INSERT INTO users (name,email,password,profileUrl) values(?,?,?,?)`,
        [userData.name, userData.email, userData.password, userData.profileUrl]
      );
    } else {
      await con.query(
        `UPDATE users SET profileUrl="${userData.profileUrl}" WHERE email="${userData.email}"`
      );
    }
    await con.end();
  });

  it("take an user id and update prof url", async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    expect(res[0].profileUrl).toEqual(userData.profileUrl);

    const result = await request(app)
      .post("/deleteProfile")
      .send({ userId: res[0].userId });
    expect(result.body.status).toBeTruthy();

    const res2 = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    expect(res2[0].profileUrl).toEqual("/prof/default.png");

    expect(
      fs.existsSync(
        path.resolve(__dirname + "./../../server/static/profile") +
          `/${res2[0].profileUrl}`
      )
    ).toBeFalsy();
    await con.end();
  });
});
