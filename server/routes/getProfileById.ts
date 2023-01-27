import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const getProfileById = (req: Request, res: Response) => {
  const { id } = req.params;
  const isProfileExist = fs.existsSync(
    __dirname + `/../static/profile/${id}.png`
  );
  if (isProfileExist) {
    return res.sendFile(
      path.resolve(__dirname + `/../static/profile/${id}.png`)
    );
  } else {
    return res.sendFile(
      path.resolve(__dirname + `/../static/profile/default.png`)
    );
  }
};

export default getProfileById;
