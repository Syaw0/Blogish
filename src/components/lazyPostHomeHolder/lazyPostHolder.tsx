import loadMorePosts, { loaderMsg } from "../../utils/loadMorePosts";
import useFetch from "../../hooks/useFetch";
import Button from "../button/button";
import PostHolder from "../postHolder/postHolder";
import style from "./lazyPostHolder.module.css";
import Message from "../message/message";
import { homeStateAddPost } from "../../store/home/homeStore";
import { useDispatch } from "react-redux";
import { useHomeSelector } from "../../store/home/homeStoreHooks";

interface LazyPostHolderPropsType {
  headText: string;
}

const LazyPostHolder = ({ headText }: LazyPostHolderPropsType) => {
  let [trigger, state, msg] = useFetch([loadMorePosts], [loaderMsg]);
  const posts = useHomeSelector((s) => s.posts);
  const dispatch = useDispatch();

  const getPosts = async () => {
    const result = await trigger(0, posts.length);
    if (result.status) {
      console.log(result);
      dispatch(homeStateAddPost(result.data));
    }
  };
  return (
    <div data-testid="lazyPostHolder" className={style.holder}>
      <PostHolder isAuthors={false} headText={headText} posts={posts} />
      <Button
        loader={state == "loader"}
        disabled={state == "loader"}
        onClick={getPosts}
        testid="lazyPostHolderButton"
        variant="shadow"
      >
        Load More Posts
      </Button>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default LazyPostHolder;
