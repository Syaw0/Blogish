import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const getProfileById = (req: Request, res: Response) => {
  const { id } = req.params;
  const basePath = path.resolve(__dirname + "./../static/profile/");
  const profs = fs.readdirSync(basePath);
  profs.forEach((profName) => {
    if (profName.split(".")[0] == id.split(".")[0]) {
      return res.sendFile(basePath + `/${profName}`);
    }
  });
};

export default getProfileById;
