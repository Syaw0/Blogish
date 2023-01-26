import BlogMD from "../blogMd/blogMd";
import PostHolder from "../postHolder/postHolder";
import ProfileSummary from "../profileSummary/profileSummary";
import style from "./blog.module.css";

interface BlogPropsType extends PostType {
  similar: PostType[];
}

const Blog = ({
  author,
  id,
  postHead,
  postSubhead,
  publishDate,
  tagName,
  similar,
  postDetail,
}: BlogPropsType) => {
  return (
    <div className={style.holder}>
      <ProfileSummary
        className={style.blogTop}
        {...author}
        description={publishDate}
      />
      <BlogMD description={postSubhead} header={postHead} body={postDetail} />
      {similar.length >= 1 && (
        <PostHolder
          headText={`Love This Post? See Other From ${author.name}`}
          isAuthors={true}
          posts={similar}
        />
      )}
    </div>
  );
};

export default Blog;
