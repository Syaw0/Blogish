import { pool } from "../dbController";

const getPost = async (id: any) => {
  let con;
  try {
    con = await pool.getConnection();
    const data = await con.query(
      `select postId as id , postHead,postSubhead ,tagName,author,DATE_FORMAT(publishDate,'%M %d') as publishDate from posts where postId=${id}`
    );
    if (data.length != 0) {
      return {
        status: true,
        msg: "found Posts",
        data: data[0],
      };
    }
    return {
      status: false,
      msg: "nothing found",
    };
  } catch (err) {
    return {
      status: false,
      msg: "error during perform action",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default getPost;
