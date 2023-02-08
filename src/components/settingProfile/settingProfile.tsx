import useFetch from "../../hooks/useFetch";
import changeProfile, { loaderMsg } from "../../utils/changeProfile";
import deleteProfile, {
  loaderMsg as deleteLoader,
} from "../../utils/deleteProfile";
import { ChangeEvent } from "react";
import Button from "../button/button";
import Profile from "../profile/profile";
import style from "./settingProfile.module.css";
import Text from "../typography/typography";
import checkImageForProfile from "../../utils/checkImageForProfile";
import { useRouter } from "next/router";
import { useSettingSelector } from "../../store/setting/settingStoreHooks";
import Message from "../message/message";

const SettingProfile = () => {
  const router = useRouter();
  const [trigger, state, msg, setMsg] = useFetch(
    [deleteProfile, changeProfile],
    [deleteLoader, loaderMsg]
  );
  const profileData = useSettingSelector((s) => s.profileData);

  const deleteProf = async () => {
    if (profileData.profileUrl.search("/prof/default") == -1) {
      const res = await trigger(0, profileData.id);
      if (res.status) {
        router.reload();
      }
    }
  };
  const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0) as File;
    const checkImageResult = checkImageForProfile(file);
    if (!checkImageResult.status) {
      return setMsg("error", checkImageResult.msg);
    }

    const res = await trigger(1, file, profileData.id, profileData.profileUrl);
    if (res.status) {
      router.reload();
    }
  };
  return (
    <div className={style.holder} data-testid="profileSettingHolder">
      <Text variant="headline4" className={style.headText}>
        Profile
      </Text>

      <Profile
        data-testid="profileSettingProfile"
        className={style.profileHolder}
        alt={profileData.name}
        url={profileData.profileUrl}
        height={50}
        width={50}
      />
      <div className={style.buttonHolder}>
        <Button
          testid="profileSettingDeleteButton"
          className={style.deleteButton}
          onClick={deleteProf}
          variant="shadow"
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          testid="profileSettingChangeButton"
          className={style.changeButton}
        >
          Change
          {
            <input
              data-testid="profileSettingFileInput"
              onChange={changeFile}
              className={style.fileInput}
              accept="image/*"
              type={"file"}
            />
          }
        </Button>
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default SettingProfile;
