import style from "./passwordInput.module.css";

const PasswordInput = () => {
  return (
    <div className={style.holder}>
      <input type="password" />
    </div>
  );
};

export default PasswordInput;
