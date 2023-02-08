import changeProfileUrl from "../../db/util/changeProfileUrl";
import { Request, Response } from "express";
import removeProfileFile from "../../server/util/removeProfileFile";

const deleteProfileRoute = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const result = await changeProfileUrl(userId, "/prof/default.png");
    if (!result.status) {
      return res.send(result);
    }
    const rmResult = await removeProfileFile(userId);
    if (!rmResult.status) {
      return res.send(rmResult);
    }
    res.send({ status: true, msg: "successfully update" });
  } catch (err) {
    res.send({ status: false, msg: "error in change profile route" });
  }
};

export default deleteProfileRoute;
