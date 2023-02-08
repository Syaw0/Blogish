import checkAndUpdatePassword from "../../db/util/checkAndUpdatePassword";
import { Request, Response } from "express";

const updatePasswordRoute = async (req: Request, res: Response) => {
  try {
    const result = await checkAndUpdatePassword(req.body);

    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in change update password route" });
  }
};

export default updatePasswordRoute;
