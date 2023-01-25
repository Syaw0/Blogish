import { pool } from "../dbController";

const login = async (password: string, email: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const checkEmail = await con.query(
      `select * from users where email='${email}'`
    );

    if (checkEmail.length != 1) {
      return {
        status: false,
        msg: "Email is not exist",
      };
    }
    const checkPassword = await con.query(
      `select * from users where email='${email}' and password='${password}'`
    );
    if (checkPassword.length != 1) {
      return {
        status: false,
        msg: "Email and Password does not match",
      };
    }
    return {
      status: true,
      msg: "password and email match ",
      data: checkPassword[0],
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "internal error",
    };
  }
};

export default login;
