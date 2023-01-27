import Blog from "../../../components/blog/blog";
import Layout from "../../layouts/twoSectionLayout/layout";
import Navbar from "../../../components/navbar/navbar";
import ProfileSummary from "../../../components/profileSummary/profileSummary";
import style from "./post.module.css";
const Post = ({ isLogin, post, profileData, similar }: PostPagePropsType) => {
  return (
    <div className={style.holder}>
      <Navbar isLogin={isLogin} profileData={profileData} />
      <Layout
        leftSide={<Blog {...post} similar={similar} />}
        rightSide={<ProfileSummary {...post.author} />}
      />
    </div>
  );
};

export default Post;
