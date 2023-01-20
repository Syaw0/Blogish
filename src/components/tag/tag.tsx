import Text from "../typography/typography";
import style from "./tag.module.css";

interface TagType {
  name: string;
  onClick?: () => void;
  "data-testid"?: string;
}

const Tag = ({ name, ...params }: TagType) => {
  return (
    <div {...params} className={style.holder}>
      <Text variant="subhead2">{name}</Text>
    </div>
  );
};

export default Tag;
