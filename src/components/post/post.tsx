import Profile from "../profile/profile";
import Tag from "../tag/tag";
import Text from "../typography/typography";
import style from "./post.module.css";

interface PostPropsType extends PostType {
  onClick?: () => void;
  testid?: string;
}

const Post = ({
  profile,
  author,
  postHead,
  postSubhead,
  publishDate,
  tagName,
  onClick,
  testid,
  id,
}: PostPropsType) => {
  return (
    <div data-testid={testid} onClick={onClick} className={style.holder}>
      <div className={style.head}>
        <Profile
          alt={profile.profileAlt}
          height={20}
          width={20}
          url={profile.profileUrl}
          data-testid={`${author}-profile`}
        />
        <Text>{author}</Text>
      </div>

      <div className={style.middle}>
        <Text className={style.postHead}>{postHead}</Text>
        <Text variant="subhead1" className={style.postSubhead}>
          {postSubhead}
        </Text>
      </div>

      <div className={style.bottom}>
        <Text className={style.date}>{publishDate}</Text>
        <Tag name={tagName} />
      </div>
    </div>
  );
};

export default Post;
