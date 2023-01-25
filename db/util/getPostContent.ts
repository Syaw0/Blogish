import { redisClient } from "../dbController";

const getPostContent = async (postId: any) => {
  try {
    await redisClient.connect();
    await redisClient.select(1);
    const content = await redisClient.get(`${postId}`);
    if (content != null) {
      return {
        status: true,
        msg: "successfully found content",
        data: content,
      };
    }
    return {
      status: false,
      msg: "content are null",
    };
  } catch (err) {
    return {
      status: false,
      msg: "error during perform action",
    };
  } finally {
    await redisClient.quit();
  }
};

export default getPostContent;
