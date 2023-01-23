import IconDotsVertical from "@/assets/icons/iconDotsVertical";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Menu from "../menu/menu";
import Profile from "../profile/profile";
import Tag from "../tag/tag";
import Text from "../typography/typography";
import style from "./post.module.css";

interface PostPropsType extends PostType {
  onClick?: () => void;
  testid?: string;
  isAuthors: boolean;
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
  isAuthors,
}: PostPropsType) => {
  const router = useRouter();
  const { profileData } = useSelector((s: any) => s);
  const handlePostEditButton = () => {
    router.replace(`/write?edit=${true}&id=${id}`);
  };

  return (
    <div data-testid={testid} onClick={onClick} className={style.holder}>
      {isAuthors && <Text className={style.date}>{publishDate}</Text>}
      <div className={style.top}>
        <Link data-testid="postHeadAnchor" href={`/user/${author.id}`}>
          <div data-testid="post-head" className={style.head}>
            {!isAuthors && (
              <>
                <Profile
                  alt={author.name}
                  height={20}
                  width={20}
                  url={author.profileUrl}
                  data-testid={`${author}-profile`}
                />
                <Text>{author.name}</Text>
              </>
            )}
          </div>
        </Link>
        {profileData.id === author.id && (
          <Menu
            items={[{ text: "Edit article", onClick: handlePostEditButton }]}
          />
        )}
      </div>

      <div className={style.middle}>
        <Link data-testid="postTitleAnchor" href={`/post/${id}`}>
          <Text className={style.postHead}>{postHead}</Text>
        </Link>
        <Text variant="subhead1" className={style.postSubhead}>
          {postSubhead}
        </Text>
      </div>

      <div className={style.bottom}>
        {!isAuthors && <Text className={style.date}>{publishDate}</Text>}
        <Tag name={tagName} />
      </div>
    </div>
  );
};

export default Post;
