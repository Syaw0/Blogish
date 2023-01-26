import { redisClient } from "../dbController";

const setSession = async (hashedEmail: any, id: any) => {
  console.log(id);
  try {
    await redisClient.select(2);
    await redisClient.set(`${hashedEmail}`, id);
    return {
      status: true,
      msg: "set the session key is successful",
    };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "error during setup session key" };
  }
};

export default setSession;
