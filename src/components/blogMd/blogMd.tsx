import Text from "../typography/typography";
import style from "./blogMd.module.css";

interface BlogMDPropsType {
  header: string;
  body: string;
  description: string;
  className?: string;
}

const BlogMD = ({
  header,
  body,
  description,
  className = "",
}: BlogMDPropsType) => {
  return (
    <div data-testid="blogMdHolder" className={`${style.holder} ${className}`}>
      <Text testid="blogMdHead" className={style.head}>
        {header == "" ? "Empty..." : header}
      </Text>
      <Text
        variant="headline6"
        testid="blogMdSubhead"
        className={style.subhead}
      >
        {description == "" ? "Empty..." : description}
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
