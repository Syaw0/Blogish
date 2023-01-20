import Profile from "../profile/profile";
import Tag from "../tag/tag";
import Text from "../typography/typography";
import style from "./post.module.css";
const Post = () => {
  return (
    <div className={style.holder}>
      <div className={style.head}>
        <Profile />
        <Text>Siavash Mohebbi</Text>
      </div>

      <div className={style.middle}>
        <Text className={style.postHead}>
          How we can use Graph ql in react app How we can use Graph ql in react
          app How we can use Graph ql in react app How we can use Graph ql in
          react app
        </Text>
        <Text variant="subhead1" className={style.postSubhead}>
          with graph ql we can build api , this is type of build api
          architecture with graph ql we can build api , this is type of build
          api architecture with graph ql we can build api
        </Text>
      </div>

      <div className={style.bottom}>
        <Text className={style.date}>Jan 10</Text>
        <Tag name={"Programming"} />
      </div>
    </div>
  );
};

export default Post;
