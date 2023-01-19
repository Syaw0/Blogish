import Button from "../../components/button/button";
import PasswordInput from "../../components/input/password/passwordInput";
import TextInput from "../../components/input/text/textInput";
import { ChangeEvent, useState } from "react";
import style from "../../styles/pagesStyle/auth.module.css";

const AuthenticatePage = () => {
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, type } = e.currentTarget;
    if (type == "text") type = "password";
    setInputData((s) => ({ ...s, [type]: value }));
  };
  return (
    <div className={style.holder}>
      <TextInput
        id="email"
        type="email"
        label="Email Address"
        onChange={inputChangeHandler}
        placeholder="Enter your email address"
        value={inputData.email}
        testId="auth-input"
      />
      <PasswordInput
        id="pass"
        label="Password"
        onChange={inputChangeHandler}
        placeholder="Enter your password"
        testId="auth-pass"
        value={inputData.password}
      />
      <Button variant="contained" color="primary">
        Hello Dear
      </Button>
    </div>
  );
};

export default AuthenticatePage;
