import express from "express";
import getMorePosts from "../../server/routes/getMorePosts";
import request from "supertest";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.get("/getMorePost", getMorePosts);

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
