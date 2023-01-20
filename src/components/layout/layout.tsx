import { ReactNode } from "react";
import style from "./layout.module.css";

interface LayoutPropsTypes {
  leftSide: ReactNode;
  rightSide: ReactNode;
}

const Layout = ({ leftSide, rightSide }: LayoutPropsTypes) => {
  return (
    <div className={style.holder}>
      {leftSide}
      {rightSide}
    </div>
  );
};

export default Layout;
