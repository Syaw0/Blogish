import removeSession from "../../db/util/removeSession";
import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { session } = req.cookies;
  const result = await removeSession(session, id);
  res.send(result);
};

export default logout;
