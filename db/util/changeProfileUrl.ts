import { pool } from "../../db/dbController";

const changeProfileUrl = async (id: string, isDefault?: string) => {
  let con;
  try {
    let profUrl = isDefault == null ? `/prof/${id}` : isDefault;
    con = await pool.getConnection();
    await con.query(
      `UPDATE users SET profileUrl="${profUrl}" WHERE userId="${id}"`
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
