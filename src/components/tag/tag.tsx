import Text from "../typography/typography";
import style from "./tag.module.css";

const Tag = ({ name }: any) => {
  return (
    <div className={style.holder}>
      <Text variant="subhead2">{name}</Text>
    </div>
  );
};

export default Tag;
