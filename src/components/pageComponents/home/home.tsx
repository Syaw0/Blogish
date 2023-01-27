import style from "./home.module.css";
import Layout from "../../layouts/twoSectionLayout/layout";
import Navbar from "../../../components/navbar/navbar";
import TrendTags from "../../trendTags/trendTag";
import Landpage from "../../landpage/landpage";
import LazyPostHolder from "../../lazyPostHomeHolder/lazyPostHolder";

const Home = ({ isLogin, profileData }: MainPagePropsType) => {
  return (
    <div className={style.holder}>
      <Navbar isLogin={isLogin} profileData={profileData} />
      {!isLogin && <Landpage />}
      <Layout
        leftSide={<LazyPostHolder headText="Lets Traverse Articles..." />}
        rightSide={<TrendTags tags={["Programming", "Nature", "socket"]} />}
      />
    </div>
  );
};
export default Home;
