import { redisClient } from "../../db/dbController";

const checkSession = async (cookie: any) => {
  if (cookie == null || cookie.session == null) {
    return { status: false };
  }

  const session = cookie.session;
  try {
    const check = await redisClient.get(session);
    if (check != null) {
      return { status: true };
    }
    return { status: false };
  } catch (err) {
    return { status: false, msg: "error in redis connection" };
  }
};

export default checkSession;
