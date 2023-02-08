import changeProfileUrl from "../../db/util/changeProfileUrl";
import { Request, Response } from "express";
import updateProfileImage from "../../server/util/updateProfileImage";

const changeProfileRoute = async (req: Request, res: Response) => {
  try {
    const files = req.files;
    const userId = req.body.userId;
    const currentUrl = req.body.userProf;
    if (currentUrl.search("/prof/default") != -1) {
      const result = await changeProfileUrl(userId);
      if (!result.status) {
        return res.send(result);
      }
    }
    const moveResult = await updateProfileImage(files, userId);
    if (!moveResult.status) {
      return res.send(moveResult);
    }
    res.send({ status: true, msg: "successfully update" });
  } catch (err) {
    res.send({ status: false, msg: "error in change profile route" });
  }
};

export default changeProfileRoute;
