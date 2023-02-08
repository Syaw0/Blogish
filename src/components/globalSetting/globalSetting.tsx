import SettingName from "../settingName/settingName";
import SettingProfile from "../settingProfile/settingProfile";
import style from "./globalSetting.module.css";

const GlobalSetting = () => {
  return (
    <div data-testid="globalSettingHolder" className={style.holder}>
      <SettingProfile />
      <SettingName />
    </div>
  );
};

export default GlobalSetting;
