import style from "./textInput.module.css";

interface TextInputType {
  label: string;
  placeholder: string;
  onChange: any;
  value: any;
  id?: string;
  type: "text" | "email";
  testId: string;
  className?: string;
}

const TextInput = ({
  id = "",
  label,
  placeholder,
  onChange,
  value,
  type,
  testId,
  className = "",
}: TextInputType) => {
  return (
    <div className={`${style.holder} ${className}`}>
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
