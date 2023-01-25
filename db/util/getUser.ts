import { pool } from "../dbController";
import getUserPosts from "./getUserPosts";

const getUser = async (id: any) => {
  let con;
  try {
    con = await pool.getConnection();
    const data = await con.query(
      `select name,userId,description,profileUrl from users where userId=${id}`
    );
    if (data.length !== 0) {
      return {
        status: true,
        msg: "found user",
        data: {
          ...data[0],
          id: data[0].userId,
        },
      };
    }
    return {
      status: false,
      msg: "can not found user",
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

export default getUser;
