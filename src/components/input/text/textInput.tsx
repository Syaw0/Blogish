import style from "./textInput.module.css";

interface TextInputType {
  label: string;
  placeholder: string;
  onChange: any;
  value: any;
  id: string;
  type: "text" | "email";
  testId: string;
}

const TextInput = ({
  id,
  label,
  placeholder,
  onChange,
  value,
  type,
  testId,
}: TextInputType) => {
  return (
    <div className={style.holder}>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        data-testid={testId}
        id={id}
        onChange={onChange}
        value={value}
        type={type}
      />
    </div>
  );
};

export default TextInput;
