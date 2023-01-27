import Text from "../../components/typography/typography";
import Post from "../post/post";
import style from "./postHolder.module.css";

interface PostHolderPropsType {
  posts: PostType[];
  headText: string | null;
  className?: string;
  isAuthors: boolean;
}

const PostHolder = ({
  posts,
  headText,
  className = "",
  isAuthors = false,
}: PostHolderPropsType) => {
  return (
    <div data-testid="postHolder" className={`${style.holder} ${className}`}>
      {headText != null && (
        <Text className={style.head} variant="headline4">
          {headText}
        </Text>
      )}
      {posts.map((post, i) => {
        return (
          <Post
            isAuthors={isAuthors}
            key={post.id}
            {...post}
            onClick={() => {}}
            testid={post.id}
          />
        );
      })}
    </div>
  );
};

export default PostHolder;
