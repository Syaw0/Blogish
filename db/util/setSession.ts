import { redisClient } from "../dbController";

const setSession = async (hashedEmail: any) => {
  try {
    await redisClient.connect();
    await redisClient.select(2);
    await redisClient.set(`${hashedEmail}`, "");
    return {
      status: true,
      msg: "set the session key is successful",
    };
  } catch (err) {
    return { status: false, msg: "error during setup session key" };
  } finally {
    if (redisClient != null) {
      await redisClient.quit();
    }
  }
};

export default setSession;
