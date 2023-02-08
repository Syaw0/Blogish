import changeNameAndDescription from "../../db/util/changeNameAndDescription";
import { Request, Response } from "express";

const updateNameAndDescriptionRoute = async (req: Request, res: Response) => {
  try {
    const result = await changeNameAndDescription(req.body);

    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in change name route" });
  }
};

export default updateNameAndDescriptionRoute;
