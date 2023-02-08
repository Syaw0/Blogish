import { pool } from "../../db/dbController";

const checkAndUpdateEmail = async ({ newEmail, userId }: any) => {
  let con;
  try {
    con = await pool.getConnection();
    const isEmailExist = await con.query(
      `SELECT * FROM users WHERE  email="${newEmail}" `
    );
    if (isEmailExist.length != 0) {
      return { status: false, msg: "the email exist." };
    }
    await con.query(
      `UPDATE users SET email="${newEmail}" WHERE userId="${userId}"`
    );
    return { status: true, msg: "successfully update email." };
  } catch (err) {
    return { status: false, msg: "error during check and update email" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default checkAndUpdateEmail;
