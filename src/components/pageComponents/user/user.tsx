import Layout from "../../../components/layout/layout";
import Navbar from "../../../components/navbar/navbar";
import PostHolder from "../../../components/postHolder/postHolder";
import ProfileSummary from "../../../components/profileSummary/profileSummary";
import style from "./user.module.css";

const User = ({ profileData, isLogin, posts, user }: UserPagePropsType) => {
  return (
    <div className={style.holder}>
      <Navbar isLogin={isLogin} profileData={profileData} />
      <Layout
        leftSide={
          <>
            <ProfileSummary className={style.leftProfileSummary} user={user} />
            <PostHolder
              className={style.postHolderHead}
              posts={posts}
              headText={"Posts"}
            />
          </>
        }
        rightSide={<ProfileSummary user={user} />}
      />
    </div>
  );
};

export default User;