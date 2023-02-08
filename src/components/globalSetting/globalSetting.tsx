import SettingProfile from "../settingProfile/settingProfile";
import style from "./globalSetting.module.css";

const GlobalSetting = () => {
  return (
    <div className={style.holder}>
      <SettingProfile />
    </div>
  );
};

export default GlobalSetting;
