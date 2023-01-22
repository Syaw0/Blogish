import Button from "../button/button";
import PostHolder from "../postHolder/postHolder";
import style from "./lazyPostHolder.module.css";
import { useState } from "react";
import { useSearchSelector } from "../../store/search/searchStoreHooks";

interface LazyPostHolderPropsType {
  headText: string;
}

const LazyPostSearchHolder = ({ headText }: LazyPostHolderPropsType) => {
  const posts = useSearchSelector((s) => s.posts);
  const [postRenderer, setPostRenderer] = useState(10);
  const getPosts = () => {
    setPostRenderer((s) => s + 10);
  };
  return (
    <div data-testid="lazySearchPostHolder" className={style.holder}>
      <PostHolder
        isAuthors={false}
        headText={headText}
        posts={posts.slice(0, postRenderer)}
      />
      {posts.length >= postRenderer && (
        <Button
          onClick={getPosts}
          testid="lazySearchPostHolderButton"
          variant="shadow"
        >
          Load More Posts
        </Button>
      )}
    </div>
  );
};

export default LazyPostSearchHolder;
