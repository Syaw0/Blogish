import removeSession from "../../db/util/removeSession";
import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  const { session } = req.cookies;
  const result = await removeSession(session);
  if (result.status) {
    res.cookie("session", session, {
      maxAge: 0,
    });
  }
  res.send(result);
};

export default logout;
