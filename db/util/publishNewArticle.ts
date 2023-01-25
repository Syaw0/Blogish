import { pool, redisClient } from "../dbController";

const publishNewArticle = async ({
  postHead,
  postDetail,
  postSubhead,
  author,
}: any) => {
  let con;
  try {
    let publishDate = new Date();
    let compareDate =
      publishDate.getFullYear() +
      "-" +
      (publishDate.getUTCMonth() == 0 ? "01" : publishDate.getUTCMonth()) +
      "-" +
      (publishDate.getUTCDate() == 0 ? "01" : publishDate.getUTCDate());
    await redisClient.connect();
    await redisClient.select(1);
    con = await pool.getConnection();
    await con.query(
      `INSERT INTO posts (postHead,postSubhead,publishDate,tagName,author) VALUES(?,?,?,?,?)`,
      [postHead, postSubhead, publishDate, "DefaultTag", author]
    );
    const newPost = await con.query(
      `SELECT * FROM posts where publishDate>='${compareDate}' and author=${author}`
    );
    let id;
    if (newPost.length == 1) {
      id = newPost[0].postId;
    } else {
      id = Math.max.apply(
        null,
        newPost.map((post: any) => post.postId)
      );
    }
    console.log(id, postDetail);
    const redisRes = await redisClient.set(`${id}`, postDetail);
    console.log("this is redis", redisRes);
    return {
      status: true,
      msg: "successfully Publish Article",
      data: {},
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "error during add article",
    };
  } finally {
    if (con != null) {
      await con.end();
      await redisClient.quit();
    }
  }
};

export default publishNewArticle;
