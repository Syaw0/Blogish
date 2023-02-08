import express from "express";
import next from "next";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import accessibilityMiddleware from "./middleware/accessibilityMiddleware";
import { redisClient } from "../db/dbController";
import getProfileById from "./routes/getProfileById";
import loginRoute from "./routes/login";
import register from "./routes/register";
import publish from "./routes/publish";
import getMorePosts from "./routes/getMorePosts";
import logout from "./routes/logout";
import changeProfileRoute from "./routes/changeProfile";
import fileUpload from "express-fileupload";
import deleteProfileRoute from "./routes/deleteProfile";
import updateNameAndDescriptionRoute from "./routes/updateNameAndDescriptionRoute";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(async () => {
    await redisClient.connect();
    await redisClient.select(2);
    const app = express();
    app.use(express.static(__dirname + "/static"));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(fileUpload());
    app.use(accessibilityMiddleware);
    app.post("/deleteProfile", deleteProfileRoute);
    app.post("/changeProfile", changeProfileRoute);
    app.get("/prof/:id", getProfileById);

    app.post("/login", loginRoute);
    app.post("/updateNameAndDescription", updateNameAndDescriptionRoute);
    app.post("/register", register);

    app.post("/publish", publish);

    app.get("/getMorePost", getMorePosts);

    app.get("/logout", logout);

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
