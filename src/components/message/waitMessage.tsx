import Text from "../typography/typography";
import style from "./message.module.css";

const WaitMessage = ({ msg }: any) => {
  return (
    <div className={`${style.loaderMsg} ${style.holder}`}>
      <Text>{msg}</Text>
    </div>
  );
};

export default WaitMessage;
