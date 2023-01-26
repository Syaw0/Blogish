import { NextFunction, Request, Response } from "express";
import checkGuestUserAccess from "../util/checkGuestUserAccess";
import checkSession from "../util/checkSession";

const accessibilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await checkSession(req.cookies);
  if (!result.status) {
    if (checkGuestUserAccess(req.originalUrl)) {
      console.log("redirect?");
      return res.redirect("/");
    }
  } else if (result.status) {
    // if user is logged
  }

  next();
};

export default accessibilityMiddleware;
