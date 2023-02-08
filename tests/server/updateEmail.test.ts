import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { SHA256 } from "crypto-js";
import { pool } from "../../db/dbController";
import cookieParser from "cookie-parser";
import updateEmailRoute from "../../server/routes/updateEmail";

const app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/updateEmail", updateEmailRoute);
const preEmail = "sososos@gmail.com";
const nextEmail = "hahaha@gmail.com";
const userData = {
  name: "siavash",
  email: preEmail,
  password: SHA256("123123").toString(),
};

describe("TEST END POINT : Update Email Route", () => {
  beforeEach(async () => {
    let con = await pool.getConnection();

    await con.query(
      `DELETE FROM users WHERE email='${preEmail}' or email='${nextEmail}'  `
    );

    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    if (res.length == 0) {
      await con.query(`INSERT INTO users (name,email,password) values(?,?,?)`, [
        userData.name,
        userData.email,
        userData.password,
      ]);
    } else {
      await con.query(
        `UPDATE users SET email="${preEmail}" WHERE email="${userData.email}"`
      );
    }
    await con.end();
  });

  it("take an new email and userId and if new email is not exist update it", async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    let result = await request(app).post("/updateEmail").send({
      userId: res[0].userId,
      newEmail: nextEmail,
    });
    expect(result.body.status).toBeTruthy();
    const res2 = await con.query(
      `SELECT * from users WHERE email="${nextEmail}"`
    );
    expect(res2[0].email).toEqual(nextEmail);
    await con.end();
  });
  it("if email is exist return false", async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    let result = await request(app).post("/updateEmail").send({
      userId: "some falsy email",
      newEmail: userData.email,
    });
    expect(result.body.status).toBeFalsy();
    await con.end();
  });
});
