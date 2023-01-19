import Button from "@/components/button/button";
import PasswordInput from "@/components/input/password/passwordInput";
import TextInput from "@/components/input/text/textInput";
import Message from "@/components/message/message";
import { ChangeEvent, useState } from "react";
import IconLogo from "../../../assets/icons/IconLogo";
import Text from "../../../components/typography/typography";
import style from "./authenticate.module.css";

const Authenticate = () => {
  const [pageState, setPageState] = useState({
    password: "",
    email: "",
    isLogin: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, type } = e.currentTarget;
    if (type == "text") type = "password";
    setPageState((s) => ({ ...s, [type]: value }));
  };

  const startAuth = () => {};
  const changeAuthType = () => {
    setPageState((s) => ({ ...s, isLogin: !s.isLogin }));
  };
  return (
    <>
      <IconLogo className={style.logo} width="100" height="100" />

      <Text variant="headline2" className={style.header}>
        {pageState.isLogin ? "Welcome Back" : "Welcome"}
      </Text>
      <Text variant="subhead1" className={style.subhead}>
        {pageState.isLogin
          ? "to connect to your account fill this form"
          : "to join our community fill this form"}
      </Text>

      <TextInput
        label="Email Address"
        placeholder="Enter your email address"
        testId="authTextInput"
        type="email"
        value={pageState.email}
        onChange={handleInputChange}
        className={style.textInput}
      />

      <PasswordInput
        testId="authPasswordInput"
        label="Password"
        placeholder="Enter Your account password"
        value={pageState.password}
        onChange={handleInputChange}
        className={style.passwordInput}
      />

      <Button className={style.button} testid="authButton" onClick={startAuth}>
        {pageState.isLogin ? "Login" : "Register"}
      </Button>

      <Text variant="subhead2" className={style.subButton}>
        {pageState.isLogin
          ? "if you haven't account create one !"
          : "Already has account?"}
        <Text
          onClick={changeAuthType}
          as="span"
          variant="subhead2"
          className={style.subButton2}
        >
          {pageState.isLogin ? "Register Account" : "Sign in  "}
        </Text>
      </Text>

      {/* <Message type="warn" msg="hello" /> */}
    </>
  );
};

export default Authenticate;
