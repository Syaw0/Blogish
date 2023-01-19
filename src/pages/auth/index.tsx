import Button from "../../components/button/button";
import PasswordInput from "../../components/input/password/passwordInput";
import TextInput from "../../components/input/text/textInput";
import { ChangeEvent, useState } from "react";
import style from "../../styles/pagesStyle/auth.module.css";
import IconEyeClose from "../../assets/icons/iconEyeClose";
import Text from "../../components/typography/typography";
import useFetch from "@/hooks/useFetch";
import getData from "@/utils/getData";

const AuthenticatePage = () => {
  const [data, success, loader, error, pending, trigger]: any =
    useFetch(getData);
  console.log(data, success, loader, error, pending, trigger);
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
      <Text>se</Text>
      <Button
        onClick={() => {
          trigger();
        }}
        StartIcon={IconEyeClose}
        variant="contained"
        color="primary"
      >
        Hello Dear
      </Button>
    </div>
  );
};

export default AuthenticatePage;
