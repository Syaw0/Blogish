import Button from "../../../components/button/button";
import PasswordInput from "../../../components/input/password/passwordInput";
import TextInput from "../../../components/input/text/textInput";
import Message from "../../../components/message/message";
import useFetch from "../../../hooks/useFetch";
import { ChangeEvent, useState } from "react";
import IconLogo from "../../../assets/icons/IconLogo";
import Text from "../../../components/typography/typography";
import style from "./authenticate.module.css";
import authenticate, { loaderMsg } from "../../../utils/authenticate";
import { useRouter } from "next/router";
import inputCheckEmailForm from "../../../utils/inputCheckEmailForm";

const Authenticate = () => {
  const router = useRouter();
  let [trigger, authState, msg, setMsg] = useFetch([authenticate], [loaderMsg]);

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

  const startAuth = async () => {
    if (!checkInputs()) {
      return;
    }
    const result = await trigger(
      0,
      pageState.isLogin ? "login" : "register",
      pageState
    );
    if (result.status) {
      router.replace("/");
    }
  };

  const checkInputs = () => {
    if (pageState.email.trim() == "" && pageState.password.trim() == "") {
      setMsg("error", "Please fill all inputs and then click on submit");
      return false;
    } else if (!inputCheckEmailForm(pageState.email)) {
      setMsg("error", "Please use a Valid Email Address");
      return false;
    } else if (pageState.password.length < 8) {
      setMsg("error", "Please Use Password with 8 or more Character");
      return false;
    }
    return true;
  };

  const changeAuthType = () => {
    setPageState((s) => ({ ...s, isLogin: !s.isLogin }));
  };

  return (
    <div className={style.holder}>
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
        id="authTextInput"
        type="email"
        value={pageState.email}
        onChange={handleInputChange}
        className={style.textInput}
      />

      <PasswordInput
        id="authPasswordInput"
        testId="authPasswordInput"
        label="Password"
        placeholder="Enter Your account password"
        value={pageState.password}
        onChange={handleInputChange}
        className={style.passwordInput}
      />

      <Button
        loader={authState == "loader"}
        disabled={authState == "loader" || authState == "success"}
        className={style.button}
        testid="authButton"
        onClick={startAuth}
      >
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
          testid="authSwitchAuthType"
        >
          {pageState.isLogin ? "Register Account" : "Sign in  "}
        </Text>
      </Text>

      <Message type={authState} msg={msg} />
    </div>
  );
};

export default Authenticate;
