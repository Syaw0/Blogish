import Text from "../typography/typography";
import style from "./blogMd.module.css";

interface BlogMDPropsType {
  header: string;
  body: string;
}

const BlogMD = ({ header, body }: BlogMDPropsType) => {
  return (
    <div data-testid="blogMdHolder" className={style.holder}>
      <Text testid="blogMdHead" className={style.head}>
        {header}
      </Text>
      <Text testid="blogMdBody" className={style.body}>
        {body}
      </Text>
    </div>
  );
};

export default BlogMD;
