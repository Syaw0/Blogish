import { SHA256 } from "crypto-js";
import login from "../../db/util/login";
import setSession from "../../db/util/setSession";
import { Request, Response } from "express";

const loginRoute = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const result = await login(password, email);
  if (result.status) {
    const { email } = result.data;
    const hashedEmail = SHA256(email).toString();
    const setSessionKeyResult = await setSession(
      hashedEmail,
      result.data.userId
    );
    if (!setSessionKeyResult.status) {
      return res.send(setSessionKeyResult);
    }
    res.cookie("session", hashedEmail, {
      secure: true,
      sameSite: "strict",
      httpOnly: true,
    });
  }
  res.send(result);
};

export default loginRoute;
