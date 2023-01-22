import Link from "next/link";
import Profile from "../profile/profile";
import Tag from "../tag/tag";
import Text from "../typography/typography";
import style from "./post.module.css";

interface PostPropsType extends PostType {
  onClick?: () => void;
  testid?: string;
}

const Post = ({
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
      <Link data-testid="postHeadAnchor" href={`/user/${author.id}`}>
        <div data-testid="post-head" className={style.head}>
          <Profile
            alt={author.name}
            height={20}
            width={20}
            url={author.profileUrl}
            data-testid={`${author}-profile`}
          />
          <Text>{author.name}</Text>
        </div>
      </Link>

      <div className={style.middle}>
        <Link data-testid="postTitleAnchor" href={`/post/${id}`}>
          <Text className={style.postHead}>{postHead}</Text>
        </Link>
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
