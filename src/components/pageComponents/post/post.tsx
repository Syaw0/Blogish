import Layout from "../../../components/layout/layout";
import Navbar from "../../../components/navbar/navbar";
import ProfileSummary from "../../../components/profileSummary/profileSummary";
import style from "./post.module.css";
const Post = ({ isLogin, post, profileData }: PostPagePropsType) => {
  return (
    <div className={style.holder}>
      <Navbar isLogin={isLogin} profileData={profileData} />
      <Layout
        leftSide={
          <>
            <ProfileSummary
              className={style.leftProfileSummary}
              {...post.author}
            />
          </>
        }
        rightSide={<ProfileSummary {...post.author} />}
      />
    </div>
  );
};

export default Post;
