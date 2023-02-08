import { pool } from "../../db/dbController";

const checkAndUpdatePassword = async ({
  oldPassword,
  newPassword,
  userId,
}: any) => {
  let con;
  try {
    con = await pool.getConnection();
    const isPasswordCorrect = await con.query(
      `SELECT * FROM users WHERE userId="${userId}" AND password="${oldPassword}"`
    );
    if (isPasswordCorrect.length == 0) {
      return { status: false, msg: "your password is incorrect" };
    }
    await con.query(
      `UPDATE users SET password="${newPassword}" WHERE userId="${userId}"`
    );
    return { status: true, msg: "successfully update password" };
  } catch (err) {
    return { status: false, msg: "error during check and update password" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default checkAndUpdatePassword;
