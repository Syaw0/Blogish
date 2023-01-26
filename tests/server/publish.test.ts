import express from "express";
import request from "supertest";
import { SHA256 } from "crypto-js";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
import publish from "../../server/routes/publish";
import getUserPosts from "../../db/util/getUserPosts";
import loginRoute from "../../server/routes/login";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.post("/publish", publish);
app.post("/login", loginRoute);

describe("Test End Point : /publish", () => {
  const postData: any = {
    postHead: "felan",
    postDetail: "foo",
    postSubhead: "barr",
    author: "1",
    // ! same with my sessionID
  };
  it("lets publish new post", async () => {
    // for publish we must save our session:
    const email = "someMagicEmail@gmail.com";
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    await request(app).post("/login").send({ email, password: hashedPassword });

    const res = await request(app).post("/publish").send(postData);
    const body = res.body;
    expect(body.status).toBeTruthy();
    expect(body.msg).toEqual("successfully Publish Article");
  });

  it("let change our article", async () => {
    // for publish we must save our session:
    const posts = await getUserPosts("1"); // !know from before this account ID
    const postId = posts.data[0].id;
    postData.id = postId;
    const email = "someMagicEmail@gmail.com";
    const pass = "123123123";
    const hashedPassword = SHA256(pass).toString();
    await request(app).post("/login").send({ email, password: hashedPassword });

    const res = await request(app)
      .post(`/publish?edit=true&id=${postId}`)
      .send(postData);
    const body = res.body;
    expect(body.status).toBeTruthy();
    expect(body.msg).toEqual("successfully update Article");
  });
});
