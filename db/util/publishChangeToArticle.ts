import { pool, redisClient } from "../dbController";

const publishChangeToArticle = async ({
  postHead,
  postDetail,
  postSubhead,
  id,
}: any) => {
  let con;
  try {
    await redisClient.select(1);
    con = await pool.getConnection();
    con.query(
      `UPDATE posts set postHead='${postHead}',postSubhead='${postSubhead}' where postId=${id}`
    );
    redisClient.set(`${id}`, postDetail);
    return {
      status: true,
      msg: "successfully update Article",
      data: {},
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "error during update article",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default publishChangeToArticle;
