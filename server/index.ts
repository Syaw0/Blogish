import getPostList from "../db/util/getPostList";
import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const app = express();

    app.get("/getMorePost", async (req, res) => {
      const { len } = req.query;
      const posts = await getPostList(len);
      res.send(posts);
    });

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log(`listen on ${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
