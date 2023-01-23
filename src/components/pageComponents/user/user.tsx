import Layout from "../../layouts/twoSectionLayout/layout";
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
            <ProfileSummary className={style.leftProfileSummary} {...user} />
            <PostHolder
              isAuthors={true}
              className={style.postHolderHead}
              posts={posts != null ? posts : []}
              headText={"Posts"}
            />
          </>
        }
        rightSide={<ProfileSummary {...user} />}
      />
    </div>
  );
};

export default User;
