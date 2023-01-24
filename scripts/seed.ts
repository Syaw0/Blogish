import { Pool } from "mariadb";
import { posts } from "./fakeData";

const seedDb = async (redisClient: any, mariaClient: Pool) => {
  await redisClient.select(1);
  posts.forEach(async (post) => {
    await redisClient.set(post.id, post.postDetail);
  });

  const con = await mariaClient.getConnection();
  console.log(con);
  await con.query("CREATE DATABASE blogish");
};

export default seedDb;
