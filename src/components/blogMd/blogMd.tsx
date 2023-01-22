import Text from "../typography/typography";
import style from "./blogMd.module.css";

interface BlogMDPropsType {
  header: string;
  body: string;
  description: string;
}

const BlogMD = ({ header, body, description }: BlogMDPropsType) => {
  return (
    <div data-testid="blogMdHolder" className={style.holder}>
      <Text testid="blogMdHead" className={style.head}>
        {header}
      </Text>
      <Text
        variant="headline6"
        testid="blogMdSubhead"
        className={style.subhead}
      >
        {description}
      </Text>
      <div
        data-testid="blogMdBody"
        className={style.mdHolder}
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
    </div>
  );
};

export default BlogMD;
