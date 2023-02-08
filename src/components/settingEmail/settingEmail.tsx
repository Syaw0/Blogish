import { useSettingSelector } from "../../store/setting/settingStoreHooks";
import { ChangeEvent, useState } from "react";
import Text from "../typography/typography";
import style from "./settingEmail.module.css";
import Button from "../button/button";
import inputEmptinessCheck from "../../utils/inputEmptinessCheck";
import useFetch from "../../hooks/useFetch";
import { useRouter } from "next/router";
import Message from "../message/message";
import TextInput from "../input/text/textInput";
import inputCheckEmailForm from "../../utils/inputCheckEmailForm";
import updateEmail, { loaderMsg } from "../../utils/updateEmail";

const SettingEmail = () => {
  const router = useRouter();
  const [trigger, state, msg, setMsg] = useFetch([updateEmail], [loaderMsg]);
  const profileData = useSettingSelector((s) => s.profileData);
  const [inputData, setInputData] = useState({
    newEmail: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const updateInformation = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(0, inputData.newEmail, profileData.id);
    if (res.status) {
      router.reload();
    }
  };

  const checkInputs = () => {
    if (!inputEmptinessCheck(inputData)) {
      setMsg("error", "input must have value");
      return false;
    }

    if (!inputCheckEmailForm(inputData.newEmail)) {
      setMsg("error", "enter the valid email address");
      return false;
    }
    return true;
  };
  return (
    <div data-testid="settingEmailHolder" className={style.holder}>
      <Text variant="headline4" className={style.headText}>
        Change Email
      </Text>

      <TextInput
        className={style.emailInput}
        value={inputData.newEmail}
        type="email"
        label="New Email"
        id="settingEmailInput"
        testId="settingEmailInput"
        name="newEmail"
        onChange={handleChange}
        placeholder="write your new email"
      />

      <Button
        className={style.updateBtn}
        onClick={updateInformation}
        testid="settingEmailUpdateButton"
        variant="outlined"
      >
        Update Email
      </Button>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default SettingEmail;
