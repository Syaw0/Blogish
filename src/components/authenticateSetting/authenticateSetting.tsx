import SettingEmail from "../settingEmail/settingEmail";
import SettingPassword from "../settingPassword/settingPassword";
import style from "./authenticateSetting.module.css";

const AuthenticateSetting = () => {
  return (
    <div data-testid="authenticateSettingHolder" className={style.holder}>
      <SettingPassword />
      <SettingEmail />
    </div>
  );
};

export default AuthenticateSetting;
