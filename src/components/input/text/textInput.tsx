import { type } from "os";
import style from "./textInput.module.css";

interface TextInputType {
  label: string;
  placeholder: string;
  onChange: any;
  value: any;
  id: string;
  type: "text" | "email";
}

const TextInput = ({
  id,
  label,
  placeholder,
  onChange,
  value,
  type,
}: TextInputType) => {
  return (
    <div className={style.holder}>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
        type={type}
      />
    </div>
  );
};

export default TextInput;
