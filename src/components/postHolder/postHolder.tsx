import Text from "../../components/typography/typography";
import Post from "../post/post";
import style from "./postHolder.module.css";

interface PostHolderPropsType {
  posts: PostType[];
}

const PostHolder = ({ posts }: PostHolderPropsType) => {
  return (
    <div data-testid="postHolder" className={style.holder}>
      <Text className={style.head} variant="headline4">
        Lets Traverse Articles...
      </Text>
      {posts.map((post, i) => {
        return (
          <Post key={post.id} {...post} onClick={() => {}} testid={post.id} />
        );
      })}
    </div>
  );
};

export default PostHolder;
