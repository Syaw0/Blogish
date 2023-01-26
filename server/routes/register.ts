import { SHA256 } from "crypto-js";
import setSession from "../../db/util/setSession";
import signup from "../../db/util/signup";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const result = await signup(password, email);
  if (!result.status) {
    return res.send(result);
  }

  const hashedEmail = SHA256(email).toString();
  const setSessionKeyResult = await setSession(hashedEmail, result.data.userId);
  if (!setSessionKeyResult.status) {
    res.send(setSessionKeyResult);
  }
  res.cookie("session", hashedEmail, {
    secure: true,
    sameSite: "strict",
    httpOnly: true,
  });
  res.send(result);
};

export default register;
