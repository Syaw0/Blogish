import Text from "../typography/typography";
import style from "./message.module.css";

const ErrorMessage = ({ msg }: any) => {
  return (
    <div className={`${style.errorMsg} ${style.holder}`}>
      <Text>{msg}</Text>
    </div>
  );
};

export default ErrorMessage;
