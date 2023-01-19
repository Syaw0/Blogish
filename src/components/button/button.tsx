import style from "./button.module.css";

interface ButtonType {
  children: string;
  variant?: "contained" | "outlined" | "shadow";
  color?: "primary" | "secondary" | "tertiary";
  onClick?: any;
  id?: string;
  testid?: string;
  startIcon?: SVGElement;
  endIcon?: SVGElement;
}
// TODO fix start and end icon and implement loader
const Button = ({
  children,
  variant = "contained",
  color = "primary",
  testid,
  id,
  onClick,
  startIcon,
  endIcon,
}: ButtonType) => {
  console.log(style[variant]);
  return (
    <button
      data-testid={testid}
      id={id}
      onClick={onClick}
      className={`${style.button} ${style[color]} ${style[variant]} `}
    >
      {children}
    </button>
  );
};

export default Button;
