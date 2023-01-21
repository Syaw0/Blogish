import style from "./home.module.css";
import { fakePost } from "../../../shared/fakePost";
import Layout from "../../../components/layout/layout";
import Navbar from "../../../components/navbar/navbar";
import PostHolder from "../../postHolder/postHolder";
import TrendTags from "../../trendTags/trendTag";
import Landpage from "../../landpage/landpage";

const Home = ({ isLogin }: any) => {
  return (
    <div className={style.holder}>
      <Navbar
        isLogin={isLogin}
        profileData={{
          profileAlt: "",
          profileUrl: fakePost.profile.profileUrl,
        }}
      />
      {!isLogin && <Landpage />}
      <Layout
        leftSide={
          <PostHolder
            posts={[fakePost, fakePost, fakePost, fakePost, fakePost, fakePost]}
          />
        }
        rightSide={<TrendTags tags={["Programming", "Nature", "socket"]} />}
      />
    </div>
  );
};
export default Home;
