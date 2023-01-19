import CircleLoader from "../loader/circleLoader";
import style from "./button.module.css";

interface ButtonType {
  children: string;
  variant?: "contained" | "outlined" | "shadow";
  color?: "primary" | "secondary" | "tertiary";
  onClick?: any;
  id?: string;
  testid?: string;
  StartIcon?: (params: IconTypes) => JSX.Element;
  EndIcon?: (params: IconTypes) => JSX.Element;
  loader?: boolean;
}
const Button = ({
  children,
  variant = "contained",
  color = "primary",
  testid,
  id,
  onClick,
  StartIcon,
  EndIcon,
  loader = false,
}: ButtonType) => {
  console.log(style[variant]);
  return (
    <button
      disabled={loader}
      data-testid={testid}
      id={id}
      onClick={onClick}
      className={`${style.button} ${style[color]} ${style[variant]} `}
    >
      {loader ? (
        <CircleLoader />
      ) : (
        <>
          {StartIcon != null && (
            <StartIcon className={style.leftIcon} height="20" width="20" />
          )}
          {children}
          {EndIcon != null && (
            <EndIcon className={style.rightIcon} height="20" width="20" />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
