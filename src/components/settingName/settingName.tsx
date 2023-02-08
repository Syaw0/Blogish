import { useSettingSelector } from "../../store/setting/settingStoreHooks";
import { ChangeEvent, useState } from "react";
import TextInput from "../input/text/textInput";
import Text from "../typography/typography";
import style from "./settingName.module.css";
import Button from "../button/button";
import inputEmptinessCheck from "../../utils/inputEmptinessCheck";
import useFetch from "../../hooks/useFetch";
import updateNameAndDescription, {
  loaderMsg,
} from "../../utils/updateNameAndDescription";
import { useRouter } from "next/router";
import Message from "../message/message";

const SettingName = () => {
  const router = useRouter();
  const [trigger, state, msg, setMsg] = useFetch(
    [updateNameAndDescription],
    [loaderMsg]
  );
  const profileData = useSettingSelector((s) => s.profileData);
  const [inputData, setInputData] = useState({
    settingNameInput: profileData.name,
    settingDescription: profileData.description,
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
      inputData.settingNameInput,
      inputData.settingDescription,
      profileData.id
    );
    if (res.status) {
      router.reload();
    }
  };

  const checkInputs = () => {
    if (!inputEmptinessCheck(inputData)) {
      setMsg("error", "inputs are empty...");
      return false;
    }
    if (
      inputData.settingNameInput === profileData.name &&
      inputData.settingDescription === profileData.description
    ) {
      setMsg("error", "inputs are same as before...");
      return false;
    }
    return true;
  };

  return (
    <div data-testid="settingNameHolder" className={style.holder}>
      <Text variant="headline4" className={style.headText}>
        Name
      </Text>

      <TextInput
        className={style.nameInput}
        onChange={handleChange}
        value={inputData.settingNameInput}
        name="settingNameInput"
        testId="settingNameInput"
        id="settingNameInput"
        type="text"
        label="Name"
        placeholder="enter your name"
      />

      <TextInput
        className={style.descriptionInput}
        onChange={handleChange}
        value={inputData.settingDescription}
        name="settingDescription"
        testId="settingDescription"
        id="settingDescription"
        type="text"
        label="Description"
        placeholder="introduce yourself"
      />
      <Button
        className={style.updateBtn}
        onClick={updateInformation}
        testid="settingNameUpdateButton"
        variant="outlined"
      >
        Update Information
      </Button>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default SettingName;
