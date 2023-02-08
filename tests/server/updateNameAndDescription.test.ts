import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { SHA256 } from "crypto-js";
import { pool } from "../../db/dbController";
import path from "path";
import expressFileUpload from "express-fileupload";
import updateNameAndDescriptionRoute from "../../server/routes/updateNameAndDescriptionRoute";

const app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(expressFileUpload());
app.post("/updateNameAndDescription", updateNameAndDescriptionRoute);

const userData = {
  name: "siavash",
  des: "some desc",
  email: "siaw@gmail.com",
  password: SHA256("rootroot").toString(),
};
describe("TEST END POINT : UpdateNameAndDescription route", () => {
  beforeEach(async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    if (res.length == 0) {
      await con.query(
        `INSERT INTO users (name,email,password,description) values(?,?,?,?)`,
        [userData.name, userData.email, userData.password, userData.des]
      );
    } else {
      await con.query(
        `UPDATE users set name="${userData.name}",description="${userData.des}" where email="${userData.email}"`
      );
    }
    await con.end();
  });

  it("just provide data and then sign up will be done", async () => {
    let con = await pool.getConnection();
    const user = await con.query(
      `SELECT * FROM users where email="${userData.email}"`
    );
    expect(user[0].name).toEqual(userData.name);
    expect(user[0].description).toEqual(userData.des);
    const userId = user[0].userId;
    const res = await request(app).post("/updateNameAndDescription").send({
      userId,
      name: "some newName",
      description: "some new description",
    });
    expect(res.body.status).toBeTruthy();
    const user2 = await con.query(
      `SELECT * FROM users where email="${userData.email}"`
    );
    expect(user2[0].name).not.toEqual(userData.name);
    expect(user2[0].name).toEqual("some newName");

    expect(user2[0].description).not.toEqual(userData.des);
    expect(user2[0].description).toEqual("some new description");
  });

  it("if any error happen return false", async () => {
    const res = await request(app)
      .post("/changeProfile")
      .send({ userId: "some wrong id" });
    expect(res.body.status).toBeFalsy();
  });
});
