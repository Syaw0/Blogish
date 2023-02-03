import Text from "../typography/typography";
import style from "./error.module.css";

interface ErrorPropsType {
  code: number;
  description: string;
  extra: any;
}

const Error = ({ code, description, extra = "" }: ErrorPropsType) => {
  return (
    <div data-testid="errorHolder" className={style.holder}>
      <Text testid="errorHeadText" className={style.headText}>
        Error
        <Text testid="errorCode" as="span" className={style.code}>
          {code}
        </Text>
      </Text>

      <Text testid="errorDes" className={style.description}>
        {description}
      </Text>

      <div className={style.extra}>{extra}</div>
    </div>
  );
};

export default Error;
