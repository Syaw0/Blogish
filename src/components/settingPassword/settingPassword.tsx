import { useSettingSelector } from "../../store/setting/settingStoreHooks";
import { ChangeEvent, useState } from "react";
import Text from "../typography/typography";
import style from "./settingPassword.module.css";
import Button from "../button/button";
import inputEmptinessCheck from "../../utils/inputEmptinessCheck";
import useFetch from "../../hooks/useFetch";

import { useRouter } from "next/router";
import Message from "../message/message";
import PasswordInput from "../input/password/passwordInput";
import inputCheckPasswordValidity from "../../utils/inputCheckPasswordValidity";
import inputCheckEquality from "../../utils/inputCheckEquality";
import updatePassword, { loaderMsg } from "../../utils/updatePassword";

const SettingPassword = () => {
  const router = useRouter();
  const [trigger, state, msg, setMsg] = useFetch([updatePassword], [loaderMsg]);
  const profileData = useSettingSelector((s) => s.profileData);
  const [inputData, setInputData] = useState({
    oldPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const updateInformation = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(
      0,
      inputData.oldPassword,
      inputData.newPassword,
      profileData.id
    );
    if (res.status) {
      router.reload();
    }
  };

  const checkInputs = () => {
    if (!inputEmptinessCheck(inputData)) {
      setMsg("error", "input must have value");
      return false;
    }
    if (!inputCheckPasswordValidity(inputData.newPassword)) {
      setMsg("error", "password must be more than 6 character");
      return false;
    }
    if (inputCheckEquality(inputData.oldPassword, inputData.newPassword)) {
      setMsg("error", "new password and the old one is same");
      return false;
    }
    if (
      !inputCheckEquality(inputData.retypeNewPassword, inputData.newPassword)
    ) {
      setMsg("error", "new password and retype is not match");
      return false;
    }
    return true;
  };
  return (
    <div data-testid="settingPasswordHolder" className={style.holder}>
      <Text variant="headline4" className={style.headText}>
        Change Password
      </Text>

      <PasswordInput
        className={style.passInput}
        value={inputData.oldPassword}
        label="Current Password"
        id="settingPasswordOldPasswordInput"
        testId="settingPasswordOldPasswordInput"
        name="oldPassword"
        onChange={handleChange}
        placeholder="enter your current password"
      />

      <PasswordInput
        className={style.passInput}
        value={inputData.newPassword}
        label="New Password"
        id="settingPasswordNewPassword"
        testId="settingPasswordNewPassword"
        name="newPassword"
        onChange={handleChange}
        placeholder="enter your new password"
      />

      <PasswordInput
        className={style.passInput}
        value={inputData.retypeNewPassword}
        label="Retype New Password"
        id="settingPasswordRetypeNewPassword"
        testId="settingPasswordRetypeNewPassword"
        name="retypeNewPassword"
        onChange={handleChange}
        placeholder="retype new password"
      />

      <Button
        className={style.updateBtn}
        onClick={updateInformation}
        testid="settingPasswordUpdateButton"
        variant="outlined"
      >
        Update Password
      </Button>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default SettingPassword;
