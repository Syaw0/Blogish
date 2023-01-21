import Tag from "../../../components/tag/tag";
import Text from "../../../components/typography/typography";
import style from "./trendTag.module.css";

interface TrendTagsPropsType {
  tags: string[];
}

const TrendTags = ({ tags }: TrendTagsPropsType) => {
  return (
    <div data-testid="trendTagsHolder" className={style.holder}>
      <Text className={style.header} variant="headline4">
        Trend Tags
      </Text>
      <div className={style.tagHolder}>
        {tags.map((tag) => {
          return <Tag data-testid={`trendTags-${tag}`} key={tag} name={tag} />;
        })}
      </div>
    </div>
  );
};

export default TrendTags;
