import loadMorePosts, { loaderMsg } from "../../utils/loadMorePosts";
import useFetch from "../../hooks/useFetch";
import Button from "../button/button";
import PostHolder from "../postHolder/postHolder";
import style from "./lazyPostHolder.module.css";
import { useEffect } from "react";
import Message from "../message/message";
import { homeStateAddPost } from "../../store/home/homeStore";
import { useDispatch } from "react-redux";
import { useHomeSelector } from "../../store/home/homeStoreHooks";

const LazyPostHolder = () => {
  let [data, trigger, state, msg, setMsg] = useFetch(loadMorePosts, loaderMsg);
  const posts = useHomeSelector((s) => s.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data != null) {
      dispatch(homeStateAddPost(data.posts));
      setTimeout(() => {
        setMsg("pending", "");
      }, 1000);
    }
  }, [data, dispatch, setMsg]);

  const getPosts = () => {
    trigger();
  };
  return (
    <div data-testid="lazyPostHolder" className={style.holder}>
      <PostHolder posts={posts} />
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
