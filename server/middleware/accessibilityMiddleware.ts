import { NextFunction, Request, Response } from "express";
import checkSession from "../util/checkSession";

const accessibilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await checkSession(req.cookies);
  if (!result.status) {
  }
  console.log(result);
  console.log(req.path);
  next();
};

export default accessibilityMiddleware;
