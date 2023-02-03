import React, { useState } from "react";
import style from "../styles/themeToken.module.css";

type themeType = "dark" | "light";
interface contextType {
  theme: themeType;
  setTheme: (theme: themeType) => void;
}

const ThemeContext = React.createContext<contextType>({
  setTheme(theme) {},
  theme: "light",
});

const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<themeType>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${theme == "light" ? style.color_light : style.color_dark}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeContext };
