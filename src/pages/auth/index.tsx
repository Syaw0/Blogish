import PasswordInput from "@/components/input/password/passwordInput";
import TextInput from "@/components/input/text/textInput";
import { ChangeEvent, useState } from "react";
import style from "../../styles/pagesStyle/auth.module.css";

const AuthenticatePage = () => {
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (e.type == "password") {
      return;
    }
    setInputData((s) => ({ ...s, email: value }));
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
      />
      <PasswordInput />
    </div>
  );
};

export default AuthenticatePage;
