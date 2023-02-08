import checkAndUpdateEmail from "../../db/util/checkAndUpdateEmail";
import { Request, Response } from "express";

const updateEmailRoute = async (req: Request, res: Response) => {
  try {
    const result = await checkAndUpdateEmail(req.body);

    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in change update email route" });
  }
};

export default updateEmailRoute;
