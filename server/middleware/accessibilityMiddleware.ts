import { NextFunction, Request, Response } from "express";
import checkLoggedUserAccess from "../util/checkLoggedUserAccess";
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
      return res.redirect("/");
    }
  } else if (result.status) {
    if (/\/publish/.test(req.originalUrl)) {
      if (result.data.userId !== req.body.author) {
        return res.redirect("/");
      }
    }
    if (checkLoggedUserAccess(req.originalUrl)) {
      return res.redirect("/");
    }
  }

  next();
};

export default accessibilityMiddleware;
