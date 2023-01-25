import getPostList from "../db/util/getPostList";
import express from "express";
import next from "next";
import fs from "fs";
import { redisClient } from "../db/dbController";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(async () => {
    const app = express();
    app.use(express.static(__dirname + "/static"));

    app.get("/prof/:id", (req, res) => {
      const { id } = req.params;
      const s = fs.existsSync(__dirname + `/static/profile/${id}.png`);
      if (s) {
        res.sendFile(__dirname + `/static/profile/${id}.png`);
      } else {
        res.sendFile(__dirname + `/static/profile/default.png`);
      }
    });

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
