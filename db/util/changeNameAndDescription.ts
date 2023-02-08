import { pool } from "../../db/dbController";

const changeNameAndDescription = async ({ name, description, userId }: any) => {
  let con;
  try {
    con = await pool.getConnection();
    await con.query(
      `UPDATE users SET name="${name}" , description="${description}" WHERE userId="${userId}"`
    );
    return { status: true, msg: "successfully update profile" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "error during update name in db" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default changeNameAndDescription;
