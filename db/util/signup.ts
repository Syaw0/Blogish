import { pool } from "../dbController";

const signup = async (password: string, email: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const checkEmail = await con.query(
      `Select * from users where email='${email}'`
    );
    if (checkEmail.length != 0) {
      return {
        status: false,
        msg: "email exist",
      };
    }
    await con.query(`Insert into users (name,password,email) Values(?,?,?)`, [
      email.split("@")[0],
      password,
      email,
    ]);

    const newUser = await con.query(
      `select * from users where email='${email}' and password='${password}'`
    );
    return {
      status: true,
      msg: "your account created successfully",
      data: newUser[0],
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "internal error ",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};
export default signup;
