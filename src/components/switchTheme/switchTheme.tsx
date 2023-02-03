import { ThemeContext } from "../../contexts/themeContext";
import { useContext } from "react";
import style from "./switchTheme.module.css";
import IconMoon from "../../assets/icons/iconMoon";
import IconSun from "../../assets/icons/iconSun";

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };
  return (
    <div
      data-testid="themeSwitch"
      onClick={handleTheme}
      className={style.holder}
    >
      {theme == "light" && (
        <IconMoon data-testid="light" width="24" height="24" />
      )}
      {theme == "dark" && <IconSun data-testid="dark" width="24" height="24" />}
    </div>
  );
};

export default SwitchTheme;
