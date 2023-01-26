import { redisClient } from "../dbController";

const removeSession = async (hashedEmail: any) => {
  try {
    if (!redisClient.isOpen || !redisClient.isReady) {
      await redisClient.connect();
    }
    await redisClient.select(2);
    const result = await redisClient.del(`${hashedEmail}`);
    if (result == 1) {
      return {
        status: true,
        msg: "remove the session key is successful",
      };
    }
    return {
      status: false,
      msg: "can not remove session from redis",
    };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "error during setup session key" };
  }
};

export default removeSession;
