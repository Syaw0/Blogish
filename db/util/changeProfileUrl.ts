import { pool } from "../../db/dbController";

const changeProfileUrl = async (id: string) => {
  let con;
  try {
    con = await pool.getConnection();
    await con.query(
      `UPDATE users SET profileUrl="/prof/${id}" WHERE userId="${id}"`
    );
    return { status: true, msg: "updated" };
  } catch (err) {
    return { status: false, msg: "error during update profile ulr" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};
export default changeProfileUrl;
