import getUser from "../../db/util/getUser";
import { redisClient } from "../../db/dbController";

const checkSession = async (cookie: any) => {
  if (cookie == null || cookie.session == null) {
    return { status: false };
  }

  const session = cookie.session;
  try {
    if (!redisClient.isOpen || !redisClient.isReady) {
      await redisClient.connect();
    }
    await redisClient.select(2);
    const check = await redisClient.get(session);
    if (check != null) {
      const userData = await getUser(check);
      if (userData.status) {
        return { status: true, msg: "ok", data: userData.data };
      } else {
        return { status: false, msg: "error during get logged user data" };
      }
    }
    return { status: false };
  } catch (err) {
    return { status: false, msg: "error in redis connection" };
  }
};

export default checkSession;
