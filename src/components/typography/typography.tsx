import style from "./typography.module.css";

interface Text {
  children: string;
  variant?:
    | "headline1"
    | "headline2"
    | "headline3"
    | "headline4"
    | "headline5"
    | "headline6"
    | "subhead1"
    | "subhead2"
    | "subhead3"
    | "button";
  id?: string;
  testid?: string;
}

const Text = ({ children, variant = "subhead1", testid, id }: Text) => {
  return (
    <p
      data-testid={testid}
      id={id}
      className={`${style.typography} ${style[variant]}`}
    >
      {children}
    </p>
  );
};

export default Text;
