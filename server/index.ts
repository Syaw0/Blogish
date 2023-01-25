import getPostList from "../db/util/getPostList";
import express from "express";
import next from "next";
import fs from "fs";
import bodyParser from "body-parser";
import login from "../db/util/login";
import { SHA256 } from "crypto-js";
import cookieParser from "cookie-parser";
import setSession from "../db/util/setSession";
import signup from "../db/util/signup";
import publishChangeToArticle from "../db/util/publishChangeToArticle";
import publishNewArticle from "../db/util/publishNewArticle";

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
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.get("/prof/:id", (req, res) => {
      const { id } = req.params;
      const s = fs.existsSync(__dirname + `/static/profile/${id}.png`);
      if (s) {
        res.sendFile(__dirname + `/static/profile/${id}.png`);
      } else {
        res.sendFile(__dirname + `/static/profile/default.png`);
      }
    });

    app.post("/login", async (req, res) => {
      const { password, email } = req.body;
      const result = await login(password, email);
      if (result.status) {
        const { email } = result.data;
        const hashedEmail = SHA256(email).toString();
        const setSessionKeyResult = await setSession(hashedEmail);
        if (!setSessionKeyResult.status) {
          res.send(setSessionKeyResult);
        }
        res.cookie("session", hashedEmail, {
          secure: true,
          sameSite: "strict",
          httpOnly: true,
        });
      }
      res.send(result);
    });

    app.post("/register", async (req, res) => {
      const { password, email } = req.body;
      const result = await signup(password, email);
      if (!result.status) {
        return res.send(result);
      }

      const hashedEmail = SHA256(email).toString();
      const setSessionKeyResult = await setSession(hashedEmail);
      if (!setSessionKeyResult.status) {
        res.send(setSessionKeyResult);
      }
      res.cookie("session", hashedEmail, {
        secure: true,
        sameSite: "strict",
        httpOnly: true,
      });
      res.send(result);
    });

    app.post("/publish", async (req, res) => {
      let result;
      if (req.query && req.query.edit) {
        result = await publishChangeToArticle(req.body);
      } else {
        result = await publishNewArticle(req.body);
      }
      res.send(result);
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
